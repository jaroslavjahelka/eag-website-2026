# Workflow — Run UI Audit

## Goal

Produce a clear, prioritized assessment of UI quality and system fit.

## Sequence

1. identify the target files or screens
2. review system alignment with [design-system-guardian](../../.claude/agents/design-system-guardian.md)
3. review accessibility with [accessibility-reviewer](../../.claude/agents/accessibility-reviewer.md)
4. use [ui-architect](../../.claude/agents/ui-architect.md) when structure is part of the problem
5. review hierarchy, state coverage, responsiveness, and repository fit
6. separate blockers from improvements
7. explain root causes, not just symptoms
8. recommend the smallest changes with the highest impact
