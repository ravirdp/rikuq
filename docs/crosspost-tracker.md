# Crosspost Tracker — Manual Republish to Other Platforms

Source of truth for which articles are live where. Dev.to is automated (Day-3 cron). Hashnode / Medium / LinkedIn are manual.

**Last updated:** 2026-05-27.

---

## Per-platform how-to

### Medium — fastest path (import-from-URL)
1. Sign in to medium.com
2. Click your avatar → **Stories** → **New Story** → **Import a story** (left nav)
3. Paste the rikuq URL (e.g., `https://rikuq.com/blog/tools/claude-code-hooks-vs-skills-when-to-use/`)
4. Medium fetches + formats automatically. Canonical is set to your rikuq URL automatically.
5. Review formatting (Medium sometimes mangles code blocks), tweak the title/subtitle, hit **Publish**

**Time per article:** ~3-5 min.

### Hashnode — manual copy/paste (API moved to paid)
1. Open Dev.to article in edit view: `https://dev.to/<article-url>/edit`
2. Click **Markdown** tab → select all → copy
3. Open hashnode.com → New post
4. Paste markdown. Hashnode renders it natively.
5. **Important:** in the publish modal → **Settings** → set **Canonical URL** to the rikuq URL (not Dev.to)
6. Add cover image (Hashnode shows hero images more prominently than Dev.to)
7. Add tags (Hashnode caps at 5; use category + 3-4 specific tags)
8. Publish

**Time per article:** ~5-7 min.

### LinkedIn Articles — copy/paste with rich text
1. Open Dev.to article in browser (rendered view)
2. Select the body content (skip the Dev.to-specific intro/disclosure)
3. Copy
4. linkedin.com → **Write article** (top of homepage feed)
5. Paste — LinkedIn handles basic rich formatting
6. Code blocks need manual fix (LinkedIn collapses them). Wrap each in their code-block element.
7. Set the title + subtitle
8. Cover image: upload your `public/illustrations/covers/<slug>.jpg`
9. **In the Settings menu before publishing → set Canonical URL to your rikuq URL**

**Time per article:** ~8-12 min (the slowest because of code-block fixing).

---

## Priority guidance

**Don't republish all 16 to every platform.** Focus on:

1. **Medium (top 7 articles)** — highest reach × lowest effort. Do these first.
2. **LinkedIn Articles (top 5 articles)** — founder-voice, B2B ICP. Do as you have energy.
3. **Hashnode (top 5 articles)** — solid dev audience but lower conversion than the above.

Top articles by my read of likely traction:

| Rank | Article | Why prioritise |
|---|---|---|
| 1 | Claude Code Review 2026 | Highest-traffic potential, cornerstone |
| 2 | Indian AI Search Audit (May 30 ship) | Recency + research-data angle |
| 3 | AI Search Visibility Tools — Honest Comparison | Citare driver |
| 4 | GEO vs SEO 2026 — What Google's May Guidance Changed | Trending topic |
| 5 | Best AI Coding Tools 2026 | Listicle pattern travels well |
| 6 | Best MCP Servers for Claude Code | HN/dev audience overlap |
| 7 | Production Stack ($5/month) | Compelling stat, founder catnip |

---

## Tracker — all 16 rikuq articles

| # | Article | Dev.to | Hashnode | Medium | LinkedIn |
|---|---|---|---|---|---|
| 1 | Claude Code Hooks vs Skills: When to Use Which | [✅ live](https://dev.to/rikuq/claude-code-hooks-vs-skills-when-to-use-which-ple) | ⏳ | ⏳ | ⏳ |
| 2 | How I Built Citare V2 in 12 Days After Throwing V1 Away | [✅ live](https://dev.to/rikuq/how-i-built-citare-v2-in-12-days-after-throwing-v1-away-3j2o) | ⏳ | ⏳ | ⏳ |
| 3 | Portkey vs Helicone vs LiteLLM vs OpenRouter | [✅ live](https://dev.to/rikuq/portkey-vs-helicone-vs-litellm-vs-openrouter-honest-comparison-3fn3) | ⏳ | ⏳ | ⏳ |
| 4 | How I Run 3 Production AI SaaS on $5/Month | [✅ live](https://dev.to/rikuq/how-i-run-3-production-ai-saas-on-5month-of-hosting-40fd) | ⏳ | ⏳ | ⏳ |
| 5 | What is LLM FinOps? | [✅ live](https://dev.to/rikuq/what-is-llm-finops-the-missing-discipline-for-ai-era-companies-54la) | ⏳ | ⏳ | ⏳ |
| 6 | The Four-Index Reality | [✅ live](https://dev.to/rikuq/the-four-index-reality-why-ai-search-isnt-one-thing-4bno) | ⏳ | ⏳ | ⏳ |
| 7 | Best AI Coding Tools 2026 | [✅ live](https://dev.to/rikuq/best-ai-coding-tools-2026-honest-picks-from-shipping-3-saas-solo-365d) | ⏳ | ⏳ | ⏳ |
| 8 | Antigravity Review (May 2026) | [✅ live](https://dev.to/rikuq/antigravity-review-may-2026-from-daily-driver-to-dropped-5560) | ⏳ | ⏳ | ⏳ |
| 9 | GitHub Copilot Review 2026 | [✅ live](https://dev.to/rikuq/github-copilot-review-2026-built-for-enterprise-not-solo-founders-5ahh) | ⏳ | ⏳ | ⏳ |
| 10 | Windsurf Review 2026 | [✅ live](https://dev.to/rikuq/windsurf-review-2026-not-for-solo-founders-great-for-small-teams-11ho) | ⏳ | ⏳ | ⏳ |
| 11 | Cursor vs Claude Code 2026 | [✅ live](https://dev.to/rikuq/cursor-vs-claude-code-2026-youre-probably-asking-the-wrong-question-218n) | ⏳ | ⏳ | ⏳ |
| 12 | Anthropic Prompt Caching: Real Numbers | [✅ live](https://dev.to/rikuq/anthropic-prompt-caching-real-numbers-from-330-production-calls-2eg4) | ⏳ | ⏳ | ⏳ |
| 13 | GEO vs SEO in 2026 | [✅ live](https://dev.to/rikuq/geo-vs-seo-in-2026-what-googles-may-guidance-changed-3hhb) | ⏳ | ⏳ | ⏳ |
| 14 | Cursor Review 2026 | [✅ live](https://dev.to/rikuq/cursor-review-2026-honest-not-for-me-take-from-a-vscode-user-931) | ⏳ | ⏳ | ⏳ |
| 15 | Hello from rikuq | [✅ live](https://dev.to/rikuq/hello-from-rikuq-a-practitioner-blog-for-solo-ai-saas-founders-1i3) | ⏳ | ⏳ | ⏳ |
| 16 | Claude Code Review 2026 — From Zero Code to 3 Live SaaS | [✅ live](https://dev.to/rikuq/claude-code-review-2026-from-zero-code-to-3-live-saas-203k) | ⏳ | ⏳ | ⏳ |

**Pending Dev.to (auto-crosspost cron handles these):**

| # | Article | Cron expected date |
|---|---|---|
| 17 | AI Search Visibility Tools: Honest Comparison From a Builder | May 29 (cron looks for May 26 commits) |
| 18 | Best MCP Servers for Claude Code in 2026 | May 29 |
| 19 | GEO vs AEO vs AIO vs SGE Glossary | May 30 (looks for May 27 commits) |
| 20 | The Indian AI Search Audit (debut) | Jun 2 (looks for May 30 commits, ships Sat) |

**Pre-rikuq (Prism-era, already on Dev.to):**

| Article | Dev.to | Note |
|---|---|---|
| The Merging Take Is Too Early | [live](https://dev.to/rikuq/the-merging-take-is-too-early-47dn) | Canonical broken (Google calendar redirect) — fix if you ever republish |
| There Is No Best AI Model in 2026 | [live](https://dev.to/rikuq/there-is-no-best-ai-model-in-2026-and-thats-actually-good-news-4lmn) | Canonical → Prism blog |
| How I Cut My AI API Costs by 40% | [live](https://dev.to/rikuq/how-i-cut-my-ai-api-costs-by-40-without-changing-a-single-prompt-1h4f) | Canonical points to self (broken) — fix if relevant |

---

## Suggested weekly cadence

**Week 1 (this week)**: Don't grind through 16 republishes. Pick **3 articles for Medium only** — the highest-priority ones. Validate the process.

Recommended first 3 for Medium:
1. Claude Code Review 2026 — From Zero Code to 3 Live SaaS
2. GEO vs SEO in 2026
3. AI Search Visibility Tools: Honest Comparison (once cron ships it Friday)

**Week 2-3**: Add Hashnode for those same 3 articles. Add 2-3 more articles to Medium.

**Week 4**: Add LinkedIn Articles for the top 5 articles. Stop adding to Medium/Hashnode if traffic data shows neither converts.

**After 30 days:** review traffic from each platform via UTM tags or referrer data in Cloudflare Analytics. Drop the platforms that aren't converting; double down on the ones that are.

---

## UTM tag template

When republishing manually, set UTM params on any internal rikuq link in the body:

- Dev.to → `?utm_source=devto&utm_medium=crosspost&utm_campaign=<slug>`
- Medium → `?utm_source=medium&utm_medium=crosspost&utm_campaign=<slug>`
- Hashnode → `?utm_source=hashnode&utm_medium=crosspost&utm_campaign=<slug>`
- LinkedIn → `?utm_source=linkedin&utm_medium=article&utm_campaign=<slug>`

Lets you measure which platform actually drives rikuq traffic in Plausible / GA4.

---

## Append-only — when you republish, mark the cell `✅ <date>`

Format: `[✅ 2026-05-28](medium-url)`

This way the tracker becomes the source of truth for "which platforms have which articles" without a separate spreadsheet.
