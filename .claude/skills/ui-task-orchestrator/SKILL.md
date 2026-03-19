---
name: ui-task-orchestrator
description: Orchestrate non-trivial UI tasks that touch multiple files, require planning, or need structural decisions before implementation.
---

# UI Task Orchestrator

## Use this skill when

- the task affects multiple UI files
- page structure needs to change
- a new flow or screen is being built
- implementation must be planned before editing

## Sequence

1. Read [governance/authority-order.md](../../../governance/authority-order.md).
2. Read [governance/source-of-truth-map.md](../../../governance/source-of-truth-map.md).
3. Classify the task: [edit-existing-ui](../../../docs/workflows/edit-existing-ui.md), [create-page](../../../docs/workflows/create-page.md), [create-component](../../../docs/workflows/create-component.md), [run-ui-audit](../../../docs/workflows/run-ui-audit.md), or [propose-change](../../../docs/workflows/propose-change.md).
4. Read the matching workflow in [docs/workflows/](../../../docs/workflows/).
5. If the task is structural, multi-file, or introduces a new screen or flow, use [ui-architect](../../agents/ui-architect.md).
6. If the task is primarily a bounded restructure of existing UI code, use [ui-refactorer](../../agents/ui-refactorer.md).
7. Produce a short implementation plan when the task is non-trivial.
8. Implement the smallest production-safe solution.
9. Review the result with [design-system-guardian](../../agents/design-system-guardian.md).
10. Review the result with [accessibility-reviewer](../../agents/accessibility-reviewer.md).
11. Use [code-reviewer](../../agents/code-reviewer.md) when code changed.
12. Reconcile blockers before final output.

## Output requirements

- stay repository-native
- justify any new component creation
- explicitly consider states and responsive behavior
