# Engineering principles

This document defines the engineering expectations that apply whenever the system produces or edits code.

---

## Required qualities

- repository-fit naming
- accessible behavior by default
- design-system reuse before invention

---

## Code generation rules

- generate code that matches the real repository stack
- prefer extension of existing primitives over parallel abstractions
- preserve existing product text and business logic unless the task changes them
- avoid dead files, duplicate variants, and shadow systems

---

## Change discipline

<constraint>
	Avoid hidden breaking changes.
</constraint>

- use the smallest safe diff
- do not move any files casually
- when introducing a change out of scope, inform about change
