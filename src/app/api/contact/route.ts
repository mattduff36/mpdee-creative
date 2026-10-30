import { NextRequest, NextResponse } from 'next/server';
import { handleContactSubmission, MAX_CONTACT_BODY_BYTES } from '@/lib/contact';

export const maxDuration = 30;
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const declared = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(declared) && declared > MAX_CONTACT_BODY_BYTES) {
    return NextResponse.json({ error: 'Message is too large.' }, { status: 413 });
  }

  let rawBody = '';
  try {
    const reader = request.body?.getReader();
    if (reader) {
      const decoder = new TextDecoder();
      let bytes = 0;
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          bytes += value.byteLength;
          if (bytes > MAX_CONTACT_BODY_BYTES) {
            await reader.cancel();
            return NextResponse.json({ error: 'Message is too large.' }, { status: 413 });
          }
          rawBody += decoder.decode(value, { stream: true });
        }
        rawBody += decoder.decode();
      } finally {
        reader.releaseLock();
      }
    }
  } catch {
    return NextResponse.json(
      { error: 'The message could not be read. Check the form and try again.' },
      { status: 400 }
    );
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const result = await handleContactSubmission(rawBody, { ip });
  const headers = new Headers();
  if (result.retryAfter) headers.set('Retry-After', String(result.retryAfter));

  return NextResponse.json(result.body, { status: result.status, headers });
}
