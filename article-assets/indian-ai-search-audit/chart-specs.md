# Chart specs — Indian AI Search Audit (May 30 debut)

Five charts to render before publish. Specs include data + intent + style notes
so they can be produced by Opus, Figma, Datawrapper, Flourish, or hand-built
in d3/observable. Brand palette: `#0a0b0e` bg, `#f5b942` amber accent,
`#ececec` light text, `#9aa0a8` muted text. Inter font.

---

## Chart 1: "Top 20 Most-Cited Domains" (the headline visual)

**Type:** Horizontal bar chart, ranked, with category color-coding.

**Why:** First image readers see after the TL;DR. Carries the most visual
weight in the article. The "no brand site in top 10" punch comes from the
color-coding.

**Data:**

| Rank | Domain | Citations | Category | Color |
|---|---|---|---|---|
| 1 | instagram.com | 21 | Social/UGC | amber #f5b942 |
| 2 | jimmyluxury.in | 14 | Indie listicle | amber |
| 3 | youtube.com | 12 | Social/UGC | amber |
| 4 | practo.com | 11 | Aggregator | grey |
| 5 | play.google.com | 11 | Marketplace | grey |
| 6 | reddit.com | 10 | Social/UGC | amber |
| 7 | magicbricks.com | 9 | Aggregator | grey |
| 8 | justdial.com | 9 | Aggregator | grey |
| 9 | amazon.in | 9 | Marketplace | grey |
| 10 | policybazaar.com | 8 | Aggregator | grey |
| 11 | tryreadable.ai | 7 | Other | grey |
| **12** | **sugarcosmetics.com** | **7** | **BRAND SITE** | **green/highlighted** |
| 13 | paisabazaar.com | 7 | Aggregator | grey |
| 14 | nobroker.in | 7 | Aggregator | grey |
| 15 | kamaayurveda.in | 7 | Brand site | green |
| 16 | 99acres.com | 7 | Aggregator | grey |
| 17 | udemy.com | 6 | Marketplace | grey |
| 18 | thedeconstruct.in | 6 | Indie blog | amber |
| 19 | stablemoney.in | 6 | Brand site | green |
| 20 | pristyncare.com | 6 | Brand site | green |

**Style notes:**
- Position 12 (sugarcosmetics.com) needs a visual annotation: "← First brand-owned website"
- Legend: amber = Social/UGC/Indie, grey = Aggregator/Marketplace/Other, green = Brand site
- Title above chart: "Top 20 most-cited domains — only 4 brand sites in the top 20"
- 1600×900px export for article inline; 1080×1350 for LinkedIn carousel

---

## Chart 2: "Branded vs Unbranded Surface Rate" (the 40-point gap)

**Type:** Two large pill/donut comparison with the gap number prominent.

**Why:** Single most quotable number in the piece. Needs to be impossible to misread.

**Data:**
- Branded comparison queries: 66 surfaced / 90 cells = **73.3%**
- Unbranded "best X" queries: 106 surfaced / 316 cells = **33.5%**
- Gap: **40 percentage points**

**Style notes:**
- Side-by-side, large donut for each (amber-filled portion = surfaced)
- Below each donut: the n count ("66/90 cells" and "106/316 cells")
- Big text in middle: "40-point gap"
- Title: "Brand-named queries surface 2× as often as unbranded category queries"

---

## Chart 3: "Per-Brand AIO vs ChatGPT Asymmetry"

**Type:** Horizontal grouped bar chart (one row per brand, two bars per brand).

**Why:** Shows that platforms behave differently per brand — no single AI-search
strategy works. Snitch's 80pp gap is the dramatic reveal.

**Data:** 25 brands, sorted by absolute gap descending.

| Brand | AIO surface | ChatGPT surface |
|---|---|---|
| snitch | 10 | 90 |
| pristyn-care | 80 | 30 |
| clickpost | 40 | 90 |
| foxtale | 10 | 60 |
| whizlabs | 20 | 60 |
| stable-money | 60 | 40 |
| indmoney | 60 | 70 |
| square-yards | 40 | 60 |
| ... | ... | ... |

(Full data: `cohort-summary.csv` columns `aio_surface_rate` + `chatgpt_surface_rate`)

**Style notes:**
- AIO bars in amber, ChatGPT bars in lighter shade
- Brands with >40pp gap: row background highlighted
- Title: "When AI platforms disagree: AIO vs ChatGPT brand surface rate per brand"
- Annotation on Snitch: "← largest gap in corpus (80 percentage points)"

---

## Chart 4: "Cohort Surface Rate Distribution"

**Type:** Three vertical box plots OR three column charts with mean lines.

**Why:** Shows newer-funded brands surface AS WELL AS more-established funded
brands. Counterintuitive to "AI search rewards historical authority."

**Data:**

| Cohort | Brands | Mean surface rate | Range |
|---|---|---|---|
| Wipeout (older/local) | 9 | 27.2% | 0%–70% |
| Funded-not-leader (Series B+ challengers) | 10 | 46.0% | 25%–65% |
| Newer-funded (Series A/B startups) | 6 | 49.2% | 35%–60% |

**Style notes:**
- Bars in amber; the mean labels prominent on top of each bar
- Caption: "Series A/B startups surface as well as funded incumbents. The gap is funding, not age."
- Add small dots for individual brand surface rates so the variance is visible

---

## Chart 5: "Per-Vertical Top-Cited Domain"

**Type:** Vertical-grouped grid showing the top-cited domain per vertical.

**Why:** Reinforces Finding 1 vertical-by-vertical — every vertical's most-cited
domain is a non-brand surface (with the one exception of coaching where IMS dominates).

**Data:**

| Vertical | Top-cited domain | Cites | Domain type |
|---|---|---|---|
| beauty | instagram.com | 10 | Social |
| healthcare | practo.com | 11 | Aggregator |
| real-estate | magicbricks.com | 9 | Aggregator |
| insurtech | policybazaar.com | 8 | Aggregator |
| fintech | play.google.com | 7 | App store |
| d2c-apparel | jimmyluxury.in | 14 | Indie listicle |
| jewellery | justdial.com | 6 | Aggregator |
| coaching | imsindia.com | 6 | Brand site (competitor) |
| cert-saas | udemy.com | 6 | Marketplace |
| hospitality | tripadvisor.in | 4 | Aggregator |
| ota-travel | makemytrip.com | 3 | Brand site (competitor) |
| crm-saas | 1channel.co | 1 | Other |

**Style notes:**
- Grid card per vertical, vertical name + top domain + cite count
- Color-coded by domain type (same palette as Chart 1)
- Title: "The most-cited domain by vertical — almost never the audited brand"
- Coaching and OTA-travel exceptions: those domains are competitor brands, not the audited brand
- Caption: "Of 12 verticals, only 2 have a brand site as the most-cited domain — and both are competitors of the audited brand."

---

## Production options

| Option | Effort | Output quality | Notes |
|---|---|---|---|
| **Opus generates from these specs** | Lowest | Best (knows brand) | Ravi's existing PDF pipeline |
| **Datawrapper / Flourish** | Low | Good | Web-embeddable, browser-based |
| **Figma + manual design** | Medium | Best | Most flexible, needs designer time |
| **d3 + Observable notebook** | Medium | Best (interactive) | Could publish interactive version on rikuq |
| **Python matplotlib + sharp resize** | High | OK | Programmatic, reproducible |

Recommendation: Opus handles charts 1, 2, 4, 5 (static, simple shapes). Chart 3
(per-brand asymmetry) is worth the extra effort to design carefully because
it's the most data-dense visual.
