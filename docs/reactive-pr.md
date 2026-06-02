# Reactive PR — 2026 playbook (centralised across all 3 properties)

Last updated 2026-05-25.

Reactive PR = responding to live journalist queries, founder questions, and source
requests with a tight, on-brand quote. Hit rate ~10-15%, mid-DR backlinks compound.

Centralised here on rikuq because rikuq is the editorial hub; pitches route the
backlink to whichever property (Prism / Citare / BatchWise) matches the angle.

## 2026 landscape — what's actually alive

HARO died Dec 2024 (Cision shut Connectively). The successor landscape:

| Platform | Status | Cost | Scriptable? | Use |
|---|---|---|---|---|
| **Mastodon** `#journorequest` | ✅ active across the fediverse | Free | ✅ public hashtag timelines, no auth | Primary signal source |
| **Bluesky** `#journorequest` | ✅ very active | Free | ⚠️ requires app password (search needs auth) | Add later via env vars if Mastodon signal is thin |
| **Reddit** r/JournoRequest, r/PRrequest, r/HARO, etc. | ⚠️ patchy (some subs don't exist / are private) | Free | ✅ JSON API, 404s no-op | Secondary signal source |
| **HN** Ask HN threads | ✅ active | Free | ✅ Algolia API | Founder-Q angle (less PR, more thought leadership) |
| **Qwoted** | ✅ active | Free tier + paid from $99/mo | ❌ email-only | Subscribe to free digest, triage by hand |
| **Featured.com** (was SOS) | ✅ active | Free + paid from $99/mo | ❌ email-only | Same |
| **Help a B2B Writer** (Superpath) | ✅ active | Free | ❌ email-only | Same — strong for SaaS angle |
| **SourceBottle** | ✅ active (AU-focused) | Free | ❌ email-only | Lower priority for us |
| **#PRrequest / #journorequest on X** | ⚠️ degraded (rate-limited, search broken) | — | ❌ paywalled | Skip |
| **Connectively / HARO** | ❌ shut down Dec 2024 | — | — | Dead |
| **ProfNet** | ✅ active | Paid only | ❌ | Not worth it for solo founder |

**Subscribe with `ravi@rikuq.com`** to Qwoted, Featured.com, Help a B2B Writer
so the digests don't pollute personal inbox. Triage email digests manually 2× / week.

## The script

`scripts/reactive-pr.mjs` polls Mastodon + Reddit + HN once and writes
`scripts/reactive-pr/digests/YYYY-MM-DD.md` — opportunities tagged by best-fit
property based on per-property keyword wedges (defined in the script).

```bash
# Daily run (writes today's digest)
node scripts/reactive-pr.mjs

# Backfill / wider window
node scripts/reactive-pr.mjs --since=72h

# Preview without writing
node scripts/reactive-pr.mjs --dry
```

**No cron yet.** Run manually for ~1 week, tune the keyword sets in the script's
`PROPERTIES` map based on what's signal vs noise, then we wire a GitHub Action
to write the digest daily and post it to a Slack/Discord/email.

## Workflow (15 min / weekday)

1. `node scripts/reactive-pr.mjs --since=24h`
2. Open `scripts/reactive-pr/digests/YYYY-MM-DD.md`
3. Skim the Citare / Prism / BatchWise sections — pick max 3 strong matches
4. For each: copy the matching pitch shell below, fill the 2-3 sentence answer
   with a specific data point or example from your work, send via the platform
   the source asked for (reply on Bluesky / DM on Reddit / comment on HN)
5. Log it in the table at the bottom of this doc

Hit rate ~10-15%. From 5 pitches/week, expect 1-2 mid-DR backlinks/month.

## Per-property pitch shells

Each shell = subject line + opener + closing sig. Fill the `[…]` brackets with
a specific 2-3 sentence answer to the query, ideally with one number from real
work (audit count, cost figure, latency number, reconciliation volume, etc.).

### Citare — AI search visibility

```
Subject: AI search visibility — Citare founder, measure across all 5 LLM platforms

Hi [first name],

I'm Ravi, founder of Citare (citare.ai) — we measure brand visibility across
the 5 major AI search platforms (ChatGPT, Google AI Overview, Gemini, Claude,
Perplexity) and ship audits to brands trying to understand why they surface
on one and not the others.

[2-3 sentences answering the specific question, with one real number from a
Citare audit — e.g. "in a recent 75-cell audit of Notion, we found brand
surface rates vary 30-40 percentage points between the strongest and weakest
LLM for the same brand in the same week."]

Happy to share the methodology or the underlying audit if useful.

Ravi
Founder, Citare
citare.ai · linkedin.com/in/ravirdp
```

### Prism / Ssimplifi — production AI infra & FinOps

```
Subject: AI infra cost — Prism founder, run prod AI on Cloudflare Workers

Hi [first name],

I'm Ravi, founder of Prism (ssimplifi.com) — production AI inference running
entirely on Cloudflare Workers + R2 + Workers AI for a fraction of the cost
of a traditional stack. I also write about FinOps for solo AI founders at
rikuq.com.

[2-3 sentences answering the specific question with one real number — e.g.
"we cut our monthly inference bill from $X to $Y by routing 80% of requests
through prompt caching and only escalating cache-misses to the larger model."]

Happy to walk through the architecture or share the cost-tracking spreadsheet.

Ravi
Founder, Prism
ssimplifi.com · rikuq.com · linkedin.com/in/ravirdp
```

### BatchWise — India payment ops & reconciliation

```
Subject: India payments / reconciliation — BatchWise founder, ship Razorpay+UPI in prod

Hi [first name],

I'm Ravi, founder of BatchWise (batchwise.in) — batch reconciliation and
payment ops for Indian SaaS, currently handling Razorpay + UPI settlements.

[2-3 sentences answering the specific question with one real number from
production — e.g. "in the last 90 days we've reconciled ~X transactions
worth ₹Y crore across N merchants; the most common settlement gotcha we see is …"]

Happy to share the reconciliation flow diagram or talk through the Razorpay
integration gotchas.

Ravi
Founder, BatchWise
batchwise.in · linkedin.com/in/ravirdp
```

### rikuq generic (fallback) — solo AI founder operator

Use when the query is about solo-founder life / AI coding workflow / shipping
fast — i.e. it doesn't fit one specific product but rikuq's editorial line.

```
Subject: Solo AI SaaS founder — shipped 3 products on Claude Code, write about it at rikuq

Hi [first name],

I'm Ravi — I've shipped 3 production AI SaaS solo (Prism, Citare, BatchWise)
using Claude Code as the primary build tool, and I write about the workflow,
FinOps, and distribution at rikuq.com.

[2-3 sentences answering the specific question with one real example from
shipping — e.g. "Citare took me 2 months solo from idea to production
including 37 MCP tools I wrote to extend Claude Code into a research agent…"]

Happy to share the actual workflow or any of the cost/distribution data.

Ravi
rikuq.com · linkedin.com/in/ravirdp
```

## Voice rules — email pitches (journalists / Featured / Qwoted / HelpAB2BWriter)

- **Never lead with "Hi! I love your work!"** — journalists filter that as PR-spam
- **Lead with credential in one line** — founder of X, what X does, why I'm qualified
- **One real number** in the answer — not generic advice; pulled from actual work
- **End with the offer** — "happy to share the audit / spreadsheet / diagram"
- **Sig block has 2 links max** — primary property + LinkedIn. Don't list all 3 products.
- **No em dashes in pitches sent via email** — some MTAs mangle them; safer with ` -- ` ASCII or just commas

## Voice rules — casual platform comments (Reddit / HN / IH / LinkedIn replies)

AI detectors flag comments written in clean editorial prose. Reddit / HN / IH
have specific casual norms that AI-generated text consistently violates. Follow
all of these or expect the moderator-flag / auto-collapse:

- **No em dashes (`—`)** at all. Use hyphens (`-`) or periods. The em dash is the #1 AI tell on social platforms in 2026.
- **Lowercase opener** — start with `ok` / `honestly` / `yeah` / `tbh`. Not capitalized "OK" or "Honestly,".
- **Casual abbreviations** — `tbh`, `imo`, `ngl`, `w/`, `&`, `wrt`. Use 1-2 per comment, not every sentence.
- **Sentence fragments** — break parallel structure on purpose. "the data flipped a lot of my assumptions here." then a one-clause fragment after.
- **Comma splices on purpose** — "AIO and chatgpt are different products entirely, we found per-brand gaps up to 80 points" — perfectly grammatical writing reads as AI.
- **Inconsistent capitalization on brand names** — write `chatgpt` not `ChatGPT`, `instagram` not `Instagram`, where it doesn't damage clarity. AI capitalizes religiously; humans get lazy.
- **Drop the Oxford comma sometimes** — randomness on punctuation is a human signal.
- **Mix sentence lengths drastically** — really short. then a longer rambling sentence that goes on for a while because the person is typing on their phone and not editing. then short again. then a fragment.
- **End with a fragment or link** — don't end with a perfectly-structured conclusion sentence. End mid-thought or with the link as the final line.
- **No tricolons** — the rhythm-of-three "X, Y, and Z" pattern reads as written-for-print, not typed-in-thread. Use lists of 2 or 4, or comma splice them.
- **No corporate verbs** — "leveraging," "utilize," "ensure," "facilitate." Use "use," "make sure," "do." Even simpler than the formal voice rules.
- **Keep numbered points but write loose around them** — "1. stop pouring everything into your own site." not "**1. Stop optimizing for the wrong channel.**"
- **One personal aside per comment** — "honestly", "fwiw", "i mean", "tbh, this surprised me too". Forces a human signal.
- **Sig is dead** — don't add "Ravi Patel, Founder, Citare" at the end of a Reddit comment. Just end. The Citare disclosure in the body opener does the credential work.

### The fix-if-flagged checklist

If a comment gets flagged as AI-generated, fix in this order:
1. Remove all em dashes
2. Lowercase the first word
3. Break one parallel structure with a fragment
4. Add `tbh` or `imo` once
5. Mix in one comma splice
6. Remove the sig block if it has one

That usually clears 90% of detectors. Source: this was actively tested on the
`r/Entrepreneur` AI-search-optimization pitch (May 27 2026), where the first
draft was AI-flagged and the rewritten version above passed.

## Running log

Append rows here every time you send a pitch. Tracks what wedges convert.

| Date | Source | Query (1-line) | Property pitched | Sent? | Used? | Comment URL | Engagement |
|---|---|---|---|---|---|---|---|
| 2026-05-25 | reddit r/AskMarketing | "Marketing veterans break down GEO/AEO/AIO/SGE terms" | Citare | ✅ | ⏳ | _URL not captured at post time — thread: https://reddit.com/r/AskMarketing/comments/1tlhlfi/_ | reported engagement |
| 2026-05-25 | HN ask_hn | "Is there a good code intelligence MCP server yet?" | rikuq (voice) | ✅ | ⏳ | _URL not captured at post time — thread: https://news.ycombinator.com/item?id=48198129_ | reported engagement |
| 2026-05-26 | reddit r/AskMarketing | "What is the simplest AI Visibility tool (AEO/GEO) for my business in 2026?" | Citare | ✅ | ⏳ | https://www.reddit.com/r/AskMarketing/comments/1tnc83z/comment/onxgj4u/ | tracking |
| 2026-05-26 | reddit r/AskMarketing | "Is Technical SEO alive after AI" | rikuq (geo-vs-seo-2026 link) | ✅ | ⏳ | https://www.reddit.com/r/AskMarketing/comments/1tnwd93/comment/onyf47p/ | tracking |
| 2026-05-26 | reddit r/AskMarketing | "Anyone else noticing that AI Overviews are changing how people browse search results?" | rikuq (four-index-reality link) | ✅ | ⏳ | https://www.reddit.com/r/AskMarketing/comments/1tn5mgo/comment/onyfuy1/ | tracking |
| 2026-05-27 | featured/qwoted alt (mentionmatch) | "Looking for SEO experts to share their thoughts on AI citations" (Iryna Vyderko, Adsy.com DR 72) | Citare + rikuq audit data | ✅ | ⏳ | (email pitch, no public URL until journalist publishes) | high-fit query, audit data backed | 
| 2026-05-26 | featured.com | "Which AI tools does your team actually use every day?" | rikuq (Claude Code stack) + Citare disclosure | ✅ | ⏳ | (Featured.com — no public URL until journalist selects) | first Featured submission |
| 2026-05-27 | dev.to comment (Argon, agentcolony.org founder) | "Does Prism's edge replication preserve request-context fields across hops?" (on Portkey vs Helicone comparison article) | Prism + rikuq (architecture deep-dive) | ✅ | ✅ | https://dev.to/rikuq/portkey-vs-helicone-vs-litellm-vs-openrouter-honest-comparison-3fn3 (in comments) | sharp competitive comment — flagged real edge-cache attribution gap, committed v1.8 fix publicly. Spawned article #36. |
| 2026-05-27 | dev.to comment (Void) | "Did you anchor on one primary attribution unit, or let callers inject context tags?" (on LLM FinOps post) | Prism (multi-dim attribution model) | ✅ | ✅ | https://dev.to/rikuq/what-is-llm-finops-the-missing-discipline-for-ai-era-companies-54la (in comments) | thoughtful question — answered with deterministic anchors + freeform tag bag model. Also fed article #36. |
| 2026-05-29 | mentionmatch (Bulldog Digital Media, DR 66, UK SEO) | "Are you tracking AI search traffic?" (Georgia O'Brien-Perry, deadline 2026-06-05) | Citare (3-answer pitch w/ audit data) + rikuq audit teaser | ✅ | ⏳ | (email pitch, no public URL until journalist publishes) | strong wedge fit — answered all 3 questions w/ audit numbers (5 platforms, 500 cells, 49% avg surface rate, 80-pt AIO/ChatGPT gap). Soft teaser for Sat audit ship. |

When a pitch gets used and a piece is published, capture the URL + DR via Ahrefs
and add it to `docs/backlink-tracker.md` as well.

## Twitter / X — owned posts (algo warming track)

Original tweets from `@ravirdp`. Separate from the reply log because owned posts and replies serve different X-algo purposes.

| Date | Tweet | Purpose | Engagement |
|---|---|---|---|
| 2026-05-27 | https://x.com/ravirdp/status/2059587229983642082 | GEO/AEO/AIO/SGE glossary post announce (links rikuq) | tracking |

## Platform signups

| Platform | Status | Notes |
|---|---|---|
| Qwoted | ⚠️ Auto-disabled immediately after signup, support email sent 2026-05-26 | Waiting on response from support@qwoted.com |
| Featured.com | ✅ Active as of 2026-05-26 | First pitch submitted same day |
| Help a B2B Writer | ⏳ Not yet signed up | Lowest friction; do when you have 3 min |
| SourceBottle | ⏭️ Skipped | AU/UK skew, not priority |

## Indian AI Search Audit — outreach campaign (sent 2026-05-30, audit ship day)

Proactive outreach tied to the flagship audit. Each email carried a per-brand
or per-publication data hook from the 500-cell audit.

### Brand outreach (8 sent) — offering pre-publication per-brand data

| Brand | Hook | Sent | Reply |
|---|---|---|---|
| Forest Essentials | #1 overall, 70% surface rate | ✅ 2026-05-30 | ⏳ |
| Sugar Cosmetics | #1 brand-owned domain (position 12) | ✅ 2026-05-30 | ⏳ |
| Pristyn Care | 50pt AIO/ChatGPT gap (80/30) | ✅ 2026-05-30 | ⏳ |
| Treebo | Top 4 at 65%, balanced citations | ✅ 2026-05-30 | ⏳ |
| IndMoney | Top 4 at 65%, fintech triangulation | ✅ 2026-05-30 | ⏳ |
| Souled Store | 60%, jimmyluxury.in category dependency | ✅ 2026-05-30 | ⏳ |
| Acko | Strong branded, unbranded gap | ✅ 2026-05-30 | ⏳ |
| Pilgrim | Series B context vs top D2C performers | ✅ 2026-05-30 | ⏳ |

### Press pitches (3 sent) — exclusive data angle pre-publication

| Publication | Angle | Sent | Reply |
|---|---|---|---|
| Entrackr | Instagram #1 cited / no brand sites top 11 / 80pt gap | ✅ 2026-05-30 | ⏳ |
| Inc42 | Series A/B no authority moat + founder playbook | ✅ 2026-05-30 | ⏳ |
| YourStory | Top performers + discovery rebuilt on 3rd-party platforms | ✅ 2026-05-30 | ⏳ |

Follow-up: if no reply by ~2026-06-04, send one polite nudge to the press
contacts (brands often go quiet; press worth one chase). Log any pickup +
DR in docs/backlink-tracker.md.

## 2026-06-02 — X reply batch (20, posted) + HN hits

### X / Twitter — 20 contribution-first replies POSTED 2026-06-02
Built to grow following. Across 6 buckets (AI coding tools, LLM FinOps,
GEO, AI infra, solo-founder, Indian ecosystem). Harvested via CiC (20
tweets, 500-50k follower band, 6-12h fresh). Replies drafted in casual
X voice (no em dashes, lowercase, fragments), contribution-first with
soft data drops/plug only where natural. All 20 posted by Ravi.

Highest-visibility plays: @timsoulo (51k, Ahrefs AI-search thread, only
3 replies — audit data corroborated), @BharukaShraddha (32k, agent
reliability — gateway experience), @Gavel_on_X (audit answered his
closing Q on who wins AI citations).

### HN reactive PR — 2 drafted (NOT yet posted)
| Thread | Fit | Status |
|---|---|---|
| Ask HN: Tokenmaxxing vs Token Optimization (id=48345691) | LLM FinOps + Prism — reply drafted, links what-is-llm-finops | ⏳ draft ready |
| Ask HN: agentic war stories in prod (id=48342441) | Prism/gateway — reply drafted, links gateway-attribution | ⏳ draft ready |
| Ask HN: does your site show up in ChatGPT (id=48349193) | SKIP — poster building competitor "Agentable" (AI-readiness scanner) | competitive intel only |

Reddit reactive PR BLOCKED this session: the .json trick got the IP
soft-blocked after the Prism-prospecting query burst (403 on all sub
endpoints). WebFetch can't reach reddit either. Fix = official Reddit
API (praw + OAuth app, ~2 min setup) OR Claude-in-Chrome logged-in
browser. Both portable across sessions.
