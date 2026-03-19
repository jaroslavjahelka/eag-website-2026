#!/usr/bin/env bash
set -euo pipefail

bash scripts/check-authority-links.sh
bash scripts/check-doc-structure.sh
bash scripts/check-skill-naming.sh
bash scripts/check-runtime-integrity.sh
bash scripts/check-repository-map.sh
bash scripts/check-ui-token-usage.sh
bash scripts/check-markdown-references.sh
