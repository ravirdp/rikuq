# Track C #1 — The 2026 AI Spend Disclosure Audit

**Brief #23 in DB · Target ship: 2026-06-09 · 12 days out**

## Thesis

Public companies talk about AI constantly in earnings calls. Their 10-K and 10-Q disclosures are dramatically less specific. We audit 50 public companies on the gap between AI talk (qualitative earnings-call mentions) and AI show (quantitative segment disclosures), score each on a **Disclosure Quality Score (DQS)**, and name the top + bottom 10.

## What we're publishing

**rikuq article** (~2500 words) + **PDF report** (~10-page) at citare.ai/reports/ai-spend-disclosure-audit-q2-2026

Sections:
1. The hidden gap between AI hype and AI disclosure
2. Methodology + introduction of the DQS framework (0-20 scale)
3. Top 10 best disclosers
4. Bottom 10 worst disclosers (named; companies that talk constantly about AI but show ~zero)
5. Sector heatmap (which sectors disclose best?)
6. What good AI disclosure looks like (3 examples with annotated extracts)
7. Why this matters for investors, analysts, and the AI economy narrative
8. Quarterly republication promise + waitlist for Q3

## Disclosure Quality Score (DQS) — scoring rubric

| Criterion | Points | How to measure |
|---|---|---|
| **Specific AI revenue figure disclosed** (segment-level or product-line) | 5 | Search 10-K + 10-Q for ARR / revenue figures attached to named AI products |
| **AI capex figure disclosed** (data center + GPU + R&D allocated to AI) | 3 | Search MD&A for capex line items mentioning AI or "data center expansion" with AI context |
| **AI segment-level breakdown** (separate operating segment for AI business) | 5 | Check segment reporting; only counts if AI is a distinct reportable segment |
| **Named AI products/services with adoption metrics** (e.g., "X seats", "Y users") | 2 per product (cap 4) | Search 10-K for named AI products + metric figures |
| **Forward AI capex guidance disclosed** (specific dollar guidance for AI investment) | 3 | Search latest earnings call + 10-Q for forward guidance figures |
| **AI risk factors specifically enumerated** (not generic) | 2 | Search 10-K Item 1A Risk Factors for AI-specific language (vendor concentration, model deprecation, regulatory, etc.) |
| **Generic "AI is important" mentions without quantification** | -1 (penalty cap -3) | Count vague AI mentions that don't tie to a number |

**Total possible:** 20 points. Theoretical floor: -3. Practical floor: 0.

**Tiers:**
- 16-20: **Exemplar** (transparent, specific, investable)
- 11-15: **Solid** (decent disclosure, room to improve)
- 6-10: **Vague** (AI mentioned but mostly marketing-speak)
- 0-5: **Opaque** (AI hyped externally, basically invisible in filings)
- < 0: **Misleading** (heavy generic mentions with zero specifics)

## Talk-vs-Show Ratio (companion metric)

For each company, also compute:

```
talk_show_ratio = ai_mentions_per_earnings_call / ai_segment_disclosure_points
```

High ratio = "AI is everything we talk about, almost nothing we disclose."
Low ratio = "We disclose proportionally to what we talk about."

This becomes the secondary leaderboard ("worst talk-vs-show offenders").

## Sample — 50 public companies

Curated for representativeness across sectors. Mix of cloud, software, hyperscaler, AI-pure-play, AI-adjacent traditional.

### Hyperscalers + BigTech (10)
1. Microsoft (MSFT) — Copilot suite revenue likely disclosed; expect high DQS
2. Alphabet (GOOGL) — Cloud + Gemini segments
3. Meta (META) — Llama investment + capex disclosure tradition
4. Amazon (AMZN) — AWS AI services + Bedrock
5. Apple (AAPL) — Apple Intelligence
6. Oracle (ORCL) — Oracle AI / OCI
7. Nvidia (NVDA) — pure AI infrastructure exposure
8. IBM (IBM) — Watsonx
9. Adobe (ADBE) — Firefly Generative Credits
10. Salesforce (CRM) — Einstein 1 / Agentforce

### AI-native public companies (8)
11. Palantir (PLTR) — AIP
12. C3.AI (AI) — pure-play AI software
13. BigBear.ai (BBAI) — AI for government / defense
14. SoundHound AI (SOUN)
15. Innodata (INOD) — AI data services
16. Veritone (VERI) — AI for media
17. Snowflake (SNOW) — Cortex AI
18. MongoDB (MDB) — vector search

### Cloud / Infra / Dev tools (8)
19. ServiceNow (NOW) — Now Assist
20. Workday (WDAY) — AI features
21. Datadog (DDOG) — LLM observability
22. Atlassian (TEAM)
23. Cloudflare (NET) — Workers AI
24. GitLab (GTLB) — Duo
25. Elastic (ESTC)
26. HubSpot (HUBS) — Breeze AI

### Software / SaaS (6)
27. Zoom (ZM) — Zoom AI Companion
28. Box (BOX) — Box AI
29. Asana (ASAN) — Asana Intelligence
30. Twilio (TWLO) — Twilio AI / SegmentAI
31. Coupa
32. Veeva Systems (VEEV)

### AI-adjacent traditional + finance (8)
33. JPMorgan (JPM) — IndexGPT? LLM Suite?
34. Bank of America (BAC) — Erica
35. Wells Fargo (WFC)
36. Morgan Stanley (MS)
37. Visa (V)
38. Mastercard (MA)
39. American Express (AXP)
40. Citigroup (C)

### Industrial / consumer (5)
41. Walmart (WMT) — supply chain AI
42. Procter & Gamble (PG)
43. Tesla (TSLA) — FSD as AI proxy
44. Disney (DIS)
45. Netflix (NFLX) — recommendation algos

### AI vendors to enterprise (5)
46. Verint Systems (VRNT)
47. UiPath (PATH) — agentic AI
48. SentinelOne (S) — AI for cybersec
49. CrowdStrike (CRWD) — AI for cybersec
50. SAP (SAP, ADR)

## Methodology limitations to disclose upfront

1. **Private companies excluded** — Anthropic, OpenAI, xAI, Mistral. They're the biggest AI revenue stories but no SEC filings. The bottom-up audit captures only public-side disclosure.
2. **10-K is annual; quarterly changes happen** — we'll note if a company has materially improved disclosure quarter-over-quarter.
3. **"Disclosure" ≠ "performance"** — a company can be a great AI business and a bad discloser. The DQS only measures transparency, not AI quality.
4. **Subjective scoring on "AI products with adoption metrics"** — we'll publish the per-company scoring detail so readers can re-score with their own rubric.

## Data sources (all public)

- **SEC EDGAR** (https://data.sec.gov/) — 10-K, 10-Q, 8-K filings, free JSON API
- **Investor relations sites** — earnings call transcripts (companies usually publish their own)
- **Motley Fool transcripts** — backup for earnings calls (free, decent coverage)
- **Stock Analysis on Net** — financial summaries (cross-check)
- **Company press releases** — for forward guidance + product launches

Zero paid sources (AlphaSense, Sentieo, S&P Capital IQ). Defensibly DIY.

## Effort breakdown

| Phase | Hours | When |
|---|---|---|
| Methodology + company list (this doc) | 1 | ✅ Today |
| Build SEC EDGAR fetcher script | 1.5 | Today |
| Fetch + cache 10-Ks for all 50 companies | 1 (mostly automated) | Today/Thu |
| Earnings call collection (semi-manual, IR sites + Motley Fool) | 4-5 | Thu-Sun |
| Score each company per rubric | 3-4 | Sat-Sun |
| Compute Talk-Show ratios | 1 | Sun |
| Sector / cohort analysis | 1 | Mon |
| Draft article | 3 | Mon-Tue |
| Build PDF report (reuse Indian Audit pipeline) | 2 | Tue |
| Press pitch prep + brand outreach (the named bottom 10 won't pitch back, but the top 10 will share) | 2 | Wed |
| Final voice + ship | 1 | Wed-Thu (Jun 9 ship) |

**Total: ~20-22 hours over 12 days.** Compressible to 14-16 hours if I'm efficient.

## Backlink opportunity model

Expected backlinks within 30 days of publish:

| Source | Expected count | Why |
|---|---|---|
| Named "exemplar" companies (top 10) sharing | 3-7 | IR teams love being called transparent |
| Named "opaque" companies (bottom 10) NOT sharing — but the press will pick it up | 0 direct, 3-8 indirect | Coverage from FT / Bloomberg / Stratechery / The Information |
| Marketing / analyst Twitter | 50-200 quote-tweets | The DQS becomes a metric others cite |
| Republication in AI newsletter (Ben's Bites, The Rundown) | 1-3 | If we pitch them with the headline numbers |
| LinkedIn (named exec engagement) | 5-15 | CFOs love being part of disclosure-quality conversations |

**Total realistic: 15-30 mid-to-high-DR backlinks within 30 days.** Beats the Indian Audit's likely 15-30 because the named-company list is bigger + more US/global.

## Reuse from Indian AI Search Audit pipeline

- ✅ Chrome-headless PDF generator
- ✅ Token-substitution rendering script
- ✅ Inline-SVG chart generator (adapt for DQS-leaderboard charts)
- ✅ Per-brand index card pattern (becomes per-company DQS card)
- ✅ Brand outreach template (becomes IR-team outreach template)
- ✅ Press pitch template (different publications: FT, WSJ, Bloomberg, Stratechery)

## Today's deliverables (this session)

1. ✅ This methodology doc
2. ⏳ Pick the 50 companies (above)
3. ⏳ Build SEC EDGAR fetcher (`scripts/track-c/fetch-edgar.mjs`)
4. ⏳ Test on 3 companies (MSFT, PLTR, AI) as proof of concept
5. ⏳ Commit branch + log progress

## Companion file

`data/track-c/c1-companies.csv` — single source of truth for the 50 companies, with CIK numbers, sectors, and a column per scoring criterion to be filled.
