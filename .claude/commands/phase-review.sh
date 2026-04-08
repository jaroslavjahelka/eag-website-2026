#!/bin/bash
# ============================================================
# phase-review.sh — Phase 3: Review loop (until it passes)
# ============================================================
#
# Read as a sentence:
#   "The Reviewer reads rules from skills and docs.
#    It checks the actual files in the project against the rules.
#    If FAIL, the agent fixes directly in the project and the reviewer checks again.
#    This repeats until it passes."
#
# Both the reviewer and the agent work directly on the project.
# Only the review is written to disk (audit trail in docs/reviews/).
#
# Expects variables from phase-execute.sh:
#   REVIEW_TYPE       — design-review | code-review | copy-review
#   STEP_AGENT        — architect | developer | copywriter
#   STEP_NUM          — step number
#   STEP_DESC         — step description
#   RULES_TYPE        — design | code | copy
#   RULES             — collected rules (from collect_rules)
#   REVIEW_STEP_NAME  — name for the review file
#   PLAN_CONTENT      — full plan (context)
#   ROOT, SCRIPT_DIR
# ============================================================

ITERATION=0

# --- READ gate — read the review command ---

REVIEW_COMMAND=$(read_gate "$SCRIPT_DIR/$REVIEW_TYPE.md")
log "    READ: $REVIEW_TYPE.md"

# --- READ gate — read the reviewer agent definition ---

REVIEWER_DEF=$(read_gate "$ROOT/agents/reviewer.md")
log "    READ: reviewer.md"

# --- REVIEW LOOP — repeat until review passes ---

while true; do
  ITERATION=$((ITERATION + 1))
  REVIEW_FILE="$ROOT/docs/reviews/review-${REVIEW_STEP_NAME}-v${ITERATION}.md"

  log "    --- Review iteration $ITERATION ---"

  # --- PRODUCE — reviewer checks the actual project state ---
  # The reviewer has read access to files — it can inspect what the agent created.

  claude --print \
    "You are the Reviewer agent. Check the result of the work in the project.

YOUR PROCEDURE:
$REVIEW_COMMAND

YOUR INSTRUCTIONS:
$REVIEWER_DEF

WHAT WAS THE TASK (step from the plan):
Step $STEP_NUM: $STEP_DESC

PLAN FOR CONTEXT:
$PLAN_CONTENT

RULES (from skills and docs — check against EACH one):
$RULES

Inspect the project files related to this step.
For EACH rule that the result violates, create a finding.
If the result satisfies all rules, the verdict is pass.

Return the review EXACTLY in this format (nothing else):

## Verdict

pass | fail

## Scope

design | code | copy

## Summary

One short paragraph explaining the review result.

## Findings

For each finding use this format:

- severity: critical | major | minor
- title: short issue name
- problem: what is wrong
- impact: why it matters
- required change: exact fix

If no findings, write 'none'.

## Missing checks

List anything that could not be reviewed because of missing context.
Use 'none' if everything was reviewed.

## Approval

approved | not-approved
" --allowedTools "Read,Glob,Grep" \
  > "$REVIEW_FILE"

  log "    PRODUCE: $REVIEW_FILE"

  # --- PRODUCE gate — review must have the correct format ---

  produce_gate "$REVIEW_FILE" \
    "Verdict" \
    "Scope" \
    "Summary" \
    "Findings" \
    "Approval"

  # --- Decision: PASS or fix and try again ---

  if review_passed "$REVIEW_FILE"; then
    log "    REVIEW PASS (iteration $ITERATION)"
    break
  fi

  log "    REVIEW FAIL (iteration $ITERATION) — agent fixing in the project..."

  # --- HANDOFF — findings back to the agent to fix directly in the project ---

  REVIEW_FINDINGS=$(cat "$REVIEW_FILE")

  claude -p \
    "You are the $STEP_AGENT agent. Your review failed. Fix the issues directly in the project.

REVIEW WITH FINDINGS:
$REVIEW_FINDINGS

RULES (for reference — you must follow them):
$RULES

Fix the files in the project so they satisfy all findings.
At the end, print what you fixed.
" --allowedTools "Read,Write,Edit,Glob,Grep,Bash" \
  2>&1 | tee -a "$ROOT/docs/reviews/execution-log-step-${STEP_NUM}.txt"

  log "    Fixes applied in the project, sending back for review..."
done
