# Component architecture

A component is a reusable interaction unit with defined purpose, behavior, and states. It is not just a visual fragment.

---

## Rules

- Every component has its own file. See the structural rules here: [files-and-folders.md](../../governance/files-and-folders.md)

---

## React component logic

- TBD

---

## Reuse-first mindset

<principle>
	Before creating a new component review the checklist below.
</principle>

- [ ] check whether an existing component already solves the problem
- [ ] check whether composition solves it
- [ ] check whether a new variant solves it

---

## Props

<principle>
	Always use props like define below.
</principle>

If a component has only one prop, use the following structure:

```tsx
function ComponentName(props: { className?: string }) {
  return <h1 className={props.className}>Hello</h1>;
}
```

If a component has more than one prop, use the following structure:

```tsx
interface Props {
  className?: string;
  title: string;
}

function ComponentName(props: Props) {
  return (
    <div className={ className: props.className }>
      <h1>{props.title}</h1>
    </div>
  );
}
```

---

## Styling

- use Tailwind CSS with combination with Tailwind Variants
- use `tv()` patterns consistently when the repository uses Tailwind Variants
- prefer `base` for single-root styling
- prefer `slots` for multi-part components

```tsx
const styles = tv({
  base: "text-b1",
});

export function ComponentName() {
  return <h1 className={styles()}>Hello</h1>;
}
```

- use arrays when it improves readability:

```tsx
const styles = tv({
  base: ["h-500 w-500  text-white rounded-lg p-20", "md:h-400 md-w-400 md:p-40"],
});
```

- complex components with multiple items always use slots and own `const` for better useability:

```tsx
const styles = tv({
  slots: {
    wrapper: ["p-40", "md:p-80"],
    title: "text-b1",
  },
});

const { wrapper, title } = styles();
```

---

## States

- read [state-management/](./state-management/)
