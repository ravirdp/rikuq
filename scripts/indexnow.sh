#!/usr/bin/env bash
# Pings IndexNow with every URL from the live sitemap.
#
# IndexNow is a free protocol used by Bing, Yandex, Naver, and Seznam to
# instantly index updated URLs. One submission propagates to all participating
# search engines. Google does not (yet) participate, but submits via GSC sitemap.
#
# Usage (run from repo root after a successful deploy):
#   INDEXNOW_KEY=<key> ./scripts/indexnow.sh
#
# Env vars:
#   INDEXNOW_KEY   the 32-char hex key — must match public/<key>.txt
#   SITE_HOST      defaults to rikuq.com
#   SITEMAP_URL    defaults to https://<SITE_HOST>/sitemap-index.xml
#
# Exit codes:
#   0  ping accepted (HTTP 200 or 202)
#   1  missing env / sitemap fetch failed
#   2  IndexNow returned non-success

set -euo pipefail

SITE_HOST="${SITE_HOST:-rikuq.com}"
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

# Build the JSON body. IndexNow accepts up to 10,000 URLs per ping.
json_body=$(echo "$all_urls" | awk -v host="$SITE_HOST" -v key="$INDEXNOW_KEY" -v key_loc="$KEY_LOCATION" '
  BEGIN {
    printf "{\"host\":\"%s\",\"key\":\"%s\",\"keyLocation\":\"%s\",\"urlList\":[", host, key, key_loc
  }
  NR > 1 { printf "," }
  { printf "\"%s\"", $0 }
  END { printf "]}\n" }
')

# api.indexnow.org is the shared multi-engine endpoint; pings here propagate.
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
