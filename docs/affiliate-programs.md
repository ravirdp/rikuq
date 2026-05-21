# Affiliate Programs — corrected reality (2026-05-21)

Last updated after verifying actual program availability. Most "obvious" affiliate programs for the AI/dev tooling space don't pay content creators in 2026 — see "No public affiliate" tier below.

Use a dedicated email (`affiliates@rikuq.com` once set up) so payout notifications don't get lost.

## Status legend

- ✅ **Live** — program exists, accepting applications, pays cash
- ⏳ **Pending** — applied, awaiting approval
- ❌ **No public affiliate** — recommend organically; can't monetize
- 🤝 **B2B partner only** — agency/reseller programs, not for content creators

## Tier 1 — sign up first (real revenue)

| Program | URL | Status | Commission | Notes |
|---|---|---|---|---|
| **Brevo** | brevo.com/affiliate | ⏳ pending review | Per paid signup + rev share | Applied; we actively use Brevo for rikuq newsletter |
| **Resend** | resend.com/insiders | ⏳ pending (Insiders application) | TBD on approval | Application has open-text fields; copy in this repo's notes |
| **Clerk** | clerk.com → footer / direct outreach | ✅ to apply | Per paid signup | Apply via direct contact; they've done content partnerships |
| **OpenRouter** | openrouter.ai dashboard → referral | ✅ to apply | Credits, not cash | Useful for AI infra content; lower revenue priority |
| **Razorpay Partners** | razorpay.com/partners | ✅ to apply | Per merchant onboarded | India angle; BatchWise-adjacent content |
| **DataForSEO** | dataforseo.com (partner) | ✅ to apply | Rev share | Citare-adjacent content |

## Tier 2 — apply when relevant content is queued

| Program | URL | Status | Notes |
|---|---|---|---|
| Notion | notion.so/affiliates | ✅ open | If covering solo-founder docs/note workflow |
| ConvertKit | convertkit.com/affiliate | ✅ open | If newsletter content gets deeper |
| Beehiiv | beehiiv.com/grow | ✅ open | Same |
| PostHog | posthog.com | ✅ open | Analytics content angle |
| Linear | linear.app/partners | ✅ open | Project management content angle |

## ❌ No public affiliate (recommend organically, no payout)

These products are in our content but don't pay content creators. Mention them honestly without affiliate links — they actually become *stronger* trust signals when readers see they're recommended without commission.

- **Anthropic** (Claude, Claude Code, Claude Max plans) — no public affiliate
- **Cursor** (Anysphere) — no public affiliate; verified May 2026
- **Antigravity** — too early, no program
- **Windsurf** — no public program
- **GitHub Copilot** — no consumer affiliate
- **Google / Gemini** — no content-creator affiliate

## 🤝 B2B partner only (NOT for content creators)

These have partner programs that look like affiliate programs but are actually agency/reseller tracks requiring legal entity, finance contact, authorized signer, etc. **Do not waste a session filling them out as a content creator** — they won't pay you for blog referrals.

- **Cloudflare** (`partners.cloudflare.com`) — channel/distribute/resell/consult only
- **Vercel Partners** — agency program
- **Supabase Partners** — agency program
- **Stripe Partners** — agency / integration partner program

## Setup once

- [ ] Wise multi-currency USD account (likely already done)
- [ ] Payoneer — backup for programs that prefer it
- [ ] W-8BEN form filled (single signed PDF, reused everywhere — US programs require it for non-US affiliates)
- [ ] PAN card scan ready (Indian tax)
- [ ] Dedicated email (`affiliates@rikuq.com` via Cloudflare Email Routing → forwards to `ravirdp@gmail.com`)
- [ ] Tracking spreadsheet: program name, login URL, affiliate ID, commission %, payment threshold, payout method, last payout date

## Affiliate link conventions

Store all affiliate IDs in `.env` as `AFFID_*`. Build a tiny utility (`src/lib/affiliate.ts`) so links are constructed centrally — when an ID changes, change one place.

```ts
// src/lib/affiliate.ts
export const affiliateUrl = (program: string, path?: string) => {
  const ids: Record<string, string> = {
    brevo: import.meta.env.AFFID_BREVO ?? '',
    resend: import.meta.env.AFFID_RESEND ?? '',
    clerk: import.meta.env.AFFID_CLERK ?? '',
    openrouter: import.meta.env.AFFID_OPENROUTER ?? '',
    razorpay: import.meta.env.AFFID_RAZORPAY ?? '',
  };
  const id = ids[program];
  const bases: Record<string, string> = {
    brevo: 'https://www.brevo.com',
    resend: 'https://resend.com',
    clerk: 'https://clerk.com',
    openrouter: 'https://openrouter.ai',
    razorpay: 'https://razorpay.com',
  };
  const base = bases[program];
  if (!base) return '#';
  const url = new URL(path ?? '/', base);
  if (id) url.searchParams.set('ref', id);
  url.searchParams.set('utm_source', 'rikuq');
  return url.toString();
};
```

## When you don't have an ID yet

Link directly without referral params. Don't block publishing on signup. Just make sure you can swap to affiliate URLs centrally when the program is approved.

## Per-property affiliate guidance

When writing about products on these properties, use this matrix:

| Property of mine | Mentioned in articles? | Affiliate? | Pattern |
|---|---|---|---|
| **Prism / Ssimplifi** | Often | n/a (own product) | Direct link to ssimplifi.com with UTM `utm_source=rikuq` |
| **Citare** | Often | n/a (own product) | Direct link with `utm_source=rikuq` |
| **BatchWise** | Occasionally | n/a (own product) | Direct link with `utm_source=rikuq` |
