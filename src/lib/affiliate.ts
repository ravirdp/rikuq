// Centralized affiliate-link builder.
//
// Add/edit a single program here when an ID changes or a new program is wired.
// All articles should construct links via `affiliateUrl(...)`, never hardcoding
// affiliate IDs in MDX or components.
//
// Usage:
//   affiliateUrl('customgpt')                  → https://customgpt.ai/?fpr=ravi52&utm_source=rikuq
//   affiliateUrl('dataforseo')                 → https://dataforseo.com/?aff=275223&utm_source=rikuq
//   affiliateUrl('dataforseo', '/pricing')     → https://dataforseo.com/pricing?aff=275223&utm_source=rikuq
//   affiliateUrl('dataforseo-connector')       → https://dataforseo.com/google-sheets-connector?connector_aff=275223&utm_source=rikuq
//   affiliateUrl('brevo')                      → https://www.brevo.com/?<param>=<id>&utm_source=rikuq (once ID lands)

interface ProgramConfig {
  /** Base URL of the program — the host. */
  base: string;
  /** Affiliate ID query param name (varies per program). */
  param: string;
  /** Hardcoded affiliate ID. Some programs let us publish IDs in source (Impact-style); for those that don't, leave undefined and source from env. */
  id?: string;
  /** Env var name to read the affiliate ID from if not hardcoded. */
  envVar?: string;
  /** Default path if caller doesn't override. */
  defaultPath?: string;
}

const PROGRAMS: Record<string, ProgramConfig> = {
  // ✅ Live
  customgpt: {
    base: 'https://customgpt.ai',
    param: 'fpr',
    id: 'ravi52',
  },
  dataforseo: {
    base: 'https://dataforseo.com',
    param: 'aff',
    id: '275223',
  },
  'dataforseo-app': {
    base: 'https://app.dataforseo.com',
    param: 'aff',
    id: '275223',
  },
  'dataforseo-connector': {
    base: 'https://dataforseo.com',
    param: 'connector_aff',
    id: '275223',
    defaultPath: '/google-sheets-connector',
  },

  // ⏳ Pending (ID will be hydrated from env once approved)
  brevo: {
    base: 'https://www.brevo.com',
    param: 'tap_a', // Tapfiliate-style param; confirm on approval
    envVar: 'AFFID_BREVO',
  },
  resend: {
    base: 'https://resend.com',
    param: 'via',
    envVar: 'AFFID_RESEND',
  },

  // 🔁 Retry — placeholder so links don't break, ID hydrated when ready
  razorpay: {
    base: 'https://razorpay.com',
    param: 'partner_id',
    envVar: 'AFFID_RAZORPAY',
  },
};

/**
 * Build a referral-tracked affiliate URL with consistent UTM tagging.
 *
 * If the affiliate ID is not yet known (program pending), returns the bare
 * base URL with UTM only — so the link still works editorially, just without
 * commission attribution.
 */
export function affiliateUrl(
  program: string,
  path?: string,
  extraParams?: Record<string, string>
): string {
  const cfg = PROGRAMS[program];
  if (!cfg) {
    console.warn(`[affiliate] Unknown program: ${program}`);
    return '#';
  }

  // Resolve the affiliate ID: hardcoded > env > none.
  const id =
    cfg.id ??
    (cfg.envVar ? (import.meta.env[cfg.envVar] as string | undefined) : undefined);

  const url = new URL(path ?? cfg.defaultPath ?? '/', cfg.base);

  if (id) url.searchParams.set(cfg.param, id);
  url.searchParams.set('utm_source', 'rikuq');

  if (extraParams) {
    for (const [k, v] of Object.entries(extraParams)) {
      url.searchParams.set(k, v);
    }
  }

  return url.toString();
}

/** True if the program has a live affiliate ID right now. Useful for conditionally rendering badges. */
export function hasAffiliateId(program: string): boolean {
  const cfg = PROGRAMS[program];
  if (!cfg) return false;
  if (cfg.id) return true;
  if (cfg.envVar && import.meta.env[cfg.envVar]) return true;
  return false;
}
