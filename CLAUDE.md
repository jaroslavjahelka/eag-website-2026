# Webdesign Agents System

This repository defines a set of agents and sub-agents for building and maintaining websites and web applications in Claude Code. It establishes the structure, authority model, and execution flow required to design, build, and validate user interfaces consistently.

---

## Repository map

The complete repository structure is defined here: [Repository map](.claude/repository-map.json)

---

## Technical stack

For every task, use the technologies defined here: [Technical stack](.claude/governance/technical-stack.md)

---

## Sequence

Every non-trivial task (new feature, component, page, multi-file change, redesign, refactor) MUST follow this sequence — NO EXCEPTIONS:

1. resolve authority through [Authority order](.claude/governance/authority-order.md)
2. locate relevant paths through [Repository map](.claude/repository-map.json)
3. start planning with [Manager](.claude/agents/manager.md)
4. for EACH step in the plan: execute with the correct agent (architect/developer/copywriter)
5. after EACH step: run review via [Reviewer](.claude/agents/reviewer.md) — save to `.claude/docs/reviews/review-[step]-v[N].md`
6. if review fails → fix → re-review until pass
7. NEVER skip the review loop — every step gets reviewed before moving to the next

Trivial tasks (simple questions, config changes, single-line fixes) do not require orchestration.

---

## Deterministic orchestration

Bash scripts in `commands/` enforce step ordering, mandatory reference reading, and the review loop. Markdown files alongside them describe the same process for reading and understanding. Bash enforces WHEN, markdown describes WHAT.

### Process overview

```mermaid
flowchart TD
    START([run-task.sh]) --> V{Validate inputs}
    V -- missing arguments --> STOP_V([STOP])
    V -- ok --> LIB[source lib.sh]

    LIB --> M_READ

    subgraph PHASE_1 [Phase 1 — Manager]
        M_READ[READ gate\ngovernance + map + design-process]
        M_READ --> M_PRODUCE[PRODUCE\nManager creates the plan]
        M_PRODUCE --> M_GATE{PRODUCE gate\nplan has required sections?}
        M_GATE -- missing sections --> STOP_M([STOP])
        M_GATE -- ok --> M_READY{Verdict gate\nself-validation = ready?}
        M_READY -- no --> STOP_R([STOP])
        M_READY -- yes --> PLAN_OK[Plan saved\n.claude/docs/plans/plan-X.md]
    end

    PLAN_OK --> PARSE[AI extracts steps from plan as JSON]
    PARSE --> JSON_GATE{Valid JSON?}
    JSON_GATE -- no --> STOP_J([STOP])
    JSON_GATE -- yes --> LOOP

    subgraph LOOP [For each step in the plan]
        direction TD
        E_READ[READ gate\nagent definition + rules from docs/skills]
        E_READ --> E_PRODUCE[PRODUCE\nagent writes output directly into the project]
        E_PRODUCE --> HANDOFF[HANDOFF\nproject → reviewer]

        HANDOFF --> R_LOOP

        subgraph R_LOOP [Review loop — until it passes]
            direction TD
            R_READ[READ gate\nreview command + reviewer.md]
            R_READ --> R_PRODUCE[PRODUCE\nreviewer checks files in the project]
            R_PRODUCE --> R_FORMAT{PRODUCE gate\nreview has required format?}
            R_FORMAT -- missing sections --> STOP_RF([STOP])
            R_FORMAT -- ok --> R_VERDICT{Verdict = pass?}
            R_VERDICT -- pass --> R_DONE([Review PASS])
            R_VERDICT -- fail --> R_FIX[HANDOFF\nfindings → agent fixes in the project]
            R_FIX --> R_READ
        end
    end

    R_DONE --> NEXT{Next step in plan?}
    NEXT -- yes --> E_READ
    NEXT -- no --> DONE([COMPLETE])
```

### Agents

```mermaid
flowchart LR
    MANAGER[Manager\nplans] --> ARCHITECT[Architect\ndesigns UI]
    MANAGER --> DEVELOPER[Developer\nwrites code]
    MANAGER --> COPYWRITER[Copywriter\nwrites text]

    ARCHITECT --> REVIEWER[Reviewer\nvalidates]
    DEVELOPER --> REVIEWER
    COPYWRITER --> REVIEWER

    REVIEWER -- pass --> OUTPUT([Output])
    REVIEWER -- fail --> ARCHITECT
    REVIEWER -- fail --> DEVELOPER
    REVIEWER -- fail --> COPYWRITER
```

| Agent | When it enters | Required reading | What it produces |
|-------|----------------|------------------|------------------|
| Manager | Always first | governance, repository-map, design-process | Plan in `.claude/docs/plans/` |
| Architect | Design-type step | `.claude/docs/design/`, skills | Files directly in the project |
| Developer | Code-type step | `.claude/docs/code/`, skills | Files directly in the project |
| Copywriter | Copy-type step | `.claude/docs/copy/`, skills | Files directly in the project |
| Reviewer | After each step | review command, governance, docs, skills | Review in `.claude/docs/reviews/` |

### Three gate types

A gate is a deterministic check — it either passes or stops the process.

```mermaid
flowchart LR
    subgraph READ [READ gate]
        R_IN[Path to file] --> R_CHECK{Exists?}
        R_CHECK -- no --> R_STOP([STOP])
        R_CHECK -- yes --> R_OUT[Content passed to agent]
    end

    subgraph PRODUCE [PRODUCE gate]
        P_IN[Path + required sections] --> P_EXISTS{File created?}
        P_EXISTS -- no --> P_STOP([STOP])
        P_EXISTS -- yes --> P_SECTIONS{Contains all sections?}
        P_SECTIONS -- no --> P_STOP2([STOP])
        P_SECTIONS -- yes --> P_OUT[File valid]
    end

    subgraph HANDOFF [HANDOFF]
        H_IN[Output of agent A] --> H_PASS[Passed as input to agent B]
    end
```

### What is strict, what is flexible

```mermaid
flowchart TD
    subgraph STRICT [Strict — enforced by bash]
        S1[Phase ordering: Manager → Execute → Review]
        S2[READ gates: mandatory reference reading before each step]
        S3[PRODUCE gates: output must exist and have the correct format]
        S4[Review loop: every draft goes through review]
        S5[Review repeats until it passes]
        S6[Handoff: output of one agent is input to the next]
        S7[Plan must have 6 required sections and verdict ready]
    end

    subgraph FREE [Flexible — AI decides]
        F1[How the Manager structures the plan]
        F2[How the agent implements the draft]
        F3[What issues the Reviewer finds]
        F4[How the agent fixes the draft after review]
        F5[How many review iterations are needed]
    end
```

### Detailed phase breakdown

#### Phase 1 — Manager

```mermaid
flowchart TD
    R1[READ authority-order.md] --> R2[READ technical-stack.md]
    R2 --> R3[READ engineering-principles.md]
    R3 --> R4[READ design-principles.md]
    R4 --> R5[READ repository-map.json]
    R5 --> R6[READ design-process.md]
    R6 --> R7[READ manager.md]
    R7 --> AI{AI creates the plan\n— freedom in content —}
    AI --> G1{Plan has sections:\nContext summary, Scope,\nImplementation steps,\nDependencies,\nSelf-validation report,\nOverall verdict?}
    G1 -- no --> STOP([STOP])
    G1 -- yes --> G2{Self-validation = ready?}
    G2 -- no --> STOP
    G2 -- yes --> OK[.claude/docs/plans/plan-X.md]
```

Script: `commands/phase-manager.sh`

#### Phase 2 — Execution

```mermaid
flowchart TD
    PLAN[Read the plan] --> PARSE[AI extracts steps as JSON]
    PARSE --> VALID{Valid JSON?}
    VALID -- no --> STOP([STOP])
    VALID -- yes --> FOR

    subgraph FOR [For each step]
        AGENT_TYPE{Agent type?}
        AGENT_TYPE -- architect --> DESIGN_RULES[collect_rules design]
        AGENT_TYPE -- developer --> CODE_RULES[collect_rules code]
        AGENT_TYPE -- copywriter --> COPY_RULES[collect_rules copy]

        DESIGN_RULES --> READ_AGENT[READ agent definition]
        CODE_RULES --> READ_AGENT
        COPY_RULES --> READ_AGENT

        READ_AGENT --> DRAFT{AI writes output\ndirectly into project\n— freedom in content —}
        DRAFT --> REVIEW[→ Phase 3: Review]
    end
```

Script: `commands/phase-execute.sh`

#### Phase 3 — Review loop

```mermaid
flowchart TD
    START([Receive step for review]) --> READ_CMD[READ review command]
    READ_CMD --> READ_REV[READ reviewer.md]
    READ_REV --> REVIEW{AI checks files in the project\n— freedom in evaluation —}
    REVIEW --> FORMAT{Review has sections:\nVerdict, Scope, Summary,\nFindings, Approval?}
    FORMAT -- no --> STOP([STOP])
    FORMAT -- yes --> VERDICT{Verdict = pass?}
    VERDICT -- pass --> DONE([Review PASS\nreview saved: .claude/docs/reviews/])
    VERDICT -- fail --> FIX{AI fixes files\ndirectly in the project\n— freedom in fixing —}
    FIX --> REVIEW
```

Script: `commands/phase-review.sh`

### Orchestration files

| File | Purpose |
|------|---------|
| `commands/lib.sh` | Shared gate functions: `read_gate`, `produce_gate`, `review_passed`, `collect_rules` |
| `commands/run-task.sh` | Entry point. Runs phases in order. |
| `commands/phase-manager.sh` | Phase 1: mandatory reading → plan → validation |
| `commands/phase-execute.sh` | Phase 2: plan parsing → step execution → handoff to review |
| `commands/phase-review.sh` | Phase 3: review loop until it passes |

Usage:

```bash
./commands/run-task.sh "hero-redesign" "Redesign the hero section into a two-column layout"
```

### What is saved to disk

| What | Where | When |
|------|-------|------|
| Plan | `docs/plans/plan-[task].md` | After Phase 1 (always) |
| Reviews | `docs/reviews/review-[step]-v[N].md` | After each review iteration (audit trail) |
| Agent outputs | directly in the project (files at the correct locations) | During Phase 2 (agents write directly) |
