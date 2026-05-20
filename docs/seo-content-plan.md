# rikuq.com — SEO + GEO Content Plan

**Last updated:** 2026-05-20
**Status:** Pre-launch planning. Target: launch with 32 pages + 3 tools.
**Owner:** Ravi

---

## 1. Wedge & Positioning

**Tagline territory:** *The practitioner's blog for solo founders shipping real AI SaaS — not toy projects.*

**The wedge:** Production vibe coding, with **LLM infrastructure / FinOps as the authority spike**.

- **Audience:** Solo founders, indie hackers, and small teams shipping AI products that real users pay for. Not hobbyists, not enterprise — the middle band of serious solo/small-team builders.
- **Brand voice:** First-person practitioner. Real prompts, real screenshots, real costs, real failures. No "we" / faceless content.
- **Author trust signal:** Three shipped AI SaaS products (BatchWise, Citare, Prism). The About page is the moat.

**Why this wedge wins:**
- Tool reviews give volume + fast affiliate revenue.
- Infra / FinOps / GEO content is **unwritable by 99% of competitors** — they haven't built the underlying systems. This is the durable moat.
- LLMs cite practitioners with shipped products over content marketers. GEO compounds.

---

## 2. Existing Properties (the backlink network)

These are existing, indexed, live properties owned by Ravi. Each will link to rikuq.com from appropriate footer/about/blog locations — instant contextual backlinks from already-trusted domains.

| Property | URL | What it is | Backlink role for rikuq |
|---|---|---|---|
| **BatchWise** | batchwise.ai | Indian compliance marketplace (GST, ITR, ESG, SEBI BRSR) for SMEs + enterprise | Footer "built by" link → rikuq. Case study post lives on rikuq. |
| **Citare** | citare.ai | Dual SEO + AI-search visibility platform (tracks ChatGPT, AI Overview, Gemini, Claude, Perplexity) | Footer link + blog cross-posts on GEO topics → rikuq. |
| **Prism (by Ssimplifi)** | ssimplifi.com / api.ssimplifi.com | OpenAI-compatible AI gateway with measured savings, three-layer caching, edge routing, FinOps governance | Footer "built by" → rikuq. Educational content lives on rikuq, advocacy content on ssimplifi. |

**Backlink action items (Phase 0 of launch):**
- [ ] Add "Built by Ravi — read more at rikuq.com" to footer of all three properties.
- [ ] Add about/team page entry on each property linking to rikuq.com author page.
- [ ] Cross-link blog content where natural (e.g., Citare's GEO posts → rikuq's GEO category; Prism's docs → rikuq's caching explainer).

---

## 3. Site Topology

```
rikuq.com
├── /                              → Hero: "Solo founder. 3 AI SaaS shipped. Here's how."
├── /about                         → Bio + trust signals + links to BatchWise/Citare/Prism
├── /products                      → Portfolio hub linking to all three properties
├── /blog                          → All long-form content (categorized)
│   ├── /blog/tools                → AI coding tool reviews & comparisons (Pillar 1)
│   ├── /blog/infra                → LLM infrastructure, gateways, caching, FinOps (Pillar 2)
│   ├── /blog/geo                  → AI search optimization, indexing, citation (Pillar 3)
│   └── /blog/stack                → Stack, ops, deployment (Pillar 4)
├── /case-studies                  → Deep teardowns of BatchWise, Citare, Prism
├── /tools                         → Interactive tools (quiz, calculators)
│   ├── /tools/picker              → "Which AI coding tool fits you?" quiz
│   ├── /tools/picker/result/:slug → Permalinkable result pages (8–12 SEO pages from one tool)
│   ├── /tools/api-cost-calculator → AI API cost calculator
│   └── /tools/stack-picker        → Stack recommender
└── /newsletter                    → Email capture
```

**Tech stack (decided):**
- Astro or Next.js (static + MDX), TBD on first build
- Hosting: Vercel or Cloudflare Pages
- Analytics: Plausible/Umami + Google Search Console + GA4
- Schema: JSON-LD on every post (Article, FAQPage, HowTo, SoftwareApplication where relevant)

---

## 4. Content Pillars

### Pillar 1 — AI coding tools (volume + affiliate revenue)
Reviews, comparisons, alternatives, framework-specific setup. Drives the biggest keyword volume. Affiliate links to Cursor, Claude Code, Windsurf, Antigravity, Copilot, Replit, Bolt, v0, Lovable.

### Pillar 2 — LLM infrastructure & FinOps (authority spike — the moat)
AI gateways, caching, model routing, cost optimization, observability, governance. Almost unwritable by competitors. Crosses over with Prism's category. Drives Prism signups and personal authority simultaneously.

### Pillar 3 — GEO / AI search (second moat)
How AI search actually indexes and cites content. Crosses over with Citare's category. Drives Citare signups + authority.

### Pillar 4 — Stack & ops (long-tail SEO + supporting content)
Supabase, Vercel, Cloudflare, Redis, Upstash, Oracle Cloud — your actual production stack. Long-tail rank potential, affiliate links to managed services.

---

## 5. Honesty Doctrine for Comparison Content

This is the brand's contract with readers and a key differentiator.

**The rule:** every comparison post must be defensible if a competitor reads it.

1. **No hidden agenda framing.** When Prism is in the comparison, it is introduced *transparently* — "Disclosure: Prism is built by the author of this site." Stated at top, not buried.
2. **No straw-manning.** Portkey, Helicone, LiteLLM, OpenRouter, Cloudflare AI Gateway, Langfuse, LangSmith all get accurate strengths described. We do not weaken them to make Prism look good.
3. **Recommend the actual best tool per use case**, even when that's not Prism. Example: if a reader's only need is observability, Helicone or Langfuse is the better recommendation — say so.
4. **Prism enters as a credible new competitor with a specific wedge** — measured savings + native-cache passthrough + edge replication + FinOps governance. Not "the best at everything." Specific strengths, specific limits.
5. **Cite real numbers where we have them** (Prism's own data). Don't fabricate competitor numbers — link to their public docs/pricing.
6. **Update dates visible.** Every comparison post has a "Last updated" date. Stale comparisons damage trust faster than missing ones.

**What Prism honestly is in the landscape (use this framing in posts):**
> Prism is a new entrant (production since 2026) competing with Portkey, Helicone, LiteLLM, OpenRouter, and Cloudflare AI Gateway. Its specific wedge: it's the only proxy that combines three-layer response caching (exact + semantic + provider-native passthrough), measures realised savings, and shows them on the invoice. Edge replication via Cloudflare Workers + KV puts cache hits at ~50–180ms globally. Built by one founder; smaller team than Portkey/Helicone; no SOC 2 yet; ideal for solo devs through mid-stage startups, not regulated enterprise.

**Competitor one-liners (source-of-truth, reused in posts):**
- **vs Portkey:** Portkey is observability-first; cache is opt-in and savings aren't surfaced as a primary KPI. Prism leads with measured savings + provider-native cache passthrough as defaults.
- **vs Helicone:** Helicone is excellent observability + thin gateway. Prism is gateway-first with observability + caching + governance unified — one product, not three integrations.
- **vs LiteLLM:** LiteLLM is the OSS substrate. Prism is a managed product on top with the cost wedge + savings flywheel + edge replication built-in.
- **vs OpenRouter:** OpenRouter does multi-provider routing well. Prism adds caching as the wedge + FinOps layer (budgets, policy, audit) + edge replication.
- **vs Cloudflare AI Gateway:** CF has the edge advantage. Prism is OpenAI-compatible (CF AI Gateway is largely CF-proprietary at integration time) + full observability + governance built-in.
- **vs Langfuse / LangSmith:** Observability-only tools. Prism's observability is the bonus on top of a working gateway.

---

## 6. The 32-Page Launch Plan (sequenced by phase)

Each phase is ordered. Don't skip ahead within a phase. Quality bar: ruthless. Better to launch with 28 excellent pages than 32 padded ones.

### Phase 0 — Foundation
- [ ] Domain confirmed: rikuq.com
- [ ] Stack decided + scaffolded
- [ ] Analytics + GSC + sitemap
- [ ] Author bio + photo + social proof drafted
- [ ] Backlinks added on BatchWise, Citare, Ssimplifi footers/about pages
- [ ] Brand voice & style guide doc (first-person, practitioner, data-forward)

### Phase 1 — Core AI coding tool reviews (5 pages)
High-revenue commercial intent. Build first because they take longest to rank.

1. **Best AI Coding Tools 2026** — mega cornerstone. ~3,000 words. Comparison table. Verdict per use case.
2. **Cursor review** — deep, real screenshots from shipped projects.
3. **Claude Code review** — deep, with prompts and workflows that work.
4. **Antigravity review** — low competition (almost no good content exists yet); easy ranking.
5. **Windsurf review**

### Phase 2 — Hero tool (1 tool)
6. **"Which AI coding tool fits you?" quiz** (`/tools/picker`)
   - 6–8 questions: language, project type, budget, deployment target, team size
   - Outputs Cursor / Claude Code / Windsurf / Antigravity / Copilot / Replit / Bolt / v0 / Lovable with affiliate links
   - Each result is permalinkable (`/tools/picker/result/cursor-for-nextjs-saas`) → 8–12 indexed pages
   - Email capture optional at result reveal

### Phase 3 — Coding tool head-to-head comparisons (3 pages)
Cross-link with Phase 1 reviews.

7. **Cursor vs Claude Code**
8. **Cursor vs Antigravity**
9. **Claude Code vs Cursor for production work**

### Phase 4 — LLM infrastructure / FinOps content (6 pages) — THE MOAT
Authority spike. Largely unwritable by competitors. Drives Prism signups via soft mentions.

10. **What is LLM FinOps?** — category-defining post. Own the term.
11. **Portkey vs Helicone vs LiteLLM vs OpenRouter** — mega-comparison. Honesty doctrine applies. Prism introduced as new entrant with specific wedge.
12. **Portkey alternatives** — high commercial intent, weak incumbents.
13. **Three-layer LLM caching explained** — exact + semantic + provider-native passthrough. Definitive technical explainer.
14. **Anthropic prompt caching in production: real numbers** — data from Prism's own usage logs.
15. **Multi-provider failover patterns for LLM apps** — practical engineering.

### Phase 5 — Case studies (4 pages) — viral fuel
HN / Reddit / Twitter material. Backlink machines.

16. **How I built Prism — competing with Portkey solo** — architecture, prompts, costs, decisions.
17. **How I built Citare — AI search monitoring architecture** — four-index reality, vision parsing, bot detection.
18. **How I built BatchWise — Indian compliance marketplace** — marketplace logic, document workflow, payment routing.
19. **3 production AI SaaS solo: my stack, costs, process** — the meta post tying it all together.

### Phase 6 — GEO content (4 pages) — second moat
Citare's category. Drives Citare signups.

20. **The four-index reality: how AI search actually works** (repurpose from Citare's positioning)
21. **GEO vs SEO in 2026** — definitions, overlap, differences
22. **How to get cited by ChatGPT, Claude, Perplexity** — practical playbook
23. **AI crawler bot detection: what most sites get wrong**

### Phase 7 — Additional tools (2 tools)

24. **AI API cost calculator** (`/tools/api-cost-calculator`)
    - Input tokens, output tokens, model, caching %, request volume
    - Compares Claude / GPT / Gemini / Llama-hosted
    - Affiliate links to OpenRouter, Anthropic; soft mention of Prism for further savings
    - Most-searched, weakest incumbents

25. **Stack picker** (`/tools/stack-picker`)
    - "I'm building a [SaaS / mobile app / internal tool / AI wrapper]"
    - Outputs: framework + auth + DB + hosting + payments
    - Affiliate to Clerk, Supabase, Vercel, Stripe, Resend

### Phase 8 — Long-tail / stack content (7 pages)
Fast-ranking satellite content. Each links back to a Phase 1 review and a Phase 2/7 tool.

26. **Supabase + Vercel + Cloudflare production stack** — your actual stack, real costs.
27. **Edge routing for LLM APIs with Cloudflare Workers + KV** — direct from Prism's architecture.
28. **Cursor + Next.js complete setup**
29. **Claude Code system prompts that actually work**
30. **Upstash Vector for semantic caching (tutorial)**
31. **Redis caching patterns for LLM apps**
32. **Best AI coding tool for solo founders** — commercial intent, funnels to quiz.

---

## 7. Per-Article Quality Bar

Every article ships with:
- [ ] First-person voice, real practitioner POV
- [ ] At least one real screenshot or code block from shipped projects
- [ ] Comparison table near the top (AI-search loves structured data)
- [ ] Concrete costs / times / errors broken down (no hedging)
- [ ] Clear verdict — not "it depends" fluff
- [ ] FAQ section with FAQPage schema
- [ ] "Last updated [date]" prominent
- [ ] Internal links to ≥2 other rikuq pages
- [ ] External links to primary sources (provider docs, GitHub)
- [ ] Author byline with bio link
- [ ] JSON-LD schema (Article + FAQPage + SoftwareApplication where applicable)

---

## 8. Content Split: rikuq vs ssimplifi vs citare

| Content type | Lives on | Why |
|---|---|---|
| "Portkey vs Helicone vs LiteLLM" (educational) | rikuq.com | Neutral practitioner authority; soft-promotes Prism |
| "Why we chose [X] in Prism" (case study) | rikuq.com | Author voice, not product marketing |
| "Prism vs Portkey" (direct comparison) | ssimplifi.com | Bottom-of-funnel, lives on product site |
| "What is LLM FinOps" (category-defining) | rikuq.com | Authority pages compound the personal brand |
| "Three-layer caching explained" (technical concept) | rikuq.com | Educational, Prism shown as proof |
| "The four-index reality" (GEO category) | rikuq.com (with citare cross-link) | Author voice; Citare = the tool |
| "Citare vs Ahrefs" (direct comparison) | citare.ai | Bottom-of-funnel for Citare |
| Prism product docs / API reference | ssimplifi.com | Product surface |
| Citare product docs / migration guides | citare.ai | Product surface |

**Rule of thumb:** educational + neutral → rikuq. Advocacy for a specific product → that product's site.

---

## 9. Launch Day Mechanics

When all 32 pages + 3 tools are live:

- [ ] Submit sitemap to Google Search Console + Bing Webmaster Tools
- [ ] Product Hunt launch (Tuesday 12:01am PST)
- [ ] Hacker News Show HN — lead with the quiz tool, not the blog
- [ ] Reddit posts: r/SideProject, r/SaaS, r/learnprogramming, r/cursor, r/LocalLLaMA (each with a tailored angle)
- [ ] Twitter/X thread: "I shipped 3 AI SaaS solo. Here's everything I learned." → link to mega-comparison
- [ ] IndieHackers post focused on solo founder lessons
- [ ] LinkedIn post for B2B / FinOps reach
- [ ] Email outreach to AI gateway / FinOps newsletter writers with a custom angle
- [ ] **Goal:** 30–50 backlinks in launch week (not from launch sites themselves, but from people who write about your launch)

---

## 10. Realistic Targets (6-Month Ramp)

Assumes 4 quality articles/week post-launch (~6–10 hrs/week of Ravi's time on top of running the three properties).

| Month | Cumulative pages | Monthly visitors | Revenue (USD) | Milestone |
|---|---|---|---|---|
| 1 | 32 (launch) + 4 | 50–500 | $0–$50 | Indexing; launch traffic decays; first long-tail rankings appear |
| 2 | 40 | 800–2,000 | $50–$300 | Mid-tail starts ranking; first affiliate signups; first Prism signups attributable |
| 3 | 48 | 2,000–5,000 | $300–$1,500 | One case study catches fire on HN/Reddit; AI search starts citing infra/GEO posts |
| 4 | 56 | 5,000–10,000 | $1,000–$3,000 | Compounding kicks in; 2–3 articles become breadwinners |
| 5 | 64 | 10,000–20,000 | $2,000–$6,000 | Domain authority pulling new posts up faster |
| 6 | 72 | 20,000–40,000 | $4,000–$10,000 | Real business; decide whether to double down or hire |

**Revenue mix (target by month 6):**
- ~40% AI coding tool affiliate (Cursor, Claude Code, Windsurf, etc.)
- ~25% infra / stack affiliate (Vercel, Supabase, Clerk, Resend, Stripe)
- ~20% Prism signups (attributed via UTM)
- ~10% Citare signups (attributed via UTM)
- ~5% other (sponsorships, possible newsletter ads later)

**Year 1 realistic exit run-rate:** $5,000–$15,000/month.
**Top-decile outcome:** $25,000+/month by month 18.

---

## 11. Open Decisions / Pushback Notes

These remain undecided and should be resolved before/during Phase 0:

1. **rikuq as the public-facing brand name** — memorable URL but unusual word. Acceptable to commit to, but worth a moment of "do I want to introduce myself as rikuq verbally?" before launch. Alternative: personal-name domain.
2. **Static stack choice** — Astro vs Next.js. Astro is lighter for content-heavy sites; Next.js gives more flexibility for tools. Recommend Astro for content + separate Next.js for tools, or just Next.js for both.
3. **Newsletter from day 1?** — Recommended yes (ConvertKit/Resend Audiences). Email list is the only asset that survives Google updates.
4. **Public commitment** — building in public (Twitter / LinkedIn) doubles the ramp via direct traffic + backlinks. Worth committing now.

---

## 12. Phase 0 Checklist (do this first)

- [ ] Commit this plan doc to the repo (done)
- [ ] Confirm wedge & domain
- [ ] Scaffold the site (stack chosen, deployed, blank but live)
- [ ] Add footer + about backlinks on BatchWise, Citare, Ssimplifi
- [ ] Write author bio + take a real headshot
- [ ] Set up analytics, GSC, sitemap
- [ ] Draft the first 5 article briefs (titles confirmed, target keywords, outlines)
- [ ] Decide newsletter provider and embed signup
- [ ] Decide on a public posting cadence (e.g., 2 articles/week + 1 Twitter thread)

---

*This doc is the source of truth for the rikuq.com content strategy. Update it as decisions evolve. Don't let it go stale — review monthly.*
