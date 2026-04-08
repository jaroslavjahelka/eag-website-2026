#!/bin/bash
# ============================================================
# run-task.sh — Main orchestrator
# ============================================================
#
# Read as a sentence:
#   "For a given task:
#    first the Manager creates a plan,
#    then for each step in the plan run the agent and review,
#    finally verify that all reviews passed."
#
# Usage:
#   ./run-task.sh "task-name" "Description of what needs to be done"
#
# Example:
#   ./run-task.sh "hero-redesign" "Redesign the hero section into a two-column layout"
# ============================================================

set -euo pipefail

# --- Validate inputs ---

if [ $# -lt 2 ]; then
  echo "Usage: ./run-task.sh <task-name> <task-description>"
  echo "Example: ./run-task.sh hero-redesign 'Redesign the hero section'"
  exit 1
fi

TASK_NAME="$1"
TASK_DESCRIPTION="$2"

# --- Load shared functions ---

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/lib.sh"

log "=== START: $TASK_NAME ==="
log "Description: $TASK_DESCRIPTION"

# --- Phase 1: Manager creates the plan ---

log ""
log "=== PHASE 1: MANAGER ==="
source "$SCRIPT_DIR/phase-manager.sh"
# → output: $PLAN (docs/plans/plan-$TASK_NAME.md)

# --- Phase 2+3: For each step in the plan, run the agent and review ---

log ""
log "=== PHASE 2+3: EXECUTION + REVIEW ==="
source "$SCRIPT_DIR/phase-execute.sh"

# --- Done ---

log ""
log "=== COMPLETED: $TASK_NAME ==="
