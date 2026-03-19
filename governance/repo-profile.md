# Repository Profile

This file describes the repository in terms useful to the model.
It should stay factual and current.

## Purpose

A professional UI builder operating system for Claude Code.
The repository stores canonical governance, domain knowledge, workflows, skills, agents, hooks, validation scripts, and evaluation assets for production UI work.

## Layer model

- canonical governance — [governance/](../governance/)
- domain knowledge — [docs/](../docs/)
- machine-readable registry — [repository-map.json](../repository-map.json)
- execution entry point — [CLAUDE.md](../CLAUDE.md)
- runtime enforcement — [.claude/settings.json](../.claude/settings.json), [.claude/hooks/](../.claude/hooks/), [scripts/](../scripts/)
- execution adapters — [.claude/agents/](../.claude/agents/), [.claude/skills/](../.claude/skills/)
- evaluation — [evals/](../evals/)

## Operating philosophy

- production-first
- reuse-first
- design-system-first
- smallest-safe-change
- measurable quality

## Intended scale

The structure is designed for growth in large UI codebases.
Always-on context stays small.
Deeper knowledge, workflows, and validation live in dedicated documents.

## Canonical task types

- edit existing UI
- create page
- create component
- run UI audit
- propose governance or system change

## Technical stack reference

See [docs/workflows/references/technical-stack.md](../docs/workflows/references/technical-stack.md).
