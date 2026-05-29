# Ship Day Checklist — Indian AI Search Audit (Sat May 30)

The flagship research piece. Everything below is prepped; tomorrow is pure execution.

**Article:** The Indian AI Search Audit: 500 Queries, 25 Brands, 777 Citations
**Slug:** `indian-ai-search-audit-may-2026`
**Live URL (after ship):** https://rikuq.com/blog/geo/indian-ai-search-audit-may-2026/
**Branch:** `content/indian-ai-search-audit-may-2026` (article ready, `draft: true`)

---

## Phase 1 — Ship the article (~10 min)

```
[ ] git checkout content/indian-ai-search-audit-may-2026
[ ] git merge main          # brings services page, FinOpsCTA->/services,
                            # nav updates, internal-linking pass, 10 finops articles
[ ] resolve conflicts if any (likely none — different files)
[ ] flip draft: true -> draft: false in
    src/content/blog/indian-ai-search-audit-may-2026.mdx
[ ] npm run build           # verify clean
[ ] git add + commit "content: ship Indian AI Search Audit (flip draft->false)"
[ ] git checkout main
[ ] git merge content/indian-ai-search-audit-may-2026 --no-ff
[ ] git push                # triggers Cloudflare deploy = ARTICLE LIVE
[ ] verify live: https://rikuq.com/blog/geo/indian-ai-search-audit-may-2026/
[ ] verify cover image renders + OG card (paste URL into a tweet draft to check)
[ ] git branch -d content/indian-ai-search-audit-may-2026  (cleanup after merge)
```

---

## Phase 2 — Send the queued emails (all drafted in Gmail)

**Brand outreach (8) — send AFTER article is live so the link works:**
```
[ ] Forest Essentials  (draft r1749741945530828131)
[ ] Sugar Cosmetics    (draft r6330256307565458484)
[ ] Pristyn Care       (draft r5252652528012787869)
[ ] Treebo             (draft r-2325036769205797334)
[ ] IndMoney           (draft r3181087660116547620)
[ ] Souled Store       (draft r6932492409783047248)
[ ] Acko               (draft r8215655203303908261)
[ ] Pilgrim            (draft r-3875850454429597666)
```
Note: each uses a generic marketing@ guess — swap to a real contact if you have one before sending.

**Press pitches (3) — send AFTER article is live:**
```
[ ] Entrackr   (draft r-3892371454993479853)
[ ] Inc42      (draft r1715727079039157400)
[ ] YourStory  (draft r-1080435874839356131)
```

---

## Phase 3 — Social posts (drafts in the May 29 session transcript)

```
[ ] X thread (7 tweets) — post first tweet, then thread the rest. Space the
    standalone teaser separately if you already posted Friday's teaser.
[ ] LinkedIn long-form post
[ ] IndieHackers post (title: "I spent 6 weeks auditing how 25 Indian brands
    surface in AI search...")
[ ] Reddit r/IndianStartups post
[ ] Reddit r/marketing post
```
All 5 drafted in the Friday session. Casual-voice rules apply to Reddit/IH
(no em dashes, lowercase opener, tbh/imo). LinkedIn can stay polished.

---

## Phase 4 — Tracker + housekeeping

```
[ ] Add the audit to docs/crosspost-tracker.md as article #20+ row
[ ] Append Saturday's social posts to reactive-pr.md X owned-posts log
[ ] Update brief #22 status to 'published' in data/content-ops.db:
    sqlite3 data/content-ops.db "UPDATE briefs SET status='published'
    WHERE slug='indian-ai-search-audit-may-2026';"
[ ] Flag #22 frontmatter crossposted handling — the Day-3 cron will pick it
    up Jun 2 (looks for May 30 commits). Leave crossposted unset so it
    auto-crossposts to Dev.to.
```

---

## Phase 5 — Citare coordination (the sub-product surface)

The article references "full per-cell data available via Citare." Make sure
the Citare side is ready to receive the traffic:
```
[ ] Verify citare.ai has a landing path for "audit my brand" requests
[ ] Confirm the sanitized aggregate CSV linked at the article bottom resolves
[ ] If a Citare audit-request form/Cal link exists, confirm it works
```

---

## What's NOT happening today (deliberately)

- No other rikuq article ships Saturday (the audit is the single focus; the
  migration articles already cover the daily cadence through Jun 3)
- No manual GSC indexing submission (per directive — organic discovery only)
- Track C earnings transcripts harvest is a separate non-urgent task (Jun 3 ship)

---

## Success signals to watch (first 48h)

- Article indexed in GSC (check Mon-Tue)
- Any brand or press reply to the 11 emails
- X thread engagement (the 80-point Snitch gap stat is the most shareable hook)
- Citare audit-request inbound (the actual conversion goal)
- Reddit/IH comment quality (watch for AI-flag; humanized drafts should pass)
