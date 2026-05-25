#!/usr/bin/env node
// Reactive PR monitor — centralised across rikuq + 3 properties (Prism, Citare, BatchWise).
//
// Polls open sources for journalist queries / founder questions / source requests,
// filters by per-property keyword wedges, writes a daily digest under
// scripts/reactive-pr/digests/YYYY-MM-DD.md.
//
// Sources (all open, no API key required as of 2026-05):
//   1. Mastodon — #journorequest / #prrequest / #sourcerequest via mastodon.social
//      public hashtag timelines. Truly auth-free. (Bluesky's searchPosts now requires
//      an app password, so we skip it by default; opt in via BLUESKY_HANDLE+BLUESKY_APP_PASSWORD
//      env vars if you want to add it back.)
//   2. Reddit JSON — best-effort across candidate subreddits. Some 404; that's expected.
//      Curate the SUBS list below as you learn which subs are actually active.
//   3. HN Algolia API — "Ask HN" threads + story search for property-relevant tags.
//
// Email-only platforms (Qwoted, Featured.com, Help a B2B Writer, SourceBottle) are
// out of scope for this script. Subscribe with affiliates@rikuq.com and triage by hand.
//
// Usage:
//   node scripts/reactive-pr.mjs              # write today's digest
//   node scripts/reactive-pr.mjs --dry        # print to stdout, don't write
//   node scripts/reactive-pr.mjs --since=72h  # default window is 24h; override for backfill
//
// No cron yet — run manually for a week, tune the keyword sets in PROPERTIES below,
// then we wire a GitHub Action.

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIGEST_DIR = join(__dirname, 'reactive-pr', 'digests');

// ---------------------------------------------------------------------------
// Property wedges — each property's keyword set. A hit is tagged with the
// property whose keyword count is highest in the text. Tie → 'rikuq' (generic).
// ---------------------------------------------------------------------------

const PROPERTIES = {
  prism: {
    name: 'Prism / Ssimplifi',
    url: 'https://ssimplifi.com',
    angle: 'Production AI infra for solo founders — Workers, R2, edge, FinOps',
    keywords: [
      'cloudflare workers', 'serverless', 'edge computing', 'edge function', 'r2',
      's3 alternative', 'finops', 'cloud cost', 'cloud bill', 'aws bill',
      'multi-region', 'cold start', 'wasm', 'durable object', 'd1', 'kv store',
      'vector search', 'edge ai', 'inference cost', 'gpu cost', 'llm cost',
      'caching strategy', 'cdn', 'static site', 'jamstack',
    ],
  },
  citare: {
    name: 'Citare',
    url: 'https://citare.ai',
    angle: 'Measuring brand visibility across ChatGPT / Google AIO / Gemini / Claude / Perplexity',
    keywords: [
      'geo', 'aeo', 'generative engine optimization', 'answer engine',
      'ai search', 'ai seo', 'ai overview', 'aio', 'chatgpt search',
      'perplexity', 'brand visibility', 'share of voice', 'llm citation',
      'llm mention', 'brand mention', 'ai discoverability', 'llm.txt',
      'schema.org', 'structured data', 'faqpage', 'entity seo',
      'sge', 'search generative', 'ai-powered search',
    ],
  },
  batchwise: {
    name: 'BatchWise',
    url: 'https://batchwise.in',
    angle: 'Batch reconciliation + payment ops for Indian SaaS — Razorpay, UPI, GST',
    keywords: [
      'razorpay', 'upi', 'india payments', 'indian saas', 'indian fintech',
      'gst', 'tds', 'payment reconciliation', 'reconciliation', 'settlement',
      'payout', 'merchant onboarding', 'india startup', 'india founder',
      'rupee', 'usd to inr', 'cross-border payment', 'payment ops',
      'subscription billing india',
    ],
  },
  rikuq: {
    name: 'rikuq (generic)',
    url: 'https://rikuq.com',
    angle: 'Solo AI SaaS founder — shipping, distribution, FinOps, GEO',
    keywords: [
      'solo founder', 'solopreneur', 'indie hacker', 'bootstrapped',
      'ai saas', 'building in public', 'shipping fast', 'side project',
      'claude code', 'cursor', 'windsurf', 'ai coding', 'ai agent',
      'prompt caching', 'mcp', 'model context protocol',
    ],
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const args = new Set(process.argv.slice(2));
const DRY = args.has('--dry');
const sinceArg = [...args].find((a) => a.startsWith('--since='));
const SINCE_HOURS = sinceArg ? parseInt(sinceArg.replace('--since=', '').replace('h', ''), 10) : 24;
const SINCE_MS = Date.now() - SINCE_HOURS * 60 * 60 * 1000;

const today = new Date().toISOString().slice(0, 10);

function classify(text) {
  const lower = text.toLowerCase();
  const scores = {};
  for (const [key, cfg] of Object.entries(PROPERTIES)) {
    scores[key] = cfg.keywords.reduce((n, kw) => n + (lower.includes(kw) ? 1 : 0), 0);
  }
  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  // Require at least one keyword hit; otherwise this opportunity isn't for us.
  if (top[1] === 0) return null;
  return { property: top[0], score: top[1], scores };
}

async function safeFetch(url, opts = {}) {
  try {
    const res = await fetch(url, {
      ...opts,
      headers: {
        'user-agent': 'rikuq-reactive-pr/1.0 (+https://rikuq.com)',
        ...(opts.headers || {}),
      },
    });
    if (!res.ok) {
      console.warn(`[fetch] ${res.status} ${url}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.warn(`[fetch] ${url} — ${err.message}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Source: Mastodon (public hashtag timelines, no auth required)
// We hit a single large instance — mastodon.social federates posts from across
// the network, so we see hashtag activity from any federated instance.
// ---------------------------------------------------------------------------

async function fetchMastodon() {
  const tags = ['journorequest', 'prrequest', 'sourcerequest', 'haro'];
  const results = [];
  for (const tag of tags) {
    const url = `https://mastodon.social/api/v1/timelines/tag/${tag}?limit=40`;
    const data = await safeFetch(url);
    if (!Array.isArray(data)) continue;
    for (const post of data) {
      const createdAt = new Date(post.created_at ?? 0).getTime();
      if (createdAt < SINCE_MS) continue;
      // content is HTML — strip tags for classification + snippet
      const text = (post.content ?? '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ');
      const cls = classify(text);
      if (!cls) continue;
      results.push({
        source: 'mastodon',
        tag,
        property: cls.property,
        score: cls.score,
        author: `@${post.account?.acct ?? 'unknown'}`,
        text,
        url: post.url,
        createdAt,
      });
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Source: Reddit JSON
// ---------------------------------------------------------------------------

async function fetchReddit() {
  // Candidate subs — some may 404 (subreddit doesn't exist / went private).
  // safeFetch logs and no-ops on 404. Curate as you learn which are active.
  const subs = [
    'JournoRequest', 'PRrequest', 'HelpReporter', 'HARO', 'PressRelease',
    'AskMarketing', 'SaaS', 'startups', 'Entrepreneur',
  ];
  const results = [];
  for (const sub of subs) {
    const url = `https://www.reddit.com/r/${sub}/new.json?limit=50`;
    const data = await safeFetch(url);
    const posts = data?.data?.children ?? [];
    for (const { data: p } of posts) {
      const createdAt = (p.created_utc ?? 0) * 1000;
      if (createdAt < SINCE_MS) continue;
      const text = `${p.title ?? ''}\n${p.selftext ?? ''}`;
      const cls = classify(text);
      if (!cls) continue;
      results.push({
        source: 'reddit',
        tag: `r/${sub}`,
        property: cls.property,
        score: cls.score,
        author: `u/${p.author}`,
        text: p.title,
        url: `https://reddit.com${p.permalink}`,
        createdAt,
      });
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Source: HN Algolia
// ---------------------------------------------------------------------------

async function fetchHN() {
  // Pull recent "ask_hn" stories + comments containing property keywords.
  // Algolia gives us posted-time filtering via numericFilters.
  const sinceSec = Math.floor(SINCE_MS / 1000);
  const queries = [
    'ask HN founder',
    'ask HN cloudflare',
    'ask HN razorpay',
    'ask HN india payments',
    'ask HN ai search',
    'ask HN llm cost',
  ];
  const results = [];
  for (const q of queries) {
    const url = `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(q)}&tags=ask_hn&numericFilters=created_at_i>${sinceSec}&hitsPerPage=20`;
    const data = await safeFetch(url);
    for (const hit of data?.hits ?? []) {
      const text = `${hit.title ?? ''}\n${hit.story_text ?? ''}`;
      const cls = classify(text);
      if (!cls) continue;
      results.push({
        source: 'hn',
        tag: 'ask_hn',
        property: cls.property,
        score: cls.score,
        author: hit.author,
        text: hit.title,
        url: `https://news.ycombinator.com/item?id=${hit.objectID}`,
        createdAt: (hit.created_at_i ?? 0) * 1000,
      });
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Render digest
// ---------------------------------------------------------------------------

function renderDigest(hits) {
  // Dedupe by URL, sort: highest score first, then newest.
  const seen = new Set();
  const unique = hits.filter((h) => {
    if (seen.has(h.url)) return false;
    seen.add(h.url);
    return true;
  });
  unique.sort((a, b) => b.score - a.score || b.createdAt - a.createdAt);

  const byProp = unique.reduce((acc, h) => {
    (acc[h.property] ??= []).push(h);
    return acc;
  }, {});

  const lines = [];
  lines.push(`# Reactive PR digest — ${today}`);
  lines.push('');
  lines.push(`Window: last ${SINCE_HOURS}h · Sources: Mastodon, Reddit, HN · Total hits: ${unique.length}`);
  lines.push('');
  lines.push('Pitch shells live in `docs/reactive-pr.md`. Log outcomes there too.');
  lines.push('');

  for (const key of ['citare', 'prism', 'batchwise', 'rikuq']) {
    const items = byProp[key] ?? [];
    const cfg = PROPERTIES[key];
    lines.push(`## ${cfg.name} — ${items.length} hit${items.length === 1 ? '' : 's'}`);
    lines.push('');
    lines.push(`_${cfg.angle}_`);
    lines.push('');
    if (items.length === 0) {
      lines.push('No matches in this window.');
      lines.push('');
      continue;
    }
    for (const h of items) {
      const when = new Date(h.createdAt).toISOString().slice(0, 16).replace('T', ' ');
      const snippet = h.text.replace(/\s+/g, ' ').slice(0, 240);
      lines.push(`### [${h.source}/${h.tag}] ${h.author} · score ${h.score} · ${when}Z`);
      lines.push('');
      lines.push(`> ${snippet}${h.text.length > 240 ? '…' : ''}`);
      lines.push('');
      lines.push(`Link: ${h.url}`);
      lines.push('');
    }
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.error(`[reactive-pr] window=${SINCE_HOURS}h dry=${DRY}`);
  const [ms, rd, hn] = await Promise.all([fetchMastodon(), fetchReddit(), fetchHN()]);
  console.error(`[reactive-pr] mastodon=${ms.length} reddit=${rd.length} hn=${hn.length}`);
  const digest = renderDigest([...ms, ...rd, ...hn]);

  if (DRY) {
    process.stdout.write(digest);
    return;
  }

  mkdirSync(DIGEST_DIR, { recursive: true });
  const out = join(DIGEST_DIR, `${today}.md`);
  writeFileSync(out, digest);
  console.error(`[reactive-pr] wrote ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
