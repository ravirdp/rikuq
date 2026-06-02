#!/usr/bin/env node
// generate-charts.mjs — emit 5 inline-SVG charts for the Indian AI Search Audit
//
// Outputs JSON with SVG strings keyed by FINDING_N_CHART_SVG. These get merged
// into the master tokens.json before render-report.mjs runs.
//
// Re-runnable. Brand palette baked in. Data hand-encoded for now (one-time
// generation); future reports can read data from CSVs.
//
// Usage:
//   node scripts/pdf/generate-charts.mjs > article-assets/indian-ai-search-audit/pdf-source/charts.json

// Brand palette (matches the PDF template)
const COLOR = {
  amber: '#f5b942',
  amberLight: '#fef3c7',
  amberDark: '#92400e',
  amberMid: '#d97706',
  dark: '#0a0b0e',
  fg: '#0f172a',
  muted: '#6b7280',
  border: '#e5e7eb',
  bgCard: '#ffffff',
  bgPage: '#fafaf9',
  grey: '#9ca3af',
  greyLight: '#f3f4f6',
  green: '#0f766e',
  greenLight: '#ccfbf1',
};

// ============================================================================
// Chart 1 — Top 20 most-cited domains (horizontal bar)
// ============================================================================
const TOP_DOMAINS = [
  { rank: 1,  domain: 'instagram.com',       cites: 21, type: 'social' },
  { rank: 2,  domain: 'jimmyluxury.in',      cites: 14, type: 'indie'  },
  { rank: 3,  domain: 'youtube.com',         cites: 12, type: 'social' },
  { rank: 4,  domain: 'practo.com',          cites: 11, type: 'agg'    },
  { rank: 5,  domain: 'play.google.com',     cites: 11, type: 'market' },
  { rank: 6,  domain: 'reddit.com',          cites: 10, type: 'social' },
  { rank: 7,  domain: 'magicbricks.com',     cites:  9, type: 'agg'    },
  { rank: 8,  domain: 'justdial.com',        cites:  9, type: 'agg'    },
  { rank: 9,  domain: 'amazon.in',           cites:  9, type: 'market' },
  { rank: 10, domain: 'policybazaar.com',    cites:  8, type: 'agg'    },
  { rank: 11, domain: 'tryreadable.ai',      cites:  7, type: 'other'  },
  { rank: 12, domain: 'sugarcosmetics.com',  cites:  7, type: 'brand', highlight: true },
  { rank: 13, domain: 'paisabazaar.com',     cites:  7, type: 'agg'    },
  { rank: 14, domain: 'nobroker.in',         cites:  7, type: 'agg'    },
  { rank: 15, domain: 'kamaayurveda.in',     cites:  7, type: 'brand'  },
  { rank: 16, domain: '99acres.com',         cites:  7, type: 'agg'    },
  { rank: 17, domain: 'udemy.com',           cites:  6, type: 'market' },
  { rank: 18, domain: 'thedeconstruct.in',   cites:  6, type: 'indie'  },
  { rank: 19, domain: 'stablemoney.in',      cites:  6, type: 'brand'  },
  { rank: 20, domain: 'pristyncare.com',     cites:  6, type: 'brand'  },
];

function colorFor(type) {
  if (type === 'brand')  return COLOR.green;
  if (type === 'social' || type === 'indie') return COLOR.amber;
  return COLOR.grey;
}

function chart1() {
  const W = 700, H = 480;
  const rowH = 21;
  const labelW = 170;
  const valueW = 36;
  const barAreaW = W - labelW - valueW - 24;
  const maxCites = 21;
  const startY = 10;

  const rows = TOP_DOMAINS.map((d, i) => {
    const y = startY + i * rowH;
    const barW = (d.cites / maxCites) * barAreaW;
    const fill = colorFor(d.type);
    const labelColor = d.highlight ? COLOR.dark : COLOR.fg;
    const labelWeight = d.highlight ? 700 : 500;
    const annotation = d.highlight ? `<text x="${W - 6}" y="${y + 13}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="8" fill="${COLOR.green}" font-weight="700">← FIRST BRAND SITE</text>` : '';
    return `
      <text x="${labelW - 8}" y="${y + 14}" text-anchor="end" font-family="Inter, sans-serif" font-size="9.5" fill="${labelColor}" font-weight="${labelWeight}">${d.rank}. ${d.domain}</text>
      <rect x="${labelW}" y="${y + 4}" width="${barW}" height="14" fill="${fill}" rx="2"/>
      <text x="${labelW + barW + 6}" y="${y + 14}" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="${COLOR.fg}">${d.cites}</text>
      ${annotation}
    `;
  }).join('');

  const legend = `
    <g transform="translate(0, ${startY + 20 * rowH + 12})">
      <rect x="0" y="0" width="10" height="10" fill="${COLOR.amber}" rx="2"/>
      <text x="14" y="9" font-family="Inter, sans-serif" font-size="8.5" fill="${COLOR.fg}">Social / UGC / Indie</text>
      <rect x="150" y="0" width="10" height="10" fill="${COLOR.grey}" rx="2"/>
      <text x="164" y="9" font-family="Inter, sans-serif" font-size="8.5" fill="${COLOR.fg}">Aggregator / Marketplace</text>
      <rect x="330" y="0" width="10" height="10" fill="${COLOR.green}" rx="2"/>
      <text x="344" y="9" font-family="Inter, sans-serif" font-size="8.5" fill="${COLOR.fg}">Brand-owned website</text>
    </g>
  `;

  return `<svg viewBox="0 0 ${W} ${H + 25}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:0 auto;">${rows}${legend}</svg>`;
}

// ============================================================================
// Chart 2 — Branded vs Unbranded (two donuts + gap callout)
// ============================================================================
function donut(cx, cy, r, pct, color, label, sub) {
  const C = 2 * Math.PI * r;
  const filled = (pct / 100) * C;
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${COLOR.border}" stroke-width="18"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="18"
            stroke-dasharray="${filled} ${C - filled}" stroke-dashoffset="${C / 4}"
            transform="rotate(-90 ${cx} ${cy})" stroke-linecap="round"/>
    <text x="${cx}" y="${cy + 8}" text-anchor="middle" font-family="Playfair Display, serif" font-size="36" font-weight="700" fill="${COLOR.fg}">${pct}%</text>
    <text x="${cx}" y="${cy + 70}" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" font-weight="700" fill="${COLOR.fg}">${label}</text>
    <text x="${cx}" y="${cy + 86}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" fill="${COLOR.muted}">${sub}</text>
  `;
}

function chart2() {
  const W = 700, H = 240;
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:0 auto;">
    ${donut(150, 110, 60, 73, COLOR.amber, 'BRANDED COMPARISON', '66 / 90 cells')}
    ${donut(550, 110, 60, 33, COLOR.amber, 'UNBRANDED CATEGORY', '106 / 316 cells')}
    <g transform="translate(${W/2}, 110)">
      <text x="0" y="-5" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="${COLOR.amberDark}">GAP</text>
      <text x="0" y="22" text-anchor="middle" font-family="Playfair Display, serif" font-size="42" font-weight="700" fill="${COLOR.amberDark}">40<tspan font-size="20">pt</tspan></text>
    </g>
    <line x1="220" y1="110" x2="480" y2="110" stroke="${COLOR.amberLight}" stroke-width="2" stroke-dasharray="3 3"/>
  </svg>`;
}

// ============================================================================
// Chart 3 — Per-brand AIO vs ChatGPT asymmetry (grouped horizontal bars)
// ============================================================================
const BRANDS = [
  { name: 'snitch',          aio: 10, chatgpt: 90 },
  { name: 'pristyn-care',    aio: 80, chatgpt: 30 },
  { name: 'clickpost',       aio: 40, chatgpt: 90 },
  { name: 'foxtale',         aio: 10, chatgpt: 60 },
  { name: 'whizlabs',        aio: 20, chatgpt: 60 },
  { name: 'forest-essentials', aio: 70, chatgpt: 70 },
  { name: 'indmoney',        aio: 60, chatgpt: 70 },
  { name: 'treebo',          aio: 50, chatgpt: 80 },
  { name: 'souled-store',    aio: 60, chatgpt: 60 },
  { name: 'allo-health',     aio: 60, chatgpt: 60 },
  { name: 'pilgrim',         aio: 40, chatgpt: 60 },
  { name: 'stable-money',    aio: 60, chatgpt: 40 },
  { name: 'square-yards',    aio: 40, chatgpt: 60 },
  { name: 'jar',             aio: 30, chatgpt: 70 },
  { name: 'sugar-cosmetics', aio: 30, chatgpt: 50 },
  { name: 'acko',            aio: 30, chatgpt: 50 },
  { name: 'bombay-shaving',  aio: 20, chatgpt: 50 },
  { name: 'vsh',             aio: 30, chatgpt: 40 },
  { name: 'easemytrip',      aio: 20, chatgpt: 30 },
  { name: 'slice',           aio: 20, chatgpt: 30 },
  { name: 'adarsh',          aio: 30, chatgpt: 20 },
  { name: 'endeavor',        aio:  0, chatgpt: 10 },
  { name: 'vtiger',          aio:  0, chatgpt: 10 },
  { name: 'paybooks',        aio:  0, chatgpt:  0 },
  { name: 'davanam',         aio:  0, chatgpt:  0 },
];

function chart3() {
  const W = 700, H = 520;
  const rowH = 19;
  const labelW = 130;
  const barAreaW = W - labelW - 40;
  const startY = 30;

  // header
  const header = `
    <text x="${labelW - 8}" y="14" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="8" font-weight="700" fill="${COLOR.muted}" letter-spacing="0.1em">BRAND</text>
    <text x="${labelW + barAreaW / 4}" y="14" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" font-weight="700" fill="${COLOR.amber}" letter-spacing="0.1em">AIO SURFACE</text>
    <text x="${labelW + (3 * barAreaW) / 4}" y="14" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8" font-weight="700" fill="${COLOR.amberDark}" letter-spacing="0.1em">CHATGPT SURFACE</text>
  `;

  const rows = BRANDS.map((b, i) => {
    const y = startY + i * rowH;
    const aioW = (b.aio / 100) * (barAreaW / 2 - 4);
    const chatgptW = (b.chatgpt / 100) * (barAreaW / 2 - 4);
    const isSnitch = b.name === 'snitch';
    const rowBg = isSnitch ? `<rect x="0" y="${y - 2}" width="${W}" height="${rowH - 2}" fill="${COLOR.amberLight}" rx="2"/>` : '';
    const labelWeight = isSnitch ? 700 : 500;
    const annotation = ''; // row-highlight + headline stat already signals Snitch is the standout
    return `${rowBg}
      <text x="${labelW - 8}" y="${y + 13}" text-anchor="end" font-family="Inter, sans-serif" font-size="9" fill="${COLOR.fg}" font-weight="${labelWeight}">${b.name}</text>
      <rect x="${labelW + barAreaW / 2 - 4 - aioW}" y="${y + 4}" width="${aioW}" height="12" fill="${COLOR.amber}" rx="1.5"/>
      <rect x="${labelW + barAreaW / 2 + 4}" y="${y + 4}" width="${chatgptW}" height="12" fill="${COLOR.amberDark}" rx="1.5"/>
      <text x="${labelW + barAreaW / 2 - 4 - aioW - 4}" y="${y + 13}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="7.5" fill="${COLOR.muted}">${b.aio}%</text>
      <text x="${labelW + barAreaW / 2 + 4 + chatgptW + 4}" y="${y + 13}" font-family="JetBrains Mono, monospace" font-size="7.5" fill="${COLOR.muted}">${b.chatgpt}%</text>
      ${annotation}
    `;
  }).join('');

  // center divider
  const divider = `<line x1="${labelW + barAreaW / 2}" y1="${startY - 5}" x2="${labelW + barAreaW / 2}" y2="${startY + BRANDS.length * rowH - 5}" stroke="${COLOR.border}" stroke-width="1"/>`;

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:0 auto;">${header}${divider}${rows}</svg>`;
}

// ============================================================================
// Chart 4 — Cohort surface rate distribution (3 columns + mean lines + dots)
// ============================================================================
const COHORTS = [
  { name: 'WIPEOUT',           label: 'Older / mostly local',  n: 9,  mean: 27, dots: [0, 25, 5, 5, 70, 40, 0, 65, 35] },
  { name: 'FUNDED-NOT-LEADER', label: 'Series B+ challengers', n: 10, mean: 46, dots: [40, 40, 25, 25, 55, 60, 35, 65, 50, 65] },
  { name: 'NEWER-FUNDED',      label: 'Series A/B startups',    n: 6,  mean: 49, dots: [35, 50, 50, 50, 50, 60] },
];

function chart4() {
  const W = 700, H = 320;
  const colW = 180;
  const startX = 60;
  const startY = 30;
  const maxScale = 100;
  const chartH = 230;

  // y-axis grid
  const yAxis = `
    <text x="${startX - 20}" y="${startY + 6}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="8" fill="${COLOR.muted}">100%</text>
    <text x="${startX - 20}" y="${startY + chartH / 2 + 4}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="8" fill="${COLOR.muted}">50%</text>
    <text x="${startX - 20}" y="${startY + chartH + 4}" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="8" fill="${COLOR.muted}">0%</text>
    <line x1="${startX - 10}" y1="${startY + chartH / 2}" x2="${startX + 3 * colW + 20}" y2="${startY + chartH / 2}" stroke="${COLOR.border}" stroke-dasharray="2 2"/>
  `;

  const cols = COHORTS.map((c, i) => {
    const x = startX + i * colW;
    const meanY = startY + chartH - (c.mean / maxScale) * chartH;
    const barX = x + colW / 2 - 50;

    const meanBar = `<rect x="${barX}" y="${meanY}" width="100" height="${startY + chartH - meanY}" fill="${COLOR.amber}" opacity="0.85" rx="3"/>`;
    const meanLine = `<line x1="${barX - 10}" y1="${meanY}" x2="${barX + 110}" y2="${meanY}" stroke="${COLOR.amberDark}" stroke-width="2"/>`;
    const meanLabel = `<text x="${x + colW / 2}" y="${meanY - 12}" text-anchor="middle" font-family="Playfair Display, serif" font-size="22" font-weight="700" fill="${COLOR.amberDark}">${c.mean}%</text>`;

    const dots = c.dots.map((d, j) => {
      const dotY = startY + chartH - (d / maxScale) * chartH;
      const dotX = x + colW / 2 - 30 + (j % 5) * 15;
      return `<circle cx="${dotX}" cy="${dotY}" r="3" fill="${COLOR.fg}" opacity="0.55"/>`;
    }).join('');

    const nameLabel = `
      <text x="${x + colW / 2}" y="${startY + chartH + 24}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="8.5" font-weight="700" fill="${COLOR.fg}" letter-spacing="0.1em">${c.name}</text>
      <text x="${x + colW / 2}" y="${startY + chartH + 38}" text-anchor="middle" font-family="Inter, sans-serif" font-size="8" fill="${COLOR.muted}">${c.label} (n=${c.n})</text>
    `;

    return `${meanBar}${meanLine}${meanLabel}${dots}${nameLabel}`;
  }).join('');

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;display:block;margin:0 auto;">${yAxis}${cols}</svg>`;
}

// ============================================================================
// Chart 5 — Per-vertical top-cited domain (HTML grid, not SVG)
// ============================================================================
const VERTICAL_TOPS = [
  { vertical: 'beauty',         domain: 'instagram.com',   cites: 10, type: 'social' },
  { vertical: 'healthcare',     domain: 'practo.com',      cites: 11, type: 'agg' },
  { vertical: 'real-estate',    domain: 'magicbricks.com', cites:  9, type: 'agg' },
  { vertical: 'insurtech',      domain: 'policybazaar.com',cites:  8, type: 'agg' },
  { vertical: 'fintech',        domain: 'play.google.com', cites:  7, type: 'market' },
  { vertical: 'd2c-apparel',    domain: 'jimmyluxury.in',  cites: 14, type: 'indie' },
  { vertical: 'jewellery',      domain: 'justdial.com',    cites:  6, type: 'agg' },
  { vertical: 'coaching',       domain: 'imsindia.com',    cites:  6, type: 'brand (competitor)' },
  { vertical: 'cert-saas',      domain: 'udemy.com',       cites:  6, type: 'market' },
  { vertical: 'hospitality',    domain: 'tripadvisor.in',  cites:  4, type: 'agg' },
  { vertical: 'ota-travel',     domain: 'makemytrip.com',  cites:  3, type: 'brand (competitor)' },
  { vertical: 'crm-saas',       domain: '1channel.co',     cites:  1, type: 'other' },
];

function chart5() {
  const colorMap = {
    'social': COLOR.amber,
    'indie': COLOR.amber,
    'agg': COLOR.grey,
    'market': COLOR.grey,
    'brand (competitor)': COLOR.green,
    'other': COLOR.muted,
  };

  const cards = VERTICAL_TOPS.map(v => {
    const dotColor = colorMap[v.type] || COLOR.muted;
    return `
      <div style="background:white;border:1px solid ${COLOR.border};border-radius:8px;padding:11px 13px;box-shadow:0 1px 2px rgba(0,0,0,0.03);">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;">
          <div style="width:8px;height:8px;border-radius:50%;background:${dotColor};"></div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:7pt;color:${COLOR.muted};letter-spacing:0.08em;text-transform:uppercase;font-weight:700;">${v.vertical}</div>
        </div>
        <div style="font-family:'Inter',sans-serif;font-size:9.5pt;font-weight:700;color:${COLOR.fg};margin-bottom:2px;word-break:break-word;">${v.domain}</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:8pt;color:${COLOR.amberDark};font-weight:700;">${v.cites} citations · ${v.type}</div>
      </div>
    `;
  }).join('');

  return `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:8px 0 12px 0;">${cards}</div>`;
}

// ============================================================================
// Emit
// ============================================================================
const output = {
  FINDING_1_CHART_SVG: chart1(),
  FINDING_2_CHART_SVG: chart2(),
  FINDING_3_CHART_SVG: chart3(),
  FINDING_4_CHART_SVG: chart4(),
  FINDING_5_CHART_SVG: chart5(),
};

console.log(JSON.stringify(output, null, 2));
