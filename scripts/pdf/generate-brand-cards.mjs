#!/usr/bin/env node
// generate-brand-cards.mjs — emit 3 HTML page-blocks of brand cards for the per-brand index.
//
// 25 brands across 3 pages (9-8-8). Each card: name, vertical, surface%, AIO%, ChatGPT%, top competitor, key finding.
//
// Output: JSON with BRAND_CARDS_PAGE_1 / _2 / _3 keys.

const BRANDS = [
  // page 1 (9 brands — strongest performers + early-alphabet)
  { name: 'Forest Essentials', vertical: 'beauty',         surface: 70, aio: 70, chatgpt: 70, comp: 'Kama Ayurveda', finding: 'Highest surface rate in our corpus. But absent from product-specific Kumkumadi queries — Kama Ayurveda owns those.' },
  { name: 'Clickpost',         vertical: 'logistics-saas', surface: 65, aio: 40, chatgpt: 90, comp: 'AfterShip',     finding: '50-point AIO/ChatGPT asymmetry (ChatGPT-favored). AfterShip is the top-mentioned competitor (8 mentions).' },
  { name: 'IndMoney',          vertical: 'wealthtech',     surface: 65, aio: 60, chatgpt: 70, comp: 'Groww',         finding: 'Holds parity in unbranded "best Indian investing app" cells. Wins outright on US stocks queries.' },
  { name: 'Treebo',            vertical: 'hospitality',    surface: 65, aio: 50, chatgpt: 80, comp: 'FabHotels',     finding: 'Strongest brand performer in budget hospitality. Wins on tripadvisor.in citation chains + brand-named queries.' },
  { name: 'Souled Store',      vertical: 'd2c-apparel',    surface: 60, aio: 60, chatgpt: 60, comp: 'Bewakoof',      finding: 'AI engines cite Souled Store via jimmyluxury.in listicles (4 times) rather than the brand site directly.' },
  { name: 'Allo Health',       vertical: 'healthcare',     surface: 60, aio: 60, chatgpt: 60, comp: 'Bold Care',     finding: 'Series A startup matching established brands. Citations from Reddit, YouTube, category aggregators.' },
  { name: 'Pristyn Care',      vertical: 'healthcare',     surface: 55, aio: 80, chatgpt: 30, comp: 'Apollo Hospitals', finding: 'Largest AIO-favored asymmetry in corpus (50pt). AIO loves Pristyn; ChatGPT defaults to legacy hospital chains.' },
  { name: 'Pilgrim',           vertical: 'beauty',         surface: 50, aio: 40, chatgpt: 60, comp: 'Mamaearth',     finding: 'Wins "Pilgrim vs Mamaearth" cells. Loses unbranded "best Indian beauty brand" queries to Forest Essentials.' },
  { name: 'Snitch',            vertical: 'd2c-apparel',    surface: 50, aio: 10, chatgpt: 90, comp: 'Souled Store',  finding: 'Largest platform asymmetry in entire corpus (80pt). ChatGPT cites Snitch via jimmyluxury.in; AIO ignores.' },

  // page 2 (8 brands)
  { name: 'Jar',               vertical: 'fintech',        surface: 50, aio: 30, chatgpt: 70, comp: 'PhonePe',       finding: 'Wins brand-named comparison cells. Loses unbranded "best digital gold app India" to PhonePe + Paytm.' },
  { name: 'Stable Money',      vertical: 'fintech',        surface: 50, aio: 60, chatgpt: 40, comp: 'Paisabazaar',   finding: 'AIO-favored; stablemoney.in domain is #19 in most-cited list. Paisabazaar dominates fintech content presence.' },
  { name: 'Square Yards',      vertical: 'real-estate',    surface: 50, aio: 40, chatgpt: 60, comp: 'NoBroker',      finding: 'Aggregator citation moat (MagicBricks, NoBroker, 99acres) dominates the category. Brand sites barely register.' },
  { name: 'Acko',              vertical: 'insurtech',      surface: 40, aio: 30, chatgpt: 50, comp: 'HDFC ERGO',     finding: 'Strong on brand-named comparisons. Flagship Platinum Health product absent from unforced queries.' },
  { name: 'Sugar Cosmetics',   vertical: 'beauty',         surface: 40, aio: 30, chatgpt: 50, comp: 'Maybelline',    finding: 'sugarcosmetics.com is the FIRST brand-owned site to appear in our top-cited list (position 12).' },
  { name: 'Whizlabs',          vertical: 'cert-saas',      surface: 40, aio: 20, chatgpt: 60, comp: 'Udemy',         finding: '40-point platform asymmetry (ChatGPT-favored). Udemy + Tutorials Dojo dominate practice-test queries.' },
  { name: 'Foxtale',           vertical: 'beauty',         surface: 35, aio: 10, chatgpt: 60, comp: 'Minimalist',    finding: 'AIO is missing Foxtale entirely from its citation graph; ChatGPT indexes the brand reasonably well.' },
  { name: 'Bombay Shaving',    vertical: 'd2c-grooming',   surface: 35, aio: 20, chatgpt: 50, comp: 'Beardo',        finding: 'Holds brand-named comparison cells against Beardo. Loses unbranded "best men\'s grooming brand" queries.' },

  // page 3 (8 brands)
  { name: 'VSH Hospital',      vertical: 'healthcare',     surface: 35, aio: 30, chatgpt: 40, comp: 'Manipal Hospitals', finding: 'ChatGPT cleanly indexed the Mallya→VSH rename. AIO lags. Joint-replacement ICP is a complete 0/6 blind spot.' },
  { name: 'EaseMyTrip',        vertical: 'ota-travel',     surface: 25, aio: 20, chatgpt: 30, comp: 'MakeMyTrip',    finding: 'MakeMyTrip dominates (13 mentions vs EaseMyTrip\'s 4). Strong on US-corridor international flight queries only.' },
  { name: 'Slice',             vertical: 'fintech',        surface: 25, aio: 20, chatgpt: 30, comp: 'Jupiter',       finding: 'Jupiter dominates Indian neobank category (7 mentions). Slice surfaces only on brand-named comparisons.' },
  { name: 'Adarsh Developers', vertical: 'real-estate',    surface: 25, aio: 30, chatgpt: 20, comp: 'Brigade',       finding: 'Brigade dominates Bangalore real-estate (10 mentions). Adarsh holds on named-builder queries only.' },
  { name: 'Endeavor Careers',  vertical: 'coaching',       surface:  5, aio:  0, chatgpt: 10, comp: 'IMS',           finding: '1 of 20 cells surfaced — from a Google Maps listing, not editorial content. IMS owns 16/20 cells.' },
  { name: 'Vtiger',            vertical: 'crm-saas',       surface:  5, aio:  0, chatgpt: 10, comp: 'Zoho',          finding: '22 years, 400K customers, original SugarCRM fork — and surfaces in 1/20 cells. Outranked by Twenty + EspoCRM.' },
  { name: 'Davanam Jewellers', vertical: 'jewellery',      surface:  0, aio:  0, chatgpt:  0, comp: 'Tanishq',       finding: '0 of 20 cells. Even queries tailored to brand\'s strongest territory (South Bangalore) returned zero mentions.' },
  { name: 'Paybooks',          vertical: 'payroll-saas',   surface:  0, aio:  0, chatgpt:  0, comp: 'greytHR',       finding: '0 of 20 cells. greytHR dominates Indian payroll-SaaS (14 mentions across 20 cells, every ICP cluster).' },
];

function card(b) {
  return `<div class="brand-card-pdf">
    <div class="bc-head">
      <div class="bc-name">${b.name}</div>
      <div class="bc-vertical">${b.vertical}</div>
    </div>
    <div class="bc-stats">
      <div class="bc-stat">Surface <strong>${b.surface}%</strong></div>
      <div class="bc-stat">AIO <strong>${b.aio}%</strong></div>
      <div class="bc-stat">ChatGPT <strong>${b.chatgpt}%</strong></div>
      <div class="bc-stat" style="margin-left:auto;">Top: <strong>${b.comp}</strong></div>
    </div>
    <div class="bc-finding">${b.finding}</div>
  </div>`;
}

function pageBlock(brands) {
  return `<div class="brand-grid">${brands.map(card).join('')}</div>`;
}

const output = {
  BRAND_CARDS_PAGE_1: pageBlock(BRANDS.slice(0, 9)),
  BRAND_CARDS_PAGE_2: pageBlock(BRANDS.slice(9, 17)),
  BRAND_CARDS_PAGE_3: pageBlock(BRANDS.slice(17, 25)),
};

console.log(JSON.stringify(output, null, 2));
