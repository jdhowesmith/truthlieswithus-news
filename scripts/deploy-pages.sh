#!/usr/bin/env bash
# Build a static copy and publish it to the gh-pages branch (GitHub Pages preview).
# Usage: scripts/deploy-pages.sh
set -euo pipefail
cd "$(dirname "$0")/.."
REPO_URL="${REPO_URL:-https://github.com/jdhowesmith/truthlieswithus-news.git}"
rm -rf out
STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/truthlieswithus-news NEXT_PUBLIC_SITE_URL=https://jdhowesmith.github.io npx next build
touch out/.nojekyll
cd out
git init -q -b gh-pages
git add -A
git -c user.name="Truth Lies With Us" -c user.email="truthlieswithus@gmail.com" commit -qm "Publish $(date -u +%Y-%m-%dT%H:%MZ)"
git push -f "$REPO_URL" gh-pages
rm -rf .git
