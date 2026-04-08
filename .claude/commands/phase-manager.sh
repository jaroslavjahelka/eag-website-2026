#!/bin/bash
# ============================================================
# phase-manager.sh — Phase 1: Planning
# ============================================================
#
# Read as a sentence:
#   "The Manager must read governance, the map, and the design process.
#    Then it creates a plan. The plan must contain all required sections.
#    Self-validation must pass. Otherwise it stops."
#
# Expects variables from run-task.sh:
#   TASK_NAME, TASK_DESCRIPTION, ROOT, SCRIPT_DIR
# ============================================================

log "→ Phase 1: Reading required references..."

# --- READ gates — required reading before planning ---

GOVERNANCE=$(read_gate "$ROOT/governance/authority-order.md")
log "  READ: authority-order.md"

TECH_STACK=$(read_gate "$ROOT/governance/technical-stack.md")
log "  READ: technical-stack.md"

ENG_PRINCIPLES=$(read_gate "$ROOT/governance/engineering-principles.md")
log "  READ: engineering-principles.md"

DESIGN_PRINCIPLES=$(read_gate "$ROOT/governance/design-principles.md")
log "  READ: design-principles.md"

MAP=$(read_gate "$ROOT/repository-map.json")
log "  READ: repository-map.json"

PROCESS=$(read_gate "$SCRIPT_DIR/design-process.md")
log "  READ: design-process.md"

MANAGER_AGENT=$(read_gate "$ROOT/agents/manager.md")
log "  READ: manager.md"

# --- PRODUCE — AI creates the plan ---

log "→ Phase 1: Manager is creating the plan..."

PLAN="$ROOT/docs/plans/plan-$TASK_NAME.md"

# Extract the output format from manager.md
OUTPUT_FORMAT=$(sed -n '/^## Output format/,$ p' "$ROOT/agents/manager.md")

claude --print \
  "You are the Manager agent. Your task is to create a plan for this task.

TASK: $TASK_DESCRIPTION

You have read these required references:

--- authority-order.md ---
$GOVERNANCE

--- technical-stack.md ---
$TECH_STACK

--- engineering-principles.md ---
$ENG_PRINCIPLES

--- design-principles.md ---
$DESIGN_PRINCIPLES

--- repository-map.json ---
$MAP

--- design-process.md ---
$PROCESS

INSTRUCTIONS:
$(sed -n '/^## Sequence/,/^## Acceptance criteria/ p' "$ROOT/agents/manager.md")

ACCEPTANCE CRITERIA:
$(sed -n '/^## Acceptance criteria/,/^## Output format/ p' "$ROOT/agents/manager.md")

AGENT ASSIGNMENT RULES — follow strictly:

architect — ALWAYS when the step requires UI decisions:
  - layout, composition, component structure
  - subcomponent selection and their responsibilities
  - visual hierarchy, spacing, responsiveness
  - any new component or page starts with the Architect

developer — ALWAYS when the step requires writing code:
  - implementation based on the Architect's design
  - logic, state management, API integration
  - accessibility in code (aria, keyboard, semantics)

copywriter — ALWAYS when the step requires writing text:
  - microcopy, documentation, marketing, legal

TYPICAL FLOW for a new component or page:
  1. architect designs the structure and composition
  2. developer implements code based on the design
  3. (optionally) copywriter adds the text

If a step depends on another step, record it in the Dependencies section.
An Architect step ALWAYS precedes Developer steps for new components and pages.

Create the plan exactly in this format (nothing else, no comments):

$OUTPUT_FORMAT
" > "$PLAN"

log "  PRODUCE: $PLAN"

# --- PRODUCE gate — plan must contain required sections ---

produce_gate "$PLAN" \
  "Context summary" \
  "Scope" \
  "Implementation steps" \
  "Dependencies" \
  "Self-validation report" \
  "Overall verdict"

# --- Verdict gate — self-validation must be "ready" ---

if ! grep -qi "ready" "$PLAN"; then
  log "GATE FAIL: plan is not 'ready' — stopping"
  log "Open $PLAN and check the self-validation report"
  exit 1
fi

log "  GATE PASS: plan is ready"
log "→ Phase 1: Complete"
