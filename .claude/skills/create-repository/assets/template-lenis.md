# Config Lenis

---

```tsx
import ReactLenis from "lenis/react";

export default function App() {
  return (
    <>
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          wheelMultiplier: 1,
        }}
      />
      <Outlet />
    </>
  );
}
```
