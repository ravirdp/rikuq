#!/usr/bin/env node
// fetch-edgar.mjs — pull most recent 10-K filing for each company in c1-companies.csv
//
// SEC EDGAR public API. No auth required. SEC requires a User-Agent string
// identifying the requester (per their fair-use policy):
//   https://www.sec.gov/os/accessing-edgar-data
//
// Caches to data/track-c/filings/<ticker>/10-K-<accessionNumber>.txt so we
// only hit SEC once per company.
//
// Usage:
//   node scripts/track-c/fetch-edgar.mjs              # all 50 companies
//   node scripts/track-c/fetch-edgar.mjs MSFT PLTR    # specific tickers
//
// Per-company rate limit: 100ms between requests (SEC limit is 10 req/sec).

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');
const COMPANIES_CSV = join(PROJECT_ROOT, 'data', 'track-c', 'c1-companies.csv');
const FILINGS_DIR = join(PROJECT_ROOT, 'data', 'track-c', 'filings');

const UA = 'rikuq research/c1-ai-spend-disclosure ravi@rikuq.com';
const SEC_BASE = 'https://www.sec.gov';
const DATA_BASE = 'https://data.sec.gov';

function loadCompanies() {
  const csv = readFileSync(COMPANIES_CSV, 'utf8');
  const [headerLine, ...rows] = csv.trim().split('\n');
  const headers = headerLine.split(',');
  return rows.map((row) => {
    const cells = row.split(',');
    return Object.fromEntries(headers.map((h, i) => [h, cells[i] ?? '']));
  });
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,*/*' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`);
  return res.text();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchMostRecent10K(cik, ticker) {
  // Pad CIK to 10 digits (SEC's format)
  const paddedCik = String(cik).padStart(10, '0');
  const submissionsUrl = `${DATA_BASE}/submissions/CIK${paddedCik}.json`;

  console.log(`  [${ticker}] fetching submissions index...`);
  const subs = await fetchJson(submissionsUrl);
  await sleep(120);

  const recent = subs.filings?.recent;
  if (!recent) throw new Error(`No recent filings for ${ticker}`);

  // Find most recent 10-K
  let idx = -1;
  for (let i = 0; i < recent.form.length; i++) {
    if (recent.form[i] === '10-K') { idx = i; break; }
  }
  if (idx === -1) throw new Error(`No 10-K found for ${ticker}`);

  const accession = recent.accessionNumber[idx];
  const primaryDoc = recent.primaryDocument[idx];
  const filingDate = recent.filingDate[idx];
  const accessionNoDashes = accession.replace(/-/g, '');

  // SEC document URL pattern
  const docUrl = `${SEC_BASE}/Archives/edgar/data/${parseInt(cik, 10)}/${accessionNoDashes}/${primaryDoc}`;
  console.log(`  [${ticker}] found 10-K filed ${filingDate}, fetching primary doc (${primaryDoc})...`);

  const html = await fetchText(docUrl);
  await sleep(120);

  return { html, accession, filingDate, primaryDoc, docUrl };
}

function stripHtml(html) {
  // Quick + dirty for keyword analysis. Remove scripts/styles, then tags, then collapse whitespace.
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#\d+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function processCompany(company) {
  const ticker = company.ticker;
  const cik = company.cik;
  const outDir = join(FILINGS_DIR, ticker);
  mkdirSync(outDir, { recursive: true });

  // Skip if already cached
  const existing = existsSync(outDir) ? readdirSync(outDir).filter((f) => f.startsWith('10-K-')) : [];
  if (existing.length > 0) {
    console.log(`  [${ticker}] cached (${existing[0]}), skipping`);
    return { ticker, status: 'cached', file: existing[0] };
  }

  try {
    const { html, accession, filingDate, primaryDoc, docUrl } = await fetchMostRecent10K(cik, ticker);
    const text = stripHtml(html);

    const baseName = `10-K-${accession}`;
    writeFileSync(join(outDir, `${baseName}.html`), html);
    writeFileSync(join(outDir, `${baseName}.txt`), text);
    writeFileSync(join(outDir, `${baseName}.meta.json`), JSON.stringify({
      ticker, cik, accession, filingDate, primaryDoc, docUrl,
      htmlLength: html.length, textLength: text.length,
      fetchedAt: new Date().toISOString(),
    }, null, 2));

    console.log(`  [${ticker}] wrote ${baseName} (html ${(html.length/1024).toFixed(0)}KB, text ${(text.length/1024).toFixed(0)}KB)`);
    return { ticker, status: 'ok', filingDate, textLength: text.length };
  } catch (err) {
    console.warn(`  [${ticker}] ERROR: ${err.message}`);
    return { ticker, status: 'error', error: err.message };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const all = loadCompanies();
  const targets = args.length > 0
    ? all.filter((c) => args.includes(c.ticker))
    : all;

  console.log(`[fetch-edgar] processing ${targets.length} companies`);
  console.log(`[fetch-edgar] cache dir: ${FILINGS_DIR}`);
  console.log('');

  const results = [];
  for (const company of targets) {
    results.push(await processCompany(company));
  }

  console.log('');
  console.log('=== summary ===');
  console.log(`  ok:     ${results.filter((r) => r.status === 'ok').length}`);
  console.log(`  cached: ${results.filter((r) => r.status === 'cached').length}`);
  console.log(`  error:  ${results.filter((r) => r.status === 'error').length}`);

  const errors = results.filter((r) => r.status === 'error');
  if (errors.length > 0) {
    console.log('');
    console.log('errors:');
    for (const e of errors) console.log(`  ${e.ticker}: ${e.error}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
