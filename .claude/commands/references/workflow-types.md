# Workflow types

| Type            | Description                                                   | Flow                                                     |
| --------------- | ------------------------------------------------------------- | -------------------------------------------------------- |
| Pipeline        | Each step's output is the next step's input.                  | A → B → C                                                |
| Fan-out         | Multiple agents work on the same input, results merge.        | A → [B, C] → D                                           |
| Fan-in          | One agent synthesizes outputs from separate sources.          | [A, B] → C                                               |
| Router          | Next step depends on a condition.                             | A → if X then B, else C                                  |
| Loop            | Iterative refinement with a quality gate.                     | A → B → Review → pass or retry B (max N iterations)      |
| Chain-of-review | Reviewer can send back to any stage.                          | A → B → C → Review → back to any step if needed.         |
| Map             | Same agent runs on each item of a list.                       | [items] → Agent A (each) → [results]                     |
| Map-reduce      | Process parts separately, then synthesize.                    | [items] → Agent A (each) → [results] → Agent B (combine) |
| Orchestrator    | One agent dynamically decides what to do next. No fixed flow. | —                                                        |
