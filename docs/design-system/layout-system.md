# Layout System

Layout defines how information is arranged across pages, regions, and components.
Good layout makes the current task obvious.

## Rules

- prioritize clear visual hierarchy
- group related information together
- preserve alignment across repeated structures
- choose predictable page shapes before clever compositions
- use progressive disclosure when complexity grows

## Layout hierarchy

Pages should usually resolve into this order:

1. page purpose
2. primary action
3. primary content region
4. supporting context
5. secondary utilities

## Section

`Section` represents a semantic page section. By default it renders a native `<section>` element and defines the outer horizontal rhythm of a page block. Use it to create clear page-level structure such as hero, content sections, feature blocks, testimonials, or footer areas.

### Purpose

- Represents a semantic section of the page
- Controls outer horizontal page padding
- Can change the rendered HTML tag through `as`
- Acts as the outer layout layer before inner content layout begins

### Rules

- Use `Section` as the default outer wrapper for meaningful page sections.
- Keep `Section` responsible for section-level structure and horizontal spacing.
- Do not use `Section` to solve internal component alignment.
- Use `padding={false}` only when a section must intentionally break the default page padding system.
- Prefer the default semantic `<section>` unless another HTML element is structurally more correct.

### How to use

Use `Section` when building the outer band of a page. It defines where a section starts and ends in the document structure, and how far its content sits from the viewport edges.

### Code preview

```tsx
interface SectionProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children?: ReactNode;
  as?: ElementType;
  padding?: boolean;
}

const styles = tv({
  base: "w-full",
  variants: {
    padding: {
      true: "px-20 md:px-40 xl:px-60",
    },
  },
});

export function Section(props: SectionProps) {
  const { as: Element = "section", padding = true } = props;

  return (
    <Element className={styles({ padding, className: props.className })}>{props.children}</Element>
  );
}
```

### Example

```tsx
<Section>
  <h2>Trusted by modern dealerships</h2>
  <p>Manage inspections, pricing, and operations in one place.</p>
</Section>
```

## Container

`Container` is the inner width wrapper. It keeps content centered and constrained to a consistent maximum width so sections remain readable, structured, and visually controlled across large screens.

### Purpose

- Centers content horizontally
- Limits content width
- Creates a stable inner content area inside a section
- Supports readable and consistent layout width across the system

### Rules

- Use `Container` inside `Section` when content should not span edge to edge.
- Keep `Container` responsible for width and centering only.
- Do not use `Container` as a substitute for Grid or Flexbox.
- Use `Container` for text blocks, card grids, form areas, navigation internals, and other structured content zones.
- Keep width behavior consistent across similar sections.

### How to use

Use `Container` as the inner layout boundary for content. It should usually wrap the real content layout, while Grid or Flexbox should be applied inside it.

### Code preview

```tsx
interface ContainerProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children?: ReactNode;
  as?: ElementType;
}

const styles = tv({
  base: "mx-auto w-full max-w-1560",
});

export function Container(props: ContainerProps) {
  const { as: Element = "div" } = props;

  return <Element className={styles({ className: props.className })}>{props.children}</Element>;
}
```

### Example

```tsx
<Section>
  <Container>
    <div className="grid gap-24 md:grid-cols-2">
      <div>
        <h2>Battery health insights</h2>
        <p>See degradation, stability, and risk in one clear report.</p>
      </div>

      <div>
        <Card />
      </div>
    </div>
  </Container>
</Section>
```

## Section and Container together

Use `Section` and `Container` as two separate layout layers.

- `Section` defines the semantic page block and outer page padding
- `Container` defines the inner content width and centering
- Flexbox and Grid belong inside these layers, not instead of them

### Default pattern

```tsx
<Section>
  <Container>{/* Content layout starts here */}</Container>
</Section>
```

### Recommended mental model

- `Section` = page section
- `Container` = content width boundary
- `Grid` / `Flex` = internal content layout

## Flex vs Grid

Use **Flexbox** for **one-dimensional layout problems** and **Grid** for **two-dimensional layout problems**.  
In practice: use Flexbox when items are primarily aligned along a single axis, and use Grid when the layout needs coordinated rows and columns.

### Rules

- Use **Flexbox** when the layout is primarily controlled in **one axis**.
- Use **Grid** when you need to control **rows and columns together**.
- Use **Flexbox** for **small internal component layout**.
- Use **Grid** for **page sections, dashboards, card collections, and other structured repeated layouts**.
- If items wrap into multiple rows and still need clean alignment across the whole layout, use **Grid**.
- Do not simulate a grid with Flexbox by relying on width hacks.
- Do not use Grid for a simple row or column when Flexbox solves it cleanly.
- A strong default is: **Grid outside, Flexbox inside**.

### Example — Flexbox

Use Flexbox for a card header with a title on the left and actions on the right.

```html
<header class="card-header">
  <h3>Project details</h3>
  <div class="actions">
    <button>Edit</button>
    <button>Share</button>
  </div>
</header>
```

```css
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-stack-gap-tight);
}

.actions {
  display: flex;
  gap: var(--space-control-gap-tight);
}
```

### Example — Grid

Use Grid for a dashboard section with cards arranged in aligned columns.

```html
<section class="stats-grid">
  <article>Revenue</article>
  <article>Orders</article>
  <article>Customers</article>
  <article>Conversion</article>
</section>
```

```css
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-stack-gap-tight);
}
```

## Grid and responsiveness

- use stable grids and shared layout primitives
- keep readable line lengths
- preserve action clarity on smaller screens
- - avoid responsive changes that reorder meaning unpredictably

## White space and stability

White space should clarify structure, relationships, and hierarchy — not create decorative emptiness. Use spacing to show what belongs together, what should be scanned separately, and where the user should focus first. The interface should remain visually stable as data loads, errors appear, or content expands.

- Use tighter spacing within related groups and larger spacing between distinct groups.
- Let spacing reinforce hierarchy, not replace it. Major structural changes should still be expressed through headings, alignment, and layout.
- Prefer a consistent spacing scale or spacing tokens. Avoid arbitrary one-off values.
- Apply white space at multiple levels: within components, between components, and between sections.
- Reserve space for loading states, helper text, validation, error messages, and dynamic content.
- Prevent layout shift when content appears asynchronously. Define dimensions, min-heights, aspect ratios, or placeholders where needed.
- Do not compress layouts until scanability, readability, or click accuracy starts to suffer.
- In repeated layouts, keep spacing predictable. Similar content should use similar spacing patterns.

## Decision model for AI

When generating layout:

1. identify the main task
2. define the primary content region
3. position the primary action
4. group supporting context
5. verify responsive behavior and layout stability
