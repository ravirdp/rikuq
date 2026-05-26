# Research Pipeline — Slow-Release Plan for Citare Audit Data

5 publishable research artifacts derived from Citare's existing client-audit
data. Slow-released over ~5 months (May 2026 → Oct 2026), one major
publication every 4-5 weeks.

**Sample constraint**: under 50 brands across structured rows.
**Strategy**: depth + comparison-across-verticals + named brands. Not breadth.
**Vehicle**: each report = PDF on `citare.ai/reports/` + full-version article
on `rikuq.com/blog/geo/` + LinkedIn carousel + Twitter thread + press push.

---

## The 5 angles (release order)

### 1. **THE DEBUT — "The Indian AI Search Audit: 500 Queries, 25 Brands, 777 Citations"**

**Status:** locked in as brief #22, ship target Sat May 30.

**Thesis (one line):** Indian buyers using AI search are being served citations
from Instagram, YouTube, Reddit, aggregators, and listicle blogs — almost
none from the brand websites Indian marketing teams optimize for.

**Why this first:** the Citare audit corpus (25 brands, 500 cells, 777
citations from May 24-26 2026) is already publishable. First published research
of its kind on this geography. The data is sharper than any of the originally-
planned debut angles. Replaces the API-vs-browser methodology piece as Report
#1 — that angle now becomes Report #5 or gets folded into the methodology
section of this report.

**The headline numbers** (from `~/code/citare_client_study/marketing/article-data/`):
- Top-cited domain across 500 cells: **Instagram (21 citations)**
- First brand-owned website in top-cited list: **position 12** (sugarcosmetics.com, 7)
- Brand-named query surface rate: **73.3%** (66/90)
- Unbranded "best X" query surface rate: **33.5%** (106/316) — a 40-point gap
- Biggest per-brand asymmetry: Pristyn Care AIO 80% / ChatGPT 30%; inverse Clickpost AIO 40% / ChatGPT 90%
- Single listicle dominating a category: **jimmyluxury.in (14 citations)**

**Sample:** 25 prospects across 16 verticals (insurance, beauty, healthcare,
real estate, fintech, D2C apparel, hospitality, jewellery, coaching, SaaS,
travel, logistics, wealthtech). Three cohorts: wipeout (10), funded-not-leader
(10), newer-funded (5).

**Article structure:** see brief #22 in DB (`sqlite3 data/content-ops.db "SELECT * FROM briefs WHERE id=22" -line`)

**Distribution path:**
- rikuq.com/blog/geo/indian-ai-search-audit-may-2026 (full article, free)
- citare.ai/reports/indian-ai-search-audit-may-2026 (PDF + landing page, email-gated)
- LinkedIn carousel (10 slides)
- Twitter thread (12-15 tweets)
- Personalized previews to all 25 brand marketing leads
- Press: Entrackr, Inc42, YourStory, The Ken, Moneycontrol, afaqs!, exchange4media, Marketing Brew, MarTech Today, plus brand-specific quotes

**Sample needed:** 10-20 brands across all 5 LLM platforms (ChatGPT, AIO,
Gemini, Claude, Perplexity), each queried via both API and via browser for
the same prompts, same week.

**Cuts to publish:**
- Average divergence per platform (which has the biggest API-vs-browser gap?)
- Brand-level case studies — 5 brands where the divergence is dramatic
- Time-of-day / personalization effect (Google AIO especially)
- "If you're using an API-based tool, here's what you're missing" — translation table

**Working title:** *"API vs Browser: We Audited 15 Brands on Both. The Numbers Are Different in Ways You Should Care About."*

**Target audience:** SEO / marketing professionals evaluating GEO tools, AI search vendors, the press already covering AI search.

**Press / backlink angle:**
- Pitch SearchEngineLand, SearchEngineJournal, Marketing Brew, The Information
- Each named tool category gets a "Profound responds:" angle — they may quote-tweet defending themselves, which amplifies
- Direct competitor (Peec AI) shares the same browser methodology — they'll likely share the report supportively

**Effort estimate:** ~12-15 hours
- 3h data collection (re-run audits if needed)
- 4h analysis + chart generation
- 4h writing
- 3h PDF design + landing page
- 2h press outreach

**Target publish date:** ~2026-06-23 (4 weeks from now)

---

### 2. "How 30 B2B SaaS Brands Compare on AI Search Visibility (Q2 2026)"

**Thesis:** Across the major B2B SaaS categories (project management, CRM,
marketing automation, dev tools, support tools), the leaders on Google blue
links are NOT the leaders on AI search. Map the divergence with named brands.

**Why this second:** broadest reader interest. The biggest backlink magnet
because every named brand might share. PR teams at large SaaS companies
actively monitor for mentions in research like this.

**Sample needed:** ~30 B2B SaaS brands across 5-6 categories, top-3 in each
category. Audit each across all 5 LLM platforms for ~10 category-defining
queries ("best CRM," "best project management tool," "best marketing
automation platform," etc.).

**Cuts to publish:**
- Category-level leaderboards (top 3 most-cited brands per category on AI search)
- "Hidden champions" — brands punching above their classical SEO weight on AI
- "Falling behind" — brands dominant in SERPs but invisible in AI answers
- Per-platform leaderboards (different winners on ChatGPT vs Perplexity vs Claude)
- Vertical-specific findings (CRM behaves differently from project management)

**Working title:** *"The Top 30 B2B SaaS Brands on AI Search: Who Wins on ChatGPT, Who's Dying on AIO (Q2 2026)"*

**Target audience:** B2B SaaS marketing teams, brand leaders, agency PMs.

**Press / backlink angle:**
- Pitch each named brand's PR team directly with their brand's section as a preview
- Pitch SaaS-focused publications (SaaStr, The SaaS Podcast newsletter, Lenny's newsletter)
- Pitch marketing publications (Marketing Brew, MarTech Today)
- LinkedIn carousel of just the leaderboards = ultra-shareable
- Backlink expectations: 15-30 backlinks within 30 days, mostly DR 40-70

**Effort estimate:** ~20-25 hours over 2 weeks

**Target publish date:** ~2026-07-21 (4 weeks after Angle 1)

---

### 3. "India SaaS on AI Search: The Untapped Frontier"

**Thesis:** Nobody else is publishing AI search visibility data for Indian
brands. Even with 10-15 Indian SaaS brands you can claim "first published
research on this geography." Massive open lane.

**Why this third:** ZERO competition. Pure unique-data angle. Hits BatchWise's
distribution (India SaaS audience) and positions Citare as the global-not-just-US
tool in the category. India press is starved for original tech research.

**Sample needed:** 10-15 Indian SaaS brands across fintech, ecommerce
infrastructure, dev tools, marketing tools. Examples: Razorpay, Zerodha,
Freshworks, Zoho, Postman, Browserstack, Chargebee, Whatfix, Druva, etc.
Audit across all 5 LLM platforms for India-specific queries ("best Indian
fintech," "Razorpay alternatives," "best SaaS founded in India") AND global
queries ("best payment gateway," "best testing platform").

**Cuts to publish:**
- Indian brands' surface rates on US-trained LLMs (likely much lower than US peers)
- Which Indian brands punch above weight (any that consistently surface globally)
- The "India tax" — how much extra brand work Indian SaaS needs to do for GEO
- India-specific queries — do US-trained LLMs even know about Indian SaaS?
- ChatGPT vs Gemini for Indian brand recognition (Gemini may be better-trained on Indian web)

**Working title:** *"Indian SaaS on AI Search: First Published Data on How LLMs See Razorpay, Zerodha, Freshworks, and 12 Others"*

**Target audience:** Indian SaaS operators, India tech press, India founders considering GEO.

**Press / backlink angle:**
- Pitch Entrackr, YourStory, Inc42, The Ken, Moneycontrol startups
- Pitch any India SaaS Twitter influencer (Aakash Dharmaraj, Sahil Lavingia for cross-border, Nithin Kamath if covering Zerodha)
- BatchWise can co-publish — gives BatchWise its first major content marketing piece
- Backlink expectations: 5-10 high-DR India backlinks (which are GOLD for India SaaS SEO)

**Effort estimate:** ~15 hours

**Target publish date:** ~2026-08-18 (4 weeks after Angle 2)

---

### 4. "AI Coding Tools on AI Search: Who Surfaces When You Ask Claude About Cursor"

**Thesis:** Meta-angle. Use Citare's dev-tools coverage to audit how the
AI coding tools (Claude Code, Cursor, Windsurf, Copilot, Antigravity, Cody)
surface on AI search platforms when users ask comparison questions. Hilarious
because the LLMs are essentially recommending their competitors.

**Why this fourth:** self-referential brilliance. Every AI coding tool's
audience will care. rikuq's existing audience (already-published reviews of
all these tools) gives natural distribution boost. The "Claude recommends
Cursor when you ask Claude about coding tools" type insight is inherently viral.

**Sample needed:** ~10 AI coding tools across the 5 LLM platforms, queried
with 15-20 comparison questions ("best AI coding tool," "Cursor vs Claude
Code," "alternatives to GitHub Copilot," etc.).

**Cuts to publish:**
- Which tool gets most cited per platform (does Claude favor Cursor over Claude Code? does Gemini push Copilot?)
- Self-citation rates — do LLMs cite themselves more than competitors?
- Bias by platform — does Perplexity favor newer tools? does AIO favor incumbents?
- Comparison query specifics — what does "X vs Y" return on each platform?
- The recommendation graph — which tools are most-frequently-recommended-together

**Working title:** *"What Does Claude Say About Cursor? We Asked the 5 Major AI Search Platforms About Every AI Coding Tool."*

**Target audience:** AI coding tool users (huge), AI tool builders, HN crowd.

**Press / backlink angle:**
- HN front page candidate — the inherent self-referentiality is HN catnip
- Anthropic / Cursor / Windsurf / GitHub may quote-share defensively or excitedly
- DevRel teams at each tool may pick it up
- Backlink expectations: 10-20 backlinks + 1 HN front page = ~10-30K visitors in one day

**Effort estimate:** ~12-15 hours

**Target publish date:** ~2026-09-15 (4 weeks after Angle 3)

---

### 5. "What Marketing Agencies Get Wrong About Their Own AI Search Visibility"

**Thesis:** Audit the top 20 marketing / SEO agencies (Brafton, Animalz,
Foundation, Growth Marketing Co, Single Grain, Backlinko, NP Digital, Demand
Curve, etc.) for their OWN AI search visibility. Show who's eating their own
dog food and who isn't. Bonus: agencies advising clients on GEO who themselves
are invisible to AI search.

**Why this fifth (last):** highest viral potential, but also highest
risk-of-backlash. Save for when audience is large enough to weather any agency
that responds publicly. Also — by month 5 we'll have published 4 reports,
established methodology credibility, and have an audience to push this to.

**Sample needed:** 20 well-known marketing/SEO/content agencies. Audit each
across all 5 LLM platforms for queries like "best SEO agency," "best content
marketing agency," "best B2B marketing agency," "alternatives to [agency name]."

**Cuts to publish:**
- Agencies invisible on AI search (the embarrassment angle, named)
- Agencies excelling (the gold standard, named)
- "The Cobbler's Children" gap — agencies whose own GEO is worse than their clients'
- Per-agency-tier patterns (do boutique vs enterprise agencies differ?)
- Comparison: agencies that publish AI-search-focused content vs ones that don't, do they actually surface more?

**Working title:** *"The Cobbler's Children: We Audited 20 Marketing Agencies on AI Search. The Results Were Embarrassing for Some."*

**Target audience:** marketing professionals, agency owners, B2B marketers
choosing agencies, marketing press.

**Press / backlink angle:**
- Marketing Brew, MarketingProfs, Content Marketing Institute, B2B Marketing zone
- Agency owners on LinkedIn will share or react (either way amplifies)
- Direct pitch to each "winner" agency for a shareable quote
- Risk: some named agencies may complain. Have a "methodology" page ready that
  withstands scrutiny.
- Backlink expectations: 10-25 backlinks. Highest engagement of any of the 5
  because controversy.

**Effort estimate:** ~15-20 hours including extra methodology defense work

**Target publish date:** ~2026-10-13 (4 weeks after Angle 4)

---

## Release calendar

| Release | Date | Angle | Distribution focus |
|---|---|---|---|
| **#1** | **2026-05-30** | **Indian AI Search Audit (THE DEBUT, replaces original #1)** | India tech press + 25 named brand PR teams + Marketing Brew |
| #2 | 2026-06-27 | 30 B2B SaaS brands | Each named brand's PR team |
| #3 | 2026-07-25 | India deep-dive — sub-vertical from #1 (likely fintech or beauty) | India press + BatchWise distro |
| #4 | 2026-08-22 | AI coding tools meta-piece ("what does Claude say about Cursor") | HN front page push |
| #5 | 2026-09-19 | API vs Browser methodology — the original Report #1, now standalone | SEO press + vendor responses |
| #6 | 2026-10-17 | Marketing agency dogfood audit | Marketing press + LinkedIn |

Roughly 4-5 weeks between releases. Allows time for each report to compound
backlinks + organic conversation before the next one drops. Also realistic
production cadence for solo + part-time analyst work.

---

## Per-report production playbook

Same shape for all 5. Time investment scales with sample size + topic
sensitivity. The repeatable steps:

### 1. Data prep (1-3h)
- Pull rows for the relevant brand cohort from Citare DB
- Verify the audits are fresh (re-run any older than 14 days)
- Normalize: same query set across all brands, same platforms

### 2. Analysis (2-4h)
- Aggregate by platform, by brand, by category
- Generate the 4-6 charts that will appear in the report
- Identify 3-5 "newsworthy" findings (the screenshot-able ones)

### 3. Writing (3-5h)
- Outline → draft → edit
- 1500-3000 words for the rikuq blog version
- 25-40 pages for the PDF version
- Methodology section MUST be defensible — describe sample, query set, dates, limitations

### 4. Design (3-4h)
- PDF: clean editorial layout, branded with Citare + rikuq
- Charts: use a consistent palette (matches our amber/obsidian brand)
- Landing page on `citare.ai/reports/<slug>` with PDF download + email gate
- Hero image for the rikuq article (generate via `scripts/generate-cover.mjs` or custom)

### 5. Distribution (2-3h day-of)
- Publish rikuq blog post (full text, free, no gate)
- Publish PDF on Citare landing page (email gate for downloads — list build)
- LinkedIn carousel (5-10 slides of best findings)
- Twitter thread (8-12 tweets)
- Pitch 5-10 named brands' PR teams with their section as preview
- Pitch 3-5 publications with the angle
- Submit to HN (only for Reports 4 and 5)
- Post in Indie Hackers

### 6. Follow-up (1h/week × 2 weeks after publish)
- Reply to comments / quote-shares on LinkedIn, Twitter, HN
- Send "thanks for sharing" notes to anyone who picks it up
- Track backlinks landed in `docs/backlink-tracker.md`
- Update the report's landing page with "Featured in:" links to coverage

**Total per report:** 12-25 hours over 2-3 weeks (front-loaded). Distributed
across calendar so you're working on N+1 while N+0 is still being amplified.

---

## What to do this week (Tier 1 of 1 for Report #1)

1. **Pick the 15 brands** for the API vs Browser report. Mix verticals (3-4 from each: B2B SaaS, dev tools, India, marketing tech). Pick brands whose names will perk up readers (recognizable names).

2. **Re-run audits if needed** — make sure each brand has both browser and API data captured within the last 14 days. Citare already produces both; verify it's stored.

3. **Outline the report** — I can do a first draft outline in 30 min once you tell me the 15 brand picks.

4. **Decide PDF design path** — DIY in Canva, hand to a designer, or use a Figma template? Affects timeline.

If you want, I can also:
- **(a)** Pre-draft Report #1's article shell with placeholder data sections you fill in
- **(b)** Draft the press pitch template for Report #1
- **(c)** Build a simple `citare.ai/reports/` landing page template
- **(d)** Just commit this plan and we move to the next thing

---

## How this feeds the master marketing plan

Each report's release date in `docs/marketing-plan.md` becomes a major focus
week. The 4 weeks BEFORE each release have specific deliverables:
- Week -4: data prep + analysis
- Week -3: writing + design
- Week -2: pre-pitches to named brands + publications
- Week -1: amplify build (LinkedIn previews, Twitter teasers)
- Week 0: publish + push

The 4 weeks AFTER each release are about amplification + the next research's
data prep, in parallel.

Net effect: 5 reports in 5 months = backbone of the "Tier 1 — quarterly
report" item in the marketing plan, with monthly compounding instead of
once-a-quarter.

---

## Living document — update as we release

After each release, append a section here with:
- Actual publish date
- Backlinks landed (count + sample list)
- Traffic to landing page (first 30 days)
- Newsletter signups attributable
- Press coverage URLs

That builds the "proof of work" timeline that makes Report #6 even easier to
pitch.
