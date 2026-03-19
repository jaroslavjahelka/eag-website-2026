#!/usr/bin/env bash
set -euo pipefail

python3 - <<'PY'
import json
import pathlib
import re
import sys

root = pathlib.Path('.')
settings_path = root / '.claude/settings.json'
status = 0

if not settings_path.exists():
    print('Missing runtime settings: .claude/settings.json', file=sys.stderr)
    raise SystemExit(1)

settings = json.loads(settings_path.read_text())

required_dirs = [
    root / '.claude/hooks',
    root / '.claude/agents',
    root / '.claude/skills',
]
for directory in required_dirs:
    if not directory.is_dir():
        print(f'Missing runtime directory: {directory.as_posix()}', file=sys.stderr)
        status = 1

pattern = re.compile(r'\.claude/hooks/[A-Za-z0-9._/-]+')
for event, entries in settings.get('hooks', {}).items():
    for entry in entries:
        for hook in entry.get('hooks', []):
            command = hook.get('command', '')
            match = pattern.search(command)
            if not match:
                print(f'Hook command does not reference a runtime hook path: {event} -> {command}', file=sys.stderr)
                status = 1
                continue
            rel = match.group(0)
            path = root / rel
            if not path.is_file():
                print(f'Hook command points to missing file: {rel}', file=sys.stderr)
                status = 1

raise SystemExit(status)
PY
