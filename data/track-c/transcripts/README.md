# Earnings Call Transcripts — Track C #1 Talk-Show Ratio

Drop one plain-text transcript per company here as `<TICKER>.txt` (e.g. `MSFT.txt`,
`GOOGL.txt`). Then run:

```bash
node scripts/track-c/score-earnings.mjs --csv
```

This computes the proper Talk-Show ratio (`earnings_call_AI_mentions / DQS`) and
writes it into both `data/track-c/scored/<ticker>.json` and the
`talk_show_ratio` column of `data/track-c/c1-companies.csv`.

## Why these aren't auto-scraped

Motley Fool transcript URLs are per-company per-quarter and not discoverable via
any free API. WebFetch can't guess them. Use Claude-in-Chrome (which browses
fool.com directly) to harvest the latest transcript per ticker.

## CiC harvest prompt

```
Task: collect the latest earnings call transcript for each ticker below from
fool.com (Motley Fool publishes them free). For each, save the full transcript
body as plain text.

For each ticker:
1. Go to https://www.fool.com/quote/<exchange>/<ticker>/ OR google
   "<ticker> earnings call transcript motley fool latest quarter"
2. Open the most recent earnings call transcript (Q-most-recent 2026 or
   late 2025, whichever is newest)
3. Copy the FULL transcript body text (prepared remarks + Q&A, skip the ads
   and the "10 stocks" boilerplate)
4. Give it back to me labeled with the ticker

Tickers (priority order — do the top 15 first, they matter most for the
top/bottom-10 story):
MSFT, GOOGL, AMZN, META, NVDA, AAPL, CRM, ORCL, ADBE, NOW,
PLTR, SNOW, AMD, IBM, SAP

Then the rest if time permits:
INTU, PANW, DDOG, NET, MDB, TEAM, SHOP, UBER, ABNB, COIN,
and the remaining tickers in data/track-c/c1-companies.csv

Return each transcript clearly labeled "=== TICKER ===" so I can split them
into separate files.
```

Once CiC returns the transcripts, save each to `<TICKER>.txt` in this folder
and run the scorer.

## What the ratio means

- **High ratio** (lots of AI mentions on the call, low DQS in the filing) =
  the company talks AI hype but discloses little hard substance. These are the
  "name and shame" candidates for the article.
- **Low ratio** (substance matches or exceeds the talk) = the company's
  disclosure backs up its earnings-call narrative. These are the exemplars.

The headline finding from the audit: Meta is one of only two companies in 46
that actually discloses specific forward AI capex ($115-135B for 2026), so its
ratio should be notably lower than peers who hype AI without the capex numbers.
