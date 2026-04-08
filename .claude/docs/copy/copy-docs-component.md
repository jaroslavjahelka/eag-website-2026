# Component documentation

<principle>
	Use JSDoc to document shared components.
</principle>

By default, use a simple form that states the component name, version, and a short description of purpose.

```tsx
/**
 * COMPONENT NAME
 * @version 1.0.0
 *
 * @Description
 * This is a description of the component.
 */
export function ComponentName() {
  return null;
}
```

---

## `@property`

If props need documentation, use `@property`.

### When to use `@property`

- when a component accepts props that other developers need to understand
- when a prop has a specific type that should be communicated clearly
- when a prop is optional and should be marked as [n]
- when the prop purpose is not self-explanatory

### When not to use `@property`

- when a component has no props
- when the prop name and type already make the meaning obvious
- when documenting internal or private variables
- when the prop is inherited from a third-party library and already documented elsewhere

<template>
	/**
	 * COMPONENT NAME
	 * @version 1.0.0
	 *
	 * @Description
	 * This is a description of the component.
	 *
	 * @property {string} [n] classname - Additional CSS classes.
	 * @property {string} title - Component title.
	 */
</template>

---

## `@example`

When useful, include a small usage `@example` for other developers.

```tsx
/**
 * @example
 * <ComponentName className="custom-class" title="Custom title" />
 */
```
