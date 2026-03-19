#!/usr/bin/env bash
set -euo pipefail

python3 - <<'PY'
import json
import pathlib
import sys

root = pathlib.Path('.')
status = 0
path = root / 'repository-map.json'

if not path.exists():
    print('Missing repository-map.json', file=sys.stderr)
    raise SystemExit(1)

try:
    data = json.loads(path.read_text())
except Exception as exc:
    print(f'Invalid repository-map.json: {exc}', file=sys.stderr)
    raise SystemExit(1)

required_string_paths = [
    data['governance']['authority'],
    data['governance']['sourceOfTruth'],
    data['governance']['definitionOfDone'],
    data['governance']['engineeringGovernance'],
    data['documentation']['index'],
    data['runtime']['settings'],
    data['runtime']['hooksRoot'],
    data['runtime']['agentsRoot'],
    data['runtime']['skillsRoot'],
    data['validation']['scriptsRoot'],
    data['validation']['evalsRoot'],
]

for rel in required_string_paths:
    candidate = root / rel
    if not candidate.exists():
        print(f'repository-map.json points to missing path: {rel}', file=sys.stderr)
        status = 1

for key, values in data.get('productUi', {}).items():
    if not isinstance(values, list):
        print(f'productUi.{key} must be a list', file=sys.stderr)
        status = 1
        continue
    for rel in values:
        candidate = root / rel
        if not candidate.exists():
            print(f'Configured product UI path does not exist: {rel}', file=sys.stderr)
            status = 1

raise SystemExit(status)
PY
