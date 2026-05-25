# Content pipeline — next 6 publishes

Last planned: 2026-05-25 (Sun). Auto-derived from `data/content-ops.db` briefs
table. Re-plan by editing this doc + the `notes` field on each brief row.

## Schedule

Pillar mix is interleaved (tools → geo → stack → finops → geo → stack) so the
homepage feed stays diverse and the two MCP-adjacent posts (#18 and #19) sit
3 days apart to avoid cannibalisation.

| Day | Date | Brief | Slug | Pillar | Source signal |
|---|---|---|---|---|---|
| Mon | 2026-05-26 | **#20** Claude Code Hooks vs Skills: When to Use Which (With Real Examples) | `claude-code-hooks-vs-skills-when-to-use` | tools | Ahrefs Free — both terms >1K vol, fresh Anthropic features, explainer demand high |
| Tue | 2026-05-27 | **#21** AI Search Visibility Tools: Honest Comparison From a Builder | `ai-search-visibility-tools-honest-comparison` | geo | Ahrefs Free — root term Medium KD with multiple supporting kws, direct Citare driver |
| Wed | 2026-05-28 | **#19** Best MCP Servers for Claude Code in 2026 (Honest Picks) | `best-mcp-servers-claude-code-2026` | stack | Ahrefs Free — claude code mcp Medium KD, >1K vol, listicle commercial intent |
| Thu | 2026-05-29 | **#17** Cloudflare Workers AI vs OpenAI: Real Cost Across 1M Tokens | `cloudflare-workers-ai-vs-openai-cost` | finops | Pillar-gap fill (finops has only 1 page); cost comparison posts get high LLM-citation pickup |
| Fri | 2026-05-30 | **#16** GEO vs AEO vs AIO vs SGE: A Plain-English Glossary for 2026 | `geo-aeo-aio-sge-glossary-2026` | geo | Reactive-PR signal (r/AskMarketing score-5 thread asking for exactly this) |
| Sat | 2026-05-31 | **#18** 37 MCP Tools for Citare: What Worked, What I Would Cut | `37-mcp-tools-citare-lessons` | stack | HN ask_hn thread on code intelligence MCP; unique experiential angle nobody else has |

## Why this order

1. **#20 first** — time-sensitive. Hooks + Skills are fresh Anthropic releases;
   explainer-seekers are searching now, not in 3 weeks.
2. **#21 second** — Citare commercial driver. Tuesday traffic is highest of the
   week for B2B tooling; comparison posts perform especially well.
3. **#19 third** — closes the Claude-Code thematic cluster cleanly (Hooks/Skills →
   MCP). Internal-linking opportunity to #20.
4. **#17 fourth** — pillar gap. FinOps has only 1 page; second one starts to
   establish topical authority for Google + LLM citation engines.
5. **#16 fifth** — evergreen explainer. Fits the GEO pillar narrative and
   internal-links to #21 (the practical "which tools" follow-on).
6. **#18 sixth** — unique experiential. Closes the stack pillar with the most
   personal-authority post; saves the strongest "only Ravi could write this"
   angle for the end of the run when the cluster is warmest.

## Per-post production checklist

For each brief, the publish workflow (manual until automated):

- [ ] Read brief: `sqlite3 data/content-ops.db "SELECT * FROM briefs WHERE id=<id>"`
- [ ] Re-read `docs/context/voice.md` before drafting
- [ ] Write MDX in `src/content/blog/<slug>.mdx` following `_template.mdx`
- [ ] Generate hero image into `public/illustrations/covers/<slug>.jpg`
- [ ] Voice pass — scan for AI-tells, em dashes in commit message, banned words
- [ ] CTA wiring per `content-ops.config.mjs` ctaMap (category → component)
- [ ] FAQ schema if intent is informational
- [ ] `git checkout -b content/<slug> && commit && push`
- [ ] `gh pr create`, wait CI green, merge
- [ ] `./scripts/indexnow.sh` (auto-pings Bing/Yandex/Naver/Seznam)
- [ ] Day-3 crosspost cron handles Dev.to + Hashnode automatically
- [ ] Update DB: `INSERT INTO pages (...)`, `UPDATE briefs SET status='published'`
- [ ] `npx content-ops views` to regenerate trackers

## Distribution add-ons (per post)

- Twitter thread (anchor pattern from `docs/twitter-anchor-thread.md`)
- LinkedIn personal post (founder voice, 800–1200 chars)
- Add to next reactive-PR digest as a citation-able asset
- If post mentions a third-party product favourably, send the link to their
  team (low effort, sometimes lands a quote-tweet or backlink)

## After the 6-post run

Run a fresh research cycle on the next 3 seeds (from
`docs/content-ops-system.md` per-project notes — finops + infra + BatchWise
need coverage). Expected cadence: 1 weekly research pass, 1 weekly approval
review, 2-3 posts/week (sustainable solo rate after launch backlog clears).

This file is regenerated manually for now. v0.4.0 of `@ravirdp/content-ops`
will add a `target_publish_date` column + `npx content-ops plan` command that
generates this doc from the DB directly.
