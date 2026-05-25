# Content pipeline — next 5 publishes

Last planned: 2026-05-25 (Sun). Cadence: **2 posts per day** across 3 days
(Mon-Wed). 2/day is the sweet spot for a new domain: daily looks like a content
farm, weekly looks slow, 2/day reads as a working solo operator.

Auto-derived from `data/content-ops.db` briefs table. Re-plan by editing this
doc + the `notes` field on each brief row.

## Schedule

Pillar mix interleaved within each day so the homepage feed stays diverse.
The 2 MCP-adjacent posts (#18 and #19) sit 2 days apart to avoid cannibalisation.

| Date | Slot | Brief | Slug | Pillar | Author can ship without you? |
|---|---|---|---|---|---|
| Mon 5-26 | AM | **#21** AI Search Visibility Tools: Honest Comparison From a Builder | `ai-search-visibility-tools-honest-comparison` | geo | ✅ Mostly — public research on competitors |
| Mon 5-26 | PM | **#19** Best MCP Servers for Claude Code in 2026 (Honest Picks) | `best-mcp-servers-claude-code-2026` | stack | ✅ Yes — public MCP ecosystem is researchable |
| Tue 5-27 | AM | **#16** GEO vs AEO vs AIO vs SGE: A Plain-English Glossary for 2026 | `geo-aeo-aio-sge-glossary-2026` | geo | ✅ Yes — pure explainer |
| Tue 5-27 | PM | **#17** Cloudflare Workers AI vs OpenAI: Real Cost Across 1M Tokens | `cloudflare-workers-ai-vs-openai-cost` | finops | ⚠️ **Needs your Prism cost data** |
| Wed 5-28 | AM | **#18** 37 MCP Tools for Citare: What Worked, What I Would Cut | `37-mcp-tools-citare-lessons` | stack | ⚠️ **Needs your actual Citare MCP tool list** |

Already shipped: **#20** Claude Code Hooks vs Skills (Mon 5-26 originally; we
shipped it Sun 5-25 to validate the pipeline). Live at
https://rikuq.com/blog/tools/claude-code-hooks-vs-skills-when-to-use.

## What you need to bring to tomorrow's session

For **#17** (Workers AI vs OpenAI cost) to ship Tue PM authentically:

- One month of Prism's actual Workers AI usage — even a screenshot from the
  Cloudflare dashboard. Doesn't need to be precise; even "we processed X
  requests, $Y total" is enough.
- Ditto for OpenAI side — any single month's bill, even a fragment.
- 1-2 sentences on which workloads route to which (the "decision tree" angle).

For **#18** (37 MCP Tools for Citare) to ship Wed AM authentically:

- Either: paste your `mcp` folder structure or the names of your 37 tools
- Or: 10-15 minutes of "tell me about the tools" while I take notes
- The "what I would cut" angle needs you to actually have an opinion on which
  ones turned out to be overhead vs. keepers — 30-second take per tool is fine

If you can't get to either, we ship #17 as a "public-data benchmark" framing
(weaker but publishable) and either delay #18 or recast it as a methodology
post that doesn't require enumerating tools.

## Per-post production checklist

Same as v1, refined slightly after shipping #20:

- [ ] Read brief in DB: `sqlite3 data/content-ops.db "SELECT * FROM briefs WHERE id=<id>" -line`
- [ ] Re-read `docs/brand-voice.md` (until `docs/context/voice.md` is filled in)
- [ ] Sample 1-2 existing posts in the same pillar for style match
- [ ] Write MDX in `src/content/blog/<slug>.mdx` following `_template.mdx`
- [ ] Voice scan — banned phrases, AI-tells, em dashes in code blocks ok / in commit message NOT ok
- [ ] FAQ array if intent is informational (4-6 Q/A)
- [ ] CTA wiring per `content-ops.config.mjs` ctaMap (auto-rendered by PostLayout based on category)
- [ ] `node scripts/generate-cover.mjs <slug> "<title>" <pillar>` (or `--all-approved` for batch)
- [ ] Local `npm run build` to catch schema errors
- [ ] `git checkout -b content/<slug>` (off main)
- [ ] Commit (ASCII-only message), push, `gh pr create`
- [ ] Merge with `gh pr merge --squash --delete-branch`
- [ ] If git diverged (binary conflicts likely): `git pull --rebase origin main`, `git checkout --ours` on binary files
- [ ] Post-publish DB update: insert into pages, update brief.status, log run
- [ ] `npx content-ops views` to regenerate trackers
- [ ] Run `INDEXNOW_KEY=<key> ./scripts/indexnow.sh` (only when env var is set; otherwise Bingbot picks up via sitemap within ~24h)

## Distribution per post (lazy mode, OK to skip first week)

- Twitter thread (anchor pattern from `docs/twitter-anchor-thread.md`)
- LinkedIn personal post (founder voice, 800-1200 chars)
- Add to next reactive-PR digest as a citation-able asset

## Lessons from the #20 shipping session

1. **Binary file conflicts during rebase** wasted ~5 min. Fix: add
   `data/content-ops.db merge=ours` and `public/illustrations/covers/*.jpg merge=ours`
   to `.gitattributes` so future rebases auto-pick our version. Sub-tasks for v0.4.0.
2. **Voice-pass was manual** — would benefit from a `npx content-ops lint` command
   that scans an MDX for banned phrases from `docs/context/voice.md`. v0.4.0.
3. **`indexnow.sh` needs the env var** to function. If you set
   `INDEXNOW_KEY` in your shell profile (or in `.env.local` if rikuq loads it),
   it just works.
4. **Title length check** caught the 70-char limit late (after cover generation).
   Add a Zod re-validation step earlier in the publish workflow.

## After Wed 5-28

The 6-post launch backlog clears Wednesday. Move to sustainable cadence:

- **1 weekly research pass** — Fri or Sat, ~30 min: hop 2-3 free SEO tools,
  import CSVs, run `content-research`, approve 2-4 briefs
- **2-3 posts/week** — Mon AM, Wed AM, optionally Fri AM
- **Weekly verify cron** — Sunday, automated, writes decay digest

Sustainable rate over a quarter: ~30 new posts + the 21 by Wed 5-28 = ~50
pages by end of Aug. By that point we should have meaningful GSC data, real
GEO citation tracking from Citare, and decision-making power on what wedges
to deepen.
