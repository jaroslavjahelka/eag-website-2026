#!/usr/bin/env bash
set -euo pipefail

BASE_REF="${1:-HEAD~1}"
TARGET_REF="${2:-HEAD}"

echo "Changed UI-related files between ${BASE_REF} and ${TARGET_REF}:"
git diff --name-only "$BASE_REF" "$TARGET_REF" | grep -E '(^src/|^app/|components|pages|tokens|styles)' || true
