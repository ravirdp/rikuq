#!/usr/bin/env node
// score-earnings.mjs — compute the REAL Talk-Show ratio from earnings-call transcripts.
//
// The Talk-Show ratio (per docs/research-prep/c1-ai-spend-disclosure-audit.md) is:
//
//     talk_show_ratio = ai_mentions_per_earnings_call / dqs_total
//
// "Talk" = qualitative AI mentions on the earnings call.
// "Show" = the Disclosure Quality Score (DQS) from the 10-K (quantitative substance).
// A high ratio = lots of AI hype on the call, little hard disclosure in the filing.
//
// analyze-10k.mjs computes a PLACEHOLDER talk_show_ratio using 10-K AI mention
// density. This script replaces it with the proper earnings-call version once
// transcripts are dropped into data/track-c/transcripts/<ticker>.txt.
//
// SOURCING THE TRANSCRIPTS (decoupled on purpose):
//   Motley Fool transcript URLs are per-company per-quarter and not auto-
//   discoverable via API. Use Claude-in-Chrome (which can browse fool.com)
//   to harvest the latest transcript per ticker, save each as plain text to
//   data/track-c/transcripts/<TICKER>.txt, then run this script.
//
// Usage:
//   node scripts/track-c/score-earnings.mjs            # all transcripts present
//   node scripts/track-c/score-earnings.mjs MSFT       # single ticker
//   node scripts/track-c/score-earnings.mjs --csv      # also rewrite c1-companies.csv

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');
const TRANSCRIPTS_DIR = join(PROJECT_ROOT, 'data', 'track-c', 'transcripts');
const SCORED_DIR = join(PROJECT_ROOT, 'data', 'track-c', 'scored');
const CSV_PATH = join(PROJECT_ROOT, 'data', 'track-c', 'c1-companies.csv');

// Same AI term library analyze-10k.mjs uses, so "talk" and "show" are measured
// against an identical vocabulary.
const AI_TERMS = [
  /\bAI\b/g,
  /\bartificial intelligence\b/gi,
  /\bmachine learning\b/gi,
  /\bdeep learning\b/gi,
  /\bgenerative AI\b/gi,
  /\bGenAI\b/gi,
  /\blarge language models?\b/gi,
  /\bLLMs?\b/g,
  /\bfoundation models?\b/gi,
  /\bneural networks?\b/gi,
  /\bcopilot\b/gi,
  /\bagentic\b/gi,
  /\bagent(?:s|ic workflows?)?\b/gi,
];

function countAiMentions(text) {
  let total = 0;
  const perTerm = {};
  for (const re of AI_TERMS) {
    const matches = text.match(re);
    const n = matches ? matches.length : 0;
    if (n > 0) perTerm[re.source] = n;
    total += n;
  }
  return { total, perTerm };
}

function ensureDirs() {
  if (!existsSync(TRANSCRIPTS_DIR)) {
    mkdirSync(TRANSCRIPTS_DIR, { recursive: true });
    console.log(`Created ${TRANSCRIPTS_DIR} — drop <TICKER>.txt transcript files here.`);
  }
}

function getTranscriptTickers() {
  if (!existsSync(TRANSCRIPTS_DIR)) return [];
  return readdirSync(TRANSCRIPTS_DIR)
    .filter((f) => f.endsWith('.txt'))
    .map((f) => f.replace(/\.txt$/, '').toUpperCase());
}

function scoreOne(ticker) {
  const transcriptPath = join(TRANSCRIPTS_DIR, `${ticker}.txt`);
  if (!existsSync(transcriptPath)) {
    console.warn(`[skip] no transcript for ${ticker} at ${transcriptPath}`);
    return null;
  }

  const scoredPath = join(SCORED_DIR, `${ticker}.json`);
  if (!existsSync(scoredPath)) {
    console.warn(`[skip] no 10-K score for ${ticker} — run analyze-10k.mjs first`);
    return null;
  }

  const transcript = readFileSync(transcriptPath, 'utf8');
  const scored = JSON.parse(readFileSync(scoredPath, 'utf8'));

  // Normalize: AI mentions per 1000 words so longer calls don't inflate "talk".
  const wordCount = (transcript.match(/\S+/g) || []).length;
  const { total: aiMentions, perTerm } = countAiMentions(transcript);
  const aiMentionsPer1k = wordCount > 0 ? (aiMentions / wordCount) * 1000 : 0;

  const dqsTotal = scored?.dqs?.total ?? 0;
  // Proper Talk-Show ratio: earnings-call AI mentions / DQS substance.
  // Use raw mention count for the headline ratio (matches methodology doc),
  // and store the normalized version alongside for fairness checks.
  const talkShowRatio = aiMentions / Math.max(dqsTotal, 0.5);
  const talkShowRatioNorm = aiMentionsPer1k / Math.max(dqsTotal, 0.5);

  scored.earnings = {
    transcript_word_count: wordCount,
    ai_mentions: aiMentions,
    ai_mentions_per_1k_words: Number(aiMentionsPer1k.toFixed(2)),
    per_term: perTerm,
  };
  // Overwrite the placeholder talk_show_ratio with the proper earnings version.
  scored.talk_show_ratio_10k_placeholder = scored.talk_show_ratio;
  scored.talk_show_ratio = Number(talkShowRatio.toFixed(2));
  scored.talk_show_ratio_normalized = Number(talkShowRatioNorm.toFixed(3));

  writeFileSync(scoredPath, JSON.stringify(scored, null, 2));

  console.log(
    `${ticker.padEnd(6)} talk=${aiMentions.toString().padStart(4)} ai-mentions ` +
    `(${aiMentionsPer1k.toFixed(1)}/1k) · show(DQS)=${dqsTotal.toString().padStart(3)} ` +
    `· ratio=${talkShowRatio.toFixed(1)}`
  );

  return { ticker, aiMentions, aiMentionsPer1k, dqsTotal, talkShowRatio };
}

function rewriteCsv(results) {
  if (!existsSync(CSV_PATH)) {
    console.warn(`[csv] ${CSV_PATH} not found, skipping CSV update`);
    return;
  }
  const byTicker = Object.fromEntries(results.filter(Boolean).map((r) => [r.ticker, r]));
  const lines = readFileSync(CSV_PATH, 'utf8').split('\n');
  const header = lines[0].split(',');
  const tsIdx = header.indexOf('talk_show_ratio');
  if (tsIdx === -1) {
    console.warn('[csv] no talk_show_ratio column found in header, skipping');
    return;
  }
  const out = [lines[0]];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) { out.push(lines[i]); continue; }
    const cols = lines[i].split(',');
    const ticker = cols[0];
    if (byTicker[ticker]) {
      while (cols.length <= tsIdx) cols.push('');
      cols[tsIdx] = byTicker[ticker].talkShowRatio.toFixed(2);
    }
    out.push(cols.join(','));
  }
  writeFileSync(CSV_PATH, out.join('\n'));
  console.log(`[csv] updated talk_show_ratio for ${Object.keys(byTicker).length} tickers`);
}

// ---------------------------------------------------------------------------

function main() {
  ensureDirs();
  const args = process.argv.slice(2);
  const writeCsv = args.includes('--csv');
  const tickerArg = args.find((a) => !a.startsWith('--'));

  const tickers = tickerArg ? [tickerArg.toUpperCase()] : getTranscriptTickers();
  if (tickers.length === 0) {
    console.log('No transcripts found. Drop <TICKER>.txt files into:');
    console.log(`  ${TRANSCRIPTS_DIR}`);
    console.log('Then re-run. See the CiC harvest prompt in the Track C handoff.');
    return;
  }

  console.log(`Scoring ${tickers.length} transcript(s)...\n`);
  const results = tickers.map(scoreOne).filter(Boolean);

  console.log(`\nScored ${results.length}/${tickers.length}.`);

  if (results.length > 0) {
    const sorted = [...results].sort((a, b) => b.talkShowRatio - a.talkShowRatio);
    console.log('\nTop 5 hype-per-disclosure (high talk, low show):');
    sorted.slice(0, 5).forEach((r) =>
      console.log(`  ${r.ticker.padEnd(6)} ratio=${r.talkShowRatio.toFixed(1)} (${r.aiMentions} mentions / DQS ${r.dqsTotal})`)
    );
    console.log('\nBottom 5 (substance matches or exceeds talk):');
    sorted.slice(-5).reverse().forEach((r) =>
      console.log(`  ${r.ticker.padEnd(6)} ratio=${r.talkShowRatio.toFixed(1)} (${r.aiMentions} mentions / DQS ${r.dqsTotal})`)
    );
  }

  if (writeCsv) rewriteCsv(results);
  else console.log('\n(run with --csv to also update c1-companies.csv)');
}

main();
