#!/usr/bin/env bash
set -euo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$ROOT"

bash scripts/check-skill-naming.sh
bash scripts/check-doc-structure.sh
bash scripts/check-authority-links.sh
bash scripts/check-runtime-integrity.sh
bash scripts/check-repository-map.sh
bash scripts/check-markdown-references.sh
