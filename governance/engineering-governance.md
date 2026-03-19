# Engineering Governance

This document defines the engineering expectations that apply whenever the system produces or edits code.

## Required qualities

- production-safe changes
- clear file placement
- repository-fit naming
- explicit state handling
- accessible behavior by default
- design-system reuse before invention
- minimal scope expansion

## Code generation rules

- generate code that matches the real repository stack, not generic templates
- prefer extension of existing primitives over parallel abstractions
- avoid speculative architecture unless the task is explicitly structural
- keep public APIs small and intention-revealing
- preserve existing product text and business logic unless the task changes them
- avoid dead files, duplicate variants, and shadow systems

## Review gates

A code task is not complete until it passes the relevant combination of:

- workflow checks
- design-system review
- accessibility review
- engineering review
- repository validation scripts

## Change discipline

- use the smallest safe diff
- avoid hidden breaking changes
- do not move governance or runtime files casually
- when introducing a new pattern, document it in the canonical layer
