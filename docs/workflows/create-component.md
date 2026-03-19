# Workflow — Create Component

## Goal

Determine whether a new shared component is justified and how it should be shaped.

## Sequence

1. inspect existing components and variants
2. read [docs/components/component-file-architecture.md](../../docs/components/component-file-architecture.md)
3. read [docs/components/component-architecture.md](../../docs/components/component-architecture.md)
4. use [ui-architect](../../.claude/agents/ui-architect.md) when page or flow context affects the component shape
5. document why reuse, composition, or a variant is insufficient
6. define the semantic purpose, states, slots, and likely reuse contexts
7. review the proposal with [design-system-guardian](../../.claude/agents/design-system-guardian.md)
8. if the component includes interaction complexity, review it with [accessibility-reviewer](../../.claude/agents/accessibility-reviewer.md)
9. implement only if the abstraction is clearer than repetition
10. use [code-reviewer](../../.claude/agents/code-reviewer.md) when code changed
