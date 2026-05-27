# Affiliate Programs — corrected reality (2026-05-21, updated 21:30 IST)

Last updated after live signup attempts. Most "obvious" affiliate programs for the AI/dev tooling space don't pay content creators in 2026 — see "No public affiliate" tier below.

Use `ravi@rikuq.com` once set up so payout notifications don't get lost.

## Status legend

- ✅ **Live** — approved, ID in `.env`, links wired
- ⏳ **Pending** — applied, awaiting approval
- 🔁 **Retry** — signup failed; try again later
- ❌ **No public affiliate** — recommend organically; can't monetize
- 🤝 **B2B partner only** — agency/reseller programs, not for content creators

## Tier 1 — sign up first (real revenue)

| Program | URL | Status | Commission (typical) | Notes |
|---|---|---|---|---|
| **Brevo** | get.brevo.com/kemgc2nzgwfd | ✅ live (verified 2026-05-27) | Validation AC $0/NPC $100; Pilot 1-4 NPC/mo AC $5/NPC $100 | Via PartnerStack. Must refer 1+ paying client to unlock higher tiers. Wired in `affiliate.ts` as full-URL pattern. |
| **Resend** | resend.com/insiders | ⏳ pending (Insiders application) | TBD on approval | Application has open-text fields; copy in this repo's notes |
| **CustomGPT.ai** | customgpt.ai (fpr=ravi52) | ✅ live (tiers confirmed 2026-05-27) | 0-25 customers: 15% / 2yr (30-day cookie); 26-55: 18%; 56+: 20% / 2yr (60-day cookie). **Bonus: $1500 for 20+ referrals in a month.** | Useful for chatbot / RAG content angle. Already wired. |
| **DataForSEO** | dataforseo.com (partner) | ✅ enrolled | Rev share | Citare-adjacent content; we already use it inside Citare |
| **Cal.com** | refer.cal.com | ✅ enrolled | Recurring | Open-source scheduling. Fits founder-ops / Stack content. |
| **Tally** | tally.cello.so | ✅ enrolled | Recurring + reader discount | Form builder. Referred users get a discount, we get commission. Fits Stack content. |
| **Razorpay Partners** | razorpay.com/partners | 🔁 retry afternoon | Per merchant onboarded | India angle; BatchWise-adjacent content |
| **Clerk** | clerk.com | ❌ no public affiliate | — | Confirmed — no public program in 2026 |
| **OpenRouter** | openrouter.ai | ❌ no public affiliate | — | Confirmed — no public program in 2026 |

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
- **Clerk** — no public affiliate (was rumored to have one, confirmed they don't)
- **OpenRouter** — no public affiliate

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
- [ ] Dedicated email (`ravi@rikuq.com` via Cloudflare Email Routing → forwards to `ravirdp@gmail.com`)
- [ ] Tracking spreadsheet: program name, login URL, affiliate ID, commission %, payment threshold, payout method, last payout date

## Affiliate link conventions

Store all affiliate IDs in `.env` as `AFFID_*`. Build a tiny utility (`src/lib/affiliate.ts`) so links are constructed centrally — when an ID changes, change one place.

```ts
// src/lib/affiliate.ts
export const affiliateUrl = (program: string, path?: string) => {
  const ids: Record<string, string> = {
    brevo: import.meta.env.AFFID_BREVO ?? '',
    resend: import.meta.env.AFFID_RESEND ?? '',
    customgpt: import.meta.env.AFFID_CUSTOMGPT ?? '',
    dataforseo: import.meta.env.AFFID_DATAFORSEO ?? '',
    razorpay: import.meta.env.AFFID_RAZORPAY ?? '',
  };
  const id = ids[program];
  const bases: Record<string, string> = {
    brevo: 'https://www.brevo.com',
    resend: 'https://resend.com',
    customgpt: 'https://customgpt.ai',
    dataforseo: 'https://dataforseo.com',
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
