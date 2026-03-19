# Content Guidelines

Content is part of the interface, not decoration.
Text communicates meaning, guides decisions, and explains system state.

## Brevity and length

UI text should remain concise while still communicating the necessary meaning.

Length system:

| Level    | Word Count    |
| -------- | ------------- |
| Length-0 | ≤ 15 words    |
| Length-1 | ≤ 30 words    |
| Length-2 | 60–100 words  |
| Length-3 | 200–250 words |
| Length-4 | 400–500 words |
| Length-5 | ≥ 500 words   |

Rules:

- default is `Length-2` unless a task says otherwise
- for UI copy, prefer the shortest length that preserves meaning
- remove redundant words
- avoid repeating information already visible in the interface
- prefer short sentences

## Temperature System

Sets how much creativity is allowed. Decides when to stay factual, sound professional, or add light persuasion and metaphor. The scale defines limits; constraints keep sensitive content safe.

| Level  | Description                                              |
| ------ | -------------------------------------------------------- |
| Temp-0 | Strictly factual; no emotive language.                   |
| Temp-1 | Professional, courteous, lightly human.                  |
| Temp-2 | Approachable, subtly persuasive; default for conversion. |
| Temp-3 | Expressive; metaphors allowed when useful.               |
| Temp-4 | High flair and risk; require brand/legal approval.       |

### Principles

- Match creative warmth to context; clarity first.

### Rules

- Default is `Temp-1` unless the brief states otherwise.

### Constraints

- Do not exceed `Temp-2` on sensitive or compliance-heavy surfaces.
- Banned terms apply at all temperature levels.

## Core rules

- write for clarity, not brand expression
- prefer simple, direct language over technical terminology
- keep text concise while preserving meaning
- avoid filler, marketing language, or decoration
- maintain consistent terminology across the product
- write from the user's perspective
- every piece of text must serve a functional purpose
- content must support the user's task in the current context

**Calibration:**

| Level   | Setting                                                           |
| ------- | ----------------------------------------------------------------- |
| Lower   | Length-1 at Temp-0 for single non-negotiable statements.          |
| Default | Length-2 at Temp-1 to resolve style vs. clarity.                  |
| Raise   | Length-3 at Temp-1 when documenting precedence across systems.    |

## Voice and tone

Voice should remain neutral, clear, and supportive.

Guidelines:

- prefer calm, direct language
- avoid exaggerated expressions
- avoid humor or informal slang
- prioritize clarity over personality

**Calibration:**

| Level   | Setting                                                              |
| ------- | -------------------------------------------------------------------- |
| Lower   | Length-1 at Temp-0 for procedural or compliance text.                |
| Default | Length-2 at Temp-1 for clear, approachable guidance.                 |
| Raise   | Length-3 at Temp-2 in learning contexts where light metaphor helps.  |

## Clarity

- use concrete wording instead of vague phrasing
- avoid metaphors that may confuse interpretation
- avoid internal system terminology in user-facing UI
- prefer explicit actions over abstract wording

**Calibration:**

| Level   | Setting                                                      |
| ------- | ------------------------------------------------------------ |
| Lower   | Length-1 at Temp-0 for crisp outcome lines.                  |
| Default | Length-2 at Temp-1 to connect problem, benefit, and action.  |
| Raise   | Length-3 at Temp-1 for measurable KPIs and edge cases.       |

## Terminology

Products must use a stable and consistent vocabulary.

Rules:

- the same concept must always use the same word
- avoid synonyms for key concepts
- avoid renaming concepts between screens
- align terminology with the user's mental model

**Calibration:**

| Level   | Setting                                                                  |
| ------- | ------------------------------------------------------------------------ |
| Lower   | Length-0 at Temp-0 for labels, keys, and single-term definitions.        |
| Default | Length-1 at Temp-0 to define a term with its scope.                      |
| Raise   | Length-2 at Temp-1 when contrasting similar terms or resolving ambiguity.|

## Status communication

System content should answer three questions when needed:

1. what happened
2. what it means
3. what the user can do next

**Calibration:**

| Level   | Setting                                                                    |
| ------- | -------------------------------------------------------------------------- |
| Lower   | Length-0 at Temp-0 for inline status badges and progress labels.           |
| Default | Length-1 at Temp-1 to cover what happened and the next action.             |
| Raise   | Length-2 at Temp-1 when context, cause, and recovery all need explanation. |

## Error content

Error messages must support recovery.

Rules:

- clearly explain what went wrong
- describe how to fix the issue
- avoid blaming language
- avoid technical error codes in user-facing UI unless genuinely useful

**Calibration:**

| Level   | Setting                                                                   |
| ------- | ------------------------------------------------------------------------- |
| Lower   | Length-0 at Temp-0 for inline validation hints.                           |
| Default | Length-1 at Temp-1 to state the problem and the recovery action.          |
| Raise   | Length-2 at Temp-1 when multiple causes or alternative fixes are needed.  |

## Empty-state content

Empty states should explain why the view is empty and suggest the next useful action.

**Calibration:**

| Level   | Setting                                                                        |
| ------- | ------------------------------------------------------------------------------ |
| Lower   | Length-0 at Temp-0 for minimal placeholder labels.                             |
| Default | Length-1 at Temp-1 to explain the empty state and suggest a single action.     |
| Raise   | Length-2 at Temp-2 for onboarding empty states that benefit from encouragement.|

## Technical documentation protocol

Technical documentation should remain:

- direct
- structured
- audience-aware
- fact-driven
- free of decorative language

### Core principles

- start with the point, not atmosphere
- define the problem before the mechanism
- use stable terminology
- keep abstraction under control
- verify facts
- state unknowns honestly
- reduce verbal tics and filler

**Calibration:**

| Level   | Setting                                                           |
| ------- | ----------------------------------------------------------------- |
| Lower   | Length-1 at Temp-0 for single non-negotiable statements.          |
| Default | Length-2 at Temp-1 to resolve style vs. clarity.                  |
| Raise   | Length-3 at Temp-1 when documenting precedence across systems.    |

### Sentence structure

- prefer clear declarative sentences
- keep each sentence about one main idea
- avoid stacking multiple caveats before the point
- use lists when scanning matters more than rhythm

**Calibration:**

| Level   | Setting                                                       |
| ------- | ------------------------------------------------------------- |
| Lower   | Length-1 at Temp-0 for imperative steps and constraints.      |
| Default | Length-2 at Temp-1 to explain active vs. passive choices.     |
| Raise   | Length-3 at Temp-1 for contrasts, edge cases, or trade-offs.  |

### Numeric conventions

- write numbers consistently
- use exact numbers when accuracy matters
- use approximations only when precision is not required

### Information structure

A strong technical document usually follows this order:

1. purpose
2. context
3. rule or mechanism
4. examples
5. caveats
6. next action or implication

**Calibration:**

| Level   | Setting                                                   |
| ------- | --------------------------------------------------------- |
| Lower   | Length-1 at Temp-0 for outcome lead lines.                |
| Default | Length-2 at Temp-1 to add proof and essential context.    |
| Raise   | Length-3 at Temp-1 for hierarchy, exceptions, and links.  |

### AI guardrails

When generating documentation:

- avoid abstract openings
- avoid vague praise or emotional framing
- avoid redundant sentences
- do not invent implementation facts
- verify terminology against the repository
- say when information is unknown

## Application order

When writing product or technical content:

1. determine the audience and task
2. choose the shortest form that preserves meaning
3. use repository terminology
4. write the result first
5. add only the context required for action or understanding
