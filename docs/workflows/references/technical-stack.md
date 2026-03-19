# Technical Stack Reference

Use these technologies when generating code unless the real product repository clearly uses something else.

| Role            | Name                  | Version | Link                                                                     |
| --------------- | --------------------- | ------- | ------------------------------------------------------------------------ |
| Bundler         | Vite                  | 6.2     | [vitejs.dev](https://vitejs.dev/guide/)                                  |
| Framework       | React                 | 19.1    | [react.dev](https://react.dev/)                                          |
| Runtime         | Bun                   | 1.2     | [bun.sh](https://bun.sh/)                                                |
| Package Manager | Bun                   | 1.2     | [bun.sh](https://bun.sh/)                                                |
| Language        | TypeScript            | 5.8     | [typescriptlang.org](https://typescriptlang.org/)                        |
| Routing         | React Router          | 7.5     | [reactrouter.com](https://reactrouter.com/home)                          |
| Styling         | Tailwind CSS          | 4.1     | [tailwindcss.com](https://tailwindcss.com/docs/)                         |
| Utility         | Tailwind Variants     | 1.0     | [tailwind-variants.org](https://tailwind-variants.org)                   |
| Linter          | OXC                   | 0.16    | [oxc.rs](https://oxc.rs/docs/guide/usage/linter)                         |
| Formatter       | OXC                   | 0.16    | [oxc.rs](https://oxc.rs/docs/guide/usage/formatter)                      |
| Animation       | GSAP                  | 3.12    | [gsap.com](https://gsap.com/docs/v3/)                                    |
| Accessibility   | React Aria Components | 1.7     | [react-spectrum.adobe.com](https://react-spectrum.adobe.com/react-aria/) |
| Icons           | Phosphor Icons        | 2.1     | [phosphoricons.com](https://phosphoricons.com/)                          |

## Version policy

Versions in this table are **pinned minimums**.
The repository may use a newer patch release within the same minor version.
Major version upgrades require an explicit governance decision and an update to this file.

## Interpretation rule

This file is a default stack reference for generated code.
If the real repository uses a different stack, prefer the implementation reality and update the canonical references when the divergence is intentional.
