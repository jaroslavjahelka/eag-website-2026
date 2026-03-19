#!/usr/bin/env bash
set -euo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$ROOT"

status=0
for path in \
  CLAUDE.md \
  repository-map.json \
  .claude/settings.json \
  governance/authority-order.md \
  governance/engineering-governance.md \
  governance/source-of-truth-map.md \
  governance/change-control.md \
  governance/definition-of-done.md \
  docs/INDEX.md; do
  if [ ! -f "$path" ]; then
    echo "Missing governance file: $path" >&2
    status=1
  fi
done

bash scripts/check-authority-links.sh || status=1
bash scripts/check-doc-structure.sh || status=1
bash scripts/check-runtime-integrity.sh || status=1
bash scripts/check-repository-map.sh || status=1

exit "$status"
