# Design principles

This file defines how UI decisions are made. It does not specify what to implement — layout, states, and accessibility each have their own files. This file defines how to think when making trade-offs.

---

## Purpose is visible

---

Every screen must answer at first glance: what is the user doing here, what is the primary action, what is the next step. If that is not clear without scrolling or clicking, the design is not done.

## Task drives composition

---

Content, controls, and hierarchy are organized around what the user is currently solving — not around how data is structured in the API or how code is split. If layout reflects a backend model instead of a user task, it is wrong.

## System over local improvement

---

A stronger isolated solution is a mistake if it weakens overall consistency. Prefer in this order: extend an existing pattern → compose from existing components → create a variant → only then introduce a new primitive. A new primitive is justified only when it provides repeated and durable value.

---

## Decoration without function is debt

Animation, visual effects, custom components — anything that does not directly serve clarity or navigation is design-system debt. Do not add visual complexity for perceived quality.
