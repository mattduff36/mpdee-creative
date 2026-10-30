/**
 * Server-only contact handler. Do not import this module from client
 * components: it reads RESEND_API_KEY and must stay out of the browser bundle.
 *
 * Rate limiting is in-memory and per server instance. Counters are not shared
 * across instances, reset on a cold start, expire with the window, and the map
 * is capped. Validation failures do not consume the limit.
 */

const RESEND_EMAILS_URL = 'https://api.resend.com/emails';
const DELIVERY_TIMEOUT_MS = 20_000;
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 500;

export const MAX_CONTACT_BODY_BYTES = 8192;
export const CONTACT_RECIPIENT = 'admin@mpdee.co.uk';
export const CONTACT_FALLBACK_EMAIL = 'creative@mpdee.co.uk';

export const CONTACT_FIELD_LIMITS = {
  name: 100,
  email: 254,
  projectType: 100,
  details: 1000,
} as const;

export const PROJECT_TYPES = [
  'Radio commercial',
  'Audio imaging',
  'Event recording',
  'Other',
] as const;

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const HEADER_UNSAFE = /[\u0000-\u001F\u007F\u2028\u2029]/;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export type ContactHandlerResult = {
  status: number;
  body: { message?: string; error?: string };
  retryAfter?: number;
};

type ContactFields = {
  name: string;
  email: string;
  projectType: string;
  details: string;
};

type HandlerOptions = {
  ip?: string;
  now?: number;
  fetchImpl?: typeof fetch;
};

export function resetContactRateLimitForTests(): void {
  buckets.clear();
}

function failure(status: number, error: string, retryAfter?: number): ContactHandlerResult {
  return retryAfter
    ? { status, body: { error }, retryAfter }
    : { status, body: { error } };
}

function takeRateLimit(ip: string, now: number): { allowed: boolean; retryAfter?: number } {
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) buckets.delete(key);
  }

  const key = (ip.trim() || 'unknown').slice(0, 128);
  const current = buckets.get(key);

  if (!current || now >= current.resetAt) {
    if (!buckets.has(key) && buckets.size >= MAX_TRACKED_KEYS) {
      const oldest = buckets.keys().next().value;
      if (oldest !== undefined) buckets.delete(oldest);
    }
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (current.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function validateFields(record: Record<string, unknown>): { ok: true; fields: ContactFields } | { ok: false; error: string } {
  const { name, email, projectType, details, mpdee_hp: honeypot } = record;

  if (honeypot != null && typeof honeypot !== 'string') {
    return { ok: false, error: 'The message could not be read. Check the form and try again.' };
  }

  if (typeof name !== 'string') return { ok: false, error: 'Name must be text.' };
  if (typeof email !== 'string') return { ok: false, error: 'Email must be text.' };
  if (typeof projectType !== 'string') return { ok: false, error: 'Project type must be text.' };
  if (typeof details !== 'string') return { ok: false, error: 'Project details must be text.' };

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedType = projectType.trim();
  const trimmedDetails = details.trim();

  if (!trimmedName) return { ok: false, error: 'Name is required.' };
  if (trimmedName.length > CONTACT_FIELD_LIMITS.name || HEADER_UNSAFE.test(trimmedName)) {
    return { ok: false, error: 'Name must be 100 characters or fewer.' };
  }

  if (!trimmedEmail) return { ok: false, error: 'Email is required.' };
  if (
    trimmedEmail.length > CONTACT_FIELD_LIMITS.email ||
    HEADER_UNSAFE.test(trimmedEmail) ||
    !EMAIL_PATTERN.test(trimmedEmail)
  ) {
    return { ok: false, error: 'Enter a valid email address.' };
  }

  if (
    trimmedType.length > CONTACT_FIELD_LIMITS.projectType ||
    !PROJECT_TYPES.includes(trimmedType as (typeof PROJECT_TYPES)[number])
  ) {
    return { ok: false, error: 'Choose a project type.' };
  }

  if (!trimmedDetails) return { ok: false, error: 'Tell us what you need recorded.' };
  if (trimmedDetails.length > CONTACT_FIELD_LIMITS.details) {
    return { ok: false, error: 'Details must be 1000 characters or fewer.' };
  }

  return {
    ok: true,
    fields: {
      name: trimmedName,
      email: trimmedEmail,
      projectType: trimmedType,
      details: trimmedDetails,
    },
  };
}

function buildText(fields: ContactFields): string {
  return [
    'New creative enquiry',
    '',
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Project type: ${fields.projectType}`,
    '',
    'Details:',
    fields.details,
  ].join('\n');
}

async function readEmailId(response: Response): Promise<string | null> {
  try {
    const data: unknown = await response.json();
    if (!data || typeof data !== 'object' || !('id' in data)) return null;
    const id = (data as { id?: unknown }).id;
    if (typeof id !== 'string') return null;
    const trimmed = id.trim();
    return trimmed.length > 0 ? trimmed : null;
  } catch {
    return null;
  }
}

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError';
}

function readServerEnv(name: string): string | undefined {
  const value = process.env[name];
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

const deliveryError = `Your message could not be sent. Please try again or email ${CONTACT_FALLBACK_EMAIL}.`;

export async function handleContactSubmission(
  rawBody: string,
  options: HandlerOptions = {}
): Promise<ContactHandlerResult> {
  if (Buffer.byteLength(rawBody, 'utf8') > MAX_CONTACT_BODY_BYTES) {
    return failure(413, 'Message is too large.');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return failure(400, 'The message could not be read. Check the form and try again.');
  }

  const record = asRecord(parsed);
  if (!record) {
    return failure(400, 'The message could not be read. Check the form and try again.');
  }

  const honeypot = record.mpdee_hp;
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    const now = options.now ?? Date.now();
    const limit = takeRateLimit(options.ip ?? 'unknown', now);
    if (!limit.allowed) {
      return failure(
        429,
        `Too many messages from this connection. Please wait and try again, or email ${CONTACT_FALLBACK_EMAIL}.`,
        limit.retryAfter
      );
    }
    return { status: 200, body: { message: 'Message sent. We will reply by email.' } };
  }

  const validated = validateFields(record);
  if (!validated.ok) return failure(400, validated.error);

  const apiKey = readServerEnv('RESEND_API_KEY');
  const emailFrom = readServerEnv('EMAIL_FROM');
  if (!apiKey || !emailFrom || HEADER_UNSAFE.test(apiKey) || HEADER_UNSAFE.test(emailFrom)) {
    console.error('Resend configuration missing.');
    return failure(503, deliveryError);
  }

  const now = options.now ?? Date.now();
  const limit = takeRateLimit(options.ip ?? 'unknown', now);
  if (!limit.allowed) {
    return failure(
      429,
      `Too many messages from this connection. Please wait and try again, or email ${CONTACT_FALLBACK_EMAIL}.`,
      limit.retryAfter
    );
  }

  const abort = new AbortController();
  const deliveryTimeout = setTimeout(() => abort.abort(), DELIVERY_TIMEOUT_MS);
  const send = options.fetchImpl ?? fetch;

  try {
    const response = await send(RESEND_EMAILS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [CONTACT_RECIPIENT],
        reply_to: validated.fields.email,
        subject: `Creative enquiry from ${validated.fields.name.replace(HEADER_UNSAFE, ' ')}`,
        text: buildText(validated.fields),
      }),
      signal: abort.signal,
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to send email');
      return failure(503, deliveryError);
    }

    const id = await readEmailId(response);
    if (!id) {
      console.error('Failed to send email');
      return failure(503, deliveryError);
    }

    return { status: 200, body: { message: 'Message sent. We will reply by email.' } };
  } catch (error) {
    if (isAbortError(error)) {
      console.error('Email delivery timed out');
    } else {
      console.error('Failed to send email');
    }
    return failure(503, deliveryError);
  } finally {
    clearTimeout(deliveryTimeout);
  }
}
