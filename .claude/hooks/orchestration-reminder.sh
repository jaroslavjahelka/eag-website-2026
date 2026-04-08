#!/bin/bash
# ============================================================
# orchestration-reminder.sh — UserPromptSubmit hook
# ============================================================
# Injects orchestration process reminder into every user prompt.
# Claude will use this context for non-trivial tasks and ignore
# it for simple questions.
# ============================================================

# Read the user's message from stdin
INPUT=$(cat)

# Extract the user's prompt text (if available)
PROMPT=$(echo "$INPUT" | jq -r '.prompt // ""' 2>/dev/null)

# Always inject the orchestration reminder as additional context
cat <<'HOOK_OUTPUT'
{
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": "ORCHESTRATION ENFORCEMENT: If this message describes a non-trivial task (new feature, component, page, multi-file change, redesign, refactor), you MUST follow the full orchestration process:\n\n1. READ gates: Read all governance files (.claude/governance/*.md), repository-map.json, and design-process.md BEFORE planning\n2. PLAN: Create plan at .claude/docs/plans/plan-[task].md with all required sections\n3. EXECUTE + REVIEW: For EACH step in the plan:\n   a. Spawn the correct agent (architect/developer/copywriter)\n   b. After the agent completes, spawn the reviewer agent\n   c. Save review to .claude/docs/reviews/review-[step]-v[N].md\n   d. If review fails, fix and re-review until it passes\n4. NEVER skip the review loop\n5. All paths use .claude/ prefix (plans in .claude/docs/plans/, reviews in .claude/docs/reviews/)\n\nIf the message is a simple question, config change, or trivial fix, proceed normally without orchestration."
  }
}
HOOK_OUTPUT
