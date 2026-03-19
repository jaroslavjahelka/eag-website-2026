# Accessibility Model

Accessibility is a structural property of the interface, not a
compliance checklist.\
Every UI must remain perceivable, operable, understandable, and robust
across devices, input methods, and assistive technologies.

Accessible systems reduce cognitive friction, support diverse user
capabilities, and ensure that interaction never depends on a single
sensory channel.

Accessibility must be built into layout, components, and interaction
patterns from the start.

---

## Rules

- prefer semantic HTML and native controls before custom components
- all functionality must be operable with keyboard navigation
- never encode critical meaning through color alone
- maintain clear focus visibility and logical navigation order
- ensure readable contrast in both light and dark mode
- provide alternative representations for visual, auditory, or
  motion-based signals
- expose structure and state to assistive technologies
- avoid interaction patterns requiring precise motor control
- dynamic UI changes must be communicated programmatically

---

## Semantic Structure

Interface structure must be expressed through semantic HTML so assistive
technologies can interpret the document correctly.

Use structural elements instead of generic containers whenever possible.

```html
<header>
  <nav>
    <main>
      <section>
        <article>
          <footer></footer>
        </article>
      </section>
    </main>
  </nav>
</header>
```

Headings must follow a logical hierarchy.

```html
<h1>Page title</h1>
<h2>Section title</h2>
<h3>Subsection</h3>
```

Rules:

- do not skip heading levels
- each page should have exactly one `<h1>`
- sections must be navigable through heading structure

---

## Keyboard Navigation

All interactive functionality must be accessible without a mouse.

Requirements:

- every interactive element must be reachable with `Tab`
- tab order must follow the visual reading order
- components must support activation via `Enter` or `Space`
- keyboard users must never encounter hidden focus traps

Focus must remain clearly visible.

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

Never remove focus outlines without providing a visible alternative.

---

## Focus Management

Focus must move predictably when UI state changes.

Rules:

- opening a modal moves focus inside the modal
- closing a modal returns focus to the triggering element
- hidden or inert content must not receive focus
- focus must not escape active modal or dialog regions

---

## Contrast

All text and UI components must maintain accessible contrast against
their background.

Minimum WCAG thresholds:

- body text: **4.5:1**
- large text: **3:1**
- UI controls and icons: **3:1**
- focus indicators: **3:1**

Contrast must remain valid in both light and dark themes.

When uncertain, increase contrast rather than reducing it.

---

## Images and Media

Visual content must provide alternatives for users who cannot perceive
images.

Rules:

- meaningful images must include descriptive alternative text
- decorative images must be hidden from assistive technologies
- charts and diagrams must include textual summaries
- video must include captions where speech is present

Example:

```html
<img src="chart.png" alt="Revenue increased 24 percent between Q1 and Q2" />
```

Decorative image:

```html
<img src="divider.svg" alt="" aria-hidden="true" />
```

---

## Forms

Forms must clearly communicate purpose, structure, and validation
states.

Rules:

- every input must have a visible label
- labels must be programmatically associated with inputs
- helper text must be connected via `aria-describedby`
- validation errors must include text and programmatic signals

Example:

```html
<label for="email">Email</label>
<input id="email" type="email" aria-describedby="email-help" />

<p id="email-help">We will never share your email.</p>
```

Error state:

```html
<input id="email" type="email" aria-invalid="true" />
<p role="alert">Please enter a valid email address.</p>
```

---

## Motion and Animation

Motion must support orientation and feedback, not create barriers.

Rules:

- respect `prefers-reduced-motion`
- avoid essential interactions that rely on animation timing
- avoid rapid flashing or high-frequency motion
- transitions should remain subtle and predictable

Example:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none;
    transition: none;
  }
}
```

---

## Target Size

Interactive controls must remain easy to activate across input methods.

Recommendations:

- minimum target size: **44 × 44 px**
- sufficient spacing between interactive elements
- avoid densely packed controls

---

## Dynamic Content

When UI updates dynamically, assistive technologies must receive
updates.

- Use ARIA live regions for status messages.
- Use `assertive` only for urgent or blocking updates.

Example:

```html
<div aria-live="polite">Changes saved successfully.</div>
```

---

## Decision Model for AI

When generating UI:

1.  define semantic structure
2.  ensure keyboard operability
3.  verify readable contrast
4.  attach accessible labels and metadata
5.  ensure compatibility with assistive technologies
6.  validate behavior with reduced motion settings

---

## AI Implementation Rules

When generating UI, Claude must follow these rules:

- start with semantic HTML before applying styles
- use native HTML controls whenever possible
- ensure keyboard navigation works for all interactive elements
- maintain WCAG contrast requirements across themes
- expose structure and state through semantic markup
- use ARIA only when native semantics are insufficient
- respect `prefers-reduced-motion` for animations
- ensure focus remains visible and predictable
- never rely on color alone to communicate meaning
- never introduce inaccessible custom interaction patterns


## Component accessibility requirements

Every shared interactive component should define:

- semantic role or native element choice
- label strategy
- keyboard interaction behavior
- focus treatment
- disabled behavior
- loading behavior when relevant
- status or error announcement behavior when relevant

Do not publish a shared component without a clear accessibility contract.
