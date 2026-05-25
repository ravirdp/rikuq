// Per-article cover image generator. 1600x893 JPEG matching rikuq's existing
// hand-made cover dimensions. Drop-in fallback so the publish workflow never
// blocks on a missing hero image — any slug can be hand-replaced later.
//
// Usage:
//   node scripts/generate-cover.mjs <slug> "<title>" <pillar>
//   node scripts/generate-cover.mjs --all-approved      # all approved briefs without a cover
//
// Examples:
//   node scripts/generate-cover.mjs my-slug "How I Did X" finops
//   node scripts/generate-cover.mjs --all-approved
//
// Pulls brief data from data/content-ops.db when using --all-approved.

import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { openDb } from '@ravirdp/content-ops/db';

const OUT_DIR = 'public/illustrations/covers';
const W = 1600;
const H = 893;

// Brand palette (matches src/styles + generate-og-default.mjs)
const COLOR = {
  bg: '#0a0b0e',
  dot: '#23262d',
  amber: '#f5b942',
  fg: '#ececec',
  muted: '#9aa0a8',
};

const PILLAR_LABELS = {
  tools: 'TOOLS',
  infra: 'INFRA',
  finops: 'FINOPS',
  geo: 'GEO',
  stack: 'STACK',
  essays: 'ESSAYS',
};

// Greedy word wrap for SVG <text>. Returns an array of lines.
// At 88pt Inter Bold, ~24 chars per line fits comfortably in 1300px.
function wrapTitle(title, maxCharsPerLine = 24) {
  const words = title.split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c])
  );
}

function buildSvg({ title, pillar }) {
  const pillarLabel = PILLAR_LABELS[pillar] ?? (pillar ?? '').toUpperCase();
  const titleLines = wrapTitle(title);
  const lineHeight = 100;
  const titleStartY = 380 - ((titleLines.length - 1) * lineHeight) / 2;

  const titleTspans = titleLines
    .map(
      (line, i) =>
        `<tspan x="80" y="${titleStartY + i * lineHeight}">${escapeXml(line)}</tspan>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="20%" cy="30%" r="65%">
      <stop offset="0%"  stop-color="${COLOR.amber}" stop-opacity="0.12"/>
      <stop offset="60%" stop-color="${COLOR.amber}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="${COLOR.dot}"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="${COLOR.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  ${pillarLabel ? `
  <!-- Pillar kicker -->
  <text x="80" y="160"
        font-family="Inter, Helvetica, Arial, sans-serif"
        font-weight="700"
        font-size="28"
        letter-spacing="4"
        fill="${COLOR.amber}">${escapeXml(pillarLabel)}</text>
  ` : ''}

  <!-- Title -->
  <text font-family="Inter, Helvetica, Arial, sans-serif"
        font-weight="700"
        font-size="88"
        letter-spacing="-3"
        fill="${COLOR.fg}">${titleTspans}</text>

  <!-- Bottom-left accent + URL -->
  <rect x="80" y="${H - 130}" width="80" height="3" fill="${COLOR.amber}" rx="1.5"/>
  <text x="80" y="${H - 80}"
        font-family="Inter, Helvetica, Arial, sans-serif"
        font-weight="600"
        font-size="24"
        letter-spacing="0.5"
        fill="${COLOR.muted}">rikuq.com</text>

  <!-- Top-right wordmark -->
  <g transform="translate(${W - 80}, 130)">
    <text x="0" y="0"
          text-anchor="end"
          font-family="Inter, Helvetica, Arial, sans-serif"
          font-weight="700"
          font-size="40"
          letter-spacing="-1.5"
          fill="${COLOR.fg}">rikuq</text>
    <!-- amber dot above the i -->
    <circle cx="-29" cy="-29" r="5" fill="${COLOR.amber}"/>
  </g>
</svg>`;
}

async function generateOne(slug, title, pillar) {
  mkdirSync(OUT_DIR, { recursive: true });
  const out = join(OUT_DIR, `${slug}.jpg`);
  const svg = buildSvg({ title, pillar });
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(out);
  console.log(`  wrote ${out}`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args[0] === '--all-approved') {
    const db = openDb('data/content-ops.db');
    // Pillar comes from notes field for now (target: YYYY-MM-DD (DOW, pillar))
    // until v0.4.0 adds a proper column.
    const rows = db
      .prepare(`SELECT id, slug, title, notes FROM briefs WHERE status='approved'`)
      .all();
    for (const r of rows) {
      const dest = join(OUT_DIR, `${r.slug}.jpg`);
      if (existsSync(dest)) {
        console.log(`  skip (exists): ${r.slug}`);
        continue;
      }
      // Specifically extract from the "target: YYYY-MM-DD (DOW, pillar)" stamp
      // so we don't accidentally grab some other parenthetical in the notes.
      const match = r.notes?.match(/target:\s*\d{4}-\d{2}-\d{2}\s*\([^,]+,\s*([^)]+)\)/);
      const pillar = match ? match[1].trim() : '';
      await generateOne(r.slug, r.title, pillar);
    }
    db.close();
    return;
  }

  const [slug, title, pillar] = args;
  if (!slug || !title) {
    console.error('usage: node scripts/generate-cover.mjs <slug> "<title>" <pillar>');
    console.error('       node scripts/generate-cover.mjs --all-approved');
    process.exit(1);
  }
  await generateOne(slug, title, pillar ?? '');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
