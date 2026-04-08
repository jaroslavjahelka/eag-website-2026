# Design responsiveness

Responsive design ensures that UI adapts to available space while preserving clarity, hierarchy, and usability. It is not about fitting content into arbitrary screen sizes — it is about maintaining task completion quality across viewport conditions.

---

## Rules

- prefer fluid behavior over rigid breakpoint jumps when the layout allows it
- preserve visual hierarchy, action clarity, and reading comfort at every width
- treat responsive behavior as correctness, not as a separate optimization pass
- test at breakpoint boundaries and at intermediate widths

---

## Strategies

### Viewport breakpoints

The default and most common strategy. Tailwind uses a mobile-first approach. Unprefixed utilities apply at all widths. Prefixed utilities apply from that breakpoint upward.

- reference [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- write the smallest screen styles first.
- add breakpoint prefixes only where the layout must change.
- page-level layout changes (column count, sidebar visibility, navigation mode)
- section-level structure shifts (stacking, reordering, collapsing)

```tsx
<Section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">...</Section>
```

### Container queries

Layout adapts based on the width of a parent container, not the viewport. Use when a component must work in containers of different widths regardless of screen size.

- reference [Tailwind CSS Container Queries](https://tailwindcss.com/docs/container-queries)
- reusable components placed in varying-width containers (sidebar, main content, modal, drawer)
- card components that appear in different grid column counts
- widget-style components that adapt to their available space
- any component where viewport width does not reliably predict available space

```tsx
<Section className="@container">
  <Container className="flex flex-col @md:flex-row gap-16 @md:gap-24">
    <div className="@md:w-1/3">
      <img src="..." alt="..." className="w-full" />
    </div>
    <div className="@md:w-2/3">
      <h3>Card title</h3>
      <p>Card description that adapts to available space.</p>
    </div>
  </Container>
</Section>
```

#### Named container

Use named containers when nesting or when specificity is needed.

```tsx
<div className="@container/card">
  <div className="@md/card:flex-row">...</div>
</div>
```

### CSS Grid

Grid layouts that adapt without explicit breakpoints by using flexible track sizing.

- repeated item grids (cards, tiles, product listings) where the number of columns should naturally fill available space
- layouts where you want smooth column adaptation without breakpoint jumps
- cases where `auto-fill` or `auto-fit` with `minmax()` produces the correct result
- keep readable line lengths

```tsx
<div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-24">
  <Card />
  <Card />
  <Card />
  <Card />
</div>
```

### Combining strategies

Strategies can be composed. A page layout may use viewport breakpoints for the overall structure, while cards inside that layout use container queries to adapt to their column width.

```tsx
<div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-32">
  <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-24">
    <div className="@container">
      <article className="flex flex-col @sm:flex-row gap-12">...</article>
    </div>
  </div>
  <aside className="hidden lg:block">...</aside>
</div>
```

---

## Flexbox responsiveness

- use `min-w-0` on flex children that contain text to prevent overflow
- prefer `flex-1` for the flexible region and fixed width for the constrained region

---

## Media queries

Viewport breakpoints and container queries cover the majority of responsive needs. Raw media queries are still appropriate in specific situations.

- `prefers-reduced-motion` — disable or simplify animations
- `prefers-color-scheme` — adapt to system dark/light mode
- `prefers-contrast` — adjust for high-contrast preferences
- `hover: hover` and `pointer: fine` — distinguish touch from pointer devices
- `print` — adapt layout for print output
- tailwind provides built-in modifiers for common media features

```tsx
<div className="motion-safe:transition-all motion-reduce:transition-none">
  <button className="hover:bg-blue-50 active:bg-blue-60 [@media(hover:none)]:active:bg-blue-50">
    ...
  </button>
</div>
```

---

## Show/hide by breakpoint

Content that appears or disappears at certain breakpoints.

- use `hidden` + `{breakpoint}:block` or `{breakpoint}:hidden`
- never hide content that is critical for task completion
- if content is hidden on mobile, ensure an alternative path exists

```tsx
<main>
  <Section>
    <Container>
      <p className="md:hidden text-14 text-t-secondary">3 items selected</p>
      <div className="hidden md:block">
        <DetailedSelectionInfo />
      </div>
    </Container>
  </Section>
</main>
```
