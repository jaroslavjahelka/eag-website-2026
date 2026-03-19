# Component Primitives

This document defines the default implementation primitives for shared UI work.

## Accessibility and behavior primitives

Use **React Aria Components** when accessible behavior primitives are needed.

`bun install react-aria-components`

Guidelines:

- prefer repository-native primitives first
- use React Aria when it fits the interaction model cleanly
- do not replace repository architecture with library demos

## Styling primitives

The repository uses **Tailwind CSS** and **Tailwind Variants** with support for Tailwind Merge.

### Tailwind Variants

If there is one component in the file, use `styles` naming as the styling source of truth.
If there is only one styled element, use `base`.
Otherwise use `slots`.

```tsx
const styles = tv({
  base: "",
});

export function ComponentName() {
  return <h1 className={styles()}>Hello</h1>;
}
```

Sometimes a single item has many classes.
Use arrays when it improves readability.

```tsx
const styles = tv({
  base: ["h-500 w-500 bg-red text-white rounded-lg p-40", "md:h-400 md-w-400"],
});
```

Complex components with multiple items should use slots.

```tsx
const styles = tv({
  slots: {
    wrapper: "p-40",
    title: "text-b1",
  },
});

const { wrapper, title } = styles();
```

## Icons

Use **Phosphor Icons** as the default icon library unless the real repository clearly uses another icon system.

## Rules

- keep implementation primitives consistent across the codebase
- do not mix parallel styling strategies casually
- do not introduce a new icon or component behavior library without a clear repository-level decision
