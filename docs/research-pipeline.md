# Research Pipeline — 3-Tier Content Multiplication From Audit Corpus

**One data collection → 17 publications over 7 months.**

The Citare audit corpus (25 brands, 500 cells, 777 citations, May 24-26 2026)
gets unpacked across three tiers of content, each compounding on the previous:

```
TIER 1 — The Main Report (debut, ship Sat May 30)
  └─ Anchor asset. Cross-vertical. ~5000 words. PDF + landing page.

TIER 2 — Weekly Spinoff Blogs (1/week × ~10 weeks, Jun-Aug)
  └─ Each = ONE finding from the main report, gone deep. ~1500-2500 words.
     Native rikuq blog posts that link back to the main report for full data.

TIER 3 — Per-Vertical Deep Dives (1/month × 6 months, Jul-Dec)
  └─ Each = vertical-specific mini-report. 2000-3000 words + per-vertical
     PDF + per-vertical landing page + per-vertical press push (fintech
     press for fintech, beauty press for beauty, etc.)
```

**Sample**: ~55 brands across 16 verticals. Heavy India tilt. **All brands
named in publications** (per Ravi's direction, May 26 decision).

**Vehicles per tier**:
- Tier 1: rikuq long-form blog + Citare PDF + Citare landing page + LinkedIn carousel + Twitter thread + 25 brand outreach + 15 press pitches
- Tier 2: rikuq blog + LinkedIn post + Twitter thread + IH post
- Tier 3: same as Tier 1 but with vertical-specific press list

---

## Tier 2 — Weekly spinoff blogs (Jun-Aug 2026)

Each = ONE finding from the main report, gone deep. Anchor links to the main
report PDF for "full data download." Cadence: 1/week starting Jun 4.

| Week | Date | Title | Anchor finding |
|---|---|---|---|
| 1 | 2026-06-04 | Why Instagram Reels Are the Most-Cited Domain for Indian Buyer Queries on AI Search | Finding #1 (top domains) |
| 2 | 2026-06-11 | The 40-Point Gap Between Branded and Unbranded Queries on AI Search (And Why It Matters) | Finding #2 (branded gap) |
| 3 | 2026-06-18 | AIO vs ChatGPT: A Per-Brand Asymmetry Study Across 25 Indian Brands | Finding #3 (platform asymmetry) |
| 4 | 2026-06-25 | How Snitch (Series B) Out-Performs Larger Apparel Brands on AI Search | Finding #4 (newer-funded) |
| 5 | 2026-07-02 | The jimmyluxury.in Story: How One Blog Owns an Entire Category's AI Citations | Finding #5 (single listicle) |
| 6 | 2026-07-09 | Newer-Funded vs Established Brands: Who Actually Wins on AI Search | Finding #4 deeper |
| 7 | 2026-07-16 | The Aggregator Citation Monopoly: Practo, Justdial, MagicBricks in Indian AI Search | Finding #1 deeper |
| 8 | 2026-07-23 | What Indian D2C Brands Need to Change About Their SEO Strategy Now | Action-oriented synthesis |
| 9 | 2026-07-30 | ChatGPT vs Gemini Brand Recognition for Indian Brands: Real Data | Cross-cut from corpus |
| 10 | 2026-08-06 | Citation Graph as the New Domain Authority | Methodology / forward-look |

Each blog: ~1500-2500 words. Same voice as rikuq's existing posts. Ends with
download CTA for the full Main Report PDF (which feeds the Brevo email list).

**Production**: each takes ~3-4h (the data work is done; this is writing +
chart re-cropping from main report). Pre-write all 10 in 2-3 batches across
June so weekly publishing runs hands-off.

---

## Tier 3 — Per-vertical deep-dive reports (Jul-Dec 2026)

Each = a per-vertical mini-report with its own PDF, landing page, press push.
Specific to one vertical's audience.

| Month | Date | Vertical | Brands in cohort | Press targets |
|---|---|---|---|---|
| Jul | 2026-07-18 | **Indian Fintech** | Acko, Slice, Jar, Stable Money, IndMoney + competitor set (HDFC, Jupiter, Groww, Paisabazaar) | Inc42, Entrackr fintech, Moneycontrol startups, The Ken fintech |
| Aug | 2026-08-15 | **Indian D2C Beauty** | Sugar Cosmetics, Forest Essentials, Pilgrim, Foxtale + comp (Kama Ayurveda, Mamaearth, Minimalist) | afaqs!, exchange4media, The Voice of Fashion, Mint Lounge |
| Sep | 2026-09-12 | **Indian Healthcare** | Pristyn Care, Allo Health, VSH, Truemeds + comp (Apollo, Manipal, Practo) | YourStory healthcare, Inc42 health, Mint healthcare |
| Oct | 2026-10-10 | **Indian Real Estate** | Square Yards, Adarsh + comp (Brigade, NoBroker, MagicBricks, 99acres) | MoneyControl real estate, ET Realty, Mint Money |
| Nov | 2026-11-07 | **Indian Hospitality / Travel** | Treebo, EaseMyTrip + comp (MakeMyTrip, FabHotels, OYO) | TravelDailyNews India, Hospitality World, The Ken travel |
| Dec | 2026-12-05 | **Indian D2C Apparel** | Snitch, Souled Store + comp (Bewakoof, Myntra, Ajio) | The Voice of Fashion, BizzBuzz, BW Marketing World |

Each vertical report: re-use the corpus data, do additional audits if the cohort
is too small, package per-vertical, publish on rikuq + Citare + verticals press.

Effort per vertical report: ~12-18h (data prep + writing + design + outreach).

---

## Parallel track — FinOps research angles (rikuq pillar + BatchWise launch)

The Citare audit corpus drives the GEO-pillar research above. Separately,
rikuq's **finops** pillar is under-represented (1 article) and **BatchWise**
has zero rikuq presence. Both can be addressed via the same proprietary-data
play, with two distinct data sources:

- **Your own bills** across Prism, Citare, BatchWise → LLM FinOps angles
- **BatchWise reconciliation data** → Indian payments FinOps angles (if/when exportable)

### 10 angles, scored

**LLM FinOps (Ravi-the-builder voice):**
1. The Solo AI Founder Monthly Bill, Itemized — real screenshots, 12 months. ⭐⭐
2. Prompt Caching at 10K Calls vs 100K — extends existing "330 calls" piece. ⭐⭐
3. The 5 LLM Cost-Routing Patterns Solo Founders Use — routing strategy taxonomy with numbers. ⭐⭐⭐
4. Workers AI vs OpenAI vs Anthropic on 1M Tokens — already brief #17. ⭐⭐⭐
5. The "Hidden Cost" Index for AI SaaS — egress, retries, cache misses, observability. ⭐⭐

**India Payments FinOps (BatchWise positioning):**
6. The Indian SaaS Payments Stack: True Cost Breakdown — Razorpay/Cashfree/PayU/Stripe-India/Juspay. ⭐⭐
7. Settlement Timing Across Indian PSPs: Real Data — **BatchWise's debut piece if data exportable**. ⭐⭐⭐⭐
8. The 11 Reconciliation Gotchas — anonymized failure modes from BatchWise. ⭐⭐⭐
9. Cross-Border Settlement for Indian SaaS Selling to US — Stripe → INR stack. ⭐⭐

**Cross-property:**
10. The Full True Cost of an Indian AI SaaS — flagship synthesis combining 1, 6, 7. ⭐⭐⭐⭐

### Scored shortlist (do these 5 in next 90 days)

| Rank | Angle | Trigger | Target ship |
|---|---|---|---|
| 1 | #7 — BatchWise Settlement Timing (data piece) | Awaiting BatchWise data export confirmation | Jun 13 |
| 2 | #1 — Solo AI Founder Monthly Bill | No external blocker (need Ravi's bill screenshots) | Jun 20 |
| 3 | #6 — Indian SaaS Payments Stack | No blocker (public pricing + your fee data) | Jun 27 |
| 4 | #4 — Workers AI vs OpenAI cost (brief #17, already approved) | Awaiting Prism cost data from Ravi | Jul 4 |
| 5 | #10 — Full True Cost of Indian AI SaaS (flagship) | Builds on #1, #6, #7 | Aug 1 |

### What needs deciding before any of these can ship

1. **Does BatchWise have exportable reconciliation data?** Determines whether #7 is the debut or pushed later.
2. **Will Ravi share his real bill screenshots?** Determines whether #1 stays low-friction or has to be reframed.
3. **How does BatchWise's brand appear on rikuq?** Disclosure flag pattern (like Citare) vs explicit launch post vs background-citation-only.

Open questions, not blockers. The angles list is durable in this doc; revisit
when you have answers.

---

## Track C — Public-data corporate AI audits (1-2/week cadence)

The third research track. Uses ONLY public information (10-K, 10-Q, earnings
call transcripts, analyst reports, leaked employee posts, press disclosures,
investor letters). No proprietary data required. Substantive, citable,
recurring.

**Cadence target**: minimum 1/week, ideally 2/week. 8 angles below; full
backlog clears in 4-8 weeks depending on cadence achieved.

**Why public-data audits work for rikuq:**
- Methodology defensible (sources cited per claim)
- Recurring (quarterly republish with updated numbers)
- Backlink magnets (named companies' IR teams cite them)
- Compounding authority (the third such audit gets more press than the first)

### 8 angles, scored + sequenced

| Order | Angle | Thesis | Sources | Effort | Target ship |
|---|---|---|---|---|---|
| **C1** | **The 2026 AI Spend Disclosure Audit** | Audit 50 public companies' AI disclosures. Score each on Disclosure Quality. Names laggards. | 10-K/10-Q + earnings call transcripts | 25-35h | **Jun 3** (pulled forward to ride May 30 Indian Audit momentum) |
| C2 | Indian IT Services AI Spend Audit | TCS / Infosys / Wipro / HCL / TechM vs Accenture / Cognizant / Deloitte. AI capex, headcount, contracts. | NSE/BSE filings + earnings calls + India press | 15-20h | **Jun 16** |
| C3 | Anthropic + OpenAI + xAI Revenue Tracker (v0.1) | Aggregate every public revenue datapoint. Quarterly recurring publication. | Leaked employee posts + customer announcements + investor letters | 10-15h (v0.1) | **Jun 23** |
| C4 | AI Spend vs AI Revenue Index 2026 | 2x2 plot of every public AI player: disclosed spend vs disclosed revenue. Who's profitable on AI today? | 10-K segment disclosures + analyst reports | 20-25h | **Jun 30** |
| C5 | The AI Vendor Concentration Map | Trace every public AI dollar to destination. Show that ~80% lands in 5 hands. Dependency graph. | Synthesis of C1, C2, C4 data | 15-20h | **Jul 7** |
| C6 | Hyperscaler-to-Customer AI Spend Reconciliation | AWS/Azure/GCP report ~$80B AI compute revenue. Public customer disclosures add to $X. Trace the $80B − $X gap. | Hyperscaler segment revenue + customer disclosures | 15-20h | **Jul 14** |
| C7 | The Stock-Market-Implied AI Value Index | 100 public companies that announced material AI investment 2024-26 vs matched control group. Did Wall Street reward AI spend? | Public market data + announcement dates | 20-25h | **Jul 21** |
| C8 | Sector AI Spend Heatmap | Per-vertical (banking, insurance, retail, healthcare, manufacturing, government). Adoption rate × spend per adopter. | McKinsey/BCG/Gartner reports + IBM AI Adoption Index + earnings | 20-25h | **Jul 28** |
| **C9** | **Consumer AI Subscription Economics** | Audit ChatGPT Plus, Claude Pro, Gemini Advanced, Perplexity Pro, Midjourney, Suno, Pika, Runway, Copilot, Cursor Pro. Subscribers, ARPU, churn signals, free-to-paid conversion. Who's actually winning consumer AI? | Company statements + leaked figures + app store rankings + Sensor Tower-style estimates | 20-25h | **Aug 4** |
| **C10** | **AI Startup Burn-Rate Disclosures** | Aggregate every public burn-rate datapoint for Anthropic, OpenAI, xAI, Mistral, Cohere, Adept, Inflection, Character.AI, Magic, Suno, etc. The "who runs out of money first" frame. | TechCrunch + The Information funding rounds + runway statements + Glassdoor + partnerships | 15-20h | **Aug 11** |
| **C11** | **Government AI Procurement Data Audit** | US (USAspending.gov), UK (gov.uk procurement), India (GeM), EU (TED). Aggregate AI-related contracts: vendor, amount, agency, project. Vendor concentration in gov sector. | National procurement portals (all public) | 20-30h | **Aug 18** |
| **C12** | **AI Talent Compensation Tracking 2026** | Levels.fyi + LinkedIn job posts + leaked comp from Twitter/Blind. What does it cost to hire an AI engineer in 2026? Comparison by company, level, city. | Levels.fyi public data + scraped job posts + Blind/Twitter leaks | 15-20h | **Aug 25** |
| **C13** | **The AI Infrastructure Leasing Market** | Coreweave, Lambda, Crusoe, Voltage Park, Together AI as wholesale; OpenAI/Anthropic/Meta as buyers. Disclosed lease deals → implied wholesale cost-per-GPU-hour vs retail. | Press releases of GPU deals + hyperscaler capex + 10-K mentions | 25-30h | **Sep 1** |

### Cadence sanity-check

At 1/week: 13 angles cleared by **Sep 1** (13 weeks from now).
At 2/week: 13 angles cleared by **Aug 4** (7 weeks). Sustainable only with significant batching and reuse of data across multiple pieces.

**Realistic loading** considering all parallel tracks (Track A spinoff blogs weekly, Track A vertical reports monthly, Track B finops pieces, regular content pipeline, reactive PR): 1/week is firm; 2/week achievable for the angles that share underlying data (e.g., C1 + C4 share most of the corporate-filing dataset; C5 reuses C1+C2+C4 outputs).

### Per-piece distribution pattern (same as Tier 1 of the Citare track)

Each Track C piece:
1. rikuq long-form blog (free, full data inline)
2. PDF version (Citare-branded for credibility transfer; email-gated download)
3. LinkedIn carousel (10 slides of the leaderboard / chart)
4. Twitter thread (12-15 tweets)
5. Press push: pitch each named company's IR team + 5-8 publications (The Information, Stratechery, Marketing Brew, Inc42 for India angles, ET / Mint / Moneycontrol for India angles, FT Lex / Bloomberg AI desk for global angles)
6. Re-share quarterly when numbers update

### The C1 + C2 + C3 sprint (next 3 weeks after the May 30 Citare debut)

Three publications in three weeks, each building on the previous. The C1 audit
establishes methodology + corporate data spine. C2 applies the same
methodology to Indian IT services using the same tools (different filings).
C3 launches the running tracker. Combined effect: in 3 weeks, rikuq has
shipped 3 substantial corporate-data audits + 1 audit corpus debut = 4
flagships in 5 weeks. That's the "rikuq is THE place where AI economy
numbers get analyzed" positioning.

---

## Tier 1 — The Main Report (release order = master pipeline)

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
