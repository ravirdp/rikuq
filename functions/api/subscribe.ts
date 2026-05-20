// Cloudflare Pages Function — POST /api/subscribe
//
// Subscribes an email via Brevo's double opt-in flow. The contact only lands in
// BREVO_LIST_ID after the user clicks the confirmation link in the DOI email.
//
// Required env vars (set in Cloudflare Pages dashboard):
//   BREVO_API_KEY              v3 API key from Brevo
//   BREVO_LIST_ID              numeric list ID where confirmed subscribers land
//   BREVO_DOI_TEMPLATE_ID      numeric template ID for the DOI email
//   BREVO_REDIRECT_URL         post-confirmation URL (defaults to /newsletter/confirmed)

interface Env {
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
  BREVO_DOI_TEMPLATE_ID: string;
  BREVO_REDIRECT_URL?: string;
}

const json = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: { 'content-type': 'application/json', ...(init.headers ?? {}) },
  });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.BREVO_API_KEY || !env.BREVO_LIST_ID || !env.BREVO_DOI_TEMPLATE_ID) {
    return json({ ok: false, error: 'Newsletter not configured.' }, { status: 500 });
  }

  let email = '';
  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const body = (await request.json().catch(() => ({}))) as { email?: string };
    email = (body.email ?? '').trim().toLowerCase();
  } else {
    const form = await request.formData();
    email = String(form.get('email') ?? '').trim().toLowerCase();
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Invalid email.' }, { status: 400 });
  }

  const u = new URL(request.url);
  const attributes: Record<string, string> = {
    SIGNUP_SOURCE: u.searchParams.get('utm_source') ?? 'rikuq',
    SIGNUP_CAMPAIGN: u.searchParams.get('utm_campaign') ?? 'direct',
    SIGNUP_MEDIUM: u.searchParams.get('utm_medium') ?? 'form',
  };

  const res = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
    method: 'POST',
    headers: {
      'api-key': env.BREVO_API_KEY,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      includeListIds: [Number(env.BREVO_LIST_ID)],
      templateId: Number(env.BREVO_DOI_TEMPLATE_ID),
      redirectionUrl: env.BREVO_REDIRECT_URL ?? 'https://rikuq.com/newsletter/confirmed',
      attributes,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Brevo DOI failed', res.status, text);
    return json({ ok: false, error: 'Subscription failed. Try again later.' }, { status: 502 });
  }

  return json({ ok: true, message: 'Check your inbox to confirm.' });
};
