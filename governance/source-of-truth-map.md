# Source of Truth Map

This document tells the model where to look before making assumptions.
It is the human-readable path guide.
The machine-readable equivalent is [repository-map.json](../repository-map.json).

## Canonical operating sources

- execution entry point: [CLAUDE.md](../CLAUDE.md)
- canonical governance: [governance/](../governance/)
- machine-readable registry: [repository-map.json](../repository-map.json)
- domain knowledge: [docs/](../docs/)
- runtime settings: [.claude/settings.json](../.claude/settings.json)
- runtime adapters: [.claude/agents/](../.claude/agents/), [.claude/skills/](../.claude/skills/), [.claude/hooks/](../.claude/hooks/)
- validation scripts: [scripts/](../scripts/)
- evaluation assets: [evals/](../evals/)

## Product UI path policy

The repository must not rely on placeholder prose such as "src/app or app".
Product UI locations must be declared in [repository-map.json](../repository-map.json) under `productUi`.
Validation scripts read that file directly.

## Interpretation rule

If narrative documentation and actual implementation disagree, treat the implementation as authoritative and update both this file and [repository-map.json](../repository-map.json).
