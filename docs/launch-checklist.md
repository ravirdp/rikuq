# Launch Checklist — rikuq.com

A single source of truth for everything from now until launch day. Mark items as you go.

## Phase 0 — foundation (this is where we are)

### Decisions (locked)
- [x] Wedge: "Production vibe coding for solo AI SaaS founders" with LLM infra/FinOps spike
- [x] Domain: rikuq.com
- [x] Content split: educational on rikuq; product advocacy on ssimplifi / citare / batchwise
- [x] Build in public
- [x] Cadence: 4 posts / week
- [x] Stack: Astro 5 + React islands on Cloudflare Pages, Workers for tool logic, KV for storage, Resend Audiences for newsletter

### Repo + scaffold (done)
- [x] `git init` `/Users/ravi/code/rikuq`
- [x] Astro scaffold with package.json, astro.config.mjs, tsconfig.json
- [x] Content collections + Zod schema (`src/content/config.ts`)
- [x] Base layouts + components (BaseLayout, PostLayout, Header, Footer, BaseHead, ArticleSchema, DisclosureBanner, NewsletterSignup)
- [x] Homepage, About, Products
- [x] Blog index + per-pillar pages + post template
- [x] Case studies index + template
- [x] Tools landing page
- [x] RSS feed, 404 page
- [x] Global styles + tokens (dark/light auto)

### SEO + GEO foundation (done)
- [x] `robots.txt` with explicit AI crawler allowlist (GPTBot, ClaudeBot, PerplexityBot, etc.)
- [x] `llms.txt` (short index)
- [x] `llms-full.txt` (long-form content index)
- [x] Sitemap (via @astrojs/sitemap, auto-generated)
- [x] JSON-LD schema in BaseHead + ArticleSchema + FAQPage
- [x] Person schema on homepage and About
- [x] Open Graph + Twitter Card meta tags
- [x] Canonical URLs on every page

### Strategy docs (done)
- [x] SEO content plan (`docs/seo-content-plan.md`)
- [x] Brand voice guide (`docs/brand-voice.md`)
- [x] First 5 article briefs (`docs/article-briefs.md`)
- [x] Affiliate program shortlist (`docs/affiliate-programs.md`)
- [x] UTM conventions (`docs/utm-conventions.md`)
- [x] About bio variants (`docs/about-bio.md`)
- [x] This launch checklist

### Outstanding for you (Ravi)
- [ ] **Backlinks** — the three Opus prompts you've already sent for BatchWise / Citare / Ssimplifi. Verify they ship.
- [ ] `npm install` in `/Users/ravi/code/rikuq` and verify `npm run dev` builds clean
- [ ] Create GitHub repo (public recommended — small backlink, dev credibility) and push
- [ ] Wire up Cloudflare Pages: connect GitHub repo, set build = `npm run build`, output = `dist`
- [ ] Buy/point rikuq.com to Cloudflare Pages
- [ ] Take a real headshot (or commission one)
- [ ] Decide on logo / wordmark beyond the SVG favicon (optional — type-only is fine)
- [ ] Sign up for affiliate programs (see `docs/affiliate-programs.md`)
- [ ] Create dedicated email (e.g., `hi@rikuq.com`, `affiliates@rikuq.com`) via Cloudflare Email Routing
- [ ] Sign up for Resend Audiences, get API key + audience ID, add to `.env`
- [ ] Sign up for Plausible (or use Cloudflare Web Analytics — already in BaseHead)
- [ ] Decide newsletter cadence (recommend Friday weekly)

## Phase 1 — analytics + search consoles

- [ ] Google Search Console: add property, verify (via Cloudflare DNS TXT record), submit sitemap `https://rikuq.com/sitemap-index.xml`
- [ ] Bing Webmaster Tools: same flow, submit sitemap (Bing index powers ChatGPT search)
- [ ] IndexNow: generate key file, host at `https://rikuq.com/{key}.txt`, configure ping on publish (Astro has community integrations)
- [ ] GA4 property: create, drop measurement ID into `PUBLIC_GA4_MEASUREMENT_ID`
- [ ] Cloudflare Web Analytics: enable for rikuq.com, copy token into `PUBLIC_CF_BEACON`
- [ ] Plausible: add domain, copy snippet (already conditionally loaded in BaseHead)
- [ ] Define Plausible goals: outbound to ssimplifi/citare/batchwise, newsletter signup, tool result reached

## Phase 2 — content (the actual launch content)

### The 32 launch pages (sequenced by phase from seo-content-plan.md)

**Phase 1 — Core tool reviews (5)**
- [ ] /blog/tools/best-ai-coding-tools-2026  *(Brief 1 in article-briefs.md)*
- [ ] /blog/tools/cursor-review  *(Brief 2)*
- [ ] /blog/tools/claude-code-review
- [ ] /blog/tools/antigravity-review
- [ ] /blog/tools/windsurf-review

**Phase 2 — Hero tool (1)**
- [ ] /tools/picker (React island; quiz logic + permalinkable results)

**Phase 3 — Coding tool comparisons (3)**
- [ ] /blog/tools/cursor-vs-claude-code
- [ ] /blog/tools/cursor-vs-antigravity
- [ ] /blog/tools/claude-code-vs-cursor-for-production

**Phase 4 — Infra / FinOps content (6) — THE MOAT**
- [ ] /blog/infra/what-is-llm-finops  *(Brief 3)*
- [ ] /blog/infra/portkey-vs-helicone-vs-litellm-vs-openrouter  *(Brief 4)*
- [ ] /blog/infra/portkey-alternatives
- [ ] /blog/infra/three-layer-llm-caching
- [ ] /blog/infra/anthropic-prompt-caching-real-numbers
- [ ] /blog/infra/multi-provider-failover-patterns

**Phase 5 — Case studies (4)**
- [ ] /case-studies/prism  *(Brief 5)*
- [ ] /case-studies/citare
- [ ] /case-studies/batchwise
- [ ] /blog/infra/3-production-ai-saas-solo-stack-costs-process

**Phase 6 — GEO content (4)**
- [ ] /blog/geo/four-index-reality
- [ ] /blog/geo/geo-vs-seo-2026
- [ ] /blog/geo/how-to-get-cited-by-chatgpt-claude-perplexity
- [ ] /blog/geo/ai-crawler-bot-detection

**Phase 7 — Tools (2)**
- [ ] /tools/api-cost-calculator
- [ ] /tools/stack-picker

**Phase 8 — Long-tail / stack (7)**
- [ ] /blog/stack/supabase-vercel-cloudflare-production
- [ ] /blog/stack/edge-routing-cloudflare-workers-kv
- [ ] /blog/stack/cursor-nextjs-setup
- [ ] /blog/stack/claude-code-system-prompts-that-work
- [ ] /blog/stack/upstash-vector-semantic-caching
- [ ] /blog/stack/redis-caching-patterns-llm-apps
- [ ] /blog/tools/best-ai-coding-tool-for-solo-founders

## Phase 3 — launch day mechanics

When all 32 + 3 tools are live and proofread:

- [ ] Submit sitemap to GSC + Bing again (re-poke)
- [ ] Run sitemap through IndexNow ping
- [ ] Product Hunt launch — schedule for Tuesday 12:01am PST. Lead asset: the `/tools/picker` quiz, with the case studies as supporting proof.
- [ ] Hacker News Show HN — title format: "Show HN: rikuq — I shipped 3 AI SaaS solo and wrote down everything I learned" (lead with the case studies, not the blog)
- [ ] Reddit launches (different angle per sub, written ahead, posted across 48 hours):
  - r/SideProject — solo founder angle
  - r/SaaS — three SaaS launched solo angle
  - r/cursor — Cursor-specific review angle
  - r/LocalLLaMA — Prism / LLM gateway angle
  - r/IndieDev — the journey angle
  - r/IndieHackers — full transparency teardown angle
- [ ] Twitter/X thread: "I shipped 3 AI SaaS solo this year. Here's everything I learned." → link to mega comparison + best case study
- [ ] LinkedIn post: B2B angle on FinOps / LLM gateways
- [ ] IndieHackers post
- [ ] Email any founders/writers in your network with a personalized note + the relevant link

**Goal:** 30–50 earned backlinks in launch week (not from launch sites themselves — those are nofollow — but from blogs/newsletters that *write about* your launch).

## Phase 4 — post-launch (weeks 1-4)

- [ ] Watch GSC daily. Note which pages get impressions first.
- [ ] Watch AI search citations (use Citare for this). Note which posts get cited.
- [ ] Update each post's `updatedDate` whenever you revise — recency signal.
- [ ] Publish 4 posts/week consistently. Don't fall off in week 3.
- [ ] First newsletter goes out Friday of week 2.
- [ ] Twitter/LinkedIn thread for every published post.

## Phase 5 — month 2 onwards

- [ ] Add a `/changelog` page for product updates (changelog content ranks via freshness + GEO).
- [ ] Start the "AI coding tool comparison table" living page — kept fresh weekly, becomes the most-cited page on the site.
- [ ] Identify the 5 posts driving the most traffic; double down with follow-up posts that internally link to them.
- [ ] First sponsorship/partnership conversations — if a post is doing well, it has commercial value.
