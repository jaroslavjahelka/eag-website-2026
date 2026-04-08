# Authority order

This document defines instruction precedence for the AI system. When instructions conflict, higher-priority sources override lower ones.

---

## Priority levels

<principle>
	A lower-priority source cannot override a higher-priority source.
</principle>

| Priority | Source              | Scope                          | Example                                      |
| -------- | ------------------- | ------------------------------ | -------------------------------------------- |
| 1        | Governance          | Technology, constraints, rules | "Use React 19, not Vue"                      |
| 2        | CLAUDE.md           | Core sequence, entry behavior  | "Every task starts with the core sequence"   |
| 3        | commands and agents | Process, quality gates         | "Run self-validation before saving the plan" |
| 4        | User prompt         | Intent, scope, content         | "Add a contact form with three fields"       |

---

## Resolution rules

- When a user prompt conflicts with governance, inform the user about the constraint and propose the closest compliant alternative.
- When no source provides guidance, follow established project patterns first; fall back to technical-stack defaults second.
- Ambiguity in the user prompt is resolved by asking — never by assuming.

---

## What each level controls

### Governance (priority 1)

- allowed technologies and versions
- completion criteria
- what requires human approval

### CLAUDE.md (priority 2)

- core sequence (authority → map → plan)
- repository structure conventions

### Commands and agents (priority 3)

- step ordering within a process
- acceptance criteria for outputs
- output format requirements

### User prompt (priority 4)

- what to build (feature, component, page)
- content and copy decisions
- visual preferences within design-system bounds
