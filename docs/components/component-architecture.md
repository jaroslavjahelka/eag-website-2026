# Component Architecture

A component is a reusable interaction unit with defined purpose, behavior, and states.
It is not just a visual fragment.

This document is the canonical component model for the repository.

## Reuse-first sequence

Before creating a new component:

1. check whether an existing component already solves the problem
2. check whether composition solves it
3. check whether a new variant solves it
4. create a new shared component only when the abstraction is clearer than repetition

## Required justification for a new component

A new shared component is justified only when:

- the same semantic role appears in multiple places
- composition or extension is no longer clear enough
- the component has a stable contract
- repeated state handling would otherwise drift
- the abstraction reduces long-term system debt

Reject creation when the difference is only:

- page-specific layout
- one-off content structure
- minor styling preference
- temporary implementation convenience

## Component contract

Every component should define:

- purpose
- when to use it
- when not to use it
- structure or slots
- supported variants
- applicable states
- interaction behavior
- accessibility behavior
- composition boundaries

### Purpose

Describe the role of the component in the interface.

Example:

Button enables users to trigger an action within the interface.

### When to use

Define the situations where the component is the correct semantic choice.

### When not to use

Define adjacent cases where another pattern or primitive fits better.

## Variants

Variants should represent stable semantic differences, not cosmetic experiments.

Rules:

- prefer semantic variants over presentational flags
- avoid overlapping variants with unclear boundaries
- do not create variants for one-off page needs
- variant names should describe role or intent

## States

Every interactive component should define which canonical states apply:

- idle
- hover
- focus
- active
- loading
- disabled
- success
- error
- empty when relevant

Refer to [docs/interaction/state-model.md](../../docs/interaction/state-model.md) for the canonical definitions.

## Interaction behavior

A component should define:

- how it communicates affordance
- what user action it supports
- what feedback it provides
- what destructive or confirmation rules apply if relevant

## Accessibility behavior

A component should define:

- semantic role or native element
- label strategy
- keyboard behavior
- focus treatment
- status and error communication where relevant

## Composition rules

- shared components should remain product-agnostic
- page-specific orchestration should stay in pages or feature-level composition
- shared primitives should not absorb local layout assumptions
- slot-based composition is preferred over deeply nested conditionals when it improves clarity

## Decision model for AI

When proposing or editing a component:

1. determine the semantic role
2. check whether reuse, composition, or a variant is sufficient
3. define the minimal stable contract
4. define applicable states and accessibility expectations
5. verify that the abstraction improves system clarity rather than just reducing lines of code

## Implementation rules

When generating components, AI must:

- reuse existing components before creating new ones
- prefer semantic props over presentational flags
- keep APIs understandable
- account for state coverage
- account for accessibility behavior
- avoid one-off shared abstractions
