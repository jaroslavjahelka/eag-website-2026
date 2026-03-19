# Professional UI Builder

This repository defines a production-grade operating system for Claude Code when working on UI.
Canonical policy lives in [governance/](governance/).
Domain knowledge lives in [docs/](docs/).
[.claude/](.claude/) exists only as the runtime adapter layer.

## Read order

1. [docs/INDEX.md](docs/INDEX.md)
2. [governance/authority-order.md](governance/authority-order.md)
3. [governance/source-of-truth-map.md](governance/source-of-truth-map.md)
4. [repository-map.json](repository-map.json)
5. the most relevant system doc in [docs/design-system/](docs/design-system/), [docs/interaction/](docs/interaction/), [docs/components/](docs/components/), [docs/content/](docs/content/), or [docs/ai/](docs/ai/)
6. the matching workflow in [docs/workflows/](docs/workflows/)
7. the matching skill in [.claude/skills/](.claude/skills/)
8. the relevant agent in [.claude/agents/](.claude/agents/) when planning or review is needed

## Imported canonical docs

@governance/authority-order.md
@governance/engineering-governance.md
@governance/definition-of-done.md
@docs/principles/professional-ui-definition.md
@docs/design-system/token-architecture.md
@docs/components/component-architecture.md
@docs/interaction/state-model.md

## Core execution graph

1. Read authority and source-of-truth documents first.
2. Classify the task as [edit-existing-ui](docs/workflows/edit-existing-ui.md), [create-page](docs/workflows/create-page.md), [create-component](docs/workflows/create-component.md), [run-ui-audit](docs/workflows/run-ui-audit.md), or [propose-change](docs/workflows/propose-change.md).
3. Read the matching workflow from [docs/workflows/](docs/workflows/).
4. Use [ui-architect](.claude/agents/ui-architect.md) when the task changes structure, spans multiple files, or introduces a new flow.
5. Use [ui-refactorer](.claude/agents/ui-refactorer.md) when the task is a bounded refactor of existing UI.
6. Implement the smallest production-safe change.
7. Review design-system alignment with [design-system-guardian](.claude/agents/design-system-guardian.md).
8. Review accessibility with [accessibility-reviewer](.claude/agents/accessibility-reviewer.md).
9. Review engineering quality with [code-reviewer](.claude/agents/code-reviewer.md) when code changed.
10. Run validation before finalizing.

## Working stance

- treat UI work as production work by default
- prefer modifying real repository code over detached prototypes
- reuse the design system before adding new primitives
- treat states, accessibility, and responsive behavior as correctness
- keep changes small, composable, and reviewable

## Protected areas

These paths are governance-critical and should only be edited when the task explicitly includes operating-system maintenance:

- [governance/](governance/)
- [docs/](docs/)
- [.claude/settings.json](.claude/settings.json)
- [.claude/hooks/](.claude/hooks/)
- [.claude/agents/](.claude/agents/)
- [.claude/skills/](.claude/skills/)
- [scripts/](scripts/)
- [evals/](evals/)
