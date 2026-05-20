# rikuq.com

The practitioner's blog for solo founders shipping real AI SaaS — by Ravi.

Companion site to [BatchWise](https://batchwise.ai), [Citare](https://citare.ai), and [Prism by Ssimplifi](https://ssimplifi.com).

## Strategy & planning

- [`docs/seo-content-plan.md`](docs/seo-content-plan.md) — Full content topology, 32-page launch plan, honesty doctrine, 6-month targets.
- [`docs/brand-voice.md`](docs/brand-voice.md) — Voice, style, and writing rules.
- [`docs/article-briefs.md`](docs/article-briefs.md) — First 5 articles, ready to draft.
- [`docs/affiliate-programs.md`](docs/affiliate-programs.md) — Signup checklist.
- [`docs/utm-conventions.md`](docs/utm-conventions.md) — Attribution scheme.
- [`docs/about-bio.md`](docs/about-bio.md) — Author bio in 3 lengths.
- [`docs/launch-checklist.md`](docs/launch-checklist.md) — Phase 0 + launch day mechanics.
- [`docs/backlink-tracker.md`](docs/backlink-tracker.md) — Status of inbound backlinks from BatchWise / Citare / Ssimplifi + deferred TODOs to uncomment as posts ship.

## Stack

- **Framework:** Astro 5 (static) + React islands for interactive tools
- **Hosting:** Cloudflare Pages
- **Edge logic:** Cloudflare Workers
- **Storage:** Cloudflare KV (quiz results), R2 (OG images)
- **Newsletter:** Brevo (double opt-in)
- **Analytics:** Plausible + Cloudflare Web Analytics + GA4
- **Search consoles:** GSC + Bing Webmaster Tools + IndexNow

## Local dev

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```

Or push to `main`; Cloudflare Pages auto-deploys.

## Content structure

```
src/content/
├── blog/
│   ├── tools/        Pillar 1: AI coding tool reviews, comparisons
│   ├── infra/        Pillar 2: LLM gateways, caching, FinOps (the moat)
│   ├── geo/          Pillar 3: AI search, indexing, citation
│   └── stack/        Pillar 4: ops, deployment, stack content
└── case-studies/     Long-form teardowns of BatchWise, Citare, Prism
```
