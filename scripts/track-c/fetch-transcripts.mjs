#!/usr/bin/env node
// fetch-transcripts.mjs — curl Motley Fool earnings transcripts, strip to clean
// text, save to data/track-c/transcripts/<TICKER>.txt for deterministic scoring.
//
// Why not WebFetch: the fast model behind WebFetch can't reliably COUNT keyword
// occurrences across a 25k-word doc (it anchors on round numbers). We need the
// raw text + the same regex counter score-earnings.mjs uses, so "talk" is
// measured identically to "show".
//
// Usage:
//   node scripts/track-c/fetch-transcripts.mjs    # fetches all URLs in URLS below
//
// After this, run: node scripts/track-c/score-earnings.mjs --csv

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', '..', 'data', 'track-c', 'transcripts');

// Most-recent transcript per ticker (verified via search; uses latest quarter).
const URLS = {
  MSFT:  'https://www.fool.com/earnings/call-transcripts/2026/04/29/microsoft-msft-q3-2026-earnings-transcript/',
  GOOGL: 'https://www.fool.com/earnings/call-transcripts/2026/04/29/alphabet-googl-q1-2026-earnings-call-transcript/',
  META:  'https://www.fool.com/earnings/call-transcripts/2026/04/29/meta-meta-q1-2026-earnings-call-transcript/',
  SNOW:  'https://www.fool.com/earnings/call-transcripts/2026/05/27/snowflake-snow-q1-2027-earnings-transcript/',
  CRWD:  'https://www.fool.com/earnings/call-transcripts/2026/03/03/crowdstrike-crwd-q4-2026-earnings-transcript/',
  MA:    'https://www.fool.com/earnings/call-transcripts/2026/04/30/mastercard-ma-q1-2026-earnings-transcript/',
  AMZN:  'https://www.fool.com/earnings/call-transcripts/2026/04/29/amazon-amzn-q1-2026-earnings-call-transcript/',
  NVDA:  'https://www.fool.com/earnings/call-transcripts/2026/05/20/nvidia-nvda-q1-2027-earnings-transcript/',
  CRM:   'https://www.fool.com/earnings/call-transcripts/2026/05/28/salesforce-crm-q1-2027-earnings-transcript/',
  ORCL:  'https://www.fool.com/earnings/call-transcripts/2026/03/10/oracle-orcl-q3-2026-earnings-call-transcript/',
  ADBE:  'https://www.fool.com/earnings/call-transcripts/2026/03/12/adobe-adbe-q1-2026-earnings-call-transcript/',
  NOW:   'https://www.fool.com/earnings/call-transcripts/2026/04/22/servicenow-now-q1-2026-earnings-transcript/',
  PLTR:  'https://www.fool.com/earnings/call-transcripts/2026/05/04/palantir-pltr-q1-2026-earnings-transcript/',
  NET:   'https://www.fool.com/earnings/call-transcripts/2026/05/07/cloudflare-net-q1-2026-earnings-call-transcript/',
  HUBS:  'https://www.fool.com/earnings/call-transcripts/2026/05/07/hubspot-hubs-q1-2026-earnings-transcript/',
};

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';

function htmlToText(html) {
  // Drop script/style/noscript blocks entirely.
  let s = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ');
  // Try to isolate the article body if a clear marker exists; otherwise keep all.
  // Motley Fool wraps transcript in <div class="article-body"> (best-effort).
  const m = s.match(/<div[^>]*class="[^"]*article-body[^"]*"[\s\S]*?<\/div>\s*<\/article>/i);
  if (m) s = m[0];
  // Strip tags, decode a few entities, collapse whitespace.
  s = s.replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, '-')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return s;
}

async function fetchOne(ticker, url) {
  if (!url) { console.log(`[skip] ${ticker} — no URL`); return; }
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) { console.log(`[fail] ${ticker} — HTTP ${res.status}`); return; }
    const html = await res.text();
    const text = htmlToText(html);
    const words = (text.match(/\S+/g) || []).length;
    if (words < 2000) {
      console.log(`[warn] ${ticker} — only ${words} words after strip; body marker may have missed. Saving anyway.`);
    }
    writeFileSync(join(OUT, `${ticker}.txt`), text);
    console.log(`[ok]   ${ticker} — ${words} words saved`);
  } catch (e) {
    console.log(`[err]  ${ticker} — ${e.message}`);
  }
}

async function main() {
  if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });
  for (const [t, u] of Object.entries(URLS)) {
    await fetchOne(t, u);
    await new Promise((r) => setTimeout(r, 800)); // be polite to fool.com
  }
  console.log('\nDone. Next: node scripts/track-c/score-earnings.mjs --csv');
}

main();
