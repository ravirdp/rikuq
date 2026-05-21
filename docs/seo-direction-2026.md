# Post-May-2026 SEO/GEO Direction — Universal Brief

**Status:** Living document. Update whenever a material algorithm change, guideline, or AI-search event lands.
**Last updated:** 2026-05-21
**Maintainer:** Ravi
**Scope:** Portable. Apply to any content or product-marketing site (rikuq.com, BatchWise, Citare, Ssimplifi, future properties). Not site-specific.

---

## How to use this doc

- Read top-to-bottom once. Then bookmark.
- When handing SEO/GEO work to an Opus agent on any property, paste the canonical URL of this doc into its context, or include the full text in its system prompt.
- When a new core update, AI-search announcement, or Google guidance drops:
  1. Add a dated entry to the **Changelog** at the bottom (latest first).
  2. Update the affected section in-place.
  3. Commit with `docs(seo): <one-line change summary>`.
- If a recommendation here ever conflicts with a property's own SEO strategy doc, *this doc wins for new work*. Migrate the property's plan, don't fork the guidance.

---

## Current operating context (as of 2026-05-21)

Three things happened in close succession that reset the playing field:

1. **March 2026 Google core update** (rolled out Mar 27 – Apr 8). The most volatile core update in years — ~80% of top-3 results shifted, ~25% of top-10 pages fell out of the top 100. The explicit winning theme was **originality and information value**: pages that rephrase existing rankings collapsed; pages with first-party data and strong brands surged. Intermediaries lost; brands won.
2. **Google's first AI-search optimization guide** (published May 15, 2026 on Search Central Blog). Headline: *"AEO and GEO are still SEO."* No separate optimization tracks for AI Overviews, AI Mode, or Featured Snippets — strong foundational SEO with original, expert content wins all of them.
3. **Google I/O 2026** (May 19, 2026). AI Overviews now appear on **~48% of queries** (up from ~34.5% in Dec 2025). When AI Overviews appear, **organic CTR drops 34–46%**.

Google was unambiguous that these are **NOT needed** for its AI features:
- `llms.txt` (note: keep it anyway for non-Google AI engines — see below)
- Content chunking
- AI-specific rewriting
- "AI-specific" schema

Other AI engines (**ChatGPT** uses Bing, **Claude** uses Brave + own crawl, **Perplexity** uses its own index) still operate on different stacks. The four-index reality holds for *non-Google* AI search; Google's own AI features are now openly stitched into its main ranking. Frame accordingly.

---

## The winning content profile (universal)

A page that ranks and gets cited in 2026 has all of these:

- **First-party data or first-party experience.** A number, a screenshot, a result, a benchmark, a price you computed — anything no other page can copy. *If a competitor can write your article from publicly available sources, you don't have a moat.*
- **Real author identity** — name, photo, bio, verifiable credentials, links to other owned properties (entity graph). Anonymous content underperforms across the board.
- **A clear verdict.** "It depends" loses to "Here's what I recommend and why." Decisive content is cited; hedged content is summarized away.
- **Specific, mid/bottom-funnel intent.** "Best X" loses to "X vs Y for [specific use case]." Top-of-funnel head terms are now mostly answered inside AI Overviews — the click is gone.
- **Structured for AI lifting:** comparison tables near the top, FAQ schema, clean headings, definitive answers in the first 100 words. Not because of magic AI signals, but because both Google's AI and traditional SERPs extract these well.
- **Freshness markers** — visible "Last updated [date]" and actual updates. Stale content drops faster than before.

---

## Stop doing

- **Padded head-term listicles** ("Top 15 X tools in 2026") without real testing data. AI Overviews eat the click; the page does nothing.
- **Pure aggregation** of competitor specs/features. Re-summarizing public information is now a negative ranking signal.
- **Anonymous "we" voice** on small/medium sites. Personal/founder bylines outperform.
- **Over-optimization for `llms.txt`** as your primary lever. Keep one, fine — but it's not the magic GEO bullet anyone sold you in 2024–2025.
- **"GEO vs SEO" framing as separate disciplines.** They're the same on Google. (The four-index reality still holds for ChatGPT/Claude/Perplexity — but don't frame Google's AI as a separate SEO discipline.)
- **Generic AI-written content with no human editing/testing.** Easy to detect, ranked down.

## Start doing / double down

- **Build first-party datasets.** Run your own benchmarks, surveys, cost analyses, A/B results. Even one original chart per post raises the page's defensibility dramatically.
- **Specific-intent comparison content.** "[Tool A] vs [Tool B] for [specific use case]" — these still convert because users *have to click* to make a decision.
- **Case studies + teardowns of real things you've shipped or measured.** Highest cited, hardest to copy.
- **Author entity graph.** On every property, the author's Person schema should `sameAs` link to their other owned domains + LinkedIn + GitHub + social. Bidirectional. This is how Google now verifies real-human authorship.
- **Strong brand signals.** Direct/branded traffic is the most defensible bucket left — invest in Twitter/X, Reddit, HN, LinkedIn, podcast appearances, newsletter list. These also indirectly feed AI training data.
- **FAQ schema + clean tables.** Mechanical. Improves both classical CTR and AI-extraction probability.
- **Update cadence.** Top 10 pages by traffic should be reviewed quarterly, updated with new data/dates. The "Last updated" line is a real signal.

---

## Property-level checklist (apply to any site)

- [ ] Every post has a real author byline + linked bio + photo
- [ ] Author Person schema includes `sameAs: [all owned properties, social profiles]`
- [ ] Organization schema includes `founder` → Person with same `sameAs`
- [ ] Every comparison/review post has a comparison table within first 2 sections
- [ ] Every post has FAQ section with `FAQPage` JSON-LD
- [ ] Every post has visible "Last updated" date
- [ ] Top 20% of posts by traffic are queued for quarterly refresh
- [ ] No anonymous "we" framing on author-credible content
- [ ] At least one original data point (benchmark, screenshot, price, result) per piece
- [ ] Internal linking from new posts to ≥2 existing cornerstone posts
- [ ] `robots.txt` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended (don't block AI crawlers — they're a discovery channel, not a threat)
- [ ] `llms.txt` and `llms-full.txt` present (low effort, helps non-Google AI; ignore Google's stance on this — it doesn't *hurt*)
- [ ] No mass internal/external link patterns that look manipulative
- [ ] Page speed + Core Web Vitals clean (still matters)

---

## How to measure success now

Traditional rank tracking is partially obsolete. New metrics worth instrumenting:

- **AI Overview presence/absence** per target keyword
- **Citations in ChatGPT / Claude / Perplexity** for target queries
- **Branded search volume** trend (proxy for brand strength)
- **Direct + referral traffic share** (the most defensible bucket)
- **Quarterly: % of your top pages that are >6 months stale** — keep under 30%

---

## One-line summary

> Originality, identity, and decisive verdicts win. Generic, anonymous, and aggregated lose. Build brand, ship first-party data, optimize for the click that still happens (mid/bottom funnel), and stop chasing magic AI signals — the same content quality wins on Google, ChatGPT, Claude, and Perplexity simultaneously.

---

## Per-property quick adaptations

These are starting-point notes; refine over time.

**rikuq.com (personal brand + content):**
- Case studies > tool reviews on weighting. Personal byline mandatory. Reframe "GEO vs SEO" angle per above.

**Citare:**
- Lean into the four-index reality for *non-Google* AI engines. Drop framing where Google AI Overviews are presented as a separate index from Google Search — they aren't anymore. Add explicit "Google AI Overview is SEO" page to capture confused searchers.

**Ssimplifi / Prism:**
- First-party savings data and `X-Prism-Cache-*` header reality is exactly the kind of original signal Google now rewards. Lean harder into product docs that *show* numbers.

**BatchWise:**
- Compliance content is naturally first-party (regulatory specifics change frequently — quarterly refresh is mandatory). Author identity matters even more in YMYL categories. Add credential/registration line under every author byline.

---

## Sources behind the current guidance

- [Google's New AI Search Guide Calls AEO And GEO 'Still SEO' — Search Engine Journal](https://www.searchenginejournal.com/googles-new-ai-search-guide-calls-aeo-and-geo-still-seo/575026/)
- [Google I/O 2026: How the AI search update changes SEO visibility — Launchcodex](https://launchcodex.com/blog/seo-geo-ai/google-io-ai-search-seo-update/)
- [Google's Latest Algorithm Update: AI SEO and Quality Content — QC Fixer](https://www.qcfixer.com/2026/05/15/google-algorithm-update-ai-seo-quality-content-2026/)
- [SEO After AI Overviews: Complete Strategy Guide 2026 — Digital Applied](https://www.digitalapplied.com/blog/seo-after-ai-overviews-complete-strategy-guide-2026)
- [March 2026 Google core update more volatile than December — Search Engine Land](https://searchengineland.com/march-2026-google-core-update-what-changed-474397)
- [Google May 2026 Algorithm Updates — SEO Vendor](https://seovendor.co/google-may-2026-algorithm-updates/)

---

## Changelog

*Newest first. When the doc updates, add a dated bullet here with what changed and why.*

- **2026-05-21** — Initial version. Captures the March 2026 core update + May 15 AI-search guide + I/O 2026 announcements. Establishes the "originality + identity + decisive verdict" doctrine and the property-level checklist.
