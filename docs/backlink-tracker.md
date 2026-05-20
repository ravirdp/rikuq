# Backlink Tracker — deferred TODOs across properties

Source of truth for editorial backlinks from BatchWise / Citare / Ssimplifi that are **planned but not live yet** — waiting on matching rikuq.com posts.

When you publish a rikuq post listed in the "Target rikuq URL" column, head to the listed property and uncomment the TODO link.

## Status as of 2026-05-20 (initial backlink rollout)

**Shipped live** (no action needed):

| Property | Surface | Status |
|---|---|---|
| BatchWise | Sitewide footer link | ✅ |
| BatchWise | `/editorial-team` author block | ✅ |
| BatchWise | Homepage Organization JSON-LD with founder→Person→sameAs:[rikuq.com] | ✅ |
| Citare | Sitewide footer link | ✅ |
| Citare | `/about` founder block | ✅ |
| Citare | Org JSON-LD founder→Person, sameAs:[rikuq.com] | ✅ |
| Citare | Blog post bylines (`author === "Ravi"` → rikuq.com/about) | ✅ |
| Ssimplifi | Sitewide footer link | ✅ |
| Ssimplifi | `/about` founder block | ✅ |
| Ssimplifi | Homepage Org JSON-LD with founder→Person | ✅ |
| Ssimplifi | Blog post bylines | ✅ |

**Deferred — uncomment when matching rikuq post publishes:**

| Property | Source file | Target rikuq URL | Action when ready |
|---|---|---|---|
| Citare | (page: `/four-index-reality`) — find via `grep -n "TODO(rikuq-backlink)" src/` | `https://rikuq.com/blog/geo/four-index-reality` | Uncomment the link |
| Citare | (page: `/ai-bot-crawlers`) | `https://rikuq.com/blog/geo/ai-crawler-bot-detection` | Uncomment |
| Citare | (page: `/ai-search-vs-google`) | `https://rikuq.com/blog/geo/geo-vs-seo-2026` | Uncomment |
| Ssimplifi | docs section: caching | `https://rikuq.com/blog/infra/three-layer-llm-caching` | Uncomment |
| Ssimplifi | docs section: policy / FinOps | `https://rikuq.com/blog/infra/what-is-llm-finops` | Uncomment |
| Ssimplifi | docs section: edge-routing | `https://rikuq.com/blog/stack/edge-routing-cloudflare-workers-kv` | Uncomment |
| BatchWise | `src/content/methodology/tally-ledger-to-brsr-mapping.mdx` | `https://rikuq.com/case-studies/batchwise` (or specific BRSR autofill post) | Replace TODO comment with live editorial link |

## Workflow when publishing a rikuq post

1. Publish the rikuq post.
2. Verify the URL resolves with a 200.
3. SSH/open the corresponding property repo.
4. `grep -rn "TODO(rikuq-backlink)" src/` to surface candidate sites.
5. Uncomment / replace the placeholder with the live link.
6. Build, deploy, verify.
7. Tick the row in this tracker.

## Reciprocity (rikuq → properties)

rikuq.com already wires up the inverse direction via `src/lib/site.ts → SITE.author.sameAs`, which includes:

- https://batchwise.ai
- https://citare.ai
- https://ssimplifi.com

These get emitted in:
- Homepage Person JSON-LD (`/`)
- About page Person JSON-LD (`/about`)
- Article author JSON-LD (every post, via `ArticleSchema.astro`)
- llms.txt + llms-full.txt entity definitions

This is the schema-level signal Google uses to verify entity identity across properties. Combined with the editorial footer links on each property, this is a clean, non-manipulative entity graph.

## What we deliberately did NOT do

- No `/compare/*` links from ssimplifi (kept advocacy + neutral content separate to avoid circular citation patterns)
- No `nofollow` (this is editorial, equity should flow)
- No mass-linking — the entire footprint across all three properties is < 15 visible links, well below any algorithmic flag threshold
- No reciprocal links in BatchWise's content body (BatchWise's audience is Indian SMEs / SEBI enterprise — not rikuq's audience; cross-promotion would feel off-brand)
