# Spacing System

Located at: `app/app.css`

Spacing should preserve structure, hierarchy, and scan clarity across product UI.  
It is functional, not decorative.

## Rules

- use the approved spacing ramp
- keep spacing proportional to structural distance
- prefer semantic spacing roles in shared patterns
- use approved primitive utilities only from the ramp
- use `gap` for sibling spacing inside layout containers
- do not invent raw one-off spacing values in product code without system approval

---

## Tailwind Spacing Base

Tailwind is configured with a `1px` spacing base so spacing utilities are directly readable in code.

- `p-40` = `40px`
- `gap-12` = `12px`
- `px-24` = `24px`

This improves code readability for both humans and AI.

It does **not** mean every integer is approved as part of the design system.

```css
@theme {
  --spacing: 1px;
}
```

---

## Approved Spacing Ramp

Use only these primitive spacing values in product code.

### Fit Tier — Optical fit and tight UI

Use for micro spacing inside dense UI and compact components.

`0 1 2 3 4 5 6 8`

### Component Tier — Standard component spacing

Use for component padding, field spacing, button groups, and regular internal rhythm.

`10 12 14 16 20 24`

### Layout Tier — Sections and page rhythm

Use for larger grouping, layout separation, and page gutters.

`32 40 48 64 80 96 128 160`

Values outside this ramp are out of system.

```css
@theme {
  --space-0: 0px;
  --space-1: 1px;
  --space-2: 2px;
  --space-3: 3px;
  --space-4: 4px;
  --space-5: 5px;
  --space-6: 6px;
  --space-8: 8px;

  --space-10: 10px;
  --space-12: 12px;
  --space-14: 14px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;

  --space-32: 32px;
  --space-40: 40px;
  --space-48: 48px;
  --space-64: 64px;
  --space-80: 80px;
  --space-96: 96px;
  --space-128: 128px;
  --space-160: 160px;
}
```

---

## Ramp Logic

Use the smallest tier that fits the structural job.

- fit tier = optical fit, label gaps, icon gaps, dense table cells, compact control padding
- component tier = standard component inset, field-to-field spacing, card rhythm, grouped actions
- layout tier = section separation, page blocks, major layout regions, shell gutters

A `5px` gap is valid when the relationship is truly micro.  
A `40px` gap is valid when the relationship is structural.

Do not swap tiers casually.

---

## Semantic Spacing Roles

Use semantic spacing roles for shared patterns and reusable UI.  
Use primitive utilities only when the intent is obvious and local.

```css
@theme {
  --space-control-gap-tight: var(--space-4);
  --space-control-gap-default: var(--space-8);

  --space-icon-gap-tight: var(--space-4);
  --space-icon-gap-default: var(--space-5);

  --space-stack-gap-tight: var(--space-8);
  --space-stack-gap-default: var(--space-12);
  --space-stack-gap-comfortable: var(--space-16);

  --space-inset-compact: var(--space-10);
  --space-inset-default: var(--space-16);
  --space-inset-comfortable: var(--space-20);

  --space-section-gap-tight: var(--space-24);
  --space-section-gap-default: var(--space-32);
  --space-section-gap-comfortable: var(--space-40);

  --space-layout-gap-default: var(--space-48);
  --space-layout-gap-wide: var(--space-64);

  --space-page-gutter-compact: var(--space-16);
  --space-page-gutter-default: var(--space-24);
  --space-page-gutter-wide: var(--space-40);
}
```

---

## Local Hierarchy

Always preserve this order from smallest to largest.

1. micro fit inside compact controls
2. standard internal component spacing
3. stack spacing between related content
4. section spacing between distinct groups
5. layout spacing between major regions
6. page gutter and outer breathing room

Smaller spacing should imply stronger relationship.  
Larger spacing should imply weaker relationship or a new structural level.

---

## Implementation Rules

- use `gap` for sibling spacing inside flex and grid containers
- use padding for container inset
- reusable components should not own outer layout spacing
- equal relationships should use equal spacing
- nested spacing must not overpower outer layout rhythm
- prefer semantic roles in shared components
- use primitive utilities only from the approved ramp

---

## Primitive Usage Rules

Primitive Tailwind utilities are allowed when the intent is obvious, local, and on-ramp.

Good:

- `gap-5` for icon and label inside one compact control
- `p-16` for a local card prototype
- `px-24` for a page shell gutter

Bad:

- `gap-13`
- `p-18`
- `mt-[27px]`
- mixing near-equivalent values in the same pattern

If a value is not on the ramp, it is not approved by default.

---

## Exception Rules

Going out of system is allowed only when all conditions are true.

- the nearest approved value creates a real visual or interaction problem
- the value is a local optical correction, not a new reusable pattern
- the exception is documented in code
- repeated use triggers promotion into the system

Use this order:

1. try an existing semantic role
2. try the nearest approved primitive
3. if neither works, use a local documented exception
4. if the exception repeats, create a new semantic role or extend the ramp by system decision

Do not use raw custom spacing as a convenience shortcut.

---

## Approved Escape Hatch

Off-ramp values must not appear as casual bracket literals across product code.

Prefer a named local custom property:

```css
.component {
  --space-optical-adjust: 7px;
}
```

```tsx
<div className="gap-(--space-optical-adjust)">...</div>
```

This keeps the exception explicit, searchable, and reviewable.

Do not use this pattern for standard layout spacing.

---

## Examples

### Example — Icon and Label

Use fit-tier spacing for tightly related elements inside one control.

```tsx
<button className="inline-flex items-center gap-5 px-10">
  <Icon />
  <span>Export</span>
</button>
```

### Example — Card

Use semantic inset and stack roles for reusable component patterns.

```tsx
<article className="p-(--space-inset-default)">
  <div className="flex flex-col gap-(--space-stack-gap-default)">
    <h3>Pro plan</h3>
    <p>Renews on 31 May 2026</p>
  </div>
</article>
```

### Example — Form Group

Use tighter spacing inside fields and larger spacing between groups.

```tsx
<section className="flex flex-col gap-(--space-section-gap-default)">
  <div className="flex flex-col gap-(--space-stack-gap-default)">
    <div className="flex flex-col gap-4">
      <label htmlFor="email">Email</label>
      <input id="email" type="email" className="min-h-40 px-10" />
    </div>

    <div className="flex flex-col gap-4">
      <label htmlFor="phone">Phone</label>
      <input id="phone" type="tel" className="min-h-40 px-10" />
    </div>
  </div>

  <div className="flex flex-col gap-(--space-stack-gap-default)">
    <h2>Billing address</h2>
    <div className="flex flex-col gap-4">
      <label htmlFor="street">Street</label>
      <input id="street" type="text" className="min-h-40 px-10" />
    </div>
  </div>
</section>
```

### Example — Page Shell

Use semantic gutter and layout roles for page composition.

```tsx
<main className="px-(--space-page-gutter-default) py-48">
  <div className="flex flex-col gap-(--space-layout-gap-default)">
    <section>...</section>
    <section>...</section>
  </div>
</main>
```

### Example — Documented Optical Exception

Use only when the nearest ramp value genuinely fails.

```tsx
<div
  className="inline-flex items-center gap-(--space-optical-adjust)"
  style={{ ["--space-optical-adjust" as string]: "7px" }}
>
  ...
</div>
```

---

## Maintenance Rules

- treat the ramp as shared infrastructure
- add new values only for repeated cross-product needs
- prefer adding semantic roles before expanding the primitive ramp
- remove undocumented exceptions when touching old components
- review spacing drift during component refactors
- keep examples aligned with actual approved utilities

---

## Review Checklist

- is the value on the approved ramp?
- is the value in the correct tier for the relationship?
- should this be a semantic role instead of a primitive?
- should `gap` replace child margins?
- is this a reusable exception that should become a token?
