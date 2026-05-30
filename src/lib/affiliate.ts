// Centralized affiliate-link builder.
//
// Add/edit a single program here when an ID changes or a new program is wired.
// All articles should construct links via `affiliateUrl(...)`, never hardcoding
// affiliate IDs in MDX or components.
//
// Two patterns supported:
//
// 1) Query-param referrals (most programs): base URL + ?param=id
//    affiliateUrl('customgpt') → https://customgpt.ai/?fpr=ravi52&utm_source=rikuq
//    affiliateUrl('dataforseo', '/pricing') → https://dataforseo.com/pricing?aff=275223&utm_source=rikuq
//
// 2) Full-URL referrals (Cal.com, Tally, others on Cello/similar): the entire
//    referral URL is provided by the program. We just append UTM tracking.
//    affiliateUrl('cal') → https://refer.cal.com/ravi-patel-rips6a-311w?utm_source=rikuq
//    affiliateUrl('tally') → https://tally.cello.so/mV8i3HuZnbP?utm_source=rikuq

interface ProgramConfig {
  /**
   * Full referral URL for programs that issue an entire dedicated link
   * (Cal.com, Tally via Cello, FirstPromoter-style programs).
   * When present, takes precedence over the base/param/id pattern.
   */
  refUrl?: string;
  /** Base URL of the program — the host. Required when refUrl is not set. */
  base?: string;
  /** Affiliate ID query param name (varies per program). */
  param?: string;
  /** Hardcoded affiliate ID. */
  id?: string;
  /** Env var name to read the affiliate ID from if not hardcoded. */
  envVar?: string;
  /** Default path if caller doesn't override. */
  defaultPath?: string;
  /** Optional human note for ourselves about the program. */
  note?: string;
}

const PROGRAMS: Record<string, ProgramConfig> = {
  // ✅ Live — query-param pattern
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

  // ✅ Live — full-URL pattern
  cal: {
    refUrl: 'https://refer.cal.com/ravi-patel-rips6a-311w',
    note: 'Cal.com — open-source scheduling. Referred users get a Cal benefit; we get recurring commission.',
  },
  tally: {
    refUrl: 'https://tally.cello.so/mV8i3HuZnbP',
    note: 'Tally — form builder. Referred users get a discount; we get recurring commission. Cello-hosted referral.',
  },

  // ✅ Live — full-URL pattern (PartnerStack-hosted referral, verified 2026-05-27)
  brevo: {
    refUrl: 'https://get.brevo.com/kemgc2nzgwfd',
    note: 'Brevo — PartnerStack-hosted referral. Tiers: Validation AC $0/NPC $100; Pilot 1-4 NPC/mo AC $5/NPC $100. Must refer 1+ paying client to unlock higher tiers.',
  },

  // ⏳ Pending (ID will be hydrated from env once approved)
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
 *
 * For full-URL programs (Cal, Tally, etc.), the path and extraParams args
 * are appended as URL params on top of the refUrl. Useful for programs that
 * support deep-linking with extra query state.
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

  // Full-URL pattern (Cal, Tally, etc.) — return the refUrl with UTM appended.
  // Ignores path arg since the refUrl is a complete referral destination.
  if (cfg.refUrl) {
    const url = new URL(cfg.refUrl);
    url.searchParams.set('utm_source', 'rikuq');
    if (extraParams) {
      for (const [k, v] of Object.entries(extraParams)) {
        url.searchParams.set(k, v);
      }
    }
    return url.toString();
  }

  // Query-param pattern — build from base + path + ref param + UTM.
  if (!cfg.base || !cfg.param) {
    console.warn(`[affiliate] Program ${program} has neither refUrl nor base+param`);
    return '#';
  }

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

/** True if the program has a live referral target right now. */
export function hasAffiliateId(program: string): boolean {
  const cfg = PROGRAMS[program];
  if (!cfg) return false;
  if (cfg.refUrl) return true;
  if (cfg.id) return true;
  if (cfg.envVar && import.meta.env[cfg.envVar]) return true;
  return false;
}
