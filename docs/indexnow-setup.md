# IndexNow — Auto-Ping Setup for Any Property

**One-page handoff.** Drop this in front of any Opus working on any property; it should be self-sufficient.

**What it does:** every time the property deploys, all URLs in its sitemap get pushed to Bing, Yandex, Naver, and Seznam — instant indexing instead of waiting days for organic discovery. Bing matters most because Bing's index feeds ChatGPT search.

**What it doesn't do:** Google indexing. Google doesn't participate in IndexNow — keep using GSC sitemap submission for Google.

---

## What you'll set up

1. A 32-char hex key (your private IndexNow key).
2. A key-verification file hosted at `https://<your-domain>/<key>.txt`.
3. A shell script that fetches the live sitemap and pings IndexNow with all URLs.
4. A post-deploy CI step that runs the script after every successful deploy.

---

## Step 1 — generate a key

```bash
openssl rand -hex 16
# e.g. c7817e5f7fe229e218bc38fc248111c8
```

Save this string somewhere; it'll go in two places: the public file and a CI secret.

---

## Step 2 — host the key file

Create a plain-text file in the static-assets directory of the property:

```
<static-public-dir>/<key>.txt
```

The file's only content is the key string itself:

```
c7817e5f7fe229e218bc38fc248111c8
```

**Critical:** IndexNow refuses to accept pings until it can fetch this file at `https://<your-domain>/<key>.txt` and confirm the contents match the key in the API call. So the file must deploy *before* the first ping ever fires.

---

## Step 3 — drop the ping script in `scripts/indexnow.sh`

```bash
#!/usr/bin/env bash
# Pings IndexNow with every URL from the live sitemap.
#
# Usage (run from repo root after a successful deploy):
#   INDEXNOW_KEY=<key> SITE_HOST=<your-domain> ./scripts/indexnow.sh
#
# Env vars:
#   INDEXNOW_KEY   the 32-char hex key — must match public/<key>.txt
#   SITE_HOST      e.g. example.com (no protocol, no trailing slash)
#   SITEMAP_URL    optional override (default: https://<SITE_HOST>/sitemap-index.xml)
#
# Exit codes:
#   0  ping accepted (HTTP 200 or 202)
#   1  missing env / sitemap fetch failed / key file unreachable
#   2  IndexNow returned non-success

set -euo pipefail

SITE_HOST="${SITE_HOST:?SITE_HOST env var required (e.g. example.com)}"
SITEMAP_URL="${SITEMAP_URL:-https://${SITE_HOST}/sitemap-index.xml}"

if [ -z "${INDEXNOW_KEY:-}" ]; then
  echo "ERROR: INDEXNOW_KEY env var is required." >&2
  exit 1
fi

KEY_LOCATION="https://${SITE_HOST}/${INDEXNOW_KEY}.txt"

# Verify the key file is reachable. IndexNow rejects pings if it can't fetch the key.
key_status=$(curl -s -o /dev/null -w "%{http_code}" "$KEY_LOCATION")
if [ "$key_status" != "200" ]; then
  echo "ERROR: Key file at $KEY_LOCATION returned $key_status (expected 200)." >&2
  exit 1
fi

# Fetch sitemap index → follow each child sitemap → collect <loc> URLs.
echo "Fetching sitemap index: $SITEMAP_URL"
child_sitemaps=$(curl -s "$SITEMAP_URL" | grep -oE '<loc>[^<]+</loc>' | sed -E 's|</?loc>||g')

if [ -z "$child_sitemaps" ]; then
  echo "ERROR: Could not parse sitemap index at $SITEMAP_URL" >&2
  exit 1
fi

all_urls=""
for sm in $child_sitemaps; do
  urls=$(curl -s "$sm" | grep -oE '<loc>[^<]+</loc>' | sed -E 's|</?loc>||g')
  all_urls=$(printf "%s\n%s" "$all_urls" "$urls")
done

# Dedupe + drop blanks.
all_urls=$(echo "$all_urls" | sed '/^$/d' | sort -u)
url_count=$(echo "$all_urls" | wc -l | tr -d ' ')
echo "Discovered $url_count URLs to submit."

# Build JSON body. IndexNow accepts up to 10,000 URLs per ping.
json_body=$(echo "$all_urls" | awk -v host="$SITE_HOST" -v key="$INDEXNOW_KEY" -v key_loc="$KEY_LOCATION" '
  BEGIN {
    printf "{\"host\":\"%s\",\"key\":\"%s\",\"keyLocation\":\"%s\",\"urlList\":[", host, key, key_loc
  }
  NR > 1 { printf "," }
  { printf "\"%s\"", $0 }
  END { printf "]}\n" }
')

# api.indexnow.org is the shared multi-engine endpoint; pings here propagate
# to Bing, Yandex, Naver, Seznam.
response_code=$(curl -s -o /tmp/indexnow_response.txt -w "%{http_code}" \
  -X POST 'https://api.indexnow.org/IndexNow' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -H "Host: api.indexnow.org" \
  --data "$json_body")

case "$response_code" in
  200) echo "✅ IndexNow accepted ($url_count URLs, HTTP 200)" ;;
  202) echo "✅ IndexNow queued ($url_count URLs, HTTP 202)" ;;
  *)
    echo "❌ IndexNow returned HTTP $response_code:" >&2
    cat /tmp/indexnow_response.txt >&2
    exit 2
    ;;
esac
```

`chmod +x scripts/indexnow.sh`

---

## Step 4 — wire it into CI as a post-deploy step

Append after the deploy step in your CI workflow. Example for GitHub Actions:

```yaml
- name: Deploy
  id: deploy
  # ... your existing deploy step

# Give the CDN/edge a moment to propagate the new build before pinging.
- name: Wait for edge propagation
  run: sleep 20

- name: Ping IndexNow (Bing / Yandex / Naver / Seznam)
  env:
    INDEXNOW_KEY: ${{ secrets.INDEXNOW_KEY }}
    SITE_HOST: <your-domain>
  run: ./scripts/indexnow.sh
  continue-on-error: true
```

**Notes:**
- `continue-on-error: true` so a transient IndexNow outage never blocks a deploy.
- The 20s sleep is essential — without it the script will ping URLs that haven't fully propagated to the edge yet, leading to crawlers fetching stale content.

---

## Step 5 — store the secret

```bash
gh secret set INDEXNOW_KEY --body "<the key from step 1>" --repo <owner>/<repo>
```

For non-GitHub CI: add it as a protected env var in your CI system. Never commit the key value to the repo.

---

## Step 6 — first run

Push the changes. The CI runs:
1. Deploys (which publishes the new `<key>.txt`)
2. Sleeps 20s
3. Verifies the key file is reachable
4. Fetches the sitemap, builds the URL list, POSTs to IndexNow

Look for `✅ IndexNow accepted (N URLs, HTTP 200)` or `(HTTP 202)` in the logs.

---

## Sitemap requirements

The script assumes:
- A sitemap index lives at `https://<SITE_HOST>/sitemap-index.xml`
- Each child sitemap returns standard `<url><loc>...</loc></url>` entries

If your property uses a different sitemap path, set `SITEMAP_URL` in the CI step.

If you have a flat `sitemap.xml` (no index), change the script's first parse to read it directly. Easiest tweak: set `SITEMAP_URL=https://<SITE_HOST>/sitemap.xml` and modify the script to skip the index-following loop.

---

## Verification

After the first successful ping:

```bash
curl -sI https://<your-domain>/<key>.txt    # must return 200
```

To manually trigger a ping for testing (don't make a habit of this — IndexNow rate-limits abusers):

```bash
INDEXNOW_KEY=<key> SITE_HOST=<your-domain> ./scripts/indexnow.sh
```

In **Bing Webmaster Tools** → Configure My Site → IndexNow, you'll see a counter of submitted URLs increment after the first ping (24-48h lag for the dashboard, not the indexing itself).

---

## Property-specific notes

When applying to a new property:

- **Generate a fresh key per property.** Don't reuse the key across properties — if one repo leaks its key, the others stay safe.
- **Host the key file in the property's static dir.** Astro/Next/Vite/etc. → `public/<key>.txt`. Hugo → `static/<key>.txt`. WordPress → root via a plugin or `.htaccess` rewrite.
- **SITE_HOST is the bare domain.** No protocol, no trailing slash. e.g. `batchwise.ai`, `citare.ai`, `ssimplifi.com`.
- **If the property has a custom sitemap structure** (e.g. multiple sub-sitemaps, paginated, or non-standard names), set `SITEMAP_URL` in the CI step accordingly.

---

## Why this matters

- Bing/IndexNow → indexed in **minutes** instead of days.
- Bing's index feeds **ChatGPT search citations**. So this is a GEO move, not just SEO.
- Yandex / Naver / Seznam combined cover ~10-15% of global search; free distribution worth taking.
- Zero ongoing maintenance — runs automatically on every push.

---

## What you do NOT need to do

- Sign up anywhere. IndexNow has no account system; the key file is your authentication.
- Submit individual URLs manually as you publish. The post-deploy ping handles everything in the sitemap automatically.
- Worry about pinging too often. IndexNow handles deduplication at their end; pinging the same URL repeatedly on no-change days is fine.

---

**Living doc:** if IndexNow changes its API or new search engines join, update this file and bump the date below.

*Last updated: 2026-05-21*
