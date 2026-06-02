#!/usr/bin/env node
// utm.mjs — print the UTM-tagged rikuq URL for a manual social/crosspost.
//
// GA4 showed ~89% of traffic landing as "Direct" because links shared on
// X / LinkedIn / Reddit / Medium / newsletters aren't tagged. This makes
// tagging a one-liner so manual posts become attributable.
//
// Usage:
//   node scripts/utm.mjs <slug> <platform> [medium]
//
// Examples:
//   node scripts/utm.mjs ai-spend-disclosure-audit-2026 x
//   node scripts/utm.mjs ai-spend-disclosure-audit-2026 linkedin
//   node scripts/utm.mjs ai-spend-disclosure-audit-2026 reddit
//   node scripts/utm.mjs services linkedin   # non-blog pages work too
//
// Platform shorthands map to clean utm_source values + a sensible default medium.

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const SITE = 'https://rikuq.com';

// platform -> { source, medium }
const PLATFORMS = {
  x:         { source: 'x',         medium: 'social' },
  twitter:   { source: 'x',         medium: 'social' },
  linkedin:  { source: 'linkedin',  medium: 'social' },
  reddit:    { source: 'reddit',    medium: 'social' },
  hn:        { source: 'hackernews',medium: 'social' },
  ih:        { source: 'indiehackers', medium: 'social' },
  medium:    { source: 'medium',    medium: 'crosspost' },
  substack:  { source: 'substack',  medium: 'newsletter' },
  devto:     { source: 'devto',     medium: 'crosspost' },
  hashnode:  { source: 'hashnode',  medium: 'crosspost' },
  newsletter:{ source: 'newsletter',medium: 'email' },
};

const [slug, platform, mediumArg] = process.argv.slice(2);
if (!slug || !platform) {
  console.error('Usage: node scripts/utm.mjs <slug> <platform> [medium]');
  console.error('Platforms: ' + Object.keys(PLATFORMS).join(', '));
  process.exit(1);
}

const p = PLATFORMS[platform.toLowerCase()];
if (!p) {
  console.error(`Unknown platform "${platform}". Known: ${Object.keys(PLATFORMS).join(', ')}`);
  process.exit(1);
}

// Resolve the path: blog post (look up category) or a top-level page.
async function resolvePath(slug) {
  // Known non-blog pages.
  const pages = { services: '/services/', about: '/about/', products: '/products/', tools: '/tools/' };
  if (pages[slug]) return pages[slug];
  // Blog post — read its category from frontmatter.
  try {
    const raw = await readFile(resolve(`src/content/blog/${slug}.mdx`), 'utf8');
    const cat = raw.match(/^category:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '');
    if (cat) return `/blog/${cat}/${slug}/`;
  } catch { /* fall through */ }
  console.error(`Could not resolve "${slug}" — not a known page and no blog MDX found.`);
  process.exit(1);
}

const path = await resolvePath(slug);
const medium = mediumArg || p.medium;
const url = `${SITE}${path}?utm_source=${p.source}&utm_medium=${medium}&utm_campaign=${slug}`;
console.log(url);
