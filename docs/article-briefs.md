# First 5 Article Briefs — ready to write

These are the launch-week priority posts. Each is briefed enough that you (or an Opus agent) can sit down and draft directly. Internal links assume the other launch posts will exist by ship date; cross-link them as you go.

---

## Brief 1 — "Best AI Coding Tools 2026: a shipper's honest ranking"

- **Slug:** `/blog/tools/best-ai-coding-tools-2026`
- **Pillar:** tools
- **Target primary keyword:** "best AI coding tool 2026" (and variants)
- **Secondary keywords:** "AI coding assistant comparison", "AI pair programmer 2026", "Cursor vs Claude Code vs Windsurf"
- **Search intent:** commercial investigation
- **Length:** 2,500–3,500 words
- **Disclosures:** `affiliateDisclosure: true`

### Structure

1. **Lede + verdict (2-3 sentences):**
   > After shipping three production AI SaaS this year using every major AI coding tool, here's my ranking. Short version: Claude Code for backend-heavy work, Cursor for fast iteration on full-stack apps, Antigravity for greenfield agentic work. The full ranking with use-case mapping below.

2. **Comparison table** — columns: Tool, Best for, Pricing, Speed, Context window, Verdict (1 word). Rows: Claude Code, Cursor, Windsurf, Antigravity, Copilot, Replit Agent, Bolt, v0, Lovable, Cline.

3. **The criteria I'm ranking on** — speed of iteration, code quality, context handling, debugging help, agentic capability, cost per useful PR. Be specific.

4. **The ranking, with one section per tool** — each section includes: real screenshot, real prompt, real result, what it did well, what it failed at, pricing, link.

5. **Recommendations by use case:**
   - Solo founder shipping a SaaS MVP → X
   - Backend-heavy work / complex refactors → Y
   - Non-technical founder learning to code → Z
   - Enterprise team → W
   - Greenfield agentic work → V

6. **What's coming next** — pace of releases in 2026, what to watch.

7. **FAQ:**
   - Is Cursor better than Claude Code in 2026?
   - Can I use multiple AI coding tools at once?
   - What's the cheapest decent AI coding tool?
   - Does Antigravity replace Cursor?
   - How much do I actually spend on AI coding per month?

### Internal links to make

- → /blog/tools/cursor-review
- → /blog/tools/claude-code-review
- → /blog/tools/antigravity-review
- → /tools/picker
- → /case-studies/prism (proof of practitioner credentials)

### Affiliate links to include

Cursor, Claude (via Anthropic if program available), Windsurf, Replit, Bolt, v0, Lovable.

---

## Brief 2 — "Cursor review (2026): real screenshots from shipping 3 SaaS"

- **Slug:** `/blog/tools/cursor-review`
- **Pillar:** tools
- **Target keyword:** "Cursor review" (high volume, weakly served)
- **Secondary:** "Cursor 2026", "is Cursor worth it", "Cursor pricing"
- **Length:** 2,000–2,800 words
- **Disclosures:** `affiliateDisclosure: true`

### Structure

1. **Lede:** "I've shipped three production AI SaaS using Cursor as my primary IDE. Here's the honest review — what it crushes, what it can't do, and whether it's worth $20/mo over Claude Code (free with Pro)."

2. **TL;DR card** — Best for / Not for / Pricing / Verdict score (e.g., 8.5/10).

3. **What Cursor actually is in 2026** — current feature set, recent updates.

4. **The 5 things Cursor does better than alternatives** — each with screenshot + prompt + result.

5. **The 3 things Cursor still gets wrong** — be honest, name them.

6. **Real usage data** — your monthly token usage, your monthly cost, your ratio of accepted-vs-rejected suggestions if measurable.

7. **Cursor vs Claude Code (quick)** — links to the full comparison post.

8. **Pricing breakdown** — Hobby, Pro, Business; what you actually get.

9. **Who should pick Cursor / who shouldn't.**

10. **FAQ:**
    - How much does Cursor actually cost per month for a solo developer?
    - Does Cursor work with Claude 4.7?
    - Is Cursor better than VSCode + Copilot?
    - Can Cursor do agentic work like Claude Code?
    - Is the Cursor free tier usable?

### Internal links

- → /blog/tools/best-ai-coding-tools-2026
- → /blog/tools/cursor-vs-claude-code
- → /blog/stack/cursor-nextjs-setup
- → /case-studies/citare (built mostly with Cursor)

---

## Brief 3 — "What is LLM FinOps?"

- **Slug:** `/blog/infra/what-is-llm-finops`
- **Pillar:** infra
- **Target keyword:** "LLM FinOps" (low competition, growing — own this term)
- **Secondary:** "AI cost optimization", "AI spend governance", "LLM cost management"
- **Length:** 1,800–2,400 words
- **Disclosures:** `prismDisclosure: true`

### Why this post matters

This is your category-defining post. You're claiming a flag on "LLM FinOps" as a term — similar to how Datadog claimed "observability" or Snowflake claimed "cloud data warehouse." Even if the term doesn't get huge volume yet, owning it pays compounding dividends as the category matures.

### Structure

1. **Lede:** "LLM FinOps is the practice of governing, optimizing, and forecasting an organization's spend on LLM APIs — the same way cloud FinOps did for AWS bills a decade ago. Here's what it actually involves, why it matters now, and how to start."

2. **The problem** — AI bills are exploding. Anecdote: "I watched our Anthropic bill go from $X to $Y in two weeks during the Citare launch. That's the moment FinOps stopped being optional."

3. **The four layers of LLM cost** — input tokens, output tokens, cache misses, idle context. Each explained with numbers.

4. **The five things LLM FinOps actually does:**
   - Visibility (per-feature, per-team cost attribution)
   - Optimization (caching, routing, model selection)
   - Governance (budget caps, model allowlists, audit logs)
   - Forecasting (predicting spend before scale)
   - Negotiation (committed-use pricing, multi-provider)

5. **Why now:** the LLM bill is now the second-largest cloud line item for many AI-native startups. Real numbers from public sources.

6. **The tools in this space:** Portkey, Helicone, LiteLLM, OpenRouter, Cloudflare AI Gateway, Langfuse, LangSmith. Honest one-liners on each — use the source-of-truth in `docs/seo-content-plan.md` § 5.

7. **Prism's wedge** (with disclosure): "I built Prism in this space because no proxy combined three-layer caching with measured savings on the invoice. Specific strengths: [...]. Specific limits: [...]."

8. **How to start a FinOps practice with one developer.**

9. **FAQ:**
   - Is LLM FinOps different from cloud FinOps?
   - When does a team need LLM FinOps?
   - Can I do this with spreadsheets?
   - What's the single biggest cost win?
   - How do I forecast LLM spend?

### Internal links

- → /blog/infra/portkey-vs-helicone-vs-litellm-vs-openrouter
- → /blog/infra/three-layer-llm-caching
- → /case-studies/prism
- → /tools/api-cost-calculator

---

## Brief 4 — "Portkey vs Helicone vs LiteLLM vs OpenRouter: honest 2026 comparison"

- **Slug:** `/blog/infra/portkey-vs-helicone-vs-litellm-vs-openrouter`
- **Pillar:** infra
- **Target keyword:** "Portkey vs Helicone" + "LLM gateway comparison" + variants
- **Secondary:** "best AI gateway", "LiteLLM alternatives", "OpenRouter alternatives"
- **Length:** 3,000–4,000 words
- **Disclosures:** `prismDisclosure: true`, `affiliateDisclosure: true`

### Why this post matters

High commercial intent. People searching this are minutes from a buying decision. The competitors don't have content that fairly compares all four. You can own this SERP.

### Structure

1. **Lede:** "Four products dominate the LLM gateway category in 2026: Portkey, Helicone, LiteLLM, and OpenRouter. I've evaluated all four for my own projects, and here's the honest comparison — including disclosure that I've also built a fifth product (Prism, by Ssimplifi) in this space, which I introduce at the end without framing the rest unfairly."

2. **Disclosure block** — explicit at top.

3. **TL;DR table** — Each tool: best for / pricing / open source? / caching / observability / governance / verdict.

4. **The category map** — what an LLM gateway actually does (routing, caching, observability, governance). Diagram if possible.

5. **Portkey** — what they do well (observability-first), their pricing, who they win for, their limits.

6. **Helicone** — open-source observability + thin gateway, who they win for, where they fall short.

7. **LiteLLM** — the OSS substrate, who self-hosts, who buys the managed product.

8. **OpenRouter** — strongest multi-provider routing, no caching wedge, who they win for.

9. **A fifth option: Prism (by Ssimplifi)** — with explicit "disclosure: I built this" framing. Specific wedge: three-layer caching + measured savings + edge routing + FinOps governance. Honest limits: smaller team, no SOC 2 yet, newer than the others.

10. **Recommendation matrix:**
    - Observability-first need → Helicone or Langfuse
    - Self-host OSS substrate → LiteLLM
    - Best multi-provider router only → OpenRouter
    - Production observability + governance (mid-stage startup) → Portkey
    - Cost-first with measured savings → Prism

11. **FAQ:**
    - What is an LLM gateway?
    - Do I need a gateway if I only use one provider?
    - What's the cheapest LLM gateway?
    - Can I switch between gateways easily?
    - Should I self-host LiteLLM or use a managed service?

### Internal links

- → /blog/infra/what-is-llm-finops
- → /blog/infra/three-layer-llm-caching
- → /blog/infra/portkey-alternatives
- → /case-studies/prism
- → /tools/api-cost-calculator

---

## Brief 5 — "How I built Prism solo — architecture, costs, the actual story"

- **Slug:** `/case-studies/prism`
- **Type:** case study
- **Target keyword:** "how to build an LLM gateway", "OpenAI proxy architecture"
- **Secondary:** brand searches (Prism Ssimplifi, OpenAI compatible gateway)
- **Length:** 3,500–5,000 words
- **Disclosures:** Prism is the author's product — frame as case study, not advocacy.

### Why this post matters

This is the single best post on the launch list for backlinks. HN, r/LocalLLaMA, Twitter — this is the post that goes viral if any do. It establishes you as someone who actually ships infra, not just writes about it.

### Structure

1. **Lede:** "Prism is an OpenAI-compatible AI gateway I built solo that competes with Portkey, Helicone, LiteLLM, OpenRouter, and Cloudflare AI Gateway. Here's the architecture, the costs, the decisions I'd remake, and the ones I'd keep."

2. **What Prism is** — brief 3-sentence framing.

3. **The wedge — why I built it** — what I needed that nothing else gave me. Specifically: measured savings on every request, with provider-native passthrough.

4. **Architecture deep-dive:**
   - Edge layer: Cloudflare Worker in 300+ cities (auth, classify, cache lookup)
   - Cache layer 1: exact Redis fingerprint (Upstash Redis)
   - Cache layer 2: semantic via Upstash Vector + BGE-small embeddings
   - Cache layer 3: provider-native passthrough (Anthropic prompt cache, OpenAI auto-cache)
   - Routing: classifier picks model per request (Eco / Balanced / Sport)
   - Failover: rolling-window Redis health tracking; speculative racing for Pro/Team
   - Storage: Workers KV for cache replication; Supabase Postgres for usage_logs
   - Observability: per-request explorer, X-Prism-Tags for cost attribution

5. **Five hard decisions I made differently than competitors:**
   - Showing measured savings on the invoice (not estimates)
   - Provider-native cache passthrough as a first-class layer
   - Cloudflare Workers KV for edge cache replication
   - FinOps in the hot path, not via SDK
   - OpenAI-compatible API surface, not a custom one

6. **What it cost to build (months 1-6):**
   - Time: X hours/week
   - Cloud bill: $X/month at start, $Y/month at current scale
   - Tools used: Claude Code, Cursor, Antigravity (link to reviews)
   - Cost of mistakes: at least one specific story

7. **What I'd do differently:** be honest.

8. **What's next:** roadmap teasers.

9. **For other solo founders building infra:** practical advice.

10. **Try it:** Pro $19/mo, Team $49/mo, Free 50K tokens/day, no credit card.

### Internal links

- → /blog/infra/what-is-llm-finops
- → /blog/infra/three-layer-llm-caching
- → /blog/infra/portkey-vs-helicone-vs-litellm-vs-openrouter
- → /blog/stack/cloudflare-workers-edge-routing
- → /case-studies/citare
- → /case-studies/batchwise

### External links

- ssimplifi.com (product)
- Anthropic prompt caching docs
- OpenAI auto-cache docs
- Upstash Vector
- Cloudflare Workers KV docs
