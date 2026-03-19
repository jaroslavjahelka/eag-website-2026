# Design Principles

These principles define the intended direction of the UI system.

## 1. Clarity over novelty

The purpose of each screen, section, and control should be obvious without explanation.
Novel interaction or visual treatment is acceptable only when clarity remains intact.

## 2. Task-first hierarchy

Information and controls should be arranged around the user's current task.
Hierarchy is successful when the primary action, supporting context, and next step are easy to identify.

## 3. System fidelity over local optimization

Local polish must not create global inconsistency.
Prefer the existing system before inventing a local exception.

## 4. Reuse before creation

Extend, compose, or variant existing patterns before creating a new primitive or component.
New abstractions need durable repeated value.

## 5. State completeness is part of correctness

A UI is not complete when it only renders the ideal state.
Loading, empty, success, error, disabled, and responsive states are part of the solution.

## 6. Accessibility is structural, not decorative

Semantics, keyboard support, focus visibility, readable contrast, and recovery affordances are correctness requirements.

## 7. Production fit over prototype convenience

Final output must fit the real repository, stack, and architecture.
Detached demo patterns are not acceptable as default output.
