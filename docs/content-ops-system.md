# Content Ops System — portable spec (rikuq + Prism + Citare + BatchWise)

A reusable architecture for "Claude-as-content-operator" that actually works at
scale. Distilled from the Reddit post about Clair's SEO workflow + what we've
shipped on rikuq.com + what Citare's audit work has taught us about GEO.

**Build once, install many.** All four projects share a single source of truth
(`content-ops/` repo, distributed as npm package + Claude Code plugin). Each
project owns only its own state — context files, SQLite DB, config, trackers.
Project data never crosses project boundaries; system code is read-only from
each project's POV.

---

## Distribution model — build once, install many

We do **not** copy-paste skills and scripts into each project. We build one
package and install it everywhere. Updates ship once.

### What lives where (the isolation boundary)

| Lives in `content-ops/` (shared, read-only from projects) | Lives in each project repo (project-owned, isolated) |
|---|---|
| Skill markdown bodies (`research`, `publish`) | `content-ops.config.mjs` — project's identity, paths, MDX template, CTA map |
| `lib/db.mjs`, schema migrations, init script | `data/content-ops.db` — project's tracker DB (gitignored or committed per taste) |
| `bin/content-ops` CLI (init, migrate, verify, doctor) | `docs/context/{company,icp,competitors,voice}.md` — project's memory |
| Source connectors (DataForSEO, GSC, Citare clients) | `docs/trackers/*.md` — project's regenerated views |
| Verify-loop GitHub Action template | `.github/workflows/content-verify.yml` — installed copy, project-owned |
| Brief / page / refresh templates | `src/content/blog/_template.mdx` — project's content template |
| Documentation, anti-patterns, philosophy | Project's published pages (the actual output) |

**The contamination guarantee:** the only thing the shared code knows about a
project is what the project passes via its local `content-ops.config.mjs`. The
shared code never reads or writes outside the project's own working directory.
Project A's DB cannot be queried while running in project B's directory.

### Repo layout (the new shared repo)

```
content-ops/                           # standalone repo, separate from any project
├── package.json                       # name: "@ravi/content-ops", private
├── bin/
│   └── content-ops.mjs                # CLI entry point
├── lib/
│   ├── db.mjs                         # SQLite wrapper, WAL mode
│   ├── schema.sql                     # canonical schema (versioned via migrations)
│   ├── migrations/                    # 001_init.sql, 002_add_geo.sql, ...
│   ├── config.mjs                     # loads + validates per-project config
│   ├── sources/
│   │   ├── dataforseo.mjs
│   │   ├── gsc.mjs
│   │   └── citare.mjs                 # GEO measurement client
│   └── views.mjs                      # regenerates markdown views from DB
├── skills/                            # Claude Code plugin skills
│   ├── content-research/
│   │   └── SKILL.md
│   └── content-publish/
│       └── SKILL.md
├── plugin.json                        # Claude Code plugin manifest
├── templates/                         # scaffolding written into projects on init
│   ├── content-ops.config.mjs         # config stub
│   ├── docs/context/{company,icp,competitors,voice}.md  # empty starters
│   ├── .github/workflows/content-verify.yml
│   └── src/content/blog/_template.mdx
└── README.md                          # how to install + per-project setup
```

### Installation flow (one-time per project)

In each consuming project (rikuq, citare, ssimplifi, batchwise):

```bash
# Install the package
npm i -D @ravi/content-ops

# Scaffold project-local files (config stub, context stubs, workflow, MDX template)
npx content-ops init

# Initialize the project's own DB
npx content-ops migrate

# Install the Claude Code plugin so skills are available in this repo
# (in Claude Code, from the project root)
/plugin install @ravi/content-ops
```

After that, day-to-day use is just:

```bash
# Research run — produces briefs in this project's DB
claude "run content-research"

# Approve a brief (project-local DB)
npx content-ops approve <brief_id>

# Publish run — ships in this project's repo only
claude "run content-publish for brief <brief_id>"
```

The skills `content-research` and `content-publish` are the **same code** in
every project. They read `content-ops.config.mjs` from `cwd` to know which
project they're operating on. No more `rikuq-content-research` vs
`citare-content-research` duplication.

### Per-project config shape

One file at the project root, `content-ops.config.mjs`. The entire surface area
of project-specific knowledge the shared system needs.

```js
// content-ops.config.mjs
export default {
  // Project identity
  slug: 'rikuq',
  domain: 'rikuq.com',
  siteUrl: 'https://rikuq.com',

  // Where the DB lives (default: ./data/content-ops.db)
  db: './data/content-ops.db',

  // Where context files live (default: ./docs/context/)
  contextDir: './docs/context',

  // Where regenerated markdown views go (default: ./docs/trackers/)
  trackersDir: './docs/trackers',

  // Content template + output paths
  mdxTemplate: './src/content/blog/_template.mdx',
  contentDir: './src/content/blog',
  heroImageDir: './public/hero',

  // Research filter thresholds (tunable per project size)
  research: {
    maxKeywordDifficulty: 35,
    minSearchVolume: 100,
    keywordsPerRun: 5,
    competitorDomains: [],  // optional override of competitors.md
  },

  // CTA wiring — which product CTA component for which category
  // The publish skill writes these into MDX frontmatter
  ctaMap: {
    infra: 'PrismCTA',
    finops: 'FinOpsCTA',
    geo: 'CitareCTA',
    // default → no CTA
  },

  // Post-publish hooks (project-specific scripts)
  postPublish: [
    './scripts/indexnow.sh',
  ],

  // Crosspost behavior (Day-3 cron is per-project)
  crosspost: {
    enabled: true,
    platforms: ['devto', 'hashnode'],
  },

  // GEO target queries — Citare pulls citations for these per page
  geo: {
    enabled: true,
    platforms: ['chatgpt', 'aio', 'gemini', 'claude', 'perplexity'],
  },
};
```

### Update flow

When the shared system gets a new feature or schema change:

```bash
# In content-ops/
# 1. Add migration file: lib/migrations/00N_xxx.sql
# 2. Bump package.json version
# 3. npm publish (or commit to internal registry / git tag)

# In each consuming project, when ready to adopt
npm update @ravi/content-ops
npx content-ops migrate    # runs new migrations against this project's DB
```

Projects opt in to upgrades individually. A breaking change in `content-ops/`
never silently corrupts a project — migrations are explicit per project.

### Why npm package + Claude Code plugin (not git submodule, not monorepo)

- **Not monorepo**: forces all 4 projects to share a release cadence and CI;
  bad fit because rikuq ships daily while BatchWise barely ships.
- **Not git submodule**: skills installed via submodule don't get auto-discovered
  by Claude Code's plugin loader; updates require manual `git submodule update`
  in every project; harder to version.
- **npm + plugin**: standard versioning, standard install, Claude Code plugin
  system handles skill discovery automatically, updates are one command, easy
  to publish privately (npm scoped package) or publicly later.

---

## Philosophy

The hard part of "AI does content" is not the writing. It's **the operating
process around the writing**: persistent memory, structured trackers, explicit
handoffs between steps, a real approval gate, and a verify loop that catches
decay before it eats your traffic.

If you skip any of those, you get one of three failure modes:

1. **Groundhog day** — every session starts from zero, re-does the same research,
   forgets what's already published, picks the same keywords again.
2. **AI slop at scale** — no approval gate, 100 mediocre pages hit prod, brand
   trust drops, Google demotes the whole domain.
3. **Decay blindness** — pages rank for 3 months then quietly drop, nobody
   refreshes, traffic dies. Worse: pages rank on Google but are invisible in
   ChatGPT/AIO and you don't even know.

The system below prevents all three.

---

## Architecture — six layers

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. MEMORY                                                            │
│    Context files Claude reads at session start.                      │
│    company.md · icp.md · competitors.md · voice.md · already-done.md │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 2. TRACKERS (SQLite)                                                 │
│    keywords · briefs · pages · runs · rankings · geo_mentions        │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                  ┌───────────────┼───────────────┐
                  ▼                               ▼
┌────────────────────────────┐   ┌────────────────────────────┐
│ 3a. RESEARCH SKILL         │   │ 3b. PUBLISH SKILL          │
│  DataForSEO + competitors  │   │  Brief → MDX → hero → ship │
│  → score → brief           │   │  → IndexNow → crosspost    │
│  Writes: briefs (pending)  │   │  Reads: briefs (approved)  │
└────────────────────────────┘   └────────────────────────────┘
                  │                               │
                  └───────────────┬───────────────┘
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 4. APPROVAL GATE                                                     │
│    briefs.status: pending → approved (manual flip) → published       │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 5. VERIFY LOOP (weekly cron)                                         │
│    GSC pull per URL → rankings table → flag decay >20%               │
│    Citare GEO pull per URL → geo_mentions → flag LLM gaps            │
│    Writes weekly digest .md for human triage                         │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 6. REFRESH QUEUE                                                     │
│    Flagged pages auto-enqueue back into RESEARCH SKILL as            │
│    refresh_briefs. Closes the loop.                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Layer 1 — Memory

Five markdown files in `docs/context/`. Read by Claude at the start of every
content session via the skill's opening instruction.

```
docs/context/
├── company.md          # What we sell, positioning, one-line pitch
├── icp.md              # Ideal customer, jobs-to-be-done, anti-ICP
├── competitors.md      # 5-15 named competitors with one-line angle each
├── voice.md            # Tone rules, words to avoid, banned clichés
└── already-done.md     # Topics/wedges already published (auto-updated)
```

**Critical:** `already-done.md` is regenerated by the publish skill on every run
from the `pages` table. Don't hand-maintain it. Single source of truth.

**Existing rikuq equivalents** (we already have ~80% of this — consolidate):

- `docs/brand-voice.md` → migrate to `docs/context/voice.md`
- `docs/about-bio.md` → migrate to `docs/context/company.md`
- `docs/seo-direction-2026.md` → split into `company.md` + `icp.md`
- `docs/seo-content-plan.md` → its "already covered" list becomes seed for `already-done.md`

---

## Layer 2 — Tracker DB (SQLite)

One file `data/content-ops.db`. WAL mode for concurrent reads during cron + manual runs.

### Schema

```sql
-- Keywords we've discovered and scored. Survives across runs.
CREATE TABLE keywords (
  id              INTEGER PRIMARY KEY,
  keyword         TEXT NOT NULL UNIQUE,
  search_volume   INTEGER,
  difficulty      INTEGER,           -- DataForSEO KD or equivalent
  intent          TEXT,              -- informational | commercial | transactional | navigational
  cluster_id      INTEGER,           -- group of related keywords sharing one target page
  source          TEXT,              -- dataforseo | competitor:domain.com | gsc | manual
  status          TEXT DEFAULT 'new',  -- new | brief_created | published | rejected
  rejected_reason TEXT,
  first_seen      TEXT DEFAULT (datetime('now')),
  last_checked    TEXT DEFAULT (datetime('now'))
);
CREATE INDEX idx_keywords_status ON keywords(status);
CREATE INDEX idx_keywords_cluster ON keywords(cluster_id);

-- Briefs produced by the research skill. Approval gate lives here.
CREATE TABLE briefs (
  id             INTEGER PRIMARY KEY,
  keyword_id     INTEGER REFERENCES keywords(id),
  cluster_id     INTEGER,
  title          TEXT NOT NULL,
  slug           TEXT NOT NULL UNIQUE,
  angle          TEXT,              -- the wedge / point of view
  outline        TEXT,              -- markdown outline
  cta            TEXT,              -- which product CTA to wire
  visual_plan    TEXT,              -- "hero: X. inline: Y, Z"
  status         TEXT DEFAULT 'pending',  -- pending | approved | published | rejected
  created_at     TEXT DEFAULT (datetime('now')),
  approved_at    TEXT,
  approved_by    TEXT,
  notes          TEXT
);
CREATE INDEX idx_briefs_status ON briefs(status);

-- Pages we've actually shipped.
CREATE TABLE pages (
  id             INTEGER PRIMARY KEY,
  brief_id       INTEGER REFERENCES briefs(id),
  slug           TEXT NOT NULL UNIQUE,
  url            TEXT NOT NULL,
  title          TEXT,
  category       TEXT,
  published_at   TEXT DEFAULT (datetime('now')),
  last_refreshed TEXT,
  word_count     INTEGER,
  primary_keyword TEXT,
  status         TEXT DEFAULT 'live'   -- live | refreshing | retired
);

-- Pipeline run log — debugging + cost tracking.
CREATE TABLE runs (
  id           INTEGER PRIMARY KEY,
  kind         TEXT NOT NULL,         -- research | publish | verify | refresh
  started_at   TEXT DEFAULT (datetime('now')),
  ended_at     TEXT,
  status       TEXT,                  -- ok | partial | error
  summary      TEXT,
  cost_usd     REAL                   -- LLM + API cost if known
);

-- Weekly GSC snapshot per page. Enables decay detection.
CREATE TABLE rankings (
  id             INTEGER PRIMARY KEY,
  page_id        INTEGER REFERENCES pages(id),
  keyword        TEXT NOT NULL,
  position       REAL,
  impressions    INTEGER,
  clicks         INTEGER,
  ctr            REAL,
  captured_at    TEXT DEFAULT (datetime('now'))
);
CREATE INDEX idx_rankings_page_time ON rankings(page_id, captured_at);

-- GEO layer — LLM brand mention tracking. The differentiator.
CREATE TABLE geo_mentions (
  id           INTEGER PRIMARY KEY,
  page_id      INTEGER REFERENCES pages(id),
  query        TEXT NOT NULL,
  platform     TEXT NOT NULL,         -- chatgpt | aio | gemini | claude | perplexity
  cited        INTEGER NOT NULL,      -- 0 | 1
  position     INTEGER,               -- citation order in the answer
  captured_at  TEXT DEFAULT (datetime('now'))
);
CREATE INDEX idx_geo_page_platform ON geo_mentions(page_id, platform, captured_at);
```

### Tiny tool layer

One file `scripts/db.mjs` exposes `query()`, `insert()`, `update()` against the
SQLite file. Skills call this via Bash, not via a custom MCP — keeps the surface
small. Use `better-sqlite3` (synchronous, fast, no async overhead).

```js
// scripts/db.mjs (sketch — 30 lines)
import Database from 'better-sqlite3';
const db = new Database('data/content-ops.db');
db.pragma('journal_mode = WAL');
export const q = (sql, params = []) => db.prepare(sql).all(params);
export const x = (sql, params = []) => db.prepare(sql).run(params);
```

Markdown views (for humans) regenerated nightly from the DB:
`docs/trackers/keywords.md`, `briefs.md`, `pages.md`, `decay.md`, `geo-gaps.md`.
Read-only — never hand-edit.

---

## Layer 3 — Two skills

Both are Claude Code skills (`.claude/skills/*/SKILL.md`) — no Python, just
markdown instructing Claude on the workflow. Each opens with "Read these context
files, then read these tracker rows, then do this work, then update these tables."

### Skill A — `content-research` (one skill, used by every project)

**Trigger:** "find me content opportunities", "what should I write next",
"research keywords for X", or scheduled cron.

**Inputs needed in environment:** DataForSEO API (we have), GSC MCP (we have).

```markdown
# content-research

You are a content research operator. The project you're operating on is
defined by `content-ops.config.mjs` in the current working directory — load
it first and read `slug`, `domain`, paths, and research thresholds from there.

Your job: surface 3–5 high-quality publish candidates and write briefs to
this project's database (path from config, never hardcoded).

## Step 1 — Load context
Read in this order:
- docs/context/company.md
- docs/context/icp.md
- docs/context/competitors.md
- docs/context/voice.md
- docs/context/already-done.md  (so you don't re-pitch existing topics)

## Step 2 — Pull keyword candidates
Sources, in priority order:
1. GSC queries we're impression-ranking for but on page 2-3 (low-hanging refresh)
2. DataForSEO competitor organic keywords (top 5 competitors from competitors.md)
3. DataForSEO related keywords for our pillar terms

Filter: KD ≤ 35, volume ≥ 100/mo (adjust per project size).
Reject: branded competitor terms, anything in already-done.md.

## Step 3 — Cluster and intent-classify
For each surviving keyword, classify intent (informational | commercial |
transactional | navigational). Group keywords sharing one target page into
clusters. INSERT into `keywords` table; assign cluster_id.

## Step 4 — Pick 3-5 winners and write briefs
For each winner cluster:
- Title (≤ 70 chars)
- Slug
- Angle — the wedge / opinionated POV grounded in voice.md
- Outline — H2/H3 with one-line summaries
- CTA — which product to wire (read company.md to pick)
- Visual plan — hero + 1-2 inline diagrams/screenshots

INSERT into `briefs` with status='pending'.

## Step 5 — Update already-done.md
Regenerate from `pages` table + currently approved briefs.

## Step 6 — Log the run
INSERT into `runs` with summary listing keyword count surfaced + brief IDs created.
Output a one-paragraph human summary at the end with brief IDs awaiting approval.
```

### Skill B — `content-publish` (one skill, used by every project)

**Trigger:** "publish brief #N", "ship the approved briefs", or scheduled cron.

```markdown
# content-publish

You are the publishing operator. The project you're operating on is defined
by `content-ops.config.mjs` in the current working directory — load it first.

Your job: take an approved brief from this project's database, ship it end-
to-end inside this project's repo, update this project's trackers. Never
touch files outside this project's working directory.

## Step 1 — Refuse anything not approved
Query `briefs WHERE status='approved'`. If the requested brief isn't approved,
stop and tell the user.

## Step 2 — Load context
- docs/context/voice.md  (strict — never publish in wrong voice)
- docs/context/company.md  (for CTA wiring)
- The brief row itself (full record)

## Step 3 — Write the MDX
- Follow the project's MDX template (see src/content/blog/_template.mdx).
- Hit voice.md rules exactly. No banned words.
- Include FAQ schema if intent is informational (LLM-extractable).
- Wire the CTA from the brief.

## Step 4 — Generate the hero image
Use the project's image generation script (see scripts/generate-og-default.mjs
or equivalent). Output to public/hero/<slug>.png.

## Step 5 — Commit and push
git checkout -b content/<slug>
git add ...
git commit (ASCII only — no em dashes; some MTAs mangle them)
git push
Open PR. Wait for CI green. Merge.

## Step 6 — Post-publish
- Run scripts/indexnow.sh (pings Bing/Yandex/etc.)
- Enqueue crosspost (Day-3 cron handles Dev.to + Hashnode)
- INSERT into `pages` table with url, slug, primary_keyword, word_count
- UPDATE brief status to 'published'
- Regenerate docs/context/already-done.md from pages table

## Step 7 — Log the run
INSERT into `runs` (kind='publish'). One-paragraph summary out.
```

---

## Layer 4 — Approval gate

The cheapest gate that works: `briefs.status` flag.

- Research skill writes briefs as `status='pending'`
- Human reviews `docs/trackers/briefs.md` (the regenerated view), opens the brief
  row in DB, flips to `status='approved'` with one SQL command (or a tiny CLI:
  `node scripts/approve.mjs <brief_id>`)
- Publish skill **only** acts on `status='approved'` rows

Anti-pattern to avoid: "auto-approve if confidence > X." Don't. The whole point
of the gate is that a human eye catches off-brand briefs before they consume the
publish budget.

When you grow past solo: replace the SQL flip with a tiny internal web page
(Astro page + form → Pages Function → DB update). Day-2 problem.

---

## Layer 5 — Verify loop (weekly cron)

GitHub Action, runs Sunday 02:00 UTC.

```yaml
# .github/workflows/content-verify.yml
name: Content verify (rank + GEO)
on:
  schedule:
    - cron: '0 2 * * 0'
  workflow_dispatch:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'npm' }
      - run: npm ci
      - name: GSC rank pull
        env:
          GSC_CREDS: ${{ secrets.GSC_SERVICE_ACCOUNT_JSON }}
        run: node scripts/verify-gsc.mjs
      - name: GEO (Citare) pull
        env:
          CITARE_API_KEY: ${{ secrets.CITARE_API_KEY }}
        run: node scripts/verify-geo.mjs
      - name: Write digest + commit
        run: |
          node scripts/verify-digest.mjs
          git config user.email "bot@rikuq.com"
          git config user.name "content-ops"
          git add data/ docs/trackers/
          git diff --staged --quiet || git commit -m "verify: weekly snapshot"
          git push
```

`scripts/verify-gsc.mjs` — for every row in `pages`, pull last-7-days clicks/
impressions/position for the primary_keyword, INSERT into `rankings`.

`scripts/verify-geo.mjs` — for every row in `pages`, query Citare's API (or
direct LLM calls if Citare isn't live yet) across the 5 platforms for the
primary_keyword, INSERT into `geo_mentions`.

`scripts/verify-digest.mjs` — read recent `rankings` + `geo_mentions`, compute
decay (this week's avg position vs 4-week trailing), write
`docs/trackers/decay.md` and `docs/trackers/geo-gaps.md`. Auto-create refresh
briefs (`status='pending'`, `kind='refresh'`) for pages that decayed >20% or
have zero LLM mentions.

---

## Layer 6 — Refresh queue

Pages decay. The verify loop auto-creates `refresh_briefs` (just a `briefs` row
with `notes='refresh of page #N'`). They sit in the same approval queue as
fresh briefs. Approval flow is identical. The publish skill notices it's a
refresh, edits the existing MDX instead of creating new, updates `pages.last_refreshed`.

This is the loop most teams skip and it's the single biggest source of compounding
returns. A refresh on a stale page typically recovers 50-80% of lost traffic
and takes a fraction of the effort of new content.

---

## Per-project instantiation guide

The shared system is one repo (`content-ops/`) published as `@ravi/content-ops`.
Each consuming project does this once:

```bash
# 1. Install the package
npm i -D @ravi/content-ops

# 2. Scaffold project-local files (config stub, context stubs, workflow, MDX template).
#    Safe to re-run; never overwrites files that already exist.
npx content-ops init

# 3. Edit the scaffolded files for this project:
#    - content-ops.config.mjs       — set slug, domain, thresholds, CTA map
#    - docs/context/company.md      — what you sell, positioning
#    - docs/context/icp.md          — ideal customer, anti-ICP
#    - docs/context/competitors.md  — 5–15 named with one-line angles
#    - docs/context/voice.md        — tone rules, banned words

# 4. Initialize this project's DB
npx content-ops migrate

# 5. Install the Claude Code plugin (in Claude Code, from project root)
/plugin install @ravi/content-ops

# 6. (One-time) seed from any existing markdown trackers
npx content-ops seed --from-markdown ./docs/seo-content-plan.md
```

Day-to-day after that:

```bash
# Surface new opportunities (writes briefs as status=pending in THIS project's DB)
claude "run content-research"

# Human review: open docs/trackers/briefs.md (regenerated view)
# Approve one:
npx content-ops approve <brief_id>

# Ship it (writes MDX + commits + pushes + IndexNow + enqueues crosspost — all
# inside THIS project's repo only)
claude "run content-publish for brief <brief_id>"

# Diagnostics
npx content-ops doctor        # sanity-check config, DB, MCPs, template paths
npx content-ops status        # one-screen view: pending briefs, decay alerts, GEO gaps
```

**Isolation guarantee in practice:** the CLI and skills resolve everything from
`cwd`. Running `npx content-ops status` in `~/code/rikuq` shows only rikuq's
data; running the same command in `~/code/citare` shows only Citare's. There
is no shared DB, no shared cache, no shared scratchpad anywhere.

### Project-specific notes

**rikuq** — Primary content engine. Already has 80% of the pieces. Convert
existing markdown trackers (`docs/seo-content-plan.md`, `docs/article-briefs.md`,
`docs/backlink-tracker.md`) into seed data for the DB. Voice is established.

**Citare** — Same pattern but content focus is GEO/AEO case studies and
methodology posts. Citare itself *is* the GEO measurement layer for every other
project, so its verify loop is self-referential (eat own dogfood, generates
case-study material).

**Prism / Ssimplifi** — Infra/FinOps content. ICP is dev-tool buyers, voice
is more technical. Competitors list is the easier half (Cloudflare,
Vercel, Render, Modal, RunPod). Refresh loop matters more here because infra
pricing/limits change quarterly.

**BatchWise** — India-specific. Competitors are Razorpay's own content + ops
agencies. Voice is concrete-and-operational ("here's the GST screenshot, here's
the reconciliation gotcha"). Lower keyword volume so research filter thresholds
drop to KD ≤ 25, volume ≥ 50.

---

## v1 build order — build the shared system once, then install

### Phase 1 — Build the shared `content-ops/` repo (one-off, ~2 working days)

1. **Day 1 (4–6 h)** — Scaffold `content-ops/` repo. Build `lib/db.mjs`,
   schema migrations, config loader, CLI skeleton (`init`, `migrate`, `approve`,
   `status`, `doctor`, `seed`). Write the two skill markdown files. Author
   `plugin.json` so Claude Code discovers the skills.

2. **Day 2 (4 h)** — Build source connectors (`lib/sources/{dataforseo,gsc}.mjs`).
   Stub Citare connector pending its API. Wire verify scripts (`verify-gsc.mjs`,
   `verify-digest.mjs`) and the verify workflow template. Publish v0.1.0
   (privately if scoped, or git tag for direct install).

### Phase 2 — Install in each project (1–2 hours per project)

3. **rikuq** (~2 h) — `npm i + init + migrate + seed` from existing markdown
   trackers. Tune `content-ops.config.mjs` thresholds. Run research skill,
   approve one brief, run publish skill end-to-end. This is the proving ground.

4. **Citare** (~1.5 h) — Same flow. Different ICP, different competitors,
   different MDX template. The shared code does not change.

5. **Prism / Ssimplifi** (~1.5 h) — Same flow. Different again.

6. **BatchWise** — Later, when SEO surface area justifies it. Install when
   ready; same 1–2 hour delta.

### Phase 3 — Iterate on the shared repo, projects opt in

When Phase 1 ships a new feature (e.g. cannibalization detection, additional
source connector, refresh-priority scoring): write the migration, bump the
version, publish. Each project runs `npm update + npx content-ops migrate` on
its own schedule. Nobody is forced to upgrade in lockstep.

**Total to working v1 across rikuq + Citare + Prism: ~3 working days**, of
which 2 are the one-time shared build. Adding the 4th project (BatchWise) or
any future project later costs ~1.5 hours, not days.

---

## Anti-patterns / known traps

- **Don't hand-edit `already-done.md` or any other tracker view file.** They're
  regenerated. Edits will be lost. Edit the source-of-truth DB or the underlying
  context files.
- **Don't auto-approve briefs.** The approval gate is the only thing standing
  between you and AI slop. A 30-second human review prevents months of cleanup.
- **Don't skip the GEO layer.** In 2026, Google blue-link rank is half the
  picture. Pages can rank on Google and be invisible in ChatGPT — that's a
  refresh trigger, not a victory.
- **Don't use CSV at scale.** SQLite + WAL is one npm install. Race conditions
  on CSV will silently corrupt your tracker. Don't wait for the failure to migrate.
- **Don't conflate research and publish skills.** Two skills, two database
  tables, explicit handoff via the brief row. Single-skill versions degrade
  into "Claude wrote a blog about a keyword it half-remembers" within a month.
- **Don't bypass the brief.** If you find yourself prompting Claude "just write
  about X", that work doesn't get tracked, doesn't update `already-done.md`,
  and will be re-pitched next month. Always go through the brief.
- **Don't skip the run log.** `runs` table is the difference between debugging
  in 5 minutes and debugging in 5 hours when something goes wrong.
- **Don't fork the shared repo per project.** The whole point of
  `@ravi/content-ops` is one upgrade path. If a project needs different
  behavior, surface it as a config option in `content-ops.config.mjs`, not as
  a fork. Forks become 4 codebases within 3 months.
- **Don't put project-specific values in the shared repo.** No `if (slug ===
  'rikuq')` branches in `content-ops/`. Configuration goes through the config
  file; behavior differences go through general flags. This is what keeps the
  projects from contaminating each other.
- **Don't share a DB across projects.** Each project has its own SQLite file.
  Even read-only "let me cross-reference Citare's keywords from rikuq" should
  go through an explicit export → import, not a shared file.

---

## What's intentionally NOT in v1

- Non-technical UI for approvals — solo founder, SQL flip is fine
- Multi-author / role-based permissions — single operator
- Cannibalization clustering algorithm — manual is fine under 100 pages
- A/B title testing — premature
- Image generation beyond hero — premature
- Automated outreach — separate system (`docs/reactive-pr.md`)
- Translation / localization — separate concern

Add these only when the v1 system has shipped 50+ pages and you've earned the
right to add complexity.
