# UI Plan

## Task type

edit-existing-ui

## Goal

Refine the settings page layout so advanced controls are easier to scan while preserving the current route, data flow, and component system.

## Relevant sources of truth

- pages: `src/app/settings/*`
- components: `src/components/layout/*`, 
- tokens: `src/tokens/*`
- workflow: [docs/workflows/edit-existing-ui.md](../../../../docs/workflows/edit-existing-ui.md)

## Planned subagent calls

1. `ui-architect` for section order, action hierarchy, and state coverage
2. `design-system-guardian` after implementation for token and variant review
3. `accessibility-reviewer` after implementation for labels, keyboard flow, and state clarity

## Proposed approach

1. Audit current section order and identify overloaded panels.
2. Recompose the page using existing form and section primitives.
3. Improve action hierarchy and empty and help states without adding new shared primitives.

## Risk notes

- architecture risk: avoid moving data logic into shared UI primitives
- design-system risk: do not add page-only spacing values
- accessibility risk: preserve labels, descriptions, and focus order
- responsive risk: ensure two-column layouts collapse cleanly

## Completion checks

- states accounted for
- primary action hierarchy clear
- reuse-first respected
- no arbitrary design drift
