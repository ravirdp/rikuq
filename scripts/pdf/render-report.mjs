#!/usr/bin/env node
// render-report.mjs — Token-substitute a report template with brief data
//
// Reads scripts/pdf/templates/report-base.html, replaces {{TOKEN}} placeholders
// from a JSON tokens file, writes the populated HTML ready for Chrome headless.
//
// Usage:
//   node scripts/pdf/render-report.mjs <tokens.json> <output.html>
//
// Then:
//   bash scripts/pdf/generate-pdf.sh <output.html> <output.pdf>

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = resolve(__dirname, 'templates', 'report-base.html');

const [, , tokensPath, outputPath] = process.argv;
if (!tokensPath || !outputPath) {
  console.error('Usage: render-report.mjs <tokens.json> <output.html>');
  process.exit(1);
}

const template = readFileSync(TEMPLATE_PATH, 'utf8');
const tokens = JSON.parse(readFileSync(tokensPath, 'utf8'));

let html = template;
for (const [key, value] of Object.entries(tokens)) {
  const re = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
  html = html.replace(re, value);
}

// Sanity check — any unfilled tokens?
const remaining = [...new Set(html.match(/\{\{[A-Z_0-9]+\}\}/g) ?? [])].sort();
if (remaining.length) {
  console.warn(`⚠️  Unfilled tokens: ${remaining.join(', ')}`);
}

writeFileSync(outputPath, html);
console.log(`Wrote ${outputPath} (${(html.length / 1024).toFixed(1)} KB, ${remaining.length} unfilled tokens)`);
