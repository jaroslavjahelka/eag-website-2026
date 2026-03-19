#!/usr/bin/env bash
set -euo pipefail

status=0

while IFS= read -r -d '' file; do
  dir="$(dirname "$file")"
  name="$(basename "$dir")"
  if [[ ! "$name" =~ ^[a-z0-9-]+$ ]]; then
    echo "Invalid skill directory name: $dir" >&2
    status=1
  fi
done < <(find .claude/skills -type f -name 'SKILL.md' -print0)

exit "$status"
