#!/usr/bin/env bash
# Companies House check for the daily prospect finder.
# Usage: prospects/ch_check.sh "brand name" ["another brand" ...]
# For each brand: lists the top matches, then the status of the best match.
set -u
BASE="https://find-and-update.company-information.service.gov.uk"
for q in "$@"; do
  echo "== $q"
  page=$(curl -s -m 20 "$BASE/search/companies?q=$(printf '%s' "$q" | sed 's/ /+/g')")
  echo "$page" | tr '\n' ' ' | grep -oE '<li class="type-company">.{0,900}?</li>' 2>/dev/null \
    | sed 's/<[^>]*>/ /g; s/  */ /g' | grep -v '{{' | head -4 | sed 's/^/  match:/'
  num=$(echo "$page" | grep -oE 'href="/company/[A-Z0-9]{8}"' | head -1 | grep -oE '[A-Z0-9]{8}')
  [ -z "$num" ] && { echo "  no company found (may be a sole trader)"; continue; }
  prof=$(curl -s -m 20 "$BASE/company/$num" | tr '\n' ' ' | sed 's/<[^>]*>/ /g; s/  */ /g')
  echo "  first match $num (check the name really is this brand):"
  echo "$prof" | grep -oE '(Company status [A-Za-z]+( [a-z]+)?|Active proposal to strike off|[Oo]verdue|Next accounts made up to [^L]{0,50}|Nature of business \(SIC\) [0-9]+ - [^$]{0,60})' | sed 's/^/    /'
done
