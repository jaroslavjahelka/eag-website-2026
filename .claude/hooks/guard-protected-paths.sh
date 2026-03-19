#!/usr/bin/env bash
set -euo pipefail

# Read the hook JSON payload from stdin first, before anything else.
INPUT="$(cat)"

# Write the Python program to a temp file so stdin remains available
# for the JSON payload (a heredoc would consume stdin instead).
PYFILE="$(mktemp)"
trap 'rm -f "$PYFILE"' EXIT

cat > "$PYFILE" << 'PYEOF'
import json
import os
import sys

try:
    data = json.loads(sys.stdin.read())
except Exception:
    raise SystemExit(0)

# Collect every path-like value from the tool input.
candidates = []
for key in ("file_path", "path"):
    value = data.get("tool_input", {}).get(key)
    if isinstance(value, str):
        candidates.append(value)
paths = data.get("tool_input", {}).get("paths")
if isinstance(paths, list):
    candidates.extend([x for x in paths if isinstance(x, str)])

if not candidates:
    raise SystemExit(0)

# Normalise every candidate to a project-relative path.
# Claude Code may send absolute paths rooted at the project directory.
project_dir = os.environ.get("CLAUDE_PROJECT_DIR", "")
normalised = []
for c in candidates:
    p = c
    # Strip leading absolute project dir prefix if present.
    if project_dir and os.path.isabs(p):
        try:
            p = os.path.relpath(p, project_dir)
        except ValueError:
            pass
    # Strip any leading "./" for consistent matching.
    if p.startswith("./"):
        p = p[2:]
    normalised.append(p)

protected_prefixes = (
    "governance/",
    "docs/",
    ".claude/settings.json",
    ".claude/hooks/",
    ".claude/agents/",
    ".claude/skills/",
    "scripts/",
    "evals/",
)

protected_exact = (
    ".claude/settings.json",
)

for candidate in normalised:
    matched = candidate in protected_exact or candidate.startswith(protected_prefixes)
    if matched:
        print(json.dumps({
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "deny",
                "permissionDecisionReason": (
                    "Protected path touched: " + candidate + ". "
                    "Blocked: this path is governance-protected. "
                    "To modify it, the task must explicitly target "
                    "operating-system maintenance or governance work."
                )
            }
        }))
        raise SystemExit(0)
PYEOF

printf '%s' "$INPUT" | python3 "$PYFILE"
