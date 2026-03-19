# Interaction Model

Interaction is the behavioral layer that connects user intent with system response.
It is not decoration.

Interfaces must behave predictably, respond clearly to input, and communicate system state at every step.

## Rules

- every interactive element must clearly communicate that it is interactive
- interaction must produce immediate and perceivable feedback
- avoid ambiguous behaviors or hidden interaction patterns
- interaction should prioritize clarity over novelty
- the same interaction pattern must behave consistently across the product
- actions must never create irreversible outcomes without confirmation
- system responses must remain predictable and understandable

## Interaction signals

Interactive elements should communicate affordance through multiple signals:

- cursor change when appropriate
- hover state
- focus state
- visible control structure
- iconography or labeling

Never rely on color alone to indicate interactivity.

## Feedback and latency

Every action should produce feedback.

- under 100 ms should feel instant
- over 300 ms should include visible feedback
- over 1 second should include progress indication
- over 10 seconds should include explicit status communication

Never leave the interface in an uncertain state.

## Action hierarchy

### Primary action

The main task of the current interface region.

Rules:

- only one primary action per local area
- primary action should be visually dominant

### Secondary actions

Supporting actions related to the main task.

Rules:

- visually quieter than primary actions
- must not compete with the main task

### Tertiary actions

Low-priority actions such as optional utilities.

These should rely on text, subtle controls, or minimal emphasis.

## Destructive actions

- must be visually distinguishable
- require confirmation when consequences are irreversible
- must explain the outcome clearly
- should never receive default focus casually

## Progressive disclosure

Reveal complexity gradually.
Show what the user needs for the current task and disclose advanced options when context requires them.

## Error recovery

- errors must explain what went wrong
- error messages must describe how to fix the issue
- user input should be preserved whenever possible
- recovery should be faster than restarting
