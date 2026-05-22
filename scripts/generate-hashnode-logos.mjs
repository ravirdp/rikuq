// Generate the two Hashnode navbar logos (light + dark mode variants).
//
// Output:
//   public/illustrations/hashnode-logo-light.png  — dark text on transparent (for light bg)
//   public/illustrations/hashnode-logo-dark.png   — light text on transparent (for dark bg)
//
// Both at Hashnode's recommended 500x125 (4:1) with the amber dot accent
// matching the rikuq wordmark.svg used on rikuq.com.
//
// Run: node scripts/generate-hashnode-logos.mjs

import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const W = 500;
const H = 125;

// Build the SVG. Text color is parameterized so we can render both variants
// from one template. Amber dot stays the same in both because amber works
// against both light and dark backgrounds.
function buildSvg({ textColor, dotColor = '#f5b942' }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <text x="40" y="92"
        font-family="Inter, Helvetica, Arial, sans-serif"
        font-weight="700"
        font-size="88"
        letter-spacing="-3"
        fill="${textColor}">rikuq</text>
  <!-- Amber dot accent above the i, matching the rikuq wordmark -->
  <circle cx="118" cy="20" r="10" fill="${dotColor}"/>
</svg>`;
}

async function render(svg, outPath) {
  mkdirSync(dirname(outPath), { recursive: true });
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log(`✅ Wrote ${outPath} (${W}x${H})`);
}

// Light mode = used on light backgrounds → dark text
const lightSvg = buildSvg({ textColor: '#0a0b0e' });
// Dark mode = used on dark backgrounds → light text
const darkSvg = buildSvg({ textColor: '#ececec' });

await render(lightSvg, 'public/illustrations/hashnode-logo-light.png');
await render(darkSvg, 'public/illustrations/hashnode-logo-dark.png');

console.log('\nUpload to Hashnode Appearance:');
console.log('  Blog logo Default · Light mode → hashnode-logo-light.png');
console.log('  Blog logo Dark mode             → hashnode-logo-dark.png');
console.log('  Favicon                         → public/favicon-96x96.png (from existing rikuq bundle)');
