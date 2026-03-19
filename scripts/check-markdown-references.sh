#!/usr/bin/env bash
set -euo pipefail

python3 - <<'PY'
import pathlib
import re
import sys

root = pathlib.Path('.')
status = 0
pattern = re.compile(r'`((?:governance|docs|\.claude|scripts|evals)/[^`\n]+?|repository-map\.json|CLAUDE\.md|README\.md)`')

for md in root.rglob('*.md'):
    text = md.read_text()
    for ref in pattern.findall(text):
        if '*' in ref:
            continue
        path = root / ref
        if not path.exists():
            print(f'Broken markdown reference in {md.as_posix()}: {ref}', file=sys.stderr)
            status = 1

raise SystemExit(status)
PY
