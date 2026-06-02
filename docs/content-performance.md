# Content Performance Tracker

First real per-post signal we have. GA4 just came online (Jun 1) but is
Direct-dominated; Dev.to gives clean per-post view counts. We log Dev.to
numbers here manually (no API for the dashboard stats) to see what performs,
then concentrate distribution effort on winners.

**Strategy shift (2026-06-02):** No Medium API token available, so automated
crosspost expansion is dead. Instead — **Dev.to (auto) + Medium (manual) for
the top 5 performers only.** Stop spreading thin across platforms; double down
on proven posts.

---

## Dev.to view snapshot — 2026-06-02

Dashboard totals: **614 views · 29 comments · 3 reactions · 33 posts**

### rikuq-era posts (canonical = rikuq.com)

| Post | Dev.to views | Comments | Published |
|---|---|---|---|
| **Portkey vs Helicone vs LiteLLM vs OpenRouter** | **76** | **24** | May 25 |
| **Claude Code Review 2026** | 61 | 0 | May 22 |
| **Claude Code Hooks vs Skills** | 38 | 0 | May 27 |
| **What is LLM FinOps** | 27 | 2 | May 25 |
| GEO vs SEO in 2026 | <25 | 0 | May 25 |
| The Four-Index Reality | <25 | 0 | May 25 |
| Cursor Review 2026 | <25 | 0 | May 25 |
| Windsurf Review 2026 | <25 | 0 | May 25 |
| Cursor vs Claude Code 2026 | <25 | 0 | May 25 |
| Hello from rikuq | <25 | 0 | May 25 |
| Citare V2 in 12 Days | <25 | 0 | May 25 |
| Production Stack $5/Month | <25 | 0 | May 25 |
| AI Search Visibility Tools | <25 | 0 | May 29 |
| 11 finops migration articles | <25 each | 0 | May 31-Jun 1 (too new) |
| Indian AI Search Audit | (crossposts Jun 2) | — | — |

### Prism-era posts (non-rikuq canonical — don't count for us, but informative)

| Post | Dev.to views | Note |
|---|---|---|
| How I Cut My AI API Costs by 40% | 82 | longest live (Apr 7); cost/numbers angle |
| There Is No Best AI Model in 2026 | 64 | Apr 9 |
| The Merging Take Is Too Early | <25 | Apr 17 |

---

## What the data says

1. **Comparison / "vs" content wins.** Portkey vs Helicone (76 views, 24
   comments) is the clear #1. Cursor vs Claude Code also in the set. The
   "honest comparison of N tools" format travels on Dev.to.
2. **"How I cut cost / real numbers" content wins.** API Costs 40% (82),
   $5/month stack. Concrete-number founder content pulls.
3. **The Portkey post is the engagement anchor** — 24 comments (the
   Argon/Void gateway-attribution threads). Gateway/FinOps infra is the
   strongest wedge. The new finops cluster is betting on this; too early to
   read (all <25, posted Jun 1).
4. **Reviews underperform comparisons.** Individual tool reviews (Cursor,
   Windsurf, Copilot) sit at <25; the comparisons that synthesize them do
   better. Lesson: lead with comparisons, link to reviews.

---

## Top 5 → Medium (manual) target

Push these to Medium via import-from-URL (auto-sets canonical to rikuq).
Picked for proven Dev.to performance + strategic value:

| # | Post | Why |
|---|---|---|
| 1 | Portkey vs Helicone vs LiteLLM vs OpenRouter | Proven #1 (76 views, 24 comments) |
| 2 | Claude Code Review 2026 | Cornerstone, 61 views |
| 3 | What is LLM FinOps | FinOps cluster anchor; Medium's finance/eng audience fits |
| 4 | Claude Code Hooks vs Skills | Solid (38), evergreen Claude Code topic |
| 5 | Indian AI Search Audit | The flagship original research — Medium amplifies research |

Medium workflow per post (~3-5 min): medium.com → New story → Import a
story → paste rikuq URL → auto-canonical → review formatting → publish →
submit to BetterProgramming + Level Up Coding publications.

UTM for any in-body rikuq links: `node scripts/utm.mjs <slug> medium`

---

## Re-measure cadence

Update the Dev.to snapshot weekly (Mondays). Watch:
- Does the finops cluster break >25 views as it ages? (validates the wedge bet)
- Does Medium drive measurable rikuq traffic? (check GA4 utm_source=medium)
- Which top-5 Medium posts get publication pickup (BP / LUC)?
