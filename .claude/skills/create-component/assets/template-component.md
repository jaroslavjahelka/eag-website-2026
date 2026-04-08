# Component template

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
