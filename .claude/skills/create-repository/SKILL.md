# Create repository

---

## References

- mandatory technical stack: [technical-stack.md](../../governance/technical-stack.md)

---

## Sequence

1. Create the project using `bun create vite`. More details [Step 1: Title](<SKILL#Step 1: Vite install>)
2. Install `bun add oxlint`and `bun add oxfmt`, then initiate config files for `OXC`linter`bun oxlint --init` and formatter `bun oxfmt --init`. More details [Step 2: OXC linter and formatter](<SKILL#Step 2: OXC Linter and Formatter>)
   1. Rewrite the formatter config file from templates [oxfmtrc.json](./assets/template-oxfmtrc.json)
   2. Rewrite the linter config file from templates [oxlintrc.json](./assets/template-oxlintrc.json)
3. Install `bun install tailwind-variants` and after `bun install tailwind-merge` utility library. More details [Step 3: Tailwind Variants](<SKILL#Step 3: Tailwind Variants>)
   1. Rewrite the main css file located in `app/app.css` with template [config-css.md](./assets/template-css.md)
4. Install `bun add react-aria-components` headless components library. More details [Step 4: React Aria Components](<SKILL#Step 4: React Aria Components>)
5. Install `bun install gsap` and `bun add @gsap/react` animation platform. More details [Step 5: GSAP](<SKILL#Step 5: GSAP>)
6. Install `bun install lenis`. More details [Step 6: Lenis](<SKILL#Step 6: Lenis>)
   1. After installation setup Lenis in the `root.tsx` with template [config-lenis.md](./assets/template-lenis.md)
7. Install `bun install jsdoc`.
8. Install `bun install @phosphor-icons/react`.

---

## Step 1: Vite install

- [Official documentation](https://vite.dev)
- Choose the `React Router v7` (React Router framework-mode) variant durint scaffolding
- No `git` initiate needed when setup

---

## Step 2: OXC linter and formatter

- [Official documentation](https://oxc.rs)
- A collection of high-performance JavaScript tools written in Rust

---

## Step 3: Tailwind Variants

- [Official documentation](https://www.tailwind-variants.org/docs/getting-started)
- Utility library for class organisation and merging classes to by able to create a complex tailwind classes and overrides.
- For automatic Tailwind CSS conflict resolution you need to install Tailwind Merge
- Default spacing scale is override by multiplying or dividing by 1 (`--spacing: 1px;`)

---

## Step 4: React Aria Components

- [Official documentation](https://react-aria.adobe.com)
- React Aria is style-free out of the box, allowing you to build custom designs to fit your application or design system using any styling and animation solution.
- Each component is broken down into individual parts with built-in states, render props, and slots that make styling a breeze.

---

## Step 5: GSAP

- [Official documentation](https://gsap.com/docs/v3/)
- GreenSock Animation Platform (GSAP) for advanced animations and interactions.

---

## Step 6: Lenis

- [Official documentation](https://lenis.io/docs)
- Lenis the state of the art library for smooth scrolling.

---

## Step 7: JSDocs

- [Official documentation](https://jsdoc.app)
- JSDoc's purpose is to document the API of your JavaScript application or library.

---

## Step 8: Phosphor icons

- [Official documentation]()
- Phosphor Icons is library for a collection of open-source icons.
