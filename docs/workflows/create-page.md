# Workflow — Create Page

## Goal

Create a new page using existing repository architecture and system language.

## Sequence

1. identify the route, feature, or page family this belongs to
2. find the closest existing page and pattern references
3. use [ui-architect](../../.claude/agents/ui-architect.md) to define structure, section order, action hierarchy, and state coverage
4. plan the page if the task is non-trivial
5. assemble the page from existing sections and components
6. if implementation reveals duplication or boundary problems, use [ui-refactorer](../../.claude/agents/ui-refactorer.md) before widening the solution
7. review with [design-system-guardian](../../.claude/agents/design-system-guardian.md)
8. review with [accessibility-reviewer](../../.claude/agents/accessibility-reviewer.md)
9. use [code-reviewer](../../.claude/agents/code-reviewer.md) when code changed
10. validate responsive behavior, repository fit, and definition of done
