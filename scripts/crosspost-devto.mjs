// Cross-post an article from src/content/blog/<slug>.mdx to Dev.to.
//
// Sets canonical_url back to rikuq.com so search engines treat the original
// as the source. Article publishes immediately (published: true).
//
// Usage:
//   DEVTO_API_KEY=<key> node scripts/crosspost-devto.mjs <slug>
//
// Example:
//   DEVTO_API_KEY=xxx node scripts/crosspost-devto.mjs claude-code-review
//
// API key: dev.to/settings/extensions → "DEV Community API Keys"

import { loadArticle } from './lib/article-loader.mjs';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node scripts/crosspost-devto.mjs <slug>');
  process.exit(1);
}

const apiKey = process.env.DEVTO_API_KEY;
if (!apiKey) {
  console.error('ERROR: DEVTO_API_KEY env var is required.');
  process.exit(1);
}

const article = await loadArticle(slug, { platform: 'devto', platformName: 'Dev.to' });

// Dev.to caps tags at 4 and requires alphanumeric (no dashes in tag names).
const tags = article.tags
  .slice(0, 4)
  .map((t) => t.replace(/[^a-z0-9]/gi, '').toLowerCase())
  .filter(Boolean);

const bodyMarkdown = `${article.republishIntro}${article.body}`;

const payload = {
  article: {
    title: article.title,
    body_markdown: bodyMarkdown,
    description: article.description,
    canonical_url: article.canonicalUrl,
    published: true,
    tags,
    ...(article.heroImage && { main_image: article.heroImage }),
  },
};

const res = await fetch('https://dev.to/api/articles', {
  method: 'POST',
  headers: {
    'api-key': apiKey,
    'content-type': 'application/json',
    accept: 'application/json',
  },
  body: JSON.stringify(payload),
});

const text = await res.text();
if (!res.ok) {
  console.error(`Dev.to API failed (${res.status}):`);
  console.error(text);
  process.exit(2);
}

let data;
try {
  data = JSON.parse(text);
} catch {
  console.error('Dev.to returned non-JSON:');
  console.error(text);
  process.exit(2);
}

console.log(`✅ Published to Dev.to: ${data.url}`);
console.log(`   Canonical: ${article.canonicalUrl}`);
console.log(`   Tags: ${tags.join(', ') || '(none)'}`);
