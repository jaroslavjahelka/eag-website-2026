#!/usr/bin/env bash
set -euo pipefail

mapfile -t paths < <(python3 - <<'PY'
import json
from pathlib import Path

data = json.loads(Path('repository-map.json').read_text())
product = data.get('productUi', {})
seen = []
for key in (
    'routeRoots',
    'componentRoots',
    'layoutRoots',
    'formRoots',
    'dataDisplayRoots',
):
    for value in product.get(key, []):
        if value not in seen:
            seen.append(value)
for value in seen:
    print(value)
PY
)

status=0
found=0

for path in "${paths[@]}"; do
  if [ -d "$path" ]; then
    found=1
    if grep -RInE 'class(Name)?=.*(m-\[[0-9]|p-\[[0-9]|text-\[[0-9]|bg-\#[0-9A-Fa-f])' "$path" >/dev/null 2>&1; then
      echo "Potential arbitrary UI values found in $path" >&2
      status=1
    fi
  fi
done

if [ "$found" -eq 0 ]; then
  echo 'No product UI roots configured in repository-map.json for token usage scan.'
fi

exit "$status"
