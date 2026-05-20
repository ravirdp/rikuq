# Affiliate Programs — signup checklist

Sign up for these before publishing posts that mention them. Use a dedicated email (e.g., affiliates@rikuq.com or a Gmail alias) so payout notifications don't get lost.

## Tier 1 — sign up first (highest ROI)

| Program | URL | Commission (typical) | Notes |
|---|---|---|---|
| Cursor (Anysphere) | cursor.com (check footer) | Verify — they had a referral program; commercial affiliate program in flux | Reach out direct if no public program |
| Vercel Partners | vercel.com/partners | Variable (referral credits + revenue share for Pro/Enterprise) | Apply as a content creator |
| Supabase | supabase.com/partners | Referral credits / paid program for verified partners | Useful for stack picker + tutorials |
| Cloudflare | cloudflare.com/partners | Mostly enterprise-facing; consider OptinMonster-style links via affiliate networks | |
| Stripe | stripe.com/partners | Verified partner program for content/agencies | |
| Clerk | clerk.com (check) | Reach out direct — they've done content partnerships | |
| Resend | resend.com (check) | Reach out direct — newer; founders responsive | |
| Replit | replit.com (check) | Has had affiliate / education programs | |
| OpenRouter | openrouter.ai (check) | Worth asking; you're in their adjacent category via Prism | |
| Upstash | upstash.com | Has had referral programs; check current state | |
| Railway | railway.app (check) | Referral credit historically; check current | |

## Tier 2 — sign up second

| Program | URL | Notes |
|---|---|---|
| Anthropic | anthropic.com — check for partner programs around Claude Code / API | Brand-aligned, even if no direct affiliate |
| Linear | linear.app/partners | If covering project management for solo founders |
| Notion | notion.so/affiliates | If covering note-taking / docs for builders |
| Beehiiv | beehiiv.com/grow | If covering newsletter tooling |
| ConvertKit | convertkit.com/affiliate | Same |
| Tailscale | tailscale.com (check) | If covering ops / networking |
| Posthog | posthog.com | If covering analytics |
| Plausible | plausible.io | Referral credit only typically |
| GitHub | (no affiliate, but Education program) | |

## Setup once

- [ ] Wise multi-currency USD account (you likely have)
- [ ] Payoneer (some programs prefer this) — backup
- [ ] W-8BEN form filled — many US programs require this for non-US affiliates. One signed PDF, reused everywhere.
- [ ] PAN card scan ready (Indian tax)
- [ ] Domain-verified email (affiliates@rikuq.com) — looks professional, less spam-flagged
- [ ] Tracking spreadsheet: program name, login URL, affiliate ID, % commission, payment threshold, payout method, last payout date

## Affiliate link conventions

Store all affiliate IDs in `.env` as `AFFID_*`. Build a tiny utility (`src/lib/affiliate.ts`) so links are constructed centrally — when an ID changes, change one place.

Example pattern:

```ts
// src/lib/affiliate.ts
export const affiliateUrl = (program: string, path?: string) => {
  const ids: Record<string, string> = {
    vercel: import.meta.env.AFFID_VERCEL ?? '',
    supabase: import.meta.env.AFFID_SUPABASE ?? '',
    // ...
  };
  const id = ids[program];
  const base = {
    vercel: 'https://vercel.com',
    supabase: 'https://supabase.com',
  }[program];
  if (!base) return '#';
  const url = new URL(path ?? '/', base);
  if (id) url.searchParams.set('ref', id);
  url.searchParams.set('utm_source', 'rikuq');
  return url.toString();
};
```

Then in MDX: `[Vercel](rkuq://vercel/pricing)` — or just use the helper in components.

## When you don't have a program yet

Link directly without referral params. Don't block publishing on signup. Just make sure you can swap to affiliate URLs centrally when the program is ready.
