# Motion System

Animation Library Reference: [Technical Stack](../workflows/references/technical-stack.md)

Motion supports orientation, continuity, and feedback.
It is not a substitute for hierarchy or content clarity.

## Motion principles

- motion should explain change
- motion should stay brief and purposeful
- motion must not block interaction
- motion should reinforce spatial logic
- reduced-motion preferences must be respected

## Motion roles

Use motion for:

- state change feedback
- entrance and exit continuity
- hierarchy emphasis
- spatial transition
- progressive disclosure

Do not use motion for:

- decoration without meaning
- delayed access to primary content
- repeated attention-grabbing effects
- essential meaning that disappears when motion is reduced

## Duration scale

Use a small predictable scale.

- `instant`: near-immediate feedback
- `fast`: small UI feedback and hover transitions
- `standard`: panels, overlays, state transitions
- `slow`: only for large spatial transitions when clearly justified

## Easing scale

Use a limited easing system.

- `standard`: most UI motion
- `enter`: slightly emphasized entrance
- `exit`: slightly faster exit
- `linear`: progress indicators or continuous movement

## Accessibility rules

- respect `prefers-reduced-motion`
- avoid rapid flashing or high-frequency movement
- never make completion or comprehension depend on animation
- preserve focus visibility and keyboard usability during transitions

## Implementation rules

- define motion through tokens where possible
- keep duration and easing consistent across similar patterns
- animate opacity, transform, and other performant properties when possible
- avoid layout-thrashing animation for common interactions
