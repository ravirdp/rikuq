#!/usr/bin/env bash
# generate-pdf.sh — Chrome headless PDF generator
#
# Usage: ./generate-pdf.sh <input.html> <output.pdf>
#
# Uses the OS Chrome binary in headless mode. Pixel-perfect parity with
# Chrome browser print preview. No Puppeteer/Playwright dependency.
#
# Cross-platform Chrome path resolution + the magic flags that strip headers
# and don't mangle background colors.

set -euo pipefail

INPUT="${1:?Usage: generate-pdf.sh <input.html> <output.pdf>}"
OUTPUT="${2:?Usage: generate-pdf.sh <input.html> <output.pdf>}"

# Resolve to absolute paths (Chrome headless wants file:// URLs)
INPUT_ABS="$(cd "$(dirname "$INPUT")" && pwd)/$(basename "$INPUT")"
OUTPUT_DIR="$(cd "$(dirname "$OUTPUT")" && pwd)"
OUTPUT_ABS="$OUTPUT_DIR/$(basename "$OUTPUT")"

# Locate Chrome binary across platforms
CHROME=""
for candidate in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium" \
  "$(which google-chrome 2>/dev/null || true)" \
  "$(which chromium-browser 2>/dev/null || true)" \
  "$(which chromium 2>/dev/null || true)" \
  "/c/Program Files/Google/Chrome/Application/chrome.exe" \
  "/c/Program Files (x86)/Google/Chrome/Application/chrome.exe"
do
  if [ -x "$candidate" ]; then
    CHROME="$candidate"
    break
  fi
done

if [ -z "$CHROME" ]; then
  echo "ERROR: Chrome / Chromium binary not found. Install Chrome or set CHROME env var." >&2
  exit 1
fi

echo "[pdf] Chrome: $CHROME"
echo "[pdf] Input:  $INPUT_ABS"
echo "[pdf] Output: $OUTPUT_ABS"

"$CHROME" \
  --headless \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="$OUTPUT_ABS" \
  "file://$INPUT_ABS" \
  2>&1 | grep -v "DevTools listening\|chromium-browser\|GPU" || true

if [ -f "$OUTPUT_ABS" ]; then
  size=$(ls -lh "$OUTPUT_ABS" | awk '{print $5}')
  echo "[pdf] Wrote $OUTPUT_ABS ($size)"
else
  echo "ERROR: PDF not generated. Check Chrome stderr above." >&2
  exit 1
fi
