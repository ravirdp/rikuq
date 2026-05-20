# UTM Conventions — rikuq.com

Single tagging scheme so we can attribute traffic + conversions cleanly across rikuq → Prism / Citare / BatchWise and outbound affiliate links.

## The 5 UTM params

| Param | Required? | Value |
|---|---|---|
| `utm_source` | Yes | The originating site/property. Lowercase, no spaces. |
| `utm_medium` | Yes | The traffic medium. Use the controlled vocabulary below. |
| `utm_campaign` | Yes | A campaign or post slug. Lowercase-kebab. |
| `utm_content` | Optional | Specific link variant when A/B testing (e.g., `header-cta`, `inline-cta`). |
| `utm_term` | Optional | Keyword (only for paid). |

## utm_source — controlled values

- `rikuq` — anything linked from rikuq.com
- `prism` — from ssimplifi.com (Prism marketing/docs)
- `citare` — from citare.ai
- `batchwise` — from batchwise.ai
- `twitter` — from twitter/x posts
- `linkedin` — from LinkedIn posts
- `hn` — from Hacker News
- `reddit` — from a specific subreddit (further qualified in utm_campaign)
- `ph` — from Product Hunt
- `newsletter` — from rikuq newsletter
- `email` — from cold email outreach

## utm_medium — controlled values

- `referral` — editorial link from another property
- `social` — social media post
- `affiliate` — outbound to an affiliate link (their inbound; we send our affiliate ID separately)
- `blog` — outbound from a blog post body
- `nav` — outbound from a nav/header/footer link
- `cta` — outbound from a primary CTA (homepage button, signup card)
- `card` — outbound from a card-style component
- `inline` — outbound from inline text in a post

## utm_campaign — naming

Use the post slug or a campaign codename. Examples:

- From the post `/blog/infra/portkey-vs-helicone-vs-litellm-vs-openrouter` → `utm_campaign=portkey-vs-helicone`
- From the homepage CTA → `utm_campaign=homepage`
- From a launch tweet → `utm_campaign=launch-week`
- From the newsletter issue #4 → `utm_campaign=nl-2026-06-05`

## Example URLs

Rikuq blog post → Prism signup:
```
https://ssimplifi.com/signup?utm_source=rikuq&utm_medium=blog&utm_campaign=portkey-vs-helicone&utm_content=recommendation-box
```

Rikuq homepage → Citare:
```
https://citare.ai/?utm_source=rikuq&utm_medium=cta&utm_campaign=homepage&utm_content=products-card
```

Rikuq blog post → Cursor (affiliate):
```
https://cursor.com/?ref=AFFID_CURSOR&utm_source=rikuq&utm_medium=affiliate&utm_campaign=cursor-review&utm_content=tldr-table
```

## What to track inside Plausible / GA4

- Goal 1: outbound click to ssimplifi.com (any) — attribute to Prism funnel
- Goal 2: outbound click to citare.ai (any) — attribute to Citare funnel
- Goal 3: outbound click to batchwise.ai (any) — attribute to BatchWise funnel
- Goal 4: newsletter signup
- Goal 5: tool result page reached (any `/tools/picker/result/*`)
- Goal 6: outbound affiliate clicks (tagged via Plausible custom event)

## Server-side attribution (when we move to it)

When tools collect emails, append the inbound UTM params to the lead record so we can attribute newsletter signups + tool conversions to the originating post.

## Pruning

Once a quarter:
- Audit which `utm_campaign` values actually drove conversions.
- Drop campaigns with zero attribution from active tagging.
- Refine `utm_content` granularity based on what's actually useful.
