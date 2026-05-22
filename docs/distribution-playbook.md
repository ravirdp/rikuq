# Distribution Playbook — rikuq.com

**Status:** Living document. Update as channels evolve, as new articles ship, or as data shows which channels actually move the needle.
**Last updated:** 2026-05-22

This is the operating manual for getting rikuq.com content in front of real readers. The site is launched; this doc covers what happens *after* publish.

---

## The daily framework

When Ravi asks "what should I do today?" the answer is a checklist drawn from this doc, prioritized by:

1. Anything time-sensitive (active HN thread, viral tweet to reply to, new article just shipped)
2. Twitter replies (the most consistent traffic driver — daily cadence)
3. Reddit (every 2-3 days; account-warming considerations)
4. HN (every 3-4 days; quality > frequency)
5. Newsletter (weekly digest)
6. Cross-posting / republishing (when a new article lands)
7. New content (only when distribution catches up to existing content)

### A representative daily checklist

| Day | Twitter | Reddit | HN | Other |
|---|---|---|---|---|
| Mon | Run prompt 1, post 5-8 replies | — | Run prompt 3, post 1-2 | Newsletter digest |
| Tue | Daily replies (5-8) | — | — | — |
| Wed | Daily replies (5-8) | Run prompt 2, post 3-5 | — | — |
| Thu | Daily replies (5-8) | — | Daily check, post 1-2 | — |
| Fri | Daily replies + 1 anchor thread | — | — | LinkedIn essay |
| Sat | Daily replies (lighter, 3-4) | — | — | — |
| Sun | Audit week's traffic in CF Analytics | — | — | Plan next week |

Once-per-week tasks: review Plausible/CF Analytics to see which articles converted, decide where to double down.

---

## Phase 1 — Anchor content (run once, then drip)

Three "owned" posts that establish presence before reply work begins:

- **Twitter/X anchor thread** — `"I shipped 76k lines of TypeScript in 12 days. Solo. Here's exactly how."` 10-12 tweets, screenshot-heavy. Links the Citare case study (when published) or the Claude Code review. Pin it to your profile.
- **Hacker News Show HN** — `Show HN: rikuq — practitioner blog from a solo founder shipping AI SaaS`. Submit Tuesday or Wednesday 8am PST for best front-page chance. Lead with strongest article (Claude Code review), not homepage.
- **IndieHackers post** — `"Non-coder. 3 AI SaaS shipped. AMA + here's the blog I started."`

---

## Phase 2 — Reply engagement (daily)

**The rule:** add value first. Drop a link only when it genuinely answers what someone asked.

### Browser-agent prompts

These three prompts run in Claude-in-Chrome. Paste verbatim; the agent returns candidates with suggested replies for review.

#### Prompt 1 — Twitter/X candidates

Re-run daily (the 48-hour time filters surface fresh candidates each day).

```
Find me 10 Twitter/X posts I should reply to right now to drive
qualified traffic to rikuq.com. I have 5 articles I can naturally
reference depending on the conversation:

1. /blog/tools/best-ai-coding-tools-2026 — comparison of Cursor,
   Claude Code, Antigravity, Windsurf, GitHub Copilot from a solo
   founder who shipped 3 AI SaaS.
2. /blog/tools/claude-code-review — Claude Code review from a non-
   coder who built 3 SaaS with it. Includes the Anthropic Max
   $100 vs $200 plan decision and the what-i-did.md pattern.
3. /blog/tools/cursor-review — honest "I tried it, didn't keep it,
   here's who should" Cursor review from a VSCode user.
4. /blog/tools/antigravity-review — first-party account of using
   Antigravity heavily for months then dropping it after the May
   2026 redesign. Cautionary tale; switching-cost decision logic.
5. /blog/tools/cursor-vs-claude-code — reframes the comparison as
   "AI as hand-extension vs AI as autonomous feature-shipper."

Search Twitter/X for these queries (run each separately, surface
the top 2-3 posts per query that meet the filters below):

  - "claude code" min_faves:20 lang:en within_time:48h
  - "cursor" min_faves:20 lang:en within_time:48h
  - "antigravity" min_faves:10 lang:en within_time:72h
  - "claude max plan" OR "$200 max plan" min_faves:10
  - "anthropic max" min_faves:10 lang:en
  - solo founder shipping AI min_faves:30 lang:en
  - "what-i-did.md" OR "CLAUDE.md" min_faves:10
  - vibe coding shipped min_faves:20 lang:en
  - AI coding tool comparison min_faves:30 lang:en within_time:7d
  - "openai compatible" gateway proxy

Filters:
  - Author must have > 500 followers
  - Post must have at least one reply already
  - Skip pure promotional/marketing pitches
  - Skip posts where the author is a competitor whose tool we'd
    be linking to negatively
  - Prefer posts from solo founders, indie hackers, builders —
    not journalists or VC commentators

For each candidate, return:
  - URL of the tweet
  - One-line summary of what the tweet says
  - Why this is a good match (which of the 5 articles fits)
  - Suggested reply text (under 280 chars, conversational tone,
    adds a concrete data point or experience first, then mentions
    the article as 'wrote up the full thing here' style — never
    "buy my tool" energy)
  - Risk flag: "low" / "medium" / "high"

Return at most 10. Quality > count.

My voice: first-person, decisive, practitioner. I shipped Prism
(ssimplifi.com), Citare (citare.ai), BatchWise (batchwise.ai) —
three production AI SaaS solo. No formal coding background. I use
Claude Code on the $200/month Max plan inside VSCode.
```

#### Prompt 2 — Reddit candidates

Re-run every 2-3 days.

```
Find me 8 Reddit posts I should comment on right now to drive
qualified traffic to rikuq.com. Same 5 articles as Prompt 1.

Subreddits to search (in priority order):
  1. r/ClaudeAI
  2. r/cursor
  3. r/LocalLLaMA
  4. r/SideProject
  5. r/SaaS
  6. r/indiehackers
  7. r/programming
  8. r/learnprogramming

Search queries (combine with site:reddit.com on Google for coverage):

  - "claude code" review experience
  - "cursor vs claude" OR "claude code vs cursor"
  - "antigravity" experience review dropped
  - "anthropic max" plan worth it
  - "vibe coding" AI coding tools 2026
  - solo founder shipped AI saas
  - "what AI coding tool" should I use
  - "openai compatible" proxy gateway

Filters:
  - Post < 14 days old
  - Post has > 10 comments AND > 20 upvotes
  - Skip subreddits with strict no-self-promo rules unless comment
    stands alone as pure value with link as optional
  - Skip posts where OP asks for a tool I can't honestly recommend
  - Skip posts older than 30 days

For each candidate, return:
  - URL of the post
  - Subreddit
  - One-line summary
  - Which article fits
  - Suggested comment (Reddit-style: 150-400 words, lead with
    concrete experience/data, link at END if at all)
  - Subreddit rules check: any explicit self-promo violations?
  - Risk flag: "low" / "medium" / "high"

Reddit-specific:
  - Only ~30% of comments should include rikuq.com links. The
    other 70% should be pure value.
  - For no-self-promo subreddits, write the comment with no link
    and a separate "if asked" line so I can add it manually.
  - My Reddit account is new — be especially careful in
    r/programming, r/learnprogramming, r/SideProject which
    auto-remove low-karma accounts that link out.

Return at most 8 candidates. Surface only genuinely good fits.
```

#### Prompt 3 — Hacker News candidates

Re-run every 3-4 days.

```
Find me 5 Hacker News threads I should comment on right now where
my experience or one of my 5 rikuq.com articles adds first-party
value. Same 5 articles as Prompt 1.

Search Hacker News via https://hn.algolia.com/?q=
Queries:
  - claude code
  - cursor IDE
  - anthropic max plan
  - AI coding tools 2026
  - antigravity editor
  - AI gateway proxy
  - LLM observability gateway
  - vibe coding
  - "solo founder" shipping

Filters:
  - Stories from last 14 days
  - > 30 points AND > 15 comments
  - Skip stories where consensus is already aligned with my angle
  - Prefer stories where someone is asking a specific question my
    first-party experience answers concretely

For each candidate, return:
  - HN story URL
  - Story title
  - One-line summary of discussion direction
  - Which article fits (or "no link, pure first-party data")
  - Suggested comment (HN-style: 60-200 words, tight, factual,
    no marketing language). Link only as a SOURCE for a claim,
    not a CTA.
  - Risk flag: "low" / "medium" / "high"

HN-specific:
  - Marketing language gets downvoted instantly.
  - Single supporting link okay; multiple links read promotional.
  - Don't pile on with self-link if someone already posted my article.
  - First-party data > opinion. My commentable facts:
    * 76k lines TS in 12 days (Citare)
    * 19k TS + 12k Python (Prism)
    * Claude Code Max $100 ceiling vs $200 ceiling
    * CLAUDE.md three-phase evolution
    * what-i-did.md pattern
    * Dropped Antigravity after May 2026 redesign — switching cost logic
    * Non-coder shipping 3 production SaaS

Return at most 5. Quality only.
```

---

## Phase 3 — Repurposing / cross-posting

When a new article publishes on rikuq, push adapted versions to other platforms within 7 days. Always set the canonical URL back to rikuq.com.

| Channel | Priority | Why | Format adjustment | Canonical respected? |
|---|---|---|---|---|
| **Dev.to** | High | Active dev community, strong organic reach for AI/coding | Add platform-native intro, use their Markdown flavor | ✅ yes (set `canonical_url` in frontmatter) |
| **Hashnode** | High | Same as Dev.to + has its own SEO juice | Same | ✅ yes |
| **Medium** | Medium | Reach is good but algorithm has weakened post-2024 | Use Medium's import-from-URL tool (respects canonical automatically) | ✅ yes (via import) |
| **IndieHackers** | High | Founder audience matches rikuq's reader | Write as a "lessons" post, not a copy-paste | n/a — usually frame as commentary linking to rikuq |
| **LinkedIn Articles** | Medium | Longer-form rewards on LinkedIn vs short posts | Rewrite intro for professional tone | ✅ yes (set canonical in publishing UI) |
| **Lobsters** | Low | Stricter than HN, invite-only — only if you have an invite | Strict relevance to programming | n/a — link only |
| **Hacker Noon** | Skip | Distribution has weakened significantly; not worth it in 2026 | — | — |
| **Substack** | Skip | We use Brevo for newsletter; no need for a parallel newsletter | — | — |

### Cross-post timing

- Day 0: publish on rikuq.com
- Day 1-2: Twitter anchor thread + Reddit post-of-the-article
- Day 3-5: Dev.to + Hashnode (with canonical URLs)
- Day 5-7: LinkedIn Article + IndieHackers (commentary framing)
- Day 7+: Medium import

This gives rikuq.com a head start on Google indexing before republishing. Without that gap, Google may pick the republished version as the canonical (even with the `rel="canonical"` tag, in some cases).

---

## Automation

Honest answer: most cross-post automation produces mediocre republishes that perform worse than manual adaptations. The 80/20 worth automating:

### Worth automating ✅

- **Dev.to API publish** — they have a clean API, accepts Markdown frontmatter with `canonical_url`. Could be a `scripts/crosspost-devto.mjs` that takes the latest published article and POSTs it. Saves ~10 min/article.
- **Hashnode API publish** — same. They have a GraphQL API. Worth scripting if we hit > 2 articles/week cadence.
- **RSS-to-Twitter (anchor announcement only)** — Buffer / Hypefury / Typefully on their free/cheap tiers can auto-tweet "new post: <title> <link>" from rss.xml. Useful for the *announcement*; replies still need to be manual.

### Not worth automating ❌

- Medium — their UI import tool already does the heavy lifting; scripting the API is more work than 5 min of manual paste
- LinkedIn — the canonical UI workflow is the only path; LinkedIn's API is restricted
- Reddit — every subreddit has different culture; automated posts get banned
- Hacker News — algorithmic detection of automated posts is aggressive
- Replies on any platform — quality requires per-comment judgment

### Suggested first automation script

If we end up shipping 2+ articles a week, build `scripts/crosspost-devto.mjs` first. It's the highest ROI:

```js
// pseudo-code
1. Read latest published article from src/content/blog/
2. Format as Dev.to markdown (their frontmatter syntax)
3. POST to https://dev.to/api/articles with API key
4. Article published with canonical_url back to rikuq.com
```

Until then: manual cross-post takes ~15 min per article per platform, do it for Dev.to and Hashnode after each publish, skip the rest unless they make sense for that specific article.

---

## Tracking & decisions

Every Sunday, review Cloudflare Web Analytics to answer:

1. **Top 5 referrers this week?** (twitter.com, reddit.com, news.ycombinator.com, dev.to, etc.) → tells us which channels work
2. **Top 5 entry pages?** → tells us which articles are pulling traffic
3. **Newsletter signups this week?** → conversion signal
4. **Bounce rate per channel?** → quality signal (HN traffic usually has lower bounce than Reddit)
5. **Which prompts produced the most replies that converted to clicks?** (manual count from the week)

Decisions to make from this data:

- If Twitter is the #1 referrer → run Prompt 1 twice daily, not once
- If Reddit drives high bounce → tighten the targeting, fewer but better comments
- If HN drives a single big spike → write more HN-bait content (deep technical, decisive verdicts, first-party data)
- If one article dominates → write a sequel/companion piece to capture that same intent at higher volume

---

## Channels we're deliberately ignoring

- **Twitter spaces / X spaces** — high time investment, low traffic ROI for small accounts
- **Podcasts** — only when invited; don't pitch ourselves
- **YouTube** — different production track; revisit when content cluster is at 30+ articles
- **TikTok / Instagram Reels** — wrong audience for AI infra / solo founder content
- **Threads (Meta)** — not enough technical-founder audience there yet
- **Mastodon / Bluesky** — small audience, low ROI unless we already have presence there

If any of these become relevant later, add them here with the same prompts pattern.

---

## When the daily checklist runs out

If we hit a day where: Twitter replies are pacing well + no fresh Reddit thread + no good HN candidate + nothing to cross-post → write content. Specifically, the next article from the content plan in priority order:

1. Production stack post (highest affiliate revenue)
2. Citare 12-day case study (highest viral potential)
3. Windsurf + Copilot reviews (rounds out the tools cluster)
4. Anthropic prompt caching post (opens infra pillar)

The distribution playbook never runs dry — there's always a next piece of content to write when the engagement work for today is done.
