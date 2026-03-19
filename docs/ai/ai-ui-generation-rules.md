# AI UI Generation Rules

These rules define how AI systems should generate user interfaces using the design system.

The goal is to ensure that AI-generated interfaces remain consistent, accessible, and aligned with the product's design principles.

AI must treat the design system as the **source of truth** and avoid introducing undocumented patterns or behaviors.

---

## Core Principle

AI-generated interfaces must follow the design system.

When generating UI:

- reuse defined components
- apply semantic tokens
- follow interaction patterns
- follow content patterns
- respect accessibility requirements

AI must not invent new design decisions when a defined pattern exists.

---

## UI Generation Order

When generating UI, follow this sequence:

1. determine the user task
2. select the appropriate layout pattern
3. define the primary action
4. structure secondary and tertiary actions
5. apply interaction patterns
6. apply content patterns
7. apply color semantic roles
8. validate accessibility requirements

Structure must be defined before styling.

---

## Layout Rules

AI should prioritize simple, predictable layouts.

Guidelines:

- prefer single-column layouts for primary workflows
- group related information together
- maintain clear visual hierarchy
- avoid unnecessary layout complexity
- prioritize readability and task flow

---

## Component Selection

AI must prioritize existing components.

Examples of standard components:

- button
- input
- select
- checkbox
- radio
- modal
- dialog
- card
- list
- table
- notification
- tooltip

Rules:

- reuse existing components
- avoid inventing new component types
- maintain consistent component usage across the interface

---

## Action Hierarchy

Each interface region must define a clear action hierarchy.

Action levels:

Primary action  
Secondary actions  
Tertiary actions

Rules:

- only one primary action per interface region
- the primary action must be visually dominant
- secondary actions must remain visually quieter
- tertiary actions should remain subtle

---

## Content Integration

UI text must follow defined content guidelines.

AI must apply:

- content-guidelines
- ui-text-rules
- content-patterns

Rules:

- labels must remain concise
- actions should use verbs
- system messages must follow defined patterns
- terminology must remain consistent across the product

---

## Interaction Integration

Interaction behavior must follow the interaction policy.

Rules:

- every interactive element must provide feedback
- visible interaction states must exist
- destructive actions require confirmation
- loading states must communicate progress

Interaction must remain predictable.

---

## Color Integration

Color usage must follow the semantic color system.

Rules:

- start with neutral surfaces
- use accent color for primary actions
- use status colors only when communicating real status
- prefer semantic tokens instead of raw palette values

AI must not invent new color tokens.

---

## Accessibility Integration

Accessibility requirements are mandatory.

Requirements:

- all controls must support keyboard navigation
- focus indicators must remain visible
- text must maintain accessible contrast
- semantic HTML should be used where possible

Accessibility must be treated as a structural requirement.

---

## AI Feature Integration

When generating AI-powered features, AI must apply defined AI patterns.

Applicable documents:

- ai-content-guidelines
- ai-patterns

AI-generated interfaces must remain predictable and user-controlled.

---

## Error Prevention

AI must avoid generating UI that:

- hides critical actions
- creates ambiguous interactions
- relies on color alone to communicate meaning
- introduces inaccessible patterns
- invents undocumented components

---

## Decision Model for AI

When generating UI:

1. determine the user goal
2. select the correct interface pattern
3. structure layout and hierarchy
4. apply interaction and content rules
5. apply semantic color roles
6. validate accessibility
7. verify consistency with the design system

---

## AI Implementation Rules

When generating UI, AI must:

- follow the design system as the source of truth
- reuse existing components and patterns
- apply semantic color tokens
- follow interaction and accessibility policies
- generate consistent UI structures
- avoid introducing undocumented design decisions
