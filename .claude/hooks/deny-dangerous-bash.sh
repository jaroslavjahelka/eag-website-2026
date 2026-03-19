#!/usr/bin/env bash
set -euo pipefail

INPUT="$(cat)"
CMD="$(printf '%s' "$INPUT" | python -c 'import json,sys
raw=sys.stdin.read()
try:
    data=json.loads(raw)
    print(data.get("tool_input",{}).get("command",""))
except Exception:
    print("")
')"

if echo "$CMD" | grep -Eqi '(^|[[:space:]])(rm[[:space:]]+-rf|mkfs|dd[[:space:]]+if=|shutdown|reboot)([[:space:]]|$)'; then
  python -c 'import json; print(json.dumps({"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Denied dangerous shell command by policy."}}))'
  exit 0
fi

if echo "$CMD" | grep -Eqi '(curl|wget).*[|>].*(sh|bash)'; then
  python -c 'import json; print(json.dumps({"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"Denied remote script execution by policy."}}))'
  exit 0
fi

exit 0
