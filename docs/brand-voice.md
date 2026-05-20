# Brand Voice & Style Guide — rikuq.com

**Audience:** solo founders, indie hackers, and small teams shipping AI products users pay for. Technical. Time-poor. Tired of AI-spam content.

**The brand promise:** every article is written by someone who actually ships. No theorizing. No regurgitated press releases.

## Voice

- **First-person.** "I" not "we." If a piece needs the impersonal voice, rethink whether it's a fit.
- **Practitioner, not pundit.** "Here's what happened when I tried this" beats "Here's what experts say about this."
- **Direct.** No "let's dive in," no "in today's fast-paced world," no "in this article we will explore." Get to the verdict.
- **Confident, not cocky.** State opinions plainly. Concede uncertainty when it's real. Avoid "it depends" hedging that means nothing.
- **Honest about tradeoffs.** Every recommendation names what it's NOT good for.

## Style rules

1. **The first paragraph contains the verdict.** Readers should know your conclusion before they decide to keep reading. Long-form is for proof, not suspense.
2. **Lead with a comparison table or summary chart** when there are 3+ options. AI search loves structured data; readers love speed.
3. **Real numbers > vague claims.** "Reduced our API bill 47%" beats "significantly cheaper." If you don't have a number, explain why.
4. **Real screenshots** from real projects. Not stock images. Not Figma mockups. Actual app, actual terminal, actual dashboard.
5. **Real prompts in code blocks.** Not paraphrased — the literal text you ran.
6. **Costs broken down.** "$X/month for Y" beats "affordable."
7. **Clear verdict at the end.** Don't end with "what do you think?" End with a recommendation per use case.
8. **Last updated date** prominent at top.
9. **No emojis in headings or body** unless quoting code/UI. Sparingly in callouts.
10. **No exclamation marks** unless quoting someone.

## Words and phrases to avoid

| Avoid | Use instead |
|---|---|
| "Let's dive in" | (just start) |
| "In today's fast-paced world" | (delete) |
| "Game changer" | be specific about what changed |
| "Cutting edge" | name the actual technology |
| "Best-in-class" | name the criterion |
| "Robust" | name the property (e.g., handles 100k req/s) |
| "Seamless" | describe the actual flow |
| "Leveraging" | "using" |
| "Utilize" | "use" |
| "It depends" (standalone) | name the dependency |
| "Some say" / "many believe" | cite or delete |
| "Disrupting" | (almost always cliche) |

## Article structure (default)

1. **Lede + verdict** — 2-3 sentences, conclusion in plain sight
2. **TL;DR table** — comparison if applicable, key numbers if not
3. **Disclosure block** — affiliate / Prism / Citare disclosures upfront
4. **The body** — sections that each answer a specific reader question
5. **Real-world test / case** — what happened when you actually used it
6. **Cost / time breakdown** — concrete numbers
7. **Who should pick this** — and who shouldn't
8. **FAQ** — 4-6 questions, answered tersely (these power FAQPage schema)
9. **What's next** — internal links to 2-3 related posts

## Disclosure rules

- Affiliate links: state at top via the `affiliateDisclosure: true` front-matter flag.
- Prism / Citare / BatchWise mentioned in comparison: state at top via the matching `*Disclosure: true` flag.
- Disclosures appear inside the `DisclosureBanner` component — never buried in the footer or hidden behind a tooltip.

## On comparison content (critical)

When comparing tools — especially when one of Ravi's products is in the comparison:

1. **State the disclosure at the top.** Not buried, not hidden.
2. **Don't straw-man competitors.** Describe their strengths accurately.
3. **Recommend the best tool per use case** — even if that's a competitor of your own product.
4. **Use the source-of-truth one-liners** from `docs/seo-content-plan.md` § 5 for consistency.
5. **Cite real numbers** where they exist (Prism's own usage data is fair game; don't fabricate competitor numbers — link to their public docs).
6. **No fake quotes, no invented case studies.**

## Front-matter checklist for every post

```yaml
title: "≤70 chars"
description: "120–160 chars, SERP-optimized"
pubDate: 2026-MM-DD
updatedDate: 2026-MM-DD   # set when revising
category: tools | infra | geo | stack
tags: ["cursor", "claude-code"]
author: Ravi
draft: false
affiliateDisclosure: true   # if affiliate links present
prismDisclosure: true       # if Prism is in the comparison
citareDisclosure: true      # if Citare is in the comparison
faqs:
  - question: "Q1?"
    answer: "A1."
relatedPosts: ["slug-of-related-post"]
```

## Cadence

- 4 posts per week (Mon/Tue/Thu/Fri, or pick a steady rhythm)
- 1 newsletter issue per week (Friday)
- 2-3 Twitter/X threads per week (one per published article minimum)
- 1 LinkedIn post per week (longer-form, B2B angle)
- HN / Reddit posts only when an article is genuinely worth it — don't burn the credit.
