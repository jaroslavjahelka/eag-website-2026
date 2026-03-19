---
name: component-refactor
description: Refactor existing UI components toward cleaner boundaries, reuse, and better system alignment without widening scope.
---

# Component Refactor

## Use this skill when

- a component is bloated or duplicated
- shared logic is being obscured by page-specific markup
- variants are hard to reason about
- a component no longer fits the design system cleanly

## Sequence

1. Identify the real source of complexity.
2. Decide whether the problem is API, composition, state handling, or styling.
3. Use the decision tree reference.
4. Refactor toward the smallest stable abstraction.
5. Verify behavior, states, and naming clarity.

## Constraints

- do not extract abstractions without repeated value
- do not push page-specific logic into a shared primitive
- do not split files just to look cleaner if the API becomes harder to understand
