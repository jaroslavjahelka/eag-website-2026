# Professional UI Builder — Stable Core System

This repository is a production-oriented operating layer for AI-assisted UI work.
It is designed to make Claude Code behave like a disciplined product team: read the system, locate the real source of truth, choose the right workflow, implement the smallest safe change, and run review gates before completion.

## Design goals

- one canonical governance layer
- explicit authority order
- runtime adapters separated from policy
- machine-readable repository map for path discovery
- repeatable validation checks
- production-first UI execution

## Repository structure

- [governance/](governance/) — canonical policy, authority, completion criteria, operating rules, source-of-truth mapping
- [docs/](docs/) — domain knowledge for principles, design system, interaction, components, content, AI rules, patterns, and workflows
- [.claude/agents/](.claude/agents/) — specialist review and planning adapters
- [.claude/skills/](.claude/skills/) — reusable execution sequences
- [.claude/hooks/](.claude/hooks/) — runtime enforcement and validation hooks
- [.claude/settings.json](.claude/settings.json) — Claude Code permissions and hook wiring
- [scripts/](scripts/) — local validation harness
- [evals/](evals/) — golden tasks, rubrics, and reports
- [repository-map.json](repository-map.json) — machine-readable registry of important paths

## What was rebuilt

- moved governance into a single canonical root: [governance/](governance/)
- moved runtime hooks into a real hook layer: [.claude/hooks/](.claude/hooks/)
- removed broken hook wiring between settings and filesystem
- replaced placeholder source-of-truth guidance with a machine-readable map
- added runtime integrity checks for hook commands and registry paths
- restored missing references such as [docs/workflows/references/technical-stack.md](docs/workflows/references/technical-stack.md)
- fixed broken internal references in workflows and agents
- removed archive noise such as `.DS_Store`

## Local validation

Run the full validation harness from the repository root:

```bash
bash scripts/run-all-checks.sh
```

Run the evaluation harness:

```bash
bash scripts/run-golden-tasks.sh
```

## Operating model

1. Start with [CLAUDE.md](CLAUDE.md).
2. Resolve authority through [governance/authority-order.md](governance/authority-order.md).
3. Locate paths through [governance/source-of-truth-map.md](governance/source-of-truth-map.md) and [repository-map.json](repository-map.json).
4. Read the relevant workflow in [docs/workflows/](docs/workflows/).
5. Use agents and skills only as execution adapters.
6. Validate before completion.
