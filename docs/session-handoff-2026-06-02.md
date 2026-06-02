# Session Handoff — Tue 2026-06-02 (evening, pre-compact)

State capture for next-session pickup. **Read this first.** Supersedes the
2026-05-27 handoff for current state.

---

## Headline: two flagships shipped + GA4/attribution infra fixed

| What | When | Status |
|---|---|---|
| **Indian AI Search Audit** (flagship #1) | Sat May 30 | ✅ Live, indexed same-day w/ FAQ rich results |
| **AI Spend Disclosure Audit / Track C #1** (flagship #2) | Tue Jun 2 (a day early) | ✅ Live: /blog/finops/ai-spend-disclosure-audit-2026/ |
| rikuq GA4 access | Jun 1-2 | ✅ Fixed (was MCP misconfig, not site) |
| UTM attribution (auto + manual) | Jun 2 | ✅ Shipped |

main HEAD: `de1a4e7`. All branches clean/pushed. Research branch
`research/track-c-1-ai-spend-disclosure` was merged + deleted.

---

## The GA4 saga (RESOLVED — don't re-debug)

The "rikuq GA4 is empty" problem was **never the site**. Root cause: the GA4
MCP connector's `GA_PROPERTY_ID` in `~/.claude.json` was set to BatchWise's
property (538080117), not rikuq's (538641580). Fixed it → restart picks up
rikuq data.

- rikuq GA4 property = **538641580**, measurement ID **G-DV2MSGVH6G** (correct,
  in wrangler.toml). batchwise.ai = G-XNN33YQDX9 (correct). **NOT swapped** —
  I briefly thought they were and changed wrangler.toml, then **reverted** (the
  GA4 web-stream screenshot proved rikuq's ID was right all along).
- Service account `claude-ga4-reader@batchwise-495210...` now has account-level
  Viewer on Keytalli (74144336) → reads all 4 properties (BatchWise, Citare,
  Prism, Rikuq).
- **Real rikuq GA4 (May 20-Jun 1):** ~160 pageviews, ~83 sessions, ~50 users.
  **89% Direct** (the attribution problem — see UTM below). Top pages: homepage,
  Claude Code Review, what-is-llm-finops. Organic search tiny (young domain).

---

## UTM attribution (shipped Jun 2) — the fix for 89%-Direct

- **Auto:** `scripts/lib/article-loader.mjs` now appends
  `utm_source=<platform>&utm_medium=crosspost&utm_campaign=<slug>` to crosspost
  body page-links + the "read original" CTA. Canonical + images stay clean.
  devto + hashnode crossposts now attribute.
- **Manual:** `node scripts/utm.mjs <slug> <platform>` prints a tagged URL
  (x, linkedin, reddit, hn, ih, medium, substack, newsletter). Use for every
  manual social/crosspost link.

---

## Crossposting state

- **Dev.to:** ✅ 33 articles live (auto-cron working). 614 total views.
  Per-post leader: **Portkey comparison (76 views, 24 comments)** — the
  engagement star. Comparison/"vs" + real-numbers content wins; reviews lag.
- **14 crossposted flags synced** (they were live on Dev.to but flagged false).
- **Medium:** automated crosspost NOT possible (no pre-2025 API token). Doing
  top-5 manually via import-from-URL (auto-canonical). **4 of 5 LIVE:**
  Portkey, Claude Code Review, LLM FinOps, Hooks vs Skills. **5th (Indian AI
  Search Audit) PENDING** — CiC "Prompt B" already delivered (5 tables
  pre-built as bullet lists); Ravi just runs it. See docs/content-performance.md.
- Medium recipe (confirmed): import-from-URL auto-sets canonical + cover; code
  spans survive; TABLES drop/flatten (rebuild as bullet lists); subtitle+tags
  manual; uncheck "notify subscribers". ~4 min/post.
- Other platforms (Hashnode/LinkedIn/Substack/HackerNoon/DZone): parked.

---

## Content performance signal (NEW — docs/content-performance.md)

First real per-post data (Dev.to views, logged manually — no dashboard API).
Strategy locked: **Dev.to (auto) + Medium (manual top-5 only). Stop spreading
thin.** Re-measure Dev.to weekly (Mondays). Watch: does the finops cluster
break >25 views as it ages (validates the wedge bet)?

---

## Reactive PR — state

- **X:** ✅ 20 contribution-first replies POSTED Jun 2 (6 buckets, casual voice).
  Logged in reactive-pr.md. Building following.
- **HN:** 2 replies DRAFTED, NOT posted (in reactive-pr.md):
  - Tokenmaxxing thread (id=48345691) → LLM FinOps/Prism
  - Agentic war-stories (id=48342441) → Prism/gateway
  - (3rd HN hit was a competitor "Agentable" — skip)
- **Reddit: BLOCKED.** The `.json` curl trick got the IP soft-blocked after a
  query burst (during a Prism-prospecting task that was dropped). All sub
  endpoints 403. WebFetch can't reach reddit either. **Fix for next time:**
  official Reddit API (praw + a free "script" OAuth app, ~2 min) OR
  Claude-in-Chrome logged-in browser. Both portable.

---

## Inbound / opportunities

- **Peter Jones / CoderLegion.com** — legit (small) guest-post invite, canonical-
  safe + author-bio backlink. Ravi REPLIED (proposed republishing Claude Code
  Review w/ canonical). Awaiting his details. Worth doing, low effort, don't
  over-invest. Verdict in this session's chat.
- **r/SecurityAnalysis** — Ravi requesting to join/post (for the Track C audit).
  Mod-message draft provided. Pending approval.
- Brand outreach (8) + press pitches (3) for the Indian AI Search Audit were
  SENT May 30 (logged in reactive-pr.md). Watch for replies; nudge press ~Jun 4.

---

## GSC health (checked Jun 2 — NO real errors)

The dashboard "errors" are benign GSC exclusion categories:
- "Page with redirect" = correct http/www/non-trailing-slash redirects
- "Alternative page with proper canonical" = www variants correctly deferring
  (a GOOD sign)
- "Excluded by noindex" = /newsletter/confirmed/ (intentional)
- "Discovered – not indexed" = young-domain crawl lag, AND the report is LAGGED
  (live URL inspection shows several already indexed since the snapshot)
- Audit + finops-providers + services all live-inspect as "Submitted and indexed."
- Internal-linking pass is working (Google following links between finops posts).
- **Pending manual action:** Request-Indexing the finops cluster URLs in GSC
  (list in this session's chat). Click "Test live URL" first — several already
  indexed (stale report).

---

## Today's content (Jun 2)

#43 + #44 (FinOps Foundation + AI Vendor Consolidation) auto-published per the
migration stagger. The Batchwise→rikuq finops migration (10 articles) is fully
complete and on Dev.to.

---

## Open / pending for next session

1. **Medium audit post** — run CiC Prompt B (delivered, ready) → all 5 Medium done
2. **HN reactive replies** (2 drafted) — post when ready
3. **Track C #1 social** — X thread / LinkedIn / Reddit drafted w/ tagged URLs
   (in chat + docs/ship-day-track-c-1-disclosure-audit.md). r/SecurityAnalysis
   pending join approval. LinkedIn = Indian-POV version drafted.
4. **GSC Request-Indexing** — finops cluster (manual)
5. **Reddit reactive PR / Prism prospecting** — needs Reddit API or CiC (blocked)
6. **CoderLegion** — await Peter's reply, then republish Claude Code Review
7. **Track C earnings pipeline reusable** — fetch-transcripts.mjs + score-earnings.mjs
   built; raw transcripts gitignored (copyright). Pattern reusable for Track C #2+.
8. **Tomorrow's content (Jun 3):** #45 + #46 (AI Cost Allocation + Section 195
   TDS) auto-publish per stagger. Migration content calendar covered through Jun 3.

---

## Key file locations (this session's additions)

- `scripts/utm.mjs` — manual UTM link generator
- `scripts/lib/article-loader.mjs` — now UTM-tags crosspost links
- `scripts/track-c/fetch-transcripts.mjs` — curl+strip Motley Fool transcripts
- `scripts/track-c/score-earnings.mjs` — Talk-Show ratio scorer
- `docs/content-performance.md` — Dev.to/Medium performance tracker + top-5
- `docs/ship-day-track-c-1-disclosure-audit.md` — Track C ship checklist + social
- `~/.claude.json` line ~611 — `GA_PROPERTY_ID: 538641580` (rikuq, fixed)

_End of handoff. Last commit on main: `de1a4e7`._
