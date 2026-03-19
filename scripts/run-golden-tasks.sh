#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPORT_DIR="$ROOT_DIR/evals/reports"
REPORT_FILE="$REPORT_DIR/golden-task-report.md"

mkdir -p "$REPORT_DIR"

append_if_exists() {
  local target="$1"
  local label="$2"

  if [ -d "$target" ]; then
    echo "- $label: present" >> "$REPORT_FILE"
    find "$target" -type f | sort >> "$REPORT_FILE"
  else
    echo "- $label: not present in this repository mode" >> "$REPORT_FILE"
  fi
}

MODE="$(python3 - <<'PY' "$ROOT_DIR/repository-map.json"
import json, sys
with open(sys.argv[1], "r", encoding="utf-8") as f:
    data = json.load(f)
print(data.get("mode", "unknown"))
PY
)"

cat > "$REPORT_FILE" <<EOF
# Golden Task Report

- mode: $MODE

## Repository scan
EOF

append_if_exists "$ROOT_DIR/src" "src"
append_if_exists "$ROOT_DIR/app" "app"
append_if_exists "$ROOT_DIR/components" "components"

echo "" >> "$REPORT_FILE"
echo "## Result" >> "$REPORT_FILE"
echo "- harness completed successfully" >> "$REPORT_FILE"

exit 0
