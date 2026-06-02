# Ship Day Checklist — Track C #1: AI Spend Disclosure Audit (Wed Jun 3)

Second flagship research piece. Fully built ahead of deadline; Wednesday is execution.

**Article:** The 2026 AI Spend Disclosure Audit: 46 Companies Graded
**Slug:** `ai-spend-disclosure-audit-2026`
**Live URL (after ship):** https://rikuq.com/blog/finops/ai-spend-disclosure-audit-2026/
**Branch:** `research/track-c-1-ai-spend-disclosure` (article ready, cover ready, `draft: true`)

---

## Phase 1 — Ship the article (~10 min)

```
[ ] git checkout research/track-c-1-ai-spend-disclosure
[ ] git merge main          # bring in any main updates
[ ] resolve conflicts if any (this branch is behind main on shared files
    like what-is-llm-finops.mdx, FinOpsCTA.astro — take main's versions)
[ ] flip draft: true -> false in
    src/content/blog/ai-spend-disclosure-audit-2026.mdx
[ ] npm run build           # verify clean
[ ] git commit "content: ship Track C #1 AI Spend Disclosure Audit (draft->false)"
[ ] git checkout main
[ ] git merge research/track-c-1-ai-spend-disclosure --no-ff
[ ] git push                # DEPLOY = LIVE
[ ] verify live: https://rikuq.com/blog/finops/ai-spend-disclosure-audit-2026/
[ ] verify cover renders
[ ] sqlite3 data/content-ops.db "UPDATE briefs SET status='published'
    WHERE slug='ai-spend-disclosure-audit-2026';"
```

Note: the research branch carries the track-c scripts + scored data + the
gitignore for transcripts. Merging to main brings all of that. The raw
transcript .txt files stay local (gitignored) — fine.

## Phase 2 — Social (drafts in the Jun 2 session transcript)

```
[ ] X thread (7 tweets) — Amazon $43B/0 + Palantir counterintuitive hooks
[ ] LinkedIn long-form (investor/finance audience)
[ ] Reddit r/investing
[ ] Reddit r/SecurityAnalysis (the AI-security-sector irony lands here)
[ ] (optional) Hacker News link post — the "AI disclosure gap" framing is HN-fit
```
Audience = investors / fintwit / equity analysts (different from the Indian
audit's D2C-marketing audience). Casual-voice rules still apply to Reddit.

## Phase 3 — Citare report surface

The article CTA points to Citare for the full per-company dataset.
```
[ ] Confirm citare.ai has a path to receive "full dataset / Q3 waitlist" requests
[ ] (optional) Build the PDF report via scripts/pdf/ pipeline (methodology
    references a ~10-page report; the audit used the same pipeline)
```

## Phase 4 — Housekeeping

```
[ ] Add to docs/crosspost-tracker.md
[ ] Day-3 cron will auto-crosspost to Dev.to (~Jun 6, looks for Jun 3 commits)
[ ] GSC Request-Indexing the new URL (it's flagship, worth the manual push)
[ ] Append social posts to reactive-pr.md owned-posts log
```

---

## The shareable hooks (ranked)

1. **Amazon** — $43.2B Q1 capex "primarily AWS + generative AI" on the call, DQS 0 in the filing. The cleanest single gap.
2. **Palantir** — "the AI company" mentions AI the FEWEST of the 15 measured; discloses more than it hypes. Counterintuitive = shareable.
3. **Only 2 of 46 clear "Solid," Apple + Amazon both 0** — the headline number.
4. **AI-security sector discloses its own AI the LEAST** — the irony hook for r/SecurityAnalysis.
5. **CrowdStrike** — 153 AI mentions, -3 disclosure. The worst offender.

## Data integrity notes (for any pushback)

- DQS computed from actual 10-K text, top/bottom hand-verified against filings.
- Talk counts are deterministic regex over the real transcript body text
  (curl + strip), NOT model estimates — we explicitly rejected the WebFetch
  model counts after they anchored 5 transcripts to identical numbers.
- Talk + Show use the identical AI-term vocabulary.
- Raw transcripts not republished (copyright); only derived counts shown.
