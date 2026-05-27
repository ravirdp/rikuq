# Ship Day Checklist — Indian AI Search Audit (Sat May 30 2026)

Exact sequence for ship day. Designed so the whole thing can run in 90-120 min.

---

## T-minus 24h (Fri evening, May 29)

- [ ] **Final review of article on the branch** — `git checkout content/indian-ai-search-audit-may-2026` + read through one more time. Look for last-mile typos.
- [ ] **Confirm PDF is ready** — file in `/Downloads/indian-ai-search-audit-may-2026.pdf` (or wherever Opus drops it)
- [ ] **Upload PDF to Cloudflare R2** (or Citare's static assets) — get the public download URL
- [ ] **Confirm Citare landing page route exists** at `citare.ai/reports/indian-ai-search-audit-may-2026` (or rikuq fallback at `rikuq.com/reports/indian-ai-search-audit-may-2026`)
- [ ] **Connect Brevo download form** — email goes to "indian-ai-search-audit" tagged list
- [ ] **Pre-schedule LinkedIn carousel** in LinkedIn native scheduler for Sat 8:00 AM IST
- [ ] **Pre-schedule the X thread tweet 1** — set draft, don't schedule (X penalizes scheduled threads)
- [ ] **Final number sanity-check** — re-verify Instagram=21, position 12, 73.3%/33.5%, 80pp gap, jimmyluxury=14 against the source CSVs one last time

---

## T-minus 1h (Sat morning, ~7:00 AM IST)

- [ ] **Flip the article from draft to published** — single line edit:
  ```bash
  cd ~/code/rikuq && git checkout content/indian-ai-search-audit-may-2026
  sed -i '' 's/^draft: true$/draft: false/' src/content/blog/indian-ai-search-audit-may-2026.mdx
  git add src/content/blog/indian-ai-search-audit-may-2026.mdx
  git -c commit.gpgsign=false commit -m "publish: Indian AI Search Audit goes live"
  git push origin content/indian-ai-search-audit-may-2026
  ```
- [ ] **Open PR + merge** — `gh pr create` + `gh pr merge --squash --delete-branch`
- [ ] **Cloudflare Pages auto-deploys** — wait 2-3 min for build to complete
- [ ] **Verify URL is live**: `curl -I https://rikuq.com/blog/geo/indian-ai-search-audit-may-2026` → should return 200

---

## T-0 (Sat 8:00 AM IST / Fri 10:30 PM ET)

- [ ] **Hit LinkedIn post button** — confirm carousel publishes natively
- [ ] **Post X thread manually** — tweet 1 first; reply with tweet 2 within 30 seconds; continue through tweet 14 in 30-second intervals. Whole thread takes ~10 min to post.
- [ ] **Post on Indie Hackers** — copy from `article-assets/indian-ai-search-audit/indie-hackers-post.md`
- [ ] **Post on r/Entrepreneur, r/SaaS, r/marketing** — value-first comment with link as reference. Don't lead with the link.

---

## T+15min — first wave of brand outreach

- [ ] **Send first 8 brand outreach emails** (the top-amplifier set). Use bodies from `article-assets/indian-ai-search-audit/brand-outreach-template.md`. Suggested first 8:
  - Acko (Varun Dua / hello@acko.com)
  - Sugar Cosmetics
  - Pristyn Care
  - Treebo
  - IndMoney (Ashish Lath)
  - Souled Store
  - Forest Essentials
  - Pilgrim (hello@discoverpilgrim.com)

Each email: copy from template, replace `[first name]` and `[BRAND-SPECIFIC SECTION]`, send. ~3 min each = ~25 min total.

---

## T+30min — first wave of press pitches

- [ ] **Send first 5 press pitches** (Indian tech press first since longest lead time). Use bodies from `article-assets/indian-ai-search-audit/press-pitch-template.md`. Suggested first 5:
  - Entrackr — Pratik Bhakta
  - Inc42 — Yatti Soni or Bhumika Khatri
  - YourStory — Sindhu Kashyaap
  - The Ken — Pratap Vikram Singh
  - Marketing Brew — Phoebe Bain

Each email: copy from template, swap publication-specific angle, send. ~3 min each = ~15 min total.

---

## T+1h — engagement window opens

- [ ] **Reply to every LinkedIn comment** within first 60 minutes — algo decay is steep
- [ ] **Reply to every X reply** with substantive engagement (not just "thanks")
- [ ] **Repost the X thread** from a couple of friendly accounts if you have any
- [ ] **DM 5-10 people in your network** asking if they'd find the report useful (organic share request)

---

## T+2h — second wave outreach

- [ ] **Send remaining 17 brand outreach emails** (smaller / quieter brands)
- [ ] **Send remaining 10 press pitches** (Mint, Moneycontrol, afaqs!, exchange4media, BW Marketing World, MarTech Today, The Information, Stratechery, SE Land + Adsy follow-up if needed)

---

## T+4h — measurement begins

- [ ] **Pull early traffic from Cloudflare Analytics + Plausible** — what's converting from where?
- [ ] **Check PDF download count from Brevo** — first 100 emails captured?
- [ ] **Search Twitter for the rikuq URL** — track who's sharing organically
- [ ] **Search Reddit for the URL** — same

---

## T+24h (Sun May 31 morning)

- [ ] **Update post-publish DB state**:
  ```bash
  cd ~/code/rikuq && cat > postpub22.mjs <<'EOF'
  import { openDb } from '@ravirdp/content-ops/db';
  const db = openDb('data/content-ops.db');
  db.prepare(`INSERT INTO pages (brief_id, slug, url, title, category, published_at, word_count, primary_keyword, status)
              VALUES (22, 'indian-ai-search-audit-may-2026',
                      'https://rikuq.com/blog/geo/indian-ai-search-audit-may-2026',
                      'The Indian AI Search Audit: 500 Queries, 25 Brands, 777 Citations',
                      'geo', datetime('now', '-1 day'), 4217, 'indian ai search audit', 'live')`).run();
  db.prepare(`UPDATE briefs SET status='published' WHERE id=22`).run();
  db.prepare(`INSERT INTO runs (kind, status, summary) VALUES ('publish', 'ok', 'DEBUT: Indian AI Search Audit shipped. PDF + landing page live. Brand outreach + press pitches sent. Tier 2 spinoffs begin Jun 4.')`).run();
  console.log('DB updated');
  EOF
  node postpub22.mjs && rm postpub22.mjs && npx content-ops views
  ```
- [ ] **Commit + push** the post-publish state
- [ ] **Track reply/share metrics** — note which brands replied, which press picked up, total downloads
- [ ] **Update `docs/reactive-pr.md`** with any journalist quotes that got published

---

## T+48h (Mon Jun 1)

- [ ] **Post X follow-up thread** with first-72-hour numbers (downloads, brand replies, press URLs)
- [ ] **Post LinkedIn follow-up** — single post (not carousel) referencing the first wave of engagement
- [ ] **Pre-write Tier 2 Spinoff #1** for Jun 4 ship — the Instagram domination piece
- [ ] **Send thank-you notes** to anyone who shared substantively

---

## T+1 week (Sat Jun 6)

- [ ] **Update the article** with any errata caught by readers / brands
- [ ] **Add a "featured in" section** to the article + Citare landing page
- [ ] **Pull backlinks from Ahrefs** (free tier) — update `docs/backlink-tracker.md`
- [ ] **Ship Tier 2 Spinoff #1** (Wed Jun 4 originally; can shift to Mon if velocity is high)

---

## If something breaks on ship day

| Problem | Solution |
|---|---|
| CF Pages build fails | Check Astro schema (title/desc length); fix locally; `git push` again |
| LinkedIn carousel rejected | Repost as a single image + caption; carousel can come 2h later |
| X thread breaks (rate-limited) | Wait 15 min, repost tweet 1 with reference to the broken thread |
| PDF download form not working | Drop the email gate temporarily, ship the PDF as a direct link |
| Citare landing page route missing | Ship at rikuq.com/reports/ subpath; redirect to Citare later |
| Press pitches all bounce | Re-check email templates for spam triggers (multiple URLs, formatting) |
