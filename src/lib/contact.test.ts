import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { NextRequest } from 'next/server';
import { POST } from '../app/api/contact/route';
import {
  handleContactSubmission,
  resetContactRateLimitForTests,
} from './contact';

const fetchMock = jest.fn<typeof fetch>();
const configuredFrom = 'MPDEE Creative <creative-form@example.com>';
const fakeKey = 'test-resend-key';

function validBody(overrides: Record<string, unknown> = {}): string {
  return JSON.stringify({
    name: 'Alex Producer',
    email: 'producer@station.co.uk',
    projectType: 'Radio commercial',
    details: 'A 30 second commercial for the breakfast show.',
    ...overrides,
  });
}

function jsonResponse(body: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    json: async () => body,
  } as Response;
}

beforeEach(() => {
  resetContactRateLimitForTests();
  fetchMock.mockReset();
  fetchMock.mockImplementation(() => Promise.reject(new Error('unexpected provider call')));
  global.fetch = fetchMock;
  delete process.env.RESEND_API_KEY;
  delete process.env.EMAIL_FROM;
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

describe('handleContactSubmission', () => {
  it('rejects oversized streamed UTF-8 bodies without trusting content-length', async () => {
    const response = await POST(new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ padding: '🌍'.repeat(2100) }),
    }));
    expect(response.status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects invalid submissions without calling the provider', async () => {
    process.env.RESEND_API_KEY = fakeKey;
    process.env.EMAIL_FROM = configuredFrom;

    const cases = [
      '{',
      '[]',
      'null',
      JSON.stringify({
        name: 12,
        email: 'producer@station.co.uk',
        projectType: 'Other',
        details: 'Need a mix.',
      }),
      JSON.stringify({
        name: 'Alex',
        email: 'not-an-email',
        projectType: 'Other',
        details: 'Need a mix.',
      }),
      JSON.stringify({
        name: 'A'.repeat(101),
        email: 'producer@station.co.uk',
        projectType: 'Other',
        details: 'Need a mix.',
      }),
      JSON.stringify({
        name: 'Alex',
        email: `${'a'.repeat(66)}@${'b'.repeat(185)}.co`,
        projectType: 'Other',
        details: 'Need a mix.',
      }),
      JSON.stringify({
        name: 'Alex\nBcc: evil@example.com',
        email: 'producer@station.co.uk',
        projectType: 'Other',
        details: 'Need a mix.',
      }),
      JSON.stringify({
        name: 'Alex',
        email: 'producer@station.co.uk',
        projectType: 'Something else',
        details: 'Need a mix.',
      }),
      JSON.stringify({
        name: 'Alex',
        email: 'producer@station.co.uk',
        projectType: 'Other',
        details: 'x'.repeat(1001),
      }),
      'x'.repeat(8193),
      JSON.stringify({ padding: '🌍'.repeat(2100) }),
    ];

    for (const [index, body] of cases.entries()) {
      const result = await handleContactSubmission(body, { ip: `198.51.100.${index + 1}` });
      expect(result.status === 400 || result.status === 413).toBe(true);
      expect(result.body.message).toBeUndefined();
    }

    expect(fetchMock.mock.calls.length).toBe(0);
  });

  it('sends as the configured sender to the studio inbox and replies to the submitter', async () => {
    process.env.RESEND_API_KEY = fakeKey;
    process.env.EMAIL_FROM = configuredFrom;
    fetchMock.mockImplementation(async () => jsonResponse({ id: 'email_123' }));

    const result = await handleContactSubmission(
      validBody({ to: 'intruder@example.com', from: 'intruder@example.com' }),
      { ip: '203.0.113.8' }
    );

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Message sent. We will reply by email.');
    expect(fetchMock.mock.calls.length).toBe(1);

    const [url, init] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe('https://api.resend.com/emails');
    expect(init?.method).toBe('POST');

    const headers = new Headers(init?.headers);
    expect(headers.get('authorization') === `Bearer ${fakeKey}`).toBe(true);

    const payload = JSON.parse(String(init?.body)) as {
      from?: string;
      to?: string[];
      reply_to?: string;
      html?: string;
      text?: string;
    };
    expect(payload.from === configuredFrom).toBe(true);
    expect(payload.to).toEqual(['admin@mpdee.co.uk']);
    expect(payload.reply_to).toBe('producer@station.co.uk');
    expect(payload.html).toBeUndefined();
    expect(payload.text).toContain('Project type: Radio commercial');
    expect(payload.text).toContain('producer@station.co.uk');
    expect(payload.text?.includes('intruder@example.com')).toBe(false);
  });

  it('does not succeed when the provider fails, returns malformed JSON, or omits an id', async () => {
    process.env.RESEND_API_KEY = fakeKey;
    process.env.EMAIL_FROM = configuredFrom;

    fetchMock.mockImplementationOnce(async () => jsonResponse({ message: 'no' }, false, 422));
    const failed = await handleContactSubmission(validBody(), { ip: '203.0.113.9' });
    expect(failed.status).toBe(503);
    expect(failed.body.message).toBeUndefined();

    fetchMock.mockImplementationOnce(async () => ({
      ok: true,
      status: 200,
      json: async () => {
        throw new Error('malformed');
      },
    }) as Response);
    const malformed = await handleContactSubmission(validBody(), { ip: '203.0.113.9' });
    expect(malformed.status).toBe(503);

    fetchMock.mockImplementationOnce(async () => jsonResponse({ id: '   ' }));
    const blankId = await handleContactSubmission(validBody(), { ip: '203.0.113.9' });
    expect(blankId.status).toBe(503);

    fetchMock.mockImplementationOnce(async () => jsonResponse({}));
    const missingId = await handleContactSubmission(validBody(), { ip: '203.0.113.9' });
    expect(missingId.status).toBe(503);
    expect(missingId.body.error).toContain('creative@mpdee.co.uk');
  });

  it('does not call the provider when Resend config is missing', async () => {
    const noKey = await handleContactSubmission(validBody(), { ip: '203.0.113.4' });
    expect(noKey.status).toBe(503);
    expect(noKey.body.message).toBeUndefined();

    process.env.RESEND_API_KEY = fakeKey;
    const noFrom = await handleContactSubmission(validBody(), { ip: '203.0.113.4' });
    expect(noFrom.status).toBe(503);

    delete process.env.RESEND_API_KEY;
    process.env.EMAIL_FROM = configuredFrom;
    const noKeyWithFrom = await handleContactSubmission(validBody(), { ip: '203.0.113.4' });
    expect(noKeyWithFrom.status).toBe(503);
    expect(fetchMock.mock.calls.length).toBe(0);
  });

  it('stops repeated valid submissions on this instance until the window expires', async () => {
    process.env.RESEND_API_KEY = fakeKey;
    process.env.EMAIL_FROM = configuredFrom;
    fetchMock.mockImplementation(async () => jsonResponse({ id: 'email_123' }));

    const body = validBody();
    const start = 1_700_000_000_000;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const result = await handleContactSubmission(body, { ip: '203.0.113.20', now: start });
      expect(result.status).toBe(200);
    }

    const blocked = await handleContactSubmission(body, { ip: '203.0.113.20', now: start + 1000 });
    expect(blocked.status).toBe(429);
    expect(typeof blocked.retryAfter).toBe('number');
    expect(fetchMock.mock.calls.length).toBe(5);

    const later = await handleContactSubmission(body, {
      ip: '203.0.113.20',
      now: start + 60_000,
    });
    expect(later.status).toBe(200);
    expect(fetchMock.mock.calls.length).toBe(6);
  });
});
