# Professional UI Definition

Professional UI is not just polished output.
It is UI that combines visual coherence, product clarity, system consistency, and implementation integrity.

## Required qualities

- the purpose of the screen is obvious
- actions are clearly prioritized
- design-system semantics are preserved
- states are complete and understandable
- content and controls are arranged around user tasks
- the implementation is maintainable in the real repository

## Production-ready qualities

Production-ready output is code and UI structure that can remain in the repository after review.

It should be:

- repository-native
- design-system aligned
- state-complete
- accessible to a baseline standard
- appropriately scoped
- understandable by another engineer or designer

It should not depend on:

- hidden assumptions not present in the codebase
- ad hoc styling values
- isolated prototype patterns
- temporary placeholders unless explicitly requested

## Non-qualities

The following do not qualify on their own:

- high visual polish without system fit
- animation or decoration without clarity
- novelty without consistency
- local visual fixes that create design-system debt

## Forbidden output

Unless explicitly requested, the following are forbidden as final output:

- single-file HTML standing in for real repository work
- duplicate components created for convenience
- broad architecture rewrites without clear need
- page-only hard-coded styling that should be handled by the design system
- incomplete state handling on interactive screens
- accessibility regressions introduced in the name of polish or speed
