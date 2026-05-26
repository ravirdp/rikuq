// content-ops.config.mjs — rikuq.com
// The shared @ravirdp/content-ops system reads ONLY this file (and the cwd)
// for project-specific knowledge. Do not put rikuq logic in the shared repo.

export default {
  // --- Project identity ---
  slug: 'rikuq',
  domain: 'rikuq.com',
  siteUrl: 'https://rikuq.com',

  // --- Paths (rikuq matches the defaults) ---
  db: './data/content-ops.db',
  contextDir: './docs/context',
  trackersDir: './docs/trackers',
  mdxTemplate: './src/content/blog/_template.mdx',
  contentDir: './src/content/blog',
  heroImageDir: './public/illustrations/covers',  // rikuq uses /illustrations/covers/ not /hero/

  // --- Research thresholds ---
  research: {
    maxKeywordDifficulty: 35,
    minSearchVolume: 100,
    keywordsPerRun: 5,
    competitorDomains: [],  // populated from docs/context/competitors.md
  },

  // --- CTA wiring: rikuq's pillar-driven PostLayout auto-renders these ---
  ctaMap: {
    infra: 'PrismCTA',
    finops: 'FinOpsCTA',
    geo: 'CitareCTA',
    // tools / stack / essays → no auto CTA (PostLayout handles)
  },

  // --- Post-publish hooks ---
  postPublish: [
    './scripts/indexnow.sh',
  ],

  // --- Crosspost behavior (Day-3 cron is .github/workflows/crosspost.yml) ---
  // Hashnode dropped May 2026 — paid API only, we publish manually if at all.
  crosspost: {
    enabled: true,
    platforms: ['devto'],
  },

  // --- GEO target queries (Citare connector lands v0.3.0) ---
  geo: {
    enabled: true,
    platforms: ['chatgpt', 'aio', 'gemini', 'claude', 'perplexity'],
  },
};
