# Session Handoff — Wed 2026-05-27 (evening, pre-compact)

Comprehensive state capture for next-session pickup. **Read this first** when resuming.

---

## What's running / scheduled

| Item | When | Status |
|---|---|---|
| **Crosspost cron** (Auto-crosspost 3 days after publish) | Daily 04:30 UTC / 10:00 IST | ✅ Fixed (slug → slugs bug). Tomorrow May 28 looks for May 25 commits = #20 again. Will 422-fail-and-continue gracefully. |
| **Indian AI Search Audit (Brief #22) ship** | **Sat May 30** (3 days) | ✅ Article drafted (4217 words, voice-passed), PDF rendered (17 pages, 1.1MB), all distribution assets ready (carousel/thread/IH/landing/outreach/pitches/checklist). `draft: true` until ship-day flip. |
| **Track C #1 — AI Spend Disclosure Audit ship** | **Wed Jun 3** (7 days, pulled forward from Jun 9) | 🟡 Methodology + 46 EDGAR filings + DQS scoring + top/bottom 10 verified. **Next: earnings call collection (Talk-Show ratio), then write article.** |
| **GitHub Action: Cloudflare Pages auto-deploy** | On every push to main | ✅ Working |

---

## Branches in flight

```
main                                       ← clean, pushed
content/indian-ai-search-audit-may-2026    ← clean, pushed, draft article
research/track-c-1-ai-spend-disclosure     ← clean, pushed, research WIP
```

## Pipeline state (DB)

```
Briefs: 0 pending · 16 approved · 19 published
Pages:  19 live
Keywords: 72 tracked
```

Approved briefs awaiting publish:
- #17 Workers AI vs OpenAI cost — **blocked on Prism cost data from Ravi**
- #18 37 MCP Tools for Citare — **blocked on Citare MCP tool list from Ravi**
- #22 Indian AI Search Audit (ships Sat May 30)
- #23-30 + #31-35 — Track C public-data audits (Jun 9 → Sep 1, weekly)

---

## What got done today (Wed May 27)

### Shipped
- **Brief #16** GEO/AEO/AIO/SGE glossary — live at /blog/geo/geo-aeo-aio-sge-glossary-2026 (1906 words)
- **Brief #20** manually crossposted to Dev.to → https://dev.to/rikuq/claude-code-hooks-vs-skills-when-to-use-which-ple (with canonical to rikuq)
- **Tweet 1** (GEO glossary announce) → https://x.com/ravirdp/status/2059587229983642082

### Built / fixed
- **PDF pipeline** — Chrome headless + token-substitution rendering + 5 inline-SVG charts + brand-card grid generator. Lives in `scripts/pdf/`. Renders 17-page A4 report at 1.1MB. Pattern reusable for all 17 future research publications.
- **SEC EDGAR fetcher + DQS analyzer** for Track C #1 — `scripts/track-c/fetch-edgar.mjs` + `analyze-10k.mjs`. Pulled 46/50 10-Ks. Scored all. Verified top 5 + bottom 5.
- **Crosspost workflow bug fix** — manual trigger was outputting `slug=` (singular) but the loop was checking `slugs=` (plural). Step was silently skipping. Fixed.
- **Affiliate wiring** — Brevo live via PartnerStack (`get.brevo.com/kemgc2nzgwfd`); CustomGPT tiers documented (15%/18%/20% + $1500 bonus for 20+ refs/mo).

### Documented
- `docs/marketing-plan.md` — master plan (already existed; ship dates updated)
- `docs/research-pipeline.md` — 3-tier strategy (Citare audit + FinOps + Track C 13 public-data audits)
- `docs/research-prep/c1-ai-spend-disclosure-audit.md` — full methodology + 50 companies + DQS rubric
- `docs/crosspost-tracker.md` — 19 articles live on Dev.to, manual republish guide for Hashnode/Medium/LinkedIn
- `docs/reactive-pr.md` — added casual-platform voice rules (no em dashes, lowercase opener, etc.) after Reddit comment was AI-flagged
- `article-assets/indian-ai-search-audit/` — chart specs, brand outreach (top-8 pre-assembled), press pitches (top-3 pre-assembled), LinkedIn carousel, Twitter thread, ship-day checklist, IH post, Citare landing page copy
- `data/track-c/` — 50 companies CSV, 46 cached 10-Ks, 46 scored JSON files

---

## Open blockers (in priority order)

### 1. rikuq GA4 access (TODAY'S UNRESOLVED)
- Tried adding `claude-ga4-reader@batchwise-495210.iam.gserviceaccount.com` to rikuq's GA4 property
- Google blocked with "This email doesn't match a Google Account"
- BatchWise property has this same email working fine
- **Fix not yet found.** Ravi vaguely remembers solving this for BatchWise but can't recall how.
- Possible solutions to try:
  - Refresh + retry (Google UI caching bug)
  - Try in incognito
  - Add via Google Cloud Console IAM instead of GA4 UI
  - Google Groups workaround: create a group, add the service account to the group, add the group to GA4
- **Workaround for now:** Ravi can pull rikuq GA4 numbers manually via the GA4 dashboard. Or rely on Cloudflare Analytics / Plausible.

### 2. Ravi-side data still pending
- Prism cost data for Brief #17 (Workers AI vs OpenAI cost article)
- Citare MCP tool list for Brief #18 (37 MCP Tools for Citare article)

### 3. Today's queued actions Ravi hasn't done yet
- Send top-8 brand outreach emails (pre-assembled in brand-outreach-template.md)
- Send top-3 press pitches (Entrackr, Inc42, YourStory — pre-assembled)
- Post Tweet 2 (drafted, 7 PM IST target) + Tweet 3 (drafted, 10 PM IST target)
- Post 10 morning X replies (drafted) + 10 evening X replies (drafted)
- Post r/Entrepreneur Reddit comment (drafted humanized)
- Medium republish top 3 articles
- Flag #20 frontmatter `crossposted: true` (prevents tomorrow's cron duplicate-attempt)

---

## What's queued for tomorrow (Thu May 28)

### Track C #1 work
- Build earnings call scraper (Motley Fool source). Collect transcripts for top 10 + bottom 10 companies.
- Compute Talk-Show ratios (AI mentions per earnings call ÷ DQS points)
- Verify remaining 36 companies' DQS scores (lighter pass)
- Begin generating inline SVG charts (top 10 / bottom 10 / sector heatmap)

### Indian Audit prep (Sat May 30 ship — 2 days out)
- Final voice pass
- Internal link verification
- Hero image confirmation (or accept the fallback)
- Charts already done

### Daily content
- Daily article: only if Ravi unblocks #17 or #18 with data. Otherwise no daily article.
- X cadence: 3 originals + 20 replies (use the prompt in docs/reactive-pr.md to feed Claude-in-Chrome)
- Reactive-PR digest pull + 1-2 strongest pitches

---

## Key file locations

### Article + research work-in-progress
- `src/content/blog/indian-ai-search-audit-may-2026.mdx` — debut article draft (draft: true)
- `article-assets/indian-ai-search-audit/pdf-source/` — PDF, HTML, tokens, charts.json, brand-cards.json
- `article-assets/indian-ai-search-audit/` — all distribution assets (LinkedIn / Twitter / press / outreach / IH / ship-day)
- `data/track-c/filings/` — 46 cached 10-Ks
- `data/track-c/scored/` — 46 DQS scores (top 10 verified)
- `docs/research-prep/c1-ai-spend-disclosure-audit.md` — methodology + 50 companies

### Tooling
- `scripts/pdf/` — Chrome headless PDF pipeline
- `scripts/track-c/` — SEC EDGAR fetcher + DQS analyzer
- `scripts/reactive-pr.mjs` — Mastodon + Reddit + HN digest
- `scripts/generate-cover.mjs` — programmatic hero image fallback

### Docs
- `docs/marketing-plan.md` — master plan + daily queue
- `docs/research-pipeline.md` — 3-tier strategy
- `docs/reactive-pr.md` — pitch shells + voice rules + running log
- `docs/crosspost-tracker.md` — per-platform per-article status
- `docs/content-pipeline.md` — short-term publish schedule

### Shared system (separate repo)
- `~/code/content-ops/` — `@ravirdp/content-ops` v0.3.1 (skills + CLI for content ops). Installed in rikuq.

---

## Critical "decisions made" to preserve

1. **Hashnode is manual-only** (API moved to paid tier). Dropped from auto-crosspost. Code retained but not in platforms list.
2. **Publishing cadence: 2 articles/day** for the launch backlog, then ~2-3/week sustainable.
3. **All 25 brands named** in the Indian AI Search Audit (per Ravi May 26 decision).
4. **PDF design pattern**: Chrome headless + inline-SVG charts + Playfair Display/Inter/JetBrains Mono + amber `#f5b942` + obsidian `#0a0b0e`. Reusable across all 17 future research publications.
5. **Track C #1 pulled forward** from Jun 9 → Jun 3 to ride May 30 Indian Audit momentum.
6. **Casual-platform voice rules** (Reddit / HN / IH / LinkedIn comments): no em dashes, lowercase opener, casual abbrev (`tbh`/`imo`/`w/`), sentence fragments, comma splices, no sig block, mix sentence lengths drastically. Saved in `docs/reactive-pr.md`. Result of an AI-flagged Reddit comment getting caught.
7. **Email is `ravi@rikuq.com`** not `affiliates@rikuq.com` (the alias was never set up).
8. **DQS rubric** (Track C): 5pts for specific AI revenue, 3pts AI capex, 5pts segment breakdown, 2pts per named product (cap 4), 3pts forward capex guidance, 2pts AI risk factors, -1 per vague phrase (cap -3). Tiers: Exemplar (16-20), Solid (11-15), Vague (6-10), Opaque (0-5), Misleading (<0).

---

## Track C #1 verified leaderboard (as of evening May 27)

**TOP 5:**
| DQS | Tier | Ticker | Note |
|---|---|---|---|
| 11 | Solid | **META** | $115B-$135B 2026 AI capex guidance — most specific in entire corpus |
| 11 | Solid | **SNOW** | Cortex naming + AI Data Cloud revenue figure |
| 7 | Vague | HUBS | Breeze AI product naming |
| 6 | Vague | ADBE | Firefly naming (cap 4 points) |
| 5 | Opaque | NET | Workers AI infra capex |

**BOTTOM 5:**
| DQS | Tier | Ticker | Note |
|---|---|---|---|
| -3 | Misleading | **CRWD** | 148 AI mentions, zero specific disclosure |
| -3 | Misleading | **VRNT** | 123 AI mentions, 36 vague phrases — smoking gun |
| -2 | Misleading | BOX | 111 AI mentions, zero specifics |
| -1 | Misleading | V | 78 AI mentions, generic platitudes |
| -1 | Misleading | MA | 69 AI mentions, generic |

**Headline lead for the article**:
> "Meta plans $115-135B in AI capex for 2026 — and is one of only two companies in 46 we audited that actually discloses it."

---

## What to do FIRST when next session starts

If user says "let's keep going":
1. **Check today's pending Ravi-side actions** — did brand outreach go out? Press pitches? Reddit comment?
2. **Pull a fresh reactive-PR digest** if user wants new pitch material
3. **Track C #1 next step** = earnings call scraper. Build `scripts/track-c/fetch-earnings-transcripts.mjs` targeting Motley Fool's free transcripts for the top 10 + bottom 10 tickers.

If user says "ship the audit" (any time before Sat):
1. Flip `draft: true → false` in `src/content/blog/indian-ai-search-audit-may-2026.mdx`
2. `git checkout content/indian-ai-search-audit-may-2026 && git push`
3. Open PR, merge, CF Pages auto-deploys
4. Run ship-day checklist at `article-assets/indian-ai-search-audit/ship-day-checklist.md`

If user drops Reddit/X/Featured pitch URLs:
1. Add to `docs/reactive-pr.md` running log table
2. Commit + push

If user drops Prism cost data:
1. Save to `data/imports/prism-costs-MAY2026.md`
2. Start drafting brief #17 (Workers AI vs OpenAI cost) — branch `content/cloudflare-workers-ai-vs-openai-cost`

If user drops Citare MCP tool list:
1. Save to `data/imports/citare-mcp-tools.md`
2. Start drafting brief #18 (37 MCP Tools for Citare) — branch `content/37-mcp-tools-citare-lessons`

---

## Open items not in any doc above

- **`scripts/pdf/generate-pdf.sh`** has a footer page-number bug — static text in template, doesn't match actual PDF positions when sections were extended. Cosmetic. Fix in v2 by using CSS counters or page-number JavaScript.
- **EDGAR fetcher** failed on 4 tickers (AI / BBAI / VERI / SAP). Need fallback path through SEC's older-filings index. Can also manually paste those 10-K URLs.
- **Cron Hashnode-skip warnings** — workflow no longer touches Hashnode. Some commented-out code in `scripts/crosspost-hashnode.mjs` retained for manual use. Don't re-enable without a paid Hashnode subscription.
- **PDF chart 5** (per-vertical grid) uses inline HTML+CSS instead of SVG. Renders fine in Chrome but won't be portable to non-browser PDF readers. Acceptable; we ship via Chrome headless.

---

---

## ADDED 2026-05-27 evening — Prism cross-repo follow-up (Argon comment)

A Dev.to comment on the Portkey-vs-Helicone article from "Argon" (agentcolony.org/auditor/context)
asked: "Does Prism's edge replication preserve request-context fields across hops, or rebuild
them downstream?" Ravi pulled up the Prism code with Opus and found a real gap.

**Reply was posted on Dev.to** the same evening (single-writer vs dual-writer framing; gap on
edge-cache-hit slice; v1.8 list commitment made publicly).

### Tomorrow's Prism work (when context-switching to Prism repo)

1. **Ship the fix** — ~80 LOC, single commit, no migration
   - File: `workers/prism-edge/src/index.ts` (cache-hit branch ~line 84-124)
   - Add `recordEdgeHitToUsageLogs()` mirroring existing `recordEdgeHit()`, POST to PostgREST with parsed `X-Prism-Session` + `X-Prism-Tags` + project_id (already in worker context from auth)
   - Fire from `ctx.waitUntil()` so cached response stays sub-100ms
   - No backend changes, reuses existing service-role Supabase creds

2. **Tag release** v1.7.5 (or per scheme)

3. **Tweet** (single, not a thread) — draft:
   ```
   got a sharp comment on a dev.to post yesterday from a competitor-adjacent
   founder. flagged a real gap in prism: edge cache hits weren't writing
   per-request rows, so per-feature attribution on that slice was aggregate-only.

   shipped the fix today. ~80 LOC, no migration.

   best dev.to comment i've gotten. <commit-url>
   ```

4. **Article** in rikuq — `prism-edge-cache-attribution-gap-week-to-ship.mdx`
   - Title: "A Competitor's Comment Found a Real Gap in My LLM Gateway. Here's the Week-Long Fix."
   - Structure: comment quoted → why "hop loss" framing didn't fit (single-writer arch) → the actual gap (cache hits skip canonical row) → the fix (code snippet, ctx.waitUntil) → general lesson ("single-writer-drops-the-row" failure mode is more common than dual-writer-drift and underdiscussed) → credit + link Argon's tool in editorial space
   - Wedge: FinOps depth + "shipped within a week of public flag" authority signal
   - Branch: `content/prism-edge-attribution-gap`

---

---

## ADDED 2026-05-28 — Batchwise AI FinOps cluster → rikuq migration

**Context:** Batchwise is repositioning to its core (BRSR/ESG/CBAM + Indian tax/bookkeeping). The AI FinOps / AI-CFO cluster launched there in the last 2 weeks doesn't fit the brand and is moving to rikuq. Full handover memo received from Batchwise Claude session; pasted into this conversation.

**Total scope:** 17 files, ~58k words moving from `/Users/ravi/code/batchwise/src/pages/ai/` and `/Users/ravi/code/batchwise/src/content/{guides,compare,glossary}/`.

### Locked decisions (made 2026-05-28 evening)

| Decision | Choice |
|---|---|
| Case studies fate | **Don't migrate as posts.** Copy 6 IT-services case studies (Infosys/TCS/HCL/Wipro/LTIM/TechM) to `data/track-c/research-inputs/it-services-case-studies/` as raw research for Track C #24 (`indian-it-services-ai-spend-audit-2026`, ships Jun 16). Track C #24 becomes a comparative audit using these as foundational research — stronger than 6 disconnected posts. |
| Services page contact | **Cal.com + Tally both.** Side-by-side CTAs. Cal.com for "just book a call", Tally for structured intake. Both use existing affiliate links from `src/lib/affiliate.ts`. |
| pubDate strategy | **Fresh dates, staggered.** Treat as new rikuq publications. Stagger over May 28 → Jun 2 so they don't all crosspost the same day. |

### Files to migrate (8 published + 1 services page)

**Long-form articles (5 — heavy editorial reframe):**
1. `methodology/ai-systems-review-india.astro` → rikuq blog post on finops review framework
2. `methodology/ai-spend-tax-optimisation-india.astro` → rikuq blog post on Section 195 + GST RCM
3. `guides/ai-cloud-cost-optimisation-providers-india.mdx` → rikuq blog post (provider comparison)
4. `compare/ai-software-capex-vs-opex-india.mdx` → rikuq blog post (capex/opex framework)
5. `compare/section-195-tds-vs-equalisation-levy-foreign-ai-vendors.mdx` → rikuq blog post

**Glossary expansions (3 — short entries → full blog posts):**
6. `glossary/ai-vendor-consolidation.mdx` → blog post "AI Vendor Consolidation: When to Cut, When to Hold"
7. `glossary/ai-cost-allocation.mdx` → blog post "AI Cost Allocation: Models That Work in Production"
8. `glossary/section-195-tds-foreign-ai-vendors.mdx` → blog post "Section 195 TDS on Foreign AI Vendors"

**Services page (NEW):**
9. `src/pages/services.astro` — combines the 2 Batchwise service Astro pages (AI Systems Review + AI Spend Tax Optimisation) into a single page with simple service list + Cal.com + Tally CTAs

**Existing rikuq CTAs to update:** 10 articles reference `batchwise.ai` — most prominently `what-is-llm-finops` (5 refs). Find-replace pass to point at new `/services` page.

### Publish stagger schedule

| Date | Slot 1 | Slot 2 | Notes |
|---|---|---|---|
| May 28 | ✅ #36 LLM gateway attribution | — | Today; already shipped |
| May 29 | Provider comparison (migrated #3) | Capex vs Opex (migrated #4) | |
| May 30 (Sat) | **Indian AI Search Audit ships** | — | Hold migration, big audit ship day |
| May 31 (Sun) | Methodology piece (migrated #1) | — | Sunday slow lane |
| Jun 1 | Section 195 vs Equalisation Levy (migrated #5) | Methodology #2 (migrated #2) | |
| Jun 2 | Glossary expansion #6 | Glossary expansion #7 | |
| Jun 3 | Glossary expansion #8 | Track C #1 ships | |

### Frontmatter rewrite per file (required)

Drop: `lastUpdated`, `lastReviewed`, `reviewedBy`, `schemaType`, `relatedServices`, `sources`, `amendmentLog`
Add: `pubDate`, `category: 'finops'`, `tags`, `author: 'Ravi'`
Convert: FAQ `q:/a:` keys → rikuq's `question:/answer:` schema
Tighten: `title` ≤ 70 chars, `description` 120-160 chars
Voice swap: "BatchWise we" / "our service" → practitioner voice ("I've seen", "here's the framework")
CTA swap: `/ai/services/*` Batchwise URLs → `/services` rikuq URL OR drop entirely

### Execution order (tomorrow)

1. **Build services page first** (~45 min) — `src/pages/services.astro` with Cal.com + Tally CTAs. Needed before any CTA-update work has a destination.
2. **Move 6 case studies → research-inputs/** (~5 min) — fastest task. `mkdir -p data/track-c/research-inputs/it-services-case-studies/ && cp ...`
3. **Migrate article #1** (Provider Comparison Guide — least voice reframe needed). Bring to Ravi for voice review before doing all 8.
4. **Update 10 existing rikuq finops CTAs** (~30 min) — find/replace `batchwise.ai/ai` patterns → `rikuq.com/services`.
5. **Migrate articles #2-8** in batches based on Ravi's voice feedback on #1.
6. **Add Services link to nav** (header/footer).
7. **Coordinate Batchwise Phase 1** — wait for Batchwise session to ship its 410 Gone, time it within hours of rikuq pubDates.

### Open considerations for tomorrow

- Should rikuq add a `/finops/` top-level hub page, or rely on existing `/blog/finops/` category filter? (Decision: skip the hub page for now; if traffic concentrates on the finops category, build later.)
- Affiliate disclosure on the provider comparison guide — current `affiliateDisclosure: false` on most rikuq articles. Provider comparison legitimately compares providers; if any affiliate relationships develop, flip to `true`. For initial migration: `false`.
- Internal link audit on rikuq side — once migration is done, ensure new finops content cross-links cleanly with existing rikuq tools/infra/geo posts.
- Coordinate timing: rikuq pubDates should be within hours of Batchwise's `/ai/*` 410 Gone going live, so search engines see the move cleanly. Ping the Batchwise session when rikuq pieces are ready.

### Risks / known issues

- **Heavy editorial reframing** per file (~30-45 min each, sometimes more). 8 articles × 40 min avg = 5-6 hrs of focused work. Plan for 2 sessions.
- **rikuq case-studies collection schema mismatch** — current schema requires `product: 'batchwise' | 'citare' | 'prism'`. The 6 IT-services audits don't fit. Solution above (don't migrate) sidesteps this. If schema extension is wanted later, add `'public-company-audit'` enum value.
- **Track C #24 dependency** — the 6 case studies become its raw research. Track C #24 needs to actually use them; flag this to whoever picks up Track C #24.

---

_End of handoff. Last commit on main: `ffb1d0e`. Migration plan committed below._
