# Component File Architecture

Component file organization should make responsibility obvious.

## Naming convention

| Item          | Case variant     |
| ------------- | ---------------- |
| let           | UPPER_SNAKE_CASE |
| const         | camelCase        |
| component     | PascalCase       |
| componentFile | kebab-case       |
| folder        | kebab-case       |
| pageFile      | PascalCase       |
| parameter     | camelCase        |

## Shared components

Shared components belong in stable shared paths and should stay product-agnostic.

Example:

```
app/
└── shared/
   └── components/
      └── component-name/
      ├── ComponentName.guide.md
      ├── ComponentName.tsx
      └── index.ts
```

Guidelines:

`ComponentName.guide.md`

- colocate the component with related tests, stories, or helpers when the repository uses them
- keep the component entry file obvious
- avoid burying the main export in deep folder nesting without strong reason

## Local components

Local components belong near the page, route, or feature they serve.
Do not promote a component to shared status before reuse is proven.

Example:

```
app/
└── routes/
	└── homepage/
		├── components/
		|   └── component-name/
		|       ├── ComponentName.guide.md
		|       ├── ComponentName.tsx
		|       └── index.ts
		└── Homepage.tsx
```

## File structure inside a component

Keep the public API and the implementation shape obvious.

Typical sequence:

1. imports
2. local types
3. styles or token wiring
4. component implementation
5. small local helpers if needed

## Props and styling organization

- prop names should remain semantic
- styling should have a clear single source of truth
- use `tv()` patterns consistently when the repository uses Tailwind Variants
- prefer `base` for single-root styling
- prefer `slots` for multi-part components

## Indexing

Use index files only when they improve discoverability.
Do not add barrel layers that hide the real implementation path unnecessarily.

## Examples

```tsx
export function ComponentName(props: { className?: string }) {
  return <h1 className={props.className}>Hello</h1>;
}
```

```tsx
import { tv } from "tailwind-variants";

interface Props {
  className?: string;
  title: string;
}

const styles = tv({
  slots: {
    wrapper: "bg-white",
    title: "text-b1",
  },
});
const { wrapper, title } = styles();

/**
 * COMPONENT NAME
 * @version 1.0.0
 *
 * @Description
 * This is a short description of the component.
 */
export function ComponentName(props: Props) {
  return (
    <div className={wrapper({ className: props.className })}>
      <h1 className={title()}>{props.title}</h1>
    </div>
  );
}
```
