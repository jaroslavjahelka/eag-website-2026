#!/usr/bin/env bash
set -euo pipefail

status=0

if ! grep -q 'governance/authority-order.md' CLAUDE.md; then
  echo 'CLAUDE.md must import governance/authority-order.md.' >&2
  status=1
fi

if ! grep -q 'governance/source-of-truth-map.md' CLAUDE.md; then
  echo 'CLAUDE.md must reference governance/source-of-truth-map.md.' >&2
  status=1
fi

if ! grep -q 'repository-map.json' CLAUDE.md; then
  echo 'CLAUDE.md must reference repository-map.json.' >&2
  status=1
fi

if ! grep -q 'governance/source-of-truth-map.md' docs/INDEX.md; then
  echo 'docs/INDEX.md must link to governance/source-of-truth-map.md.' >&2
  status=1
fi

if ! grep -q 'governance/authority-order.md' docs/INDEX.md; then
  echo 'docs/INDEX.md must link to governance/authority-order.md.' >&2
  status=1
fi

exit "$status"
