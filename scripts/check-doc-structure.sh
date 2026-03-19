#!/usr/bin/env bash
set -euo pipefail

required=(
  docs/INDEX.md
  governance/authority-order.md
  governance/engineering-governance.md
  governance/change-control.md
  governance/definition-of-done.md
  governance/source-of-truth-map.md
  governance/repo-profile.md
  repository-map.json
  docs/principles/design-principles.md
  docs/principles/professional-ui-definition.md
  docs/design-system/token-architecture.md
  docs/interaction/state-model.md
  docs/components/component-architecture.md
  docs/content/content-guidelines.md
  docs/ai/ai-ui-generation-rules.md
  docs/workflows/references/technical-stack.md
)

status=0
for file in "${required[@]}"; do
  if [ ! -f "$file" ]; then
    echo "Missing canonical doc: $file" >&2
    status=1
  fi
done

if [ -d ".claude/rules" ]; then
  echo ".claude/rules should not exist; canonical policy lives in governance/." >&2
  status=1
fi

if [ -d "docs/governance" ]; then
  echo "docs/governance should not exist; governance is canonical at the repository root." >&2
  status=1
fi

exit "$status"
