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

/** Rewrite all internal Markdown links and image refs to absolute rikuq.com URLs. */
function absoluteLinks(md) {
  // Markdown links: [text](/path)
  let out = md.replace(/(\[[^\]]+\])\((\/[^)]+)\)/g, (_, txt, href) => `${txt}(${SITE_BASE}${href})`);
  // Markdown images: ![alt](/path)
  out = out.replace(/(!\[[^\]]*\])\((\/[^)]+)\)/g, (_, txt, href) => `${txt}(${SITE_BASE}${href})`);
  // HTML <img src="/path">
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
export async function loadArticle(slug) {
  const path = resolve(`src/content/blog/${slug}.mdx`);
  const raw = await readFile(path, 'utf8');
  const { fm, body } = parseFrontmatter(raw);

  const cleanBody = stripMdx(absoluteLinks(body));

  // Republish intro — prepended above the body so readers know the source.
  const republishIntro = `*Originally published on [rikuq.com](${canonicalUrl(slug, fm.category)}). Republished here for ${'{platform}'}'s readers.*\n\n`;

  return {
    slug,
    title: fm.title,
    description: fm.description,
    canonicalUrl: canonicalUrl(slug, fm.category),
    heroImage: fm.heroImage ? `${SITE_BASE}${fm.heroImage}` : undefined,
    ogImage: fm.ogImage ? `${SITE_BASE}${fm.ogImage}` : undefined,
    category: fm.category,
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    pubDate: fm.pubDate,
    body: cleanBody,
    republishIntro,
  };
}
