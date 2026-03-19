# Token Architecture

Tokens define a stable design language that can survive visual iteration without breaking semantic intent.

## Token layers

### 1. Primitive tokens

Raw foundational values.

Examples:

- palette steps
- raw spacing values
- raw type sizes
- raw radius values
- raw durations
- raw easing curves

Primitive tokens should describe the value itself, not the UI meaning.

### 2. Semantic tokens

Role-based aliases (Tailwind CSS) used by product UI.

Examples:

- `text-t-primary`
- `border-blue-50`

Semantic tokens are the default layer for UI implementation.

Component tokens must inherit from semantic tokens wherever possible.

### 3. Theme tokens

Theme-level mappings that let the same semantic role resolve differently across modes or brands.

Examples:

- light / dark mappings
- brand themes
- density or motion preference overrides

## Principles

- prefer role over appearance
- keep primitive tokens private to the system when possible
- use semantic tokens in product code
- create component tokens only when repeated component-specific meaning exists
- preserve naming stability
- avoid alias chains that are hard to trace

## Rules

- UI should consume semantic or component tokens, not raw values
- token names should describe purpose, not implementation detail
- tokens must have a single clear ownership layer
- do not create overlapping aliases without a specific use case
- theme changes should happen by remapping tokens, not rewriting components

## Decision model

When adding a new token:

1. check whether an existing semantic token already fits
2. if not, decide whether the need is system-wide or component-specific
3. define the token at the lowest stable reusable layer
4. document the token role and downstream impact
5. avoid creating visually named tokens when semantic naming is possible
