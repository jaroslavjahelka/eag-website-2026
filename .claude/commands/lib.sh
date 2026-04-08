#!/bin/bash
# ============================================================
# lib.sh — Shared gate functions for deterministic orchestration
# ============================================================
#
# Three gate types:
#   read_gate    — "Read the file. If it does not exist, stop."
#   produce_gate — "Verify the file was created and contains required sections."
#   review_passed — "Check that the review passed."
#
# Utilities:
#   collect_rules — "Collect all rules from docs and skills."
#   log           — "Print a timestamped message."
# ============================================================

# Paths — resolved relative to this file
LIB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$LIB_DIR/.." && pwd)"

# --- Logging ---

log() {
  echo "[$(date +%H:%M:%S)] $*"
}

# --- READ gate ---
# "Read the file. If it does not exist, stop."
#
# Usage: CONTENT=$(read_gate "path/to/file.md")

read_gate() {
  local file="$1"

  if [ ! -f "$file" ]; then
    log "GATE FAIL: file does not exist — $file"
    exit 1
  fi

  cat "$file"
}

# --- PRODUCE gate ---
# "Verify the file was created and contains required sections."
#
# Usage: produce_gate "path/to/file.md" "Section 1" "Section 2" ...

produce_gate() {
  local file="$1"
  shift
  local sections=("$@")

  if [ ! -f "$file" ]; then
    log "GATE FAIL: file was not created — $file"
    return 1
  fi

  if [ ! -s "$file" ]; then
    log "GATE FAIL: file is empty — $file"
    return 1
  fi

  for s in "${sections[@]}"; do
    if ! grep -q "## $s" "$file"; then
      log "GATE FAIL: missing section '## $s' — $file"
      return 1
    fi
  done

  log "GATE PASS: $file"
}

# --- REVIEW gate ---
# "Check that the review has a PASS verdict."
#
# Usage: if review_passed "path/to/review.md"; then ...

review_passed() {
  local review="$1"

  # File must exist
  [ -f "$review" ] || return 1

  # Must contain ## Verdict
  grep -q "## Verdict" "$review" || return 1

  # Below ## Verdict there must be the word "pass" (case insensitive)
  grep -A2 "## Verdict" "$review" | grep -qi "pass"
}

# --- COLLECT RULES ---
# "Collect all rules from docs and skills for a given review type."
#
# Usage: RULES=$(collect_rules "design")
#        RULES=$(collect_rules "code")
#        RULES=$(collect_rules "copy")

collect_rules() {
  local type="$1"
  local rules=""

  # Rules from docs/
  local docs_dir="$ROOT/docs/$type"
  if [ -d "$docs_dir" ]; then
    for doc in "$docs_dir"/*.md; do
      [ -f "$doc" ] || continue
      rules="$rules
--- $(basename "$doc") ---
$(cat "$doc")
"
    done

    # Subdirectories (state-management/, data-format/, examples/)
    for subdir in "$docs_dir"/*/; do
      [ -d "$subdir" ] || continue
      for doc in "$subdir"*.md; do
        [ -f "$doc" ] || continue
        rules="$rules
--- $(basename "$(dirname "$doc")")/$(basename "$doc") ---
$(cat "$doc")
"
      done
    done
  fi

  # Rules from governance (always relevant)
  for gov in "$ROOT/governance"/*.md; do
    [ -f "$gov" ] || continue
    [ "$(basename "$gov")" = "INDEX.md" ] && continue
    rules="$rules
--- governance/$(basename "$gov") ---
$(cat "$gov")
"
  done

  # Relevant skills
  for skill in "$ROOT/skills"/*/SKILL.md; do
    [ -f "$skill" ] || continue
    rules="$rules
--- skills/$(basename "$(dirname "$skill")")/SKILL ---
$(cat "$skill")
"
  done

  echo "$rules"
}
