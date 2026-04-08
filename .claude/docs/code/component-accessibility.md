# Component accessibility

Accessibility is a structural property of the interface, not a compliance checklist. Every UI must remain perceivable, operable, understandable, and robust across devices, input methods, and assistive technologies.

---

## Rules

- support diverse user capabilities
- ensure that interaction never depends on a single sensory channel.
- prefer semantic HTML and native controls before custom components
- all functionality must be operable with keyboard navigation
- never encode critical meaning through color alone
- maintain clear focus visibility and logical navigation order
- ensure readable contrast in both light and dark mode
- provide alternative representations for visual, auditory, or motion-based signals

---

## Semantic structure

Interface structure must be expressed through semantic HTML so assistive technologies can interpret the document correctly.

- use structural elements instead of generic containers whenever possible.
- headings must follow a logical hierarchy.
- each page should have exactly one `<h1>`
- do not skip heading levels

```tsx
<Section as="header">
  <Container>
    <nav>
      <main>
        <section>
          <article>
            <h1>...</h1>
            <h2>...</h2>
            <footer>...</footer>
          </article>
        </section>
      </main>
    </nav>
  </Container>
</Section>
```

---

## Motion accessibility

Motion must support orientation and feedback, not create barriers.

<avoid>
	Avoid rapid flashing or high-frequency motion.
</avoid>

- respect `prefers-reduced-motion`
- avoid rapid flashing or high-frequency movement
- never make completion or comprehension depend on animation
- preserve focus visibility and keyboard usability during transitions
- avoid essential interactions that rely on animation timing

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none;
    transition: none;
  }
}
```

---

## Colors accessibility

- reference [www.w3.org](https://www.w3.org/WAI/WCAG21/)
- all text must maintain accessible contrast against its background
- color must not be the only signal for error, success, warning, selection, or focus
- subtle UI is acceptable only when readability remains intact in both light and dark mode

### Contrast

All text and UI components must maintain accessible contrast against their background.

- recommended minimum contrast body text (`4.5:1`), large text (`3:1`), UI controls and icons (`3:1`), focus indicator (`3:1`)
- contrast must remain valid in both light and dark themes.
- when uncertain, increase contrast rather than reducing it.

---

## Images

Visual content must provide alternatives for users who cannot perceive images.

- below-fold images `loading="lazy"`
- above-fold critical images `priority` or `fetchpriority="high"`
- meaningful images must include descriptive alternative text (`alt="Image decription"`)
- decorative images must be hidden from assistive technologies (`aria-hidden="true"`)

```html
<img src="chart.png" alt="Revenue increased 24 percent between Q1 and Q2" />
<img src="icon.svg" aria-hidden="true" />
```

---

## Target size

Interactive controls must remain easy to activate across input methods.

- if possible prefer minimum target size `44 × 44 px`
- sufficient spacing between interactive elements
- avoid densely packed controls

---

## Navigation & State

- links use `<a>`, `<Link>`, `<NavLink>` (Cmd/Ctrl+click, middle-click support)
- destructive actions need confirmation modal or undo window—never immediate

---

## Keyboard navigation

All interactive functionality must be accessible without a mouse.

- every interactive element must be reachable with `Tab`
- tab order must follow the visual reading order
- components must support activation via `Enter` or `Space`
- never remove focus outlines without providing a visible alternative.
- focus must remain clearly visible.

---
