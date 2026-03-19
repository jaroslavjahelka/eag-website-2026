# Authority Order

This document defines how the repository resolves overlapping guidance.
It is the canonical authority order for the system.

## Resolution order

1. hard enforcement from [.claude/settings.json](../.claude/settings.json) and hook decisions
2. [CLAUDE.md](../CLAUDE.md) as the execution entry point
3. [governance/](../governance/)
4. [repository-map.json](../repository-map.json)
5. [docs/principles/](../docs/principles/)
6. the relevant system docs in [docs/design-system/](../docs/design-system/), [docs/interaction/](../docs/interaction/), [docs/components/](../docs/components/), [docs/content/](../docs/content/), and [docs/ai/](../docs/ai/)
7. the relevant reusable patterns in [docs/patterns/](../docs/patterns/)
8. the relevant workflow in [docs/workflows/](../docs/workflows/)
9. execution adapters in [.claude/agents/](../.claude/agents/) and [.claude/skills/](../.claude/skills/)
10. nearby implementation conventions in the real product codebase
11. generic best practice

## Interpretation rules

- enforcement wins over prose
- governance wins over runtime adapters
- the machine-readable map wins over vague narrative path descriptions
- principles define intent
- systems define canonical models
- workflows define execution order
- agents and skills apply the system; they do not redefine it

## Single-governance rule

Policy must not be duplicated inside [.claude/](../.claude/).
[.claude/](../.claude/) exists only for runtime execution:

- settings
- hooks
- agents
- skills

Canonical policy lives in [governance/](../governance/).

## Reality rule

If real implementation and narrative docs diverge, treat the implementation as operational truth and update the governance or docs immediately.
