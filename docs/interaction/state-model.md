# State Model

This is the canonical state model for interactive UI.

A component or page is incomplete if its meaningful states are undefined.

## Core states

### Idle

Default state.
The element or page is ready for use.

### Hover

Pointer is over the interactive target.
Hover should enhance affordance but never be the only signal.

### Focus

The element is targeted by keyboard or equivalent navigation.
Focus must remain clearly visible.

### Active

The control is currently being activated.
Use this state to confirm direct manipulation.

### Loading

The system is processing.
The UI should show that input was received and whether the user can continue waiting, cancel, or keep working elsewhere.

### Disabled

Interaction is intentionally unavailable.
Disabled state must communicate why when that meaning is important.

### Success

The action completed successfully.
Success should confirm completion without forcing users to interpret subtle visual changes.

### Error

The action failed or requires correction.
Error should preserve recovery context and explain the next step.

### Empty

There is no data, result, or content for the current view.
Empty state should explain the absence and the next useful action.

## Application rules

- every interactive component should define which states apply
- every page should define at least loading, empty, success or confirmation, and error where relevant
- states should be visible both visually and behaviorally
- state transitions should be understandable, not abrupt or ambiguous

## Documentation rule

If a new component or page introduces non-trivial state, document it in code comments, prop naming, tests, or adjacent docs so the behavior remains understandable.
