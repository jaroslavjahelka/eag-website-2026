# Web application install and setup

Reference: [governance/repo-profile.md](../../governance/repo-profile.md)

Related stack reference: [docs/workflows/references/technical-stack.md](../../docs/workflows/references/technical-stack.md)

## Step 1: Create the repository with Vite + React Router v7

It is a **React Router framework-mode** application generated from Vite's starter flow.

1. Create the project using `Vite`
2. Choose the `React Router v7` variant during scaffolding.
3. No `git` initiate.

---

## Step 2: OXC formatter and linter

- Install and initiate config files for `OXC` linter nad formatter.
- Rewrite the config file as define here in `oxfmtrc.json file` and `oxlintrc.json`.

### oxfmtrc.json file

```json
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "ignorePatterns": [],
  "experimentalTailwindcss": {
    "attributes": ["class", "className"],
    "functions": ["clsx", "cn", "tv"],
    "preserveDuplicates": false,
    "preserveWhitespace": false
  },
  "experimentalSortImports": {
    "groups": [
      ["side_effect"],
      ["value-builtin"],
      ["value-external", "type-external"],
      ["value-internal", "type-internal"],
      ["value-parent", "type-parent"],
      ["value-sibling", "type-sibling"],
      ["value-index", "type-index"]
    ]
  }
}
```

### oxlintrc.json

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["unicorn", "typescript", "oxc"],
  "categories": {},
  "rules": {
    "constructor-super": "warn",
    "for-direction": "warn",
    "no-async-promise-executor": "warn",
    "no-caller": "warn",
    "no-class-assign": "warn",
    "no-compare-neg-zero": "warn",
    "no-cond-assign": "warn",
    "no-const-assign": "warn",
    "no-constant-binary-expression": "warn",
    "no-constant-condition": "warn",
    "no-control-regex": "warn",
    "no-debugger": "warn",
    "no-delete-var": "warn",
    "no-dupe-class-members": "warn",
    "no-dupe-else-if": "warn",
    "no-dupe-keys": "warn",
    "no-duplicate-case": "warn",
    "no-empty-character-class": "warn",
    "no-empty-pattern": "warn",
    "no-empty-static-block": "warn",
    "no-eval": "warn",
    "no-ex-assign": "warn",
    "no-extra-boolean-cast": "warn",
    "no-func-assign": "warn",
    "no-global-assign": "warn",
    "no-import-assign": "warn",
    "no-invalid-regexp": "warn",
    "no-irregular-whitespace": "warn",
    "no-loss-of-precision": "warn",
    "no-new-native-nonconstructor": "warn",
    "no-nonoctal-decimal-escape": "warn",
    "no-obj-calls": "warn",
    "no-self-assign": "warn",
    "no-setter-return": "warn",
    "no-shadow-restricted-names": "warn",
    "no-sparse-arrays": "warn",
    "no-this-before-super": "warn",
    "no-unassigned-vars": "warn",
    "no-unsafe-finally": "warn",
    "no-unsafe-negation": "warn",
    "no-unsafe-optional-chaining": "warn",
    "no-unused-expressions": "warn",
    "no-unused-labels": "warn",
    "no-unused-private-class-members": "warn",
    "no-unused-vars": "warn",
    "no-useless-backreference": "warn",
    "no-useless-catch": "warn",
    "no-useless-escape": "warn",
    "no-useless-rename": "warn",
    "no-with": "warn",
    "require-yield": "warn",
    "use-isnan": "warn",
    "valid-typeof": "warn",
    "oxc/bad-array-method-on-arguments": "warn",
    "oxc/bad-char-at-comparison": "warn",
    "oxc/bad-comparison-sequence": "warn",
    "oxc/bad-min-max-func": "warn",
    "oxc/bad-object-literal-comparison": "warn",
    "oxc/bad-replace-all-arg": "warn",
    "oxc/const-comparisons": "warn",
    "oxc/double-comparisons": "warn",
    "oxc/erasing-op": "warn",
    "oxc/missing-throw": "warn",
    "oxc/number-arg-out-of-range": "warn",
    "oxc/only-used-in-recursion": "warn",
    "oxc/uninvoked-array-callback": "warn",
    "typescript/await-thenable": "warn",
    "typescript/no-array-delete": "warn",
    "typescript/no-base-to-string": "warn",
    "typescript/no-duplicate-enum-values": "warn",
    "typescript/no-duplicate-type-constituents": "warn",
    "typescript/no-extra-non-null-assertion": "warn",
    "typescript/no-floating-promises": "warn",
    "typescript/no-for-in-array": "warn",
    "typescript/no-implied-eval": "warn",
    "typescript/no-meaningless-void-operator": "warn",
    "typescript/no-misused-new": "warn",
    "typescript/no-misused-spread": "warn",
    "typescript/no-non-null-asserted-optional-chain": "warn",
    "typescript/no-redundant-type-constituents": "warn",
    "typescript/no-this-alias": "warn",
    "typescript/no-unnecessary-parameter-property-assignment": "warn",
    "typescript/no-unsafe-declaration-merging": "warn",
    "typescript/no-unsafe-unary-minus": "warn",
    "typescript/no-useless-empty-export": "warn",
    "typescript/no-wrapper-object-types": "warn",
    "typescript/prefer-as-const": "warn",
    "typescript/require-array-sort-compare": "warn",
    "typescript/restrict-template-expressions": "warn",
    "typescript/triple-slash-reference": "warn",
    "typescript/unbound-method": "warn",
    "unicorn/no-await-in-promise-methods": "warn",
    "unicorn/no-empty-file": "warn",
    "unicorn/no-invalid-fetch-options": "warn",
    "unicorn/no-invalid-remove-event-listener": "warn",
    "unicorn/no-new-array": "warn",
    "unicorn/no-single-promise-in-promise-methods": "warn",
    "unicorn/no-thenable": "warn",
    "unicorn/no-unnecessary-await": "warn",
    "unicorn/no-useless-fallback-in-spread": "warn",
    "unicorn/no-useless-length-check": "warn",
    "unicorn/no-useless-spread": "warn",
    "unicorn/prefer-set-size": "warn",
    "unicorn/prefer-string-starts-ends-with": "warn"
  },
  "settings": {
    "jsx-a11y": {
      "polymorphicPropName": null,
      "components": {},
      "attributes": {}
    },
    "next": {
      "rootDir": []
    },
    "react": {
      "formComponents": [],
      "linkComponents": [],
      "version": null
    },
    "jsdoc": {
      "ignorePrivate": false,
      "ignoreInternal": false,
      "ignoreReplacesDocs": true,
      "overrideReplacesDocs": true,
      "augmentsExtendsReplacesDocs": false,
      "implementsReplacesDocs": false,
      "exemptDestructuredRootsFromChecks": false,
      "tagNamePreference": {}
    },
    "vitest": {
      "typecheck": false
    }
  },
  "env": {
    "builtin": true
  },
  "globals": {},
  "ignorePatterns": []
}
```

## Step 3: Install React Aria Components

Website: [Offical Documentation](https://react-aria.adobe.com)

Install the core engine for our custom components. React Aria is style-free out of the box, allowing you to build custom designs to fit your application or design system using any styling and animation solution. Each component is broken down into individual parts with built-in states, render props, and slots that make styling a breeze.

```
bun add react-aria-components
```

## Step 4: Install Tailwind Variants

Website: [Offical Documentation](https://www.tailwind-variants.org/docs/getting-started)

Install utility library for class organisation and merging classes to by able to create a complex tailwind classes and overrides.

```
bun install tailwind-variants
```

Immediately after installation, for automatic Tailwind CSS conflict resolution you need to install Tailwind Merge.

```
bun install tailwind-merge
```

## Step 5: Install GSAP

Website: [Offical Documentation](https://gsap.com/docs/v3/)

Install the GreenSock Animation Platform (GSAP) for advanced animations and interactions.

```
bun install gsap
```

## Step 6: Install Lenis

Website: [Offical Documentation](https://lenis.io/docs)

Install the Lenis the state of the art library for smooth scrolling.

```
bun install lenis
```

Immediately after installation, setup Lenis in the `root.tsx` layout to enable smooth scrolling for all pages.

```tsx
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

## Step 7: Install JSDocs

```
bun install jsdoc
```

## Step 8: Install Phosphor Icons

Install the Phosphor Icons library for a collection of open-source icons.

```
bun install @phosphor-icons/react
```
