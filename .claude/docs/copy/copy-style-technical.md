# Copy style technical

Text communicates meaning, guides decisions, and explains system state.

---

## References

- Length system: [copy-system-length.md](./copy-system-length.md)
- Temperature system: [copy-system-temperature.md](./copy-system-temperature.md)

---

## Rules

- write for clarity, not brand expression
- every piece of text must serve a functional purpose
- use simple, direct language over technical terminology
- use consistent terminology across the product
- avoid filler, marketing language, or decoration

---

## Constraints

- avoid abstract openings
- avoid vague praise or emotional framing
- avoid redundant sentences

---

## Paragraph structure

- start with the point, not atmosphere
- define the problem before the mechanism
- keep abstraction under control
- state unknowns honestly

---

## Sentence structure

- prefer clear declarative sentences
- keep each sentence about one main idea
- avoid stacking multiple caveats before the point
- use lists when scanning matters more than rhythm

---

## Information structure

A strong technical document usually follows this order:

1. purpose
2. context
3. rule or mechanism
4. examples
5. caveats
6. next action or implication

---

## Voice and tone

Voice should remain neutral, clear, and supportive.

- use calm, direct language
- avoid exaggerated expressions
- avoid humor or informal slang

### Calibration

| Level   | Setting                                                                 |
| ------- | ----------------------------------------------------------------------- |
| Lower   | `Length-1` at `Temp-0` for procedural or compliance text.               |
| Default | `Length-2` at `Temp-1` for clear, approachable guidance.                |
| Raise   | `Length-3` at `Temp-2` in learning contexts where light metaphor helps. |

---

## Clarity

- use concrete wording instead of vague phrasing
- use explicit actions over abstract wording
- avoid metaphors that may confuse interpretation
- avoid internal system terminology in user-facing UI

### Calibration

| Level   | Setting                                                         |
| ------- | --------------------------------------------------------------- |
| Lower   | `Length-1` at `Temp-0` for crisp outcome lines.                 |
| Default | `Length-2` at `Temp-1` to connect problem, benefit, and action. |
| Raise   | `Length-3` at `Temp-1` for measurable KPIs and edge cases.      |

---

## Terminology

Products must use a stable and consistent vocabulary.

- the same concept must always use the same word
- avoid synonyms for key concepts
- avoid renaming concepts between screens

### Calibration

| Level   | Setting                                                                       |
| ------- | ----------------------------------------------------------------------------- |
| Lower   | `Length-0` at `Temp-0` for labels, keys, and single-term definitions.         |
| Default | `Length-1` at `Temp-0` to define a term with its scope.                       |
| Raise   | `Length-2` at `Temp-1` when contrasting similar terms or resolving ambiguity. |
