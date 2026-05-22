// Generate the site-wide default OG share image at public/og-default.png.
//
// This is the social preview that surfaces on Twitter/X, LinkedIn, Slack,
// iMessage, etc. for any page that doesn't supply its own heroImage / ogImage
// (homepage, /about, /products, /tools, etc).
//
// 1200x630 is the standard. Twitter's summary_large_image card is 1200x628;
// Facebook's recommended is 1200x630. 1200x630 satisfies both and is the
// universally-supported size for og:image.
//
// Run:
//   node scripts/generate-og-default.mjs
//
// Re-run whenever the wordmark, tagline, or palette changes.

import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const OUT = 'public/og-default.png';
mkdirSync(dirname(OUT), { recursive: true });

const W = 1200;
const H = 630;

// Hand-authored SVG — same palette + display font as the site.
// Wordmark = "rikuq" with the amber dot accent over the i.
// Tagline = the one-liner used in <meta description> defaults.
// Faint dotted texture in the corner gives it the editorial feel without
// requiring any external image asset.
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="20%" cy="30%" r="60%">
      <stop offset="0%"  stop-color="#f5b942" stop-opacity="0.10"/>
      <stop offset="60%" stop-color="#f5b942" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#23262d"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#0a0b0e"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Decorative accent line -->
  <rect x="80" y="${H - 80}" width="120" height="3" fill="#f5b942" rx="1.5"/>

  <!-- Wordmark group -->
  <g transform="translate(80, 220)">
    <text x="0" y="0"
          font-family="Inter, Helvetica, Arial, sans-serif"
          font-weight="700"
          font-size="180"
          letter-spacing="-7"
          fill="#ececec">rikuq</text>
    <!-- Amber dot over the i -->
    <circle cx="365" cy="-128" r="22" fill="#f5b942"/>
  </g>

  <!-- Tagline -->
  <text x="80" y="380"
        font-family="Inter, Helvetica, Arial, sans-serif"
        font-weight="500"
        font-size="44"
        letter-spacing="-1"
        fill="#ececec">Solo founder. Three AI SaaS shipped.</text>
  <text x="80" y="436"
        font-family="Inter, Helvetica, Arial, sans-serif"
        font-weight="400"
        font-size="32"
        letter-spacing="-0.5"
        fill="#9aa0a8">The practitioner's blog for solo founders shipping real AI SaaS.</text>

  <!-- Bottom-left URL -->
  <text x="80" y="${H - 100}"
        font-family="Inter, Helvetica, Arial, sans-serif"
        font-weight="600"
        font-size="22"
        letter-spacing="0.5"
        fill="#9aa0a8">rikuq.com</text>

  <!-- Bottom-right ribbon: 'by Ravi' -->
  <text x="${W - 80}" y="${H - 60}"
        text-anchor="end"
        font-family="Inter, Helvetica, Arial, sans-serif"
        font-weight="400"
        font-size="20"
        letter-spacing="0.3"
        fill="#9aa0a8">Prism · Citare · BatchWise — by Ravi</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, palette: false })
  .toFile(OUT);

console.log(`✅ Wrote ${OUT} (${W}x${H})`);
