#!/usr/bin/env bash
set -euo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$ROOT"

status=0
bash .claude/hooks/run-changed-file-checks.sh || status=1
bash scripts/check-ui-token-usage.sh || status=1

exit "$status"
