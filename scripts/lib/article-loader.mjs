// Shared loader: read an MDX article from src/content/blog/<slug>.mdx, parse
// frontmatter, rewrite internal links to absolute rikuq.com URLs, return the
// pieces every cross-poster needs.
//
// Used by:
//   scripts/crosspost-devto.mjs
//   scripts/crosspost-hashnode.mjs
//   scripts/crosspost-all.mjs

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const SITE_BASE = 'https://rikuq.com';

/** Parse the YAML-ish frontmatter block. Lightweight — we don't need full YAML. */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error('No frontmatter found');
  const [, fmRaw, body] = m;

  const fm = {};
  let currentKey = null;
  for (const line of fmRaw.split('\n')) {
    // List item
    if (line.match(/^\s+- /)) {
      if (!Array.isArray(fm[currentKey])) fm[currentKey] = [];
      fm[currentKey].push(line.replace(/^\s+- /, '').trim().replace(/^["']|["']$/g, ''));
      continue;
    }
    // Top-level key
    const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (kv) {
      const [, key, val] = kv;
      currentKey = key;
      const trimmed = val.trim();
      if (trimmed === '') {
        fm[key] = [];
      } else if (trimmed === 'true' || trimmed === 'false') {
        fm[key] = trimmed === 'true';
      } else {
        fm[key] = trimmed.replace(/^["']|["']$/g, '');
      }
    }
  }
  return { fm, body };
}

/** Build a UTM query string for crosspost attribution. */
function utmSuffix(platform, slug) {
  return `utm_source=${platform}&utm_medium=crosspost&utm_campaign=${slug}`;
}

/** True if a path points at an asset (has a file extension in its last segment). */
function isAssetPath(href) {
  const last = href.split('#')[0].split('?')[0].split('/').filter(Boolean).pop() || '';
  return last.includes('.');
}

/**
 * Rewrite internal Markdown links and image refs to absolute rikuq.com URLs.
 * When `utm` ({platform, slug}) is provided, page links (not images, not
 * assets) get UTM params appended so crosspost traffic is attributable in GA4.
 * Image and asset links never get UTM (breaks caching, meaningless).
 */
function absoluteLinks(md, utm) {
  const suffix = utm ? utmSuffix(utm.platform, utm.slug) : null;
  // Page links — [text](/path), NOT preceded by ! (those are images).
  let out = md.replace(/(?<!!)(\[[^\]]+\])\((\/[^)]+)\)/g, (_, txt, href) => {
    const abs = `${SITE_BASE}${href}`;
    if (!suffix || isAssetPath(href)) return `${txt}(${abs})`;
    const sep = href.includes('?') ? '&' : '?';
    return `${txt}(${abs}${sep}${suffix})`;
  });
  // Markdown images: ![alt](/path) — absolutize only, never UTM.
  out = out.replace(/(!\[[^\]]*\])\((\/[^)]+)\)/g, (_, txt, href) => `${txt}(${SITE_BASE}${href})`);
  // HTML <img src="/path"> — absolutize only.
  out = out.replace(/(<img[^>]+src=)["'](\/[^"']+)["']/g, (_, prefix, href) => `${prefix}"${SITE_BASE}${href}"`);
  return out;
}

/** Strip any leftover MDX-isms that won't parse on plain Markdown platforms. */
function stripMdx(md) {
  // Strip MDX comments {/* ... */}
  let out = md.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  // Strip any top-level import statements
  out = out.replace(/^import\s+.+from\s+['"][^'"]+['"];?\s*$/gm, '');
  // Strip any leftover Astro/JSX components (single-line self-closing)
  out = out.replace(/^<[A-Z][A-Za-z]*\s+[^/>]*\/>\s*$/gm, '');
  // Collapse 3+ consecutive blank lines into 2
  out = out.replace(/\n{3,}/g, '\n\n');
  return out.trim();
}

/** Build the canonical URL for the original article on rikuq.com. */
function canonicalUrl(slug, category) {
  return `${SITE_BASE}/blog/${category}/${slug}/`;
}

/**
 * Load and prepare an article for republishing.
 * @param {string} slug — filename without extension (e.g. "claude-code-review")
 */
export async function loadArticle(slug, { platform, platformName } = {}) {
  const path = resolve(`src/content/blog/${slug}.mdx`);
  const raw = await readFile(path, 'utf8');
  const { fm, body } = parseFrontmatter(raw);

  const utm = platform ? { platform, slug } : null;
  const cleanBody = stripMdx(absoluteLinks(body, utm));

  // The "read the original" CTA link gets UTM (highest-intent click) — but the
  // canonical_url returned below stays clean for SEO.
  const canonical = canonicalUrl(slug, fm.category);
  const introUrl = platform
    ? `${canonical}?${utmSuffix(platform, slug)}`
    : canonical;
  const platformLabel = platformName || '{platform}';
  const republishIntro = `*Originally published on [rikuq.com](${introUrl}). Republished here for ${platformLabel}'s readers.*\n\n`;

  return {
    slug,
    title: fm.title,
    description: fm.description,
    canonicalUrl: canonical,
    heroImage: fm.heroImage ? `${SITE_BASE}${fm.heroImage}` : undefined,
    ogImage: fm.ogImage ? `${SITE_BASE}${fm.ogImage}` : undefined,
    category: fm.category,
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    pubDate: fm.pubDate,
    body: cleanBody,
    republishIntro,
  };
}
