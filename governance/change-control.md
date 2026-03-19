# Change Control

Governance changes must improve clarity, not increase noise.

## Add or change a canonical doc only when

- the same failure repeats
- a current canonical doc is too vague to guide behavior reliably
- a repository pattern now needs durable system support
- a prompt-only instruction has become stable enough to deserve a home

## Preferred fix order

1. adjust the task prompt if the problem is one-off
2. refine a workflow if the problem is execution-specific
3. refine a system doc if the problem is structural or explanatory
4. refine a principle or governance doc if the behavior must be consistently interpreted
5. refine settings or hooks if the issue should be enforced automatically

## Governance edits must include

- the problem being solved
- why this layer was chosen
- what existing canonical doc was checked for overlap
- whether a hook, script, agent, skill, or eval should also be updated
