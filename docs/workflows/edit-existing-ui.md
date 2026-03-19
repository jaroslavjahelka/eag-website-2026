# Workflow — Edit Existing UI

## Goal

Improve or change existing UI while preserving repository patterns.

## Sequence

1. identify the current page or component and nearby patterns
2. check [governance/source-of-truth-map.md](../../governance/source-of-truth-map.md) for design-system and code locations
3. read the most relevant system docs for the task
4. if the change is structural or touches multiple files, use [ui-architect](../../.claude/agents/ui-architect.md)
5. if the main problem is duplication, unclear boundaries, or bloated component logic, use [ui-refactorer](../../.claude/agents/ui-refactorer.md)
6. change the smallest set of files required
7. review the result with [design-system-guardian](../../.claude/agents/design-system-guardian.md)
8. review the result with [accessibility-reviewer](../../.claude/agents/accessibility-reviewer.md)
9. use [code-reviewer](../../.claude/agents/code-reviewer.md) when code changed
10. validate states, hierarchy, responsive behavior, and definition of done
