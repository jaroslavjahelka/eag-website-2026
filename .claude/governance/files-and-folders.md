# Files and folders

---

## Naming convention

| Item             | Case variant     |
| ---------------- | ---------------- |
| const (value)    | camelCase        |
| const (constant) | UPPER_SNAKE_CASE |
| let              | camelCase        |
| component        | camelCase        |
| componentFile    | kebab-case       |
| folder           | kebab-case       |
| pageFile         | camelCase        |
| parameter        | camelCase        |

## Shared components

Shared components belong in stable shared paths and should stay product-agnostic.

```
app/
└── shared/
   └── components/
      └── component-name/
      |	├── componentName.guide.md
      |	└── componentName.tsx
      └── index.ts
```

## Local components

Local components belong near the route, or feature they serve.
Do not promote a component to shared status before reuse is proven.

```
app/
└── routes/
	└── route-name/
		├── components/
		|   ├── component-name/
		|   |   ├── componentName.guide.md
		|   |   └── componentName.tsx
		|   └── index.ts
		└── routeName.tsx
```

## Indexing

Use index files only when they improve discoverability.
