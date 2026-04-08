#!/bin/bash
# ============================================================
# phase-execute.sh — Phase 2+3: Execution + Review
# ============================================================
#
# Read as a sentence:
#   "Read the plan. For each step in the plan:
#    determine the agent (architect/developer/copywriter),
#    the agent reads its references and writes output directly into the project,
#    the reviewer checks the actual files in the project,
#    if the review fails, the agent fixes directly in the project,
#    until the review passes."
#
# Agents work directly on the project — no intermediate files, no variables.
# Written to disk: project changes (agents) and reviews (audit trail).
#
# Expects variables from run-task.sh:
#   TASK_NAME, TASK_DESCRIPTION, ROOT, SCRIPT_DIR
# ============================================================

log "→ Phase 2: Reading plan and extracting steps..."

PLAN="$ROOT/docs/plans/plan-$TASK_NAME.md"

# --- READ gate — plan must exist ---

PLAN_CONTENT=$(read_gate "$PLAN")

# --- Extract steps from the plan ---
# AI parses Implementation steps and returns them as a structured list

STEPS_JSON=$(claude --print \
  "Read this plan and extract the implementation steps.

PLAN:
$PLAN_CONTENT

For each step in the '## Implementation steps' section, return a JSON array.
Each step as an object:
{
  \"step\": 1,
  \"description\": \"what needs to be done\",
  \"agent\": \"architect | developer | copywriter\"
}

Return ONLY a valid JSON array, nothing else. No markdown, no comments.
If a step has no clear agent, use 'developer'.
")

log "  Extracted steps:"
echo "$STEPS_JSON" | head -20

# --- Validation: is it valid JSON? ---

if ! echo "$STEPS_JSON" | python3 -m json.tool > /dev/null 2>&1; then
  log "GATE FAIL: AI did not return valid JSON for steps"
  log "Output: $STEPS_JSON"
  exit 1
fi

# --- Prepare output directory for reviews ---

mkdir -p "$ROOT/docs/reviews"

# --- For each step: execute + review ---

STEP_COUNT=$(echo "$STEPS_JSON" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))")

# Context from previous steps — passed to the next agent as handoff
PREVIOUS_STEP_CONTEXT=""

for i in $(seq 0 $((STEP_COUNT - 1))); do
  # Parse step
  STEP_NUM=$(echo "$STEPS_JSON" | python3 -c "import sys,json; s=json.load(sys.stdin)[$i]; print(s['step'])")
  STEP_DESC=$(echo "$STEPS_JSON" | python3 -c "import sys,json; s=json.load(sys.stdin)[$i]; print(s['description'])")
  STEP_AGENT=$(echo "$STEPS_JSON" | python3 -c "import sys,json; s=json.load(sys.stdin)[$i]; print(s['agent'])")

  log ""
  log "--- Step $STEP_NUM: $STEP_DESC ---"
  log "    Agent: $STEP_AGENT"

  # --- Determine review type based on agent ---
  case "$STEP_AGENT" in
    architect)  REVIEW_TYPE="design-review" ; RULES_TYPE="design" ;;
    developer)  REVIEW_TYPE="code-review"   ; RULES_TYPE="code"   ;;
    copywriter) REVIEW_TYPE="copy-review"   ; RULES_TYPE="copy"   ;;
    *)          REVIEW_TYPE="code-review"   ; RULES_TYPE="code"   ;;
  esac

  # --- READ gate — agent must read its references ---

  AGENT_DEF=$(read_gate "$ROOT/agents/$STEP_AGENT.md")
  log "    READ: agents/$STEP_AGENT.md"

  RULES=$(collect_rules "$RULES_TYPE")
  log "    READ: rules for $RULES_TYPE"

  # --- Build handoff context from previous steps ---
  # If a previous step exists (e.g. Architect → Developer),
  # its approved output is passed as context.

  HANDOFF_SECTION=""
  if [ -n "$PREVIOUS_STEP_CONTEXT" ]; then
    HANDOFF_SECTION="
OUTPUT FROM THE PREVIOUS STEP (approved by review):
$PREVIOUS_STEP_CONTEXT

Your step builds on this output. Respect the decisions made in it."
  fi

  # --- PRODUCE — agent works directly on the project ---
  # The agent has full access to tools (Read, Write, Edit, Glob, Grep).
  # It writes files directly into the project — no intermediate files.

  log "    PRODUCE: agent working on the project..."

  claude -p \
    "You are the $STEP_AGENT agent. Your task is to execute this step from the plan.
You work directly on the project — write files to the correct locations.

TASK CONTEXT:
$TASK_DESCRIPTION

FULL PLAN:
$PLAN_CONTENT

YOUR STEP:
Step $STEP_NUM: $STEP_DESC
$HANDOFF_SECTION

YOUR INSTRUCTIONS:
$AGENT_DEF

RULES YOU MUST FOLLOW:
$RULES

Execute this step. Write the output directly into the project at the correct location.
At the end, print a SUMMARY of what you created — list of files and key decisions.
" --allowedTools "Read,Write,Edit,Glob,Grep,Bash" \
  2>&1 | tee "$ROOT/docs/reviews/execution-log-step-${STEP_NUM}.txt"

  log "    PRODUCE: agent finished working on the project"

  # --- HANDOFF → Review loop ---

  log "    HANDOFF: project → reviewer"

  # Pass to review (phase-review.sh expects these variables)
  REVIEW_STEP_NAME="step-${STEP_NUM}"
  source "$SCRIPT_DIR/phase-review.sh"

  # --- Save context from this step for the next step ---
  # The execution log contains what the agent did — passed to the next agent.
  PREVIOUS_STEP_CONTEXT=$(cat "$ROOT/docs/reviews/execution-log-step-${STEP_NUM}.txt" 2>/dev/null || echo "")

  log "--- Step $STEP_NUM: Complete ---"
done

log ""
log "→ Phase 2+3: All steps complete"
