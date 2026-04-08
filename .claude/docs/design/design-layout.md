# Layout

Layout defines how information is arranged across pages, regions, and components. Good layout makes the current task obvious.

---

## Rules

- group related information together
- preserve alignment across repeated structures

---

## Default structure

Use `Section` and `Container` as two separate layout layers.

- `Section` defines the semantic page block and outer page padding
- `Container` defines the inner content width and centering
- Flexbox and Grid belong inside these layers, not instead of them

```tsx
<Section>
  <Container>{/* Content here */}</Container>
</Section>
```

---

## Flex vs Grid

- use `flex` when the layout is primarily controlled in one axis
- Use `flex` for small internal component layout
- use `grid` when you need to control rows and columns together
- Use `grid` for page sections, dashboards, card collections, and other structured repeated layouts

---

## Spacing System

Spacing should preserve structure, hierarchy, and scan clarity across product UI. It is functional, not decorative.

### Rules

- keep spacing proportional to structural distance
- use `gap` for sibling spacing inside layout containers
- Tailwind is configured with a `1px` spacing base so spacing utilities (`p-40` = `40px`, `gap-12` = `12px`, `px-24` = `24px`) are directly readable in code. This improves code readability for both humans and AI.

### Spacing ramp

Use these primitive spacing values in product code consistently if possible.

- use `0 1 2 3 4 5 6 8` for micro spacing inside dense UI and compact components
- use `10 12 14 16 20 24` for component padding, field spacing, button groups, and regular internal rhythm
- use `32 40 48 64 80 96 128 160` for larger grouping, layout separation, vertical rythm, and page gutters

### White space and stability

White space should clarify structure, relationships, and hierarchy — not create decorative emptiness. Use spacing to show what belongs together, what should be scanned separately, and where the user should focus first. The interface should remain visually stable as data loads, errors appear, or content expands.

- apply white space at multiple levels: within components, between components, and between sections
- use tighter spacing within related groups and larger spacing between distinct groups
- prefer a consistent spacing scale or spacing tokens
- define dimensions, min-heights, aspect ratios, or placeholders where needed to prevent layout shift
- similar content should use similar spacing patterns.

### Spacing examples

- relevant examples: [design/examples](./examples)
