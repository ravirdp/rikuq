#!/usr/bin/env node
// analyze-10k.mjs — score a 10-K filing on the DQS rubric (Disclosure Quality Score).
//
// Reads data/track-c/filings/<ticker>/10-K-*.txt, runs keyword + pattern
// analysis, emits scored JSON to data/track-c/scored/<ticker>.json.
//
// Rubric (see docs/research-prep/c1-ai-spend-disclosure-audit.md):
//   - Specific AI revenue figure: 5 pts
//   - AI capex figure: 3 pts
//   - AI segment-level breakdown: 5 pts
//   - Named AI products + adoption metrics: 2 pts each (cap 4)
//   - Forward capex guidance: 3 pts
//   - AI-specific risk factors: 2 pts
//   - Generic vague mentions: -1 each (cap -3)
//
// Usage:
//   node scripts/track-c/analyze-10k.mjs           # all cached 10-Ks
//   node scripts/track-c/analyze-10k.mjs MSFT      # single ticker

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');
const FILINGS_DIR = join(PROJECT_ROOT, 'data', 'track-c', 'filings');
const SCORED_DIR = join(PROJECT_ROOT, 'data', 'track-c', 'scored');

// ---------------------------------------------------------------------------
// Pattern library
// ---------------------------------------------------------------------------

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
];

// Patterns suggesting a specific AI revenue figure
const REVENUE_PATTERNS = [
  /\b(?:AI|Copilot|Einstein|Watson|Bedrock|Cortex|Gemini|Firefly|AIP|Now Assist|Breeze|Duo|Agentforce)\b[^.]{0,200}\$\s*\d{1,3}(?:[,.]\d{3})*(?:\s*(?:million|billion|M|B))?/gi,
  /\$\s*\d{1,3}(?:[,.]\d{3})*(?:\s*(?:million|billion))\s+(?:of\s+)?(?:AI|generative AI|artificial intelligence)\b/gi,
  /\b(?:AI|generative AI|Copilot|AIP)\b[^.]{0,150}(?:revenue|ARR|run\s*rate|bookings)/gi,
];

// Patterns suggesting AI capex disclosure
const CAPEX_PATTERNS = [
  /\b(?:capital expenditures?|capex)\b[^.]{0,300}\b(?:AI|artificial intelligence|generative)\b/gi,
  /\b(?:AI|artificial intelligence|generative)\b[^.]{0,200}\b(?:capital expenditures?|capex|infrastructure investment|data center)\b/gi,
  /\b(?:GPU|graphics processing unit)s?\b[^.]{0,150}\$\s*\d/gi,
];

// Forward capex guidance patterns
const FORWARD_CAPEX_PATTERNS = [
  /\b(?:expect|plan|forecast|guidance|outlook)[^.]{0,200}\bcapex\b[^.]{0,200}\b(?:AI|generative|data center)/gi,
  /\bcapex\b[^.]{0,100}(?:fiscal\s+\d{4}|FY\s*\d{2,4}|next year|coming year)[^.]{0,200}\$\s*\d/gi,
];

// Named AI products (these are real product names we expect to find)
const NAMED_PRODUCTS = [
  'Copilot', 'GitHub Copilot', 'M365 Copilot',
  'Einstein', 'Einstein 1', 'Agentforce',
  'Watson', 'Watsonx',
  'Bedrock', 'Q for Business', 'Q Developer',
  'Cortex', 'Snowflake Cortex',
  'Gemini', 'Gemini Pro', 'Gemini Advanced',
  'Firefly', 'Adobe Firefly',
  'AIP', 'Artificial Intelligence Platform',
  'Now Assist', 'Breeze', 'Duo',
  'Apple Intelligence',
  'Llama',
  'Veevax',
  'Erica',
  'OCI Generative AI',
];

// Risk factor language that's AI-specific (not generic)
const AI_RISK_PATTERNS = [
  /\b(?:risk|risks?|uncertain|challenge|liability)\b[^.]{0,200}\b(?:hallucinat|model\s+drift|model\s+deprecation|vendor\s+concentration|API\s+(?:dependency|reliance)|training\s+data|copyright\s+infringement|prompt\s+injection|AI\s+regulation|AI\s+legislation|EU\s+AI\s+Act)\b/gi,
  /\b(?:dependency|reliance)\b[^.]{0,100}\b(?:OpenAI|Anthropic|third-party\s+model)\b/gi,
];

// Segment markers — strong signal a company has AI as its own reportable segment
const SEGMENT_PATTERNS = [
  /\bAI\s+segment\b/gi,
  /\bgenerative\s+AI\s+segment\b/gi,
  /\boperating\s+segments?\b[^.]{0,500}\bAI\b/gi,
];

// Vague AI mentions that don't tie to numbers (penalty marker)
const VAGUE_PHRASES = [
  /\b(?:leveraging|harness(?:ing)?|embrac(?:ing|e))\s+(?:the\s+power\s+of\s+)?(?:AI|artificial intelligence)\b/gi,
  /\bAI[\s-](?:powered|driven|enabled)\b/gi,
  /\b(?:exciting|tremendous|massive)\s+(?:opportunity|opportunities)\b[^.]{0,100}\bAI\b/gi,
];

// ---------------------------------------------------------------------------
// Analysis
// ---------------------------------------------------------------------------

function countMatches(text, patterns) {
  let total = 0;
  for (const re of patterns) {
    const matches = text.match(re);
    if (matches) total += matches.length;
  }
  return total;
}

function extractSamples(text, patterns, maxSamples = 3) {
  const samples = [];
  for (const re of patterns) {
    const matches = text.match(re);
    if (!matches) continue;
    for (const m of matches.slice(0, maxSamples)) {
      const cleaned = m.replace(/\s+/g, ' ').trim().slice(0, 200);
      samples.push(cleaned);
      if (samples.length >= maxSamples) return samples;
    }
  }
  return samples;
}

function findNamedProducts(text) {
  const found = [];
  for (const product of NAMED_PRODUCTS) {
    const re = new RegExp(`\\b${product.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    const matches = text.match(re);
    if (matches && matches.length >= 2) {
      // require at least 2 mentions to count as a "real" named product (not a passing mention)
      found.push({ product, mentions: matches.length });
    }
  }
  return found.sort((a, b) => b.mentions - a.mentions);
}

function scoreFiling(ticker, text) {
  const aiMentionTotal = countMatches(text, AI_TERMS);
  const revenueMatches = countMatches(text, REVENUE_PATTERNS);
  const revenueSamples = extractSamples(text, REVENUE_PATTERNS, 5);
  const capexMatches = countMatches(text, CAPEX_PATTERNS);
  const capexSamples = extractSamples(text, CAPEX_PATTERNS, 3);
  const forwardCapexMatches = countMatches(text, FORWARD_CAPEX_PATTERNS);
  const forwardCapexSamples = extractSamples(text, FORWARD_CAPEX_PATTERNS, 3);
  const namedProducts = findNamedProducts(text);
  const segmentMatches = countMatches(text, SEGMENT_PATTERNS);
  const aiRiskMatches = countMatches(text, AI_RISK_PATTERNS);
  const aiRiskSamples = extractSamples(text, AI_RISK_PATTERNS, 3);
  const vagueMatches = countMatches(text, VAGUE_PHRASES);

  // Score per rubric
  const specific_ai_revenue = revenueMatches >= 1 ? 5 : 0;
  const ai_capex = capexMatches >= 1 ? 3 : 0;
  const segment_breakdown = segmentMatches >= 1 ? 5 : 0;
  const named_products = Math.min(namedProducts.length * 2, 4);
  const forward_capex_guidance = forwardCapexMatches >= 1 ? 3 : 0;
  const risk_factors = aiRiskMatches >= 1 ? 2 : 0;
  const generic_penalty = Math.max(-Math.min(vagueMatches, 3), -3);

  const dqs_total = specific_ai_revenue + ai_capex + segment_breakdown + named_products + forward_capex_guidance + risk_factors + generic_penalty;

  return {
    ticker,
    text_length: text.length,
    word_count_approx: Math.round(text.length / 6),

    counts: {
      ai_terms_total: aiMentionTotal,
      vague_phrases: vagueMatches,
      revenue_matches: revenueMatches,
      capex_matches: capexMatches,
      forward_capex_matches: forwardCapexMatches,
      ai_risk_matches: aiRiskMatches,
      segment_matches: segmentMatches,
    },

    named_products: namedProducts,

    dqs: {
      specific_ai_revenue,
      ai_capex,
      segment_breakdown,
      named_products,
      forward_capex_guidance,
      risk_factors,
      generic_penalty,
      total: dqs_total,
    },

    tier: dqs_total >= 16 ? 'Exemplar'
        : dqs_total >= 11 ? 'Solid'
        : dqs_total >=  6 ? 'Vague'
        : dqs_total >=  0 ? 'Opaque'
        : 'Misleading',

    talk_show_ratio: aiMentionTotal / Math.max(dqs_total, 0.5), // higher = more hype-per-disclosure

    samples: {
      revenue: revenueSamples,
      capex: capexSamples,
      forward_capex: forwardCapexSamples,
      ai_risk: aiRiskSamples,
    },
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function findTextFile(ticker) {
  const dir = join(FILINGS_DIR, ticker);
  if (!existsSync(dir)) return null;
  const txt = readdirSync(dir).find((f) => f.startsWith('10-K-') && f.endsWith('.txt'));
  return txt ? join(dir, txt) : null;
}

function getAllCachedTickers() {
  if (!existsSync(FILINGS_DIR)) return [];
  return readdirSync(FILINGS_DIR).filter((t) => {
    const stat = existsSync(join(FILINGS_DIR, t));
    return stat && findTextFile(t);
  });
}

async function main() {
  mkdirSync(SCORED_DIR, { recursive: true });
  const args = process.argv.slice(2);
  const tickers = args.length > 0 ? args : getAllCachedTickers();

  console.log(`[analyze-10k] scoring ${tickers.length} filings`);
  console.log('');

  const results = [];
  for (const ticker of tickers) {
    const file = findTextFile(ticker);
    if (!file) {
      console.warn(`  [${ticker}] no text file, skipping`);
      continue;
    }
    const text = readFileSync(file, 'utf8');
    const scored = scoreFiling(ticker, text);
    writeFileSync(join(SCORED_DIR, `${ticker}.json`), JSON.stringify(scored, null, 2));
    console.log(`  [${ticker}] DQS=${scored.dqs.total} (${scored.tier}) · ai_mentions=${scored.counts.ai_terms_total} · products=${scored.named_products.length}`);
    results.push(scored);
  }

  // Leaderboard
  results.sort((a, b) => b.dqs.total - a.dqs.total);
  console.log('');
  console.log('=== LEADERBOARD (top 10) ===');
  for (const r of results.slice(0, 10)) {
    console.log(`  ${r.dqs.total.toString().padStart(3)}  ${r.tier.padEnd(10)} ${r.ticker}`);
  }
  console.log('');
  console.log('=== BOTTOM 10 ===');
  for (const r of results.slice(-10).reverse()) {
    console.log(`  ${r.dqs.total.toString().padStart(3)}  ${r.tier.padEnd(10)} ${r.ticker}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
