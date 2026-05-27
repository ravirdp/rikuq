# Distribution Blast Radius — Maximum-Surface Crossposting

**Strategy:** publish to every zero-cost surface that will accept the article, then prune in 30 days based on what actually drives rikuq traffic (Cloudflare Analytics + UTM tags). Front-load the experiment, kill the losers.

**Created:** 2026-05-27 (evening, post compaction).
**Review date:** 2026-06-27 (drop platforms with <5 visits/article).

---

## The full surface (all tiers)

### Tier 0 — Source of truth
| Platform | Mode | Status |
|---|---|---|
| rikuq.com | Auto on push | ✅ |

### Tier 1 — Per-article core (every article goes here)
| # | Platform | Effort | Auto? | UTM source |
|---|---|---|---|---|
| 1 | Dev.to | 0 (Day-3 cron) | ✅ Auto | `devto` |
| 2 | Medium | 3-5 min (import-from-URL) | ❌ Manual | `medium` |
| 3 | Hashnode | 5-7 min (paste Markdown, set canonical) | ❌ Manual | `hashnode` |
| 4 | LinkedIn Articles | 8-12 min (paste, fix code blocks) | ❌ Manual | `linkedin` |
| 5 | Substack (own newsletter) | 5 min (paste) | ❌ Manual | `substack` |
| 6 | HackerNoon | 2 min submit + editorial wait | ❌ Submit | `hackernoon` |

**Time per article on Tier 1:** ~30 min batched.

### Tier 2 — Per-article conditional (when fit)
| Platform | Fit signal | Effort |
|---|---|---|
| DZone | Code-heavy / tutorial articles | 5-10 min |
| Medium publications (BetterProgramming, Level Up Coding) | All tech articles, after Medium post | 1 min (submit existing post) |
| freeCodeCamp Medium pub | Tutorial-style only | 5 min submit, slow review |
| IndieHackers post | Founder stories ($5/mo stack, Citare rebuild, FinOps) | 5 min |
| Mirror.xyz | Founder narrative pieces | 5 min |
| YourStory / Inc42 / Analytics India Magazine | India-market articles | Editorial pitch, slow |

### Tier 3 — Passive aggregators (one-time setup, pull forever)
| Platform | Setup | Ongoing |
|---|---|---|
| Daily.dev | Add rikuq.com RSS source one-time | 0 |
| Refind | Submit rikuq.com as source | 0 |
| HackerNewsletter | Pitch (no self-submit) — one cold email | 0 |
| TLDR Newsletter | Pitch dan@tldrnewsletter.com when really hot | Per killer article |
| Hashnode community feed | Auto via Hashnode posts | 0 |
| Dev.to feed | Auto via Dev.to posts | 0 |

### Tier 4 — Per-article niche (judgment call)
| Platform | When | Why not always |
|---|---|---|
| Hacker News (Show HN / Ask HN) | Shippable artifact only (audit drop, Citare release, tool launch) | HN punishes self-promo on standard blog posts |
| Reddit self-post | Article matches a sub's recurring pain perfectly | Manual mod-risk, per-sub rules |
| Lobsters | Tech-deep articles | Invite-only |
| Quora answers | Targeted long-tail SEO play | Time-intensive |

### Tier 5 — Social fragments (parallel to article launch, not replacing)
- X/Twitter thread
- LinkedIn post (separate from LinkedIn Article)
- Mastodon (fosstodon.org)
- Bluesky (needs app password)
- IH thread

---

## Week-1 one-time setup (do these once, they compound)

| # | Task | Where | Time | Done? |
|---|---|---|---|---|
| 1 | Add rikuq.com RSS to Daily.dev | app.daily.dev → submit source | 5 min | ⏳ |
| 2 | Submit rikuq.com to Refind | refind.com → add source | 5 min | ⏳ |
| 3 | Create Substack publication (rikuq) | substack.com → start a publication | 10 min | ⏳ |
| 4 | Apply to BetterProgramming as Medium writer | medium.com → BetterProgramming → "Write for us" | 5 min | ⏳ |
| 5 | Apply to Level Up Coding as Medium writer | medium.com → Level Up Coding → "Write for us" | 5 min | ⏳ |
| 6 | Create HackerNoon account + verify | hackernoon.com/sign-up | 5 min | ⏳ |
| 7 | Create DZone author account | dzone.com → register | 5 min | ⏳ |
| 8 | Already have: Dev.to, Hashnode, Medium, LinkedIn, IH, Mastodon, Bluesky, Mirror | — | — | ✅ |

**Total setup time:** ~40 min spread across one evening. Then we're armed.

---

## Per-article execution checklist (use this for every article)

Copy this block into the article's working notes (or a sticky in Notion):

```
ARTICLE: <title>
URL: https://rikuq.com/blog/<category>/<slug>/
SLUG: <slug>

TIER 1 (always):
[ ] Dev.to       — auto on Day-3 (cron-handled)
[ ] Medium       — import-from-URL, paste rikuq URL, publish (auto-canonical)
[ ] Hashnode     — paste markdown from Dev.to edit view, set canonical to rikuq, add tags (≤5), publish
[ ] LinkedIn Article — paste body, fix code blocks, set canonical to rikuq, publish
[ ] Substack     — new post → paste body → schedule/send to subscribers
[ ] HackerNoon   — submit (editorial review ~24-72h)

AFTER MEDIUM POST:
[ ] Submit to BetterProgramming publication (1-click from existing Medium post)
[ ] Submit to Level Up Coding publication (1-click)

TIER 2 (conditional):
[ ] DZone (if code-heavy)
[ ] IndieHackers post (if founder-story)
[ ] Mirror.xyz (if narrative)

TIER 4 (judgment):
[ ] Hacker News Show/Ask (only if shippable artifact)
[ ] Reddit self-post (if obvious sub-fit)
[ ] Quora answer linking back

TIER 5 (always parallel):
[ ] X thread
[ ] LinkedIn post (separate from Article)
[ ] Mastodon post
[ ] Bluesky post
[ ] IH thread

UTM CHECK:
[ ] Every internal rikuq link in body uses ?utm_source=<platform>&utm_medium=crosspost&utm_campaign=<slug>
```

---

## 30-day review (set calendar reminder Jun 27)

Pull data from:
- Cloudflare Analytics → referrer breakdown by platform
- Plausible / GA4 → `utm_source` breakdown by article

Drop platforms with:
- < 5 visits / article on average
- 0 conversions to Citare signup / consult booking
- > 10 min/article cost without proportional reach

Keep + double down on top 3.

---

## UTM tag template (re-stated here for convenience)

When pasting articles, replace every internal rikuq link with:

| Platform | UTM string |
|---|---|
| Dev.to | `?utm_source=devto&utm_medium=crosspost&utm_campaign=<slug>` |
| Medium | `?utm_source=medium&utm_medium=crosspost&utm_campaign=<slug>` |
| Hashnode | `?utm_source=hashnode&utm_medium=crosspost&utm_campaign=<slug>` |
| LinkedIn Article | `?utm_source=linkedin&utm_medium=article&utm_campaign=<slug>` |
| Substack | `?utm_source=substack&utm_medium=newsletter&utm_campaign=<slug>` |
| HackerNoon | `?utm_source=hackernoon&utm_medium=crosspost&utm_campaign=<slug>` |
| DZone | `?utm_source=dzone&utm_medium=crosspost&utm_campaign=<slug>` |
| IndieHackers | `?utm_source=ih&utm_medium=post&utm_campaign=<slug>` |
| Mirror | `?utm_source=mirror&utm_medium=crosspost&utm_campaign=<slug>` |
| Medium pubs | `?utm_source=medium-pub&utm_medium=crosspost&utm_campaign=<slug>` |

---

## Backlog batch — 16 articles to push through this week

Order by priority (per crosspost-tracker.md ranking):

| Rank | Article | Priority |
|---|---|---|
| 1 | Claude Code Review 2026 | Highest reach × cornerstone |
| 2 | AI Search Visibility Tools Honest Comparison (ships Fri May 29 via cron) | Citare driver |
| 3 | GEO vs SEO 2026 | Trending topic |
| 4 | Best AI Coding Tools 2026 | Listicle travel-pattern |
| 5 | Best MCP Servers for Claude Code | HN/dev overlap |
| 6 | Production Stack ($5/month) | Founder-story catnip |
| 7 | Claude Code Hooks vs Skills | Recent ship |
| 8 | Cursor vs Claude Code 2026 | Comparison content |
| 9 | What is LLM FinOps | Wedge article |
| 10 | Portkey vs Helicone vs LiteLLM vs OpenRouter | Already getting comments |
| 11 | Anthropic Prompt Caching | Numbers article |
| 12 | Four-Index Reality | Foundational |
| 13 | Antigravity Review | Reviews |
| 14 | GitHub Copilot Review | Reviews |
| 15 | Windsurf Review | Reviews |
| 16 | Cursor Review | Reviews |
| 17 | Citare V2 Rebuild Story | Founder-story (IH-perfect) |
| 18 | Hello from rikuq | Skip — manifesto |

Suggested rhythm: **5 articles/day for 4 days** = full backlog blasted by Sat May 31.

---

_See [crosspost-tracker.md](./crosspost-tracker.md) for per-platform live status of each article._
