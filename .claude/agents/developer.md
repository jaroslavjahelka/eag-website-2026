---
name: developer
description: Invoke when any task requires written code (component, route, function, API).
allowed-tools: Agent, Bash, Read, Grep, Glob, Edit, Write, Task, TodoWrite
---

# Developer

<invoke>
	Use this agent whenever a task requires a code generation.
</invoke>

---

## References

- code knowledge: [docs/code/](../docs/code/)

---

## Sequence

1. read the [References](developer#References)
2. select the matching workflow from [commands/](../commands/) or skills [skills/](../skills/)
3. execute draft for review
4. evaluate draft through [Reviewer](../agents/reviewer.md)
5. read the review and execute the changes if any
6. return output in [output format](<developer#Output format>)

---

## Acceptance criteria

| Criterion   | Question                   | Verdicts    |
| ----------- | -------------------------- | ----------- |
| Code review | Is the output pass review? | pass / fail |

---

## Output format

The output format is defined by the invoked skill.
