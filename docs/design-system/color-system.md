# Color System

Color is a semantic system, not decoration. Use color to communicate meaning, hierarchy, interaction, and status. Default to neutral surfaces and text. Introduce accent and status colors only when the interface requires a clear functional signal.

## Rules

- use semantic roles instead of raw color names in UI decisions
- do not encode critical meaning through color alone
- prefer neutral surfaces for layout and readability
- reserve saturated color for actions, feedback, and intentional emphasis
- avoid local one-off colors outside the token set
- when uncertain, choose the quieter and more neutral option

---

## Light and Dark Mode

The CSS function `light-dark()` provides an elegant way to adapt colors seamlessly for both light and dark themes. It dynamically selects appropriate color values based on the user’s current color scheme preference, ensuring optimal readability and visual consistency across interfaces. By leveraging this approach, designers can effortlessly maintain cohesive and accessible designs with minimal effort.

```css
:root {
  color-scheme: light dark;
}
```

---

## Base colors

We are using base colors to control whole color palette from one source of truth.

```css
@theme {
  --color-*: initial;

  --color-blue-base: light-dark(#339aff, #4da7ff);
  --color-coral-base: light-dark(#ff6d38, #ff7847);
  --color-cyan-base: light-dark(#00c3f5, #0acdff);
  --color-fuchsia-base: light-dark(#ff7ae7, #ff8ae9);
  --color-gray-base: light-dark(#8894aa, #73819b);
  --color-green-base: light-dark(#00c276, #47d191);
  --color-orange-base: light-dark(#ffa000, #ffaa1a);
  --color-purple-base: light-dark(#8e75f0, #a18cf2);
  --color-red-base: light-dark(#ed2939, #ef4351);
  --color-rose-base: light-dark(#ff668b, #ff7596);
  --color-teal-base: light-dark(#00cccc, #00d6d6);
  --color-violet-base: light-dark(#6464f7, #6e6ef7);
  --color-yellow-base: light-dark(#ffce0c, #ffd633);
}
```

## Generated Palettes

Derived palettes are generated from the base colors. Keep this generation logic as the source for all scales.

### Blue Palette

Blue shades serve as the primary semantic color for informational messages and neutral notifications. Representing reliability, clarity, and trust, blue effectively communicates important context without implying urgency or error.

```css
@theme {
  --color-blue-5: color-mix(in oklch, var(--color-blue-base) 10%, white 90%);
  --color-blue-10: color-mix(in oklch, var(--color-blue-base) 25%, white 75%);
  --color-blue-20: color-mix(in oklch, var(--color-blue-base) 45%, white 55%);
  --color-blue-30: color-mix(in oklch, var(--color-blue-base) 70%, white 30%);
  --color-blue-40: color-mix(in oklch, var(--color-blue-base) 85%, white 15%);
  --color-blue-50: color-mix(in oklch, var(--color-blue-base) 100%, white 0%);
  --color-blue-60: color-mix(in oklch, var(--color-blue-base) 85%, black 15%);
  --color-blue-70: color-mix(in oklch, var(--color-blue-base) 70%, black 30%);
  --color-blue-80: color-mix(in oklch, var(--color-blue-base) 55%, black 45%);
  --color-blue-90: color-mix(in oklch, var(--color-blue-base) 45%, black 55%);
  --color-blue-100: color-mix(in oklch, var(--color-blue-base) 35%, black 65%);
}
```

### Coral Palette

Coral is an inviting, energetic shade that evokes a sense of warmth and optimism. Although it carries no defined semantic function, Coral brightens user interfaces. Its blend of orange and pink tones makes it particularly effective for emphasizing interactive elements, ensuring interfaces feel welcoming and engaging without overshadowing key semantic colors.

```css
@theme {
  --color-coral-5: color-mix(in oklch, var(--color-coral-base) 10%, white 90%);
  --color-coral-10: color-mix(in oklch, var(--color-coral-base) 25%, white 75%);
  --color-coral-20: color-mix(in oklch, var(--color-coral-base) 45%, white 55%);
  --color-coral-30: color-mix(in oklch, var(--color-coral-base) 70%, white 30%);
  --color-coral-40: color-mix(in oklch, var(--color-coral-base) 85%, white 15%);
  --color-coral-50: color-mix(in oklch, var(--color-coral-base) 100%, white 0%);
  --color-coral-60: color-mix(in oklch, var(--color-coral-base) 85%, black 15%);
  --color-coral-70: color-mix(in oklch, var(--color-coral-base) 70%, black 30%);
  --color-coral-80: color-mix(in oklch, var(--color-coral-base) 55%, black 45%);
  --color-coral-90: color-mix(in oklch, var(--color-coral-base) 45%, black 55%);
  --color-coral-100: color-mix(in oklch, var(--color-coral-base) 35%, black 65%);
}
```

### Cyan Palette

Cyan is a bright, vibrant shade that introduces energy and freshness. Positioned between blue and green, it evokes openness, clarity, and a sense of innovation. Cyan is particularly effective for highlighting or accentuating elements due to its distinct visibility and ability to capture user attention.

```css
@theme {
  --color-cyan-5: color-mix(in oklch, var(--color-cyan-base) 10%, white 90%);
  --color-cyan-10: color-mix(in oklch, var(--color-cyan-base) 25%, white 75%);
  --color-cyan-20: color-mix(in oklch, var(--color-cyan-base) 45%, white 55%);
  --color-cyan-30: color-mix(in oklch, var(--color-cyan-base) 70%, white 30%);
  --color-cyan-40: color-mix(in oklch, var(--color-cyan-base) 85%, white 15%);
  --color-cyan-50: color-mix(in oklch, var(--color-cyan-base) 100%, white 0%);
  --color-cyan-60: color-mix(in oklch, var(--color-cyan-base) 85%, black 15%);
  --color-cyan-70: color-mix(in oklch, var(--color-cyan-base) 70%, black 30%);
  --color-cyan-80: color-mix(in oklch, var(--color-cyan-base) 55%, black 45%);
  --color-cyan-90: color-mix(in oklch, var(--color-cyan-base) 45%, black 55%);
  --color-cyan-100: color-mix(in oklch, var(--color-cyan-base) 35%, black 65%);
}
```

### Fuchsia Palette

Fuchsia is a vivid, dynamic shade combining attributes of pink and purple, bringing energy and boldness. Although it carries no explicit semantic meaning, Fuchsia adds visual excitement and contrast to interfaces. Its vibrant character helps emphasize particular elements or interactions.

```css
@theme {
  --color-fuchsia-5: color-mix(in oklch, var(--color-fuchsia-base) 10%, white 90%);
  --color-fuchsia-10: color-mix(in oklch, var(--color-fuchsia-base) 25%, white 75%);
  --color-fuchsia-20: color-mix(in oklch, var(--color-fuchsia-base) 45%, white 55%);
  --color-fuchsia-30: color-mix(in oklch, var(--color-fuchsia-base) 70%, white 30%);
  --color-fuchsia-40: color-mix(in oklch, var(--color-fuchsia-base) 85%, white 15%);
  --color-fuchsia-50: color-mix(in oklch, var(--color-fuchsia-base) 100%, white 0%);
  --color-fuchsia-60: color-mix(in oklch, var(--color-fuchsia-base) 85%, black 15%);
  --color-fuchsia-70: color-mix(in oklch, var(--color-fuchsia-base) 70%, black 30%);
  --color-fuchsia-80: color-mix(in oklch, var(--color-fuchsia-base) 55%, black 45%);
  --color-fuchsia-90: color-mix(in oklch, var(--color-fuchsia-base) 45%, black 55%);
  --color-fuchsia-100: color-mix(in oklch, var(--color-fuchsia-base) 35%, black 65%);
}
```

### Green Palette

Green shades within the design system primarily indicate successful outcomes, confirmations, or positive statuses. They communicate a sense of correctness, approval, or task completion, making interfaces intuitive and clear for users.

```css
@theme {
  --color-green-5: color-mix(in oklch, var(--color-green-base) 10%, white 90%);
  --color-green-10: color-mix(in oklch, var(--color-green-base) 25%, white 75%);
  --color-green-20: color-mix(in oklch, var(--color-green-base) 45%, white 55%);
  --color-green-30: color-mix(in oklch, var(--color-green-base) 70%, white 30%);
  --color-green-40: color-mix(in oklch, var(--color-green-base) 85%, white 15%);
  --color-green-50: color-mix(in oklch, var(--color-green-base) 100%, white 0%);
  --color-green-60: color-mix(in oklch, var(--color-green-base) 85%, black 15%);
  --color-green-70: color-mix(in oklch, var(--color-green-base) 70%, black 30%);
  --color-green-80: color-mix(in oklch, var(--color-green-base) 55%, black 45%);
  --color-green-90: color-mix(in oklch, var(--color-green-base) 45%, black 55%);
  --color-green-100: color-mix(in oklch, var(--color-green-base) 35%, black 65%);
}
```

### Gray Palette

Gray colors serve as the foundational palette, providing balance, clarity, and visual hierarchy across interfaces. They establish structure and consistency, ensuring optimal readability for text and supportive UI components. Versatile and understated, gray shades seamlessly integrate with semantic and accent colors, allowing functional elements to stand out clearly.

```css
@theme {
  --color-gray-5: color-mix(in oklch, var(--color-gray-base) 10%, white 90%);
  --color-gray-10: color-mix(in oklch, var(--color-gray-base) 25%, white 75%);
  --color-gray-20: color-mix(in oklch, var(--color-gray-base) 45%, white 55%);
  --color-gray-30: color-mix(in oklch, var(--color-gray-base) 70%, white 30%);
  --color-gray-40: color-mix(in oklch, var(--color-gray-base) 85%, white 15%);
  --color-gray-50: color-mix(in oklch, var(--color-gray-base) 100%, white 0%);
  --color-gray-60: color-mix(in oklch, var(--color-gray-base) 85%, black 15%);
  --color-gray-70: color-mix(in oklch, var(--color-gray-base) 70%, black 30%);
  --color-gray-80: color-mix(in oklch, var(--color-gray-base) 55%, black 45%);
  --color-gray-90: color-mix(in oklch, var(--color-gray-base) 45%, black 55%);
  --color-gray-100: color-mix(in oklch, var(--color-gray-base) 35%, black 65%);
}
```

### Orange Palette

Orange is a vivid, energetic color utilized semantically to indicate warnings, alerts, or situations that require user caution. Its strong visual presence quickly captures attention without implying immediate error, guiding users to address potential issues proactively.

```css
@theme {
  --color-orange-5: color-mix(in oklch, var(--color-orange-base) 10%, white 90%);
  --color-orange-10: color-mix(in oklch, var(--color-orange-base) 25%, white 75%);
  --color-orange-20: color-mix(in oklch, var(--color-orange-base) 45%, white 55%);
  --color-orange-30: color-mix(in oklch, var(--color-orange-base) 70%, white 30%);
  --color-orange-40: color-mix(in oklch, var(--color-orange-base) 85%, white 15%);
  --color-orange-50: color-mix(in oklch, var(--color-orange-base) 100%, white 0%);
  --color-orange-60: color-mix(in oklch, var(--color-orange-base) 85%, black 15%);
  --color-orange-70: color-mix(in oklch, var(--color-orange-base) 70%, black 30%);
  --color-orange-80: color-mix(in oklch, var(--color-orange-base) 55%, black 45%);
  --color-orange-90: color-mix(in oklch, var(--color-orange-base) 45%, black 55%);
  --color-orange-100: color-mix(in oklch, var(--color-orange-base) 35%, black 65%);
}
```

### Purple Palette

Purple is a deep, sophisticated shade that adds a sense of luxury and creativity. While it holds no defined semantic function, it enriches visual aesthetics. Associated with imagination and refinement, Purple effectively complements functional colors, enhancing the overall design harmony and appeal of the interface.

- Use purple for AI features

```css
@theme {
  --color-purple-5: color-mix(in oklch, var(--color-purple-base) 10%, white 90%);
  --color-purple-10: color-mix(in oklch, var(--color-purple-base) 25%, white 75%);
  --color-purple-20: color-mix(in oklch, var(--color-purple-base) 45%, white 55%);
  --color-purple-30: color-mix(in oklch, var(--color-purple-base) 70%, white 30%);
  --color-purple-40: color-mix(in oklch, var(--color-purple-base) 85%, white 15%);
  --color-purple-50: color-mix(in oklch, var(--color-purple-base) 100%, white 0%);
  --color-purple-60: color-mix(in oklch, var(--color-purple-base) 85%, black 15%);
  --color-purple-70: color-mix(in oklch, var(--color-purple-base) 70%, black 30%);
  --color-purple-80: color-mix(in oklch, var(--color-purple-base) 55%, black 45%);
  --color-purple-90: color-mix(in oklch, var(--color-purple-base) 45%, black 55%);
  --color-purple-100: color-mix(in oklch, var(--color-purple-base) 35%, black 65%);
}
```

### Red Palette

Red is a vivid, attention-grabbing shade carrying specific semantic importance within the design system, signaling errors, warnings, or critical situations requiring immediate user attention. Its inherent visual strength ensures quick recognition, promoting swift response and interaction.

```css
@theme {
  --color-red-5: color-mix(in oklch, var(--color-red-base) 10%, white 90%);
  --color-red-10: color-mix(in oklch, var(--color-red-base) 25%, white 75%);
  --color-red-20: color-mix(in oklch, var(--color-red-base) 45%, white 55%);
  --color-red-30: color-mix(in oklch, var(--color-red-base) 70%, white 30%);
  --color-red-40: color-mix(in oklch, var(--color-red-base) 85%, white 15%);
  --color-red-50: color-mix(in oklch, var(--color-red-base) 100%, white 0%);
  --color-red-60: color-mix(in oklch, var(--color-red-base) 85%, black 15%);
  --color-red-70: color-mix(in oklch, var(--color-red-base) 70%, black 30%);
  --color-red-80: color-mix(in oklch, var(--color-red-base) 55%, black 45%);
  --color-red-90: color-mix(in oklch, var(--color-red-base) 45%, black 55%);
  --color-red-100: color-mix(in oklch, var(--color-red-base) 35%, black 65%);
}
```

### Rose Palette

Rose is a soft, warm shade that introduces subtle warmth and sophistication. Lacking any specific semantic function, Rose provides gentle visual accents, enhancing interfaces with a refined, approachable feel. It harmonizes effortlessly with neutral and bolder colors alike, adding visual nuance.

```css
@theme {
  --color-rose-5: color-mix(in oklch, var(--color-rose-base) 10%, white 90%);
  --color-rose-10: color-mix(in oklch, var(--color-rose-base) 25%, white 75%);
  --color-rose-20: color-mix(in oklch, var(--color-rose-base) 45%, white 55%);
  --color-rose-30: color-mix(in oklch, var(--color-rose-base) 70%, white 30%);
  --color-rose-40: color-mix(in oklch, var(--color-rose-base) 85%, white 15%);
  --color-rose-50: color-mix(in oklch, var(--color-rose-base) 100%, white 0%);
  --color-rose-60: color-mix(in oklch, var(--color-rose-base) 85%, black 15%);
  --color-rose-70: color-mix(in oklch, var(--color-rose-base) 70%, black 30%);
  --color-rose-80: color-mix(in oklch, var(--color-rose-base) 55%, black 45%);
  --color-rose-90: color-mix(in oklch, var(--color-rose-base) 45%, black 55%);
  --color-rose-100: color-mix(in oklch, var(--color-rose-base) 35%, black 65%);
}
```

### Teal Palette

Teal is a balanced, calming shade blending blue and green hues, often associated with clarity, professionalism, and sophistication. It introduces subtle vibrancy and visual interest into the design system without overpowering core functional colors.

```css
@theme {
  --color-teal-5: color-mix(in oklch, var(--color-teal-base) 10%, white 90%);
  --color-teal-10: color-mix(in oklch, var(--color-teal-base) 25%, white 75%);
  --color-teal-20: color-mix(in oklch, var(--color-teal-base) 45%, white 55%);
  --color-teal-30: color-mix(in oklch, var(--color-teal-base) 70%, white 30%);
  --color-teal-40: color-mix(in oklch, var(--color-teal-base) 85%, white 15%);
  --color-teal-50: color-mix(in oklch, var(--color-teal-base) 100%, white 0%);
  --color-teal-60: color-mix(in oklch, var(--color-teal-base) 85%, black 15%);
  --color-teal-70: color-mix(in oklch, var(--color-teal-base) 70%, black 30%);
  --color-teal-80: color-mix(in oklch, var(--color-teal-base) 55%, black 45%);
  --color-teal-90: color-mix(in oklch, var(--color-teal-base) 45%, black 55%);
  --color-teal-100: color-mix(in oklch, var(--color-teal-base) 35%, black 65%);
}
```

### Violet Palette

Violet is a rich, expressive shade that brings elegance and distinction. Often linked to creativity and innovation, it subtly energizes interfaces without serving a specific functional role. The inclusion of Violet supports visual variety, making user experiences memorable and engaging.

```css
@theme {
  --color-violet-5: color-mix(in oklch, var(--color-violet-base) 10%, white 90%);
  --color-violet-10: color-mix(in oklch, var(--color-violet-base) 25%, white 75%);
  --color-violet-20: color-mix(in oklch, var(--color-violet-base) 45%, white 55%);
  --color-violet-30: color-mix(in oklch, var(--color-violet-base) 70%, white 30%);
  --color-violet-40: color-mix(in oklch, var(--color-violet-base) 85%, white 15%);
  --color-violet-50: color-mix(in oklch, var(--color-violet-base) 100%, white 0%);
  --color-violet-60: color-mix(in oklch, var(--color-violet-base) 85%, black 15%);
  --color-violet-70: color-mix(in oklch, var(--color-violet-base) 70%, black 30%);
  --color-violet-80: color-mix(in oklch, var(--color-violet-base) 55%, black 45%);
  --color-violet-90: color-mix(in oklch, var(--color-violet-base) 45%, black 55%);
  --color-violet-100: color-mix(in oklch, var(--color-violet-base) 35%, black 65%);
}
```

### Yellow Palette

Yellow is a bright, optimistic shade associated with positivity, energy, and clarity. Although not explicitly assigned a semantic role, it can occasionally function as an alternative to signify warnings or alerts, depending on context. Its natural brightness helps draw attention effectively, providing distinct highlights and supporting intuitive navigation.

```css
@theme {
  --color-yellow-5: color-mix(in oklch, var(--color-yellow-base) 10%, white 90%);
  --color-yellow-10: color-mix(in oklch, var(--color-yellow-base) 25%, white 75%);
  --color-yellow-20: color-mix(in oklch, var(--color-yellow-base) 45%, white 55%);
  --color-yellow-30: color-mix(in oklch, var(--color-yellow-base) 70%, white 30%);
  --color-yellow-40: color-mix(in oklch, var(--color-yellow-base) 85%, white 15%);
  --color-yellow-50: color-mix(in oklch, var(--color-yellow-base) 100%, white 0%);
  --color-yellow-60: color-mix(in oklch, var(--color-yellow-base) 85%, black 15%);
  --color-yellow-70: color-mix(in oklch, var(--color-yellow-base) 70%, black 30%);
  --color-yellow-80: color-mix(in oklch, var(--color-yellow-base) 55%, black 45%);
  --color-yellow-90: color-mix(in oklch, var(--color-yellow-base) 45%, black 55%);
  --color-yellow-100: color-mix(in oklch, var(--color-yellow-base) 35%, black 65%);
}
```

---

## Core Variables

These aliases are the first layer Claude should consume. They expose the stable foundation of the system without forcing component code to depend on raw scale tokens.

```css
@theme {
  --color-white: #fff;
  --color-black: #000;

  --color-accent: var(--color-coral-base);
  --color-container: light-dark(var(--color-white), var(--color-gray-100));
}
```

### Typography Variables

```css
@theme {
  --color-typo-primary: light-dark(var(--color-gray-90), var(--color-white));
  --color-typo-secondary: light-dark(var(--color-gray-60), var(--color-gray-40));
  --color-typo-tertiary: light-dark(var(--color-gray-40), var(--color-gray-60));
  --color-typo-inverse: light-dark(var(--color-white), var(--color-gray-90));
  --color-typo-disabled: light-dark(var(--color-gray-40), var(--color-gray-60));
}
```

- use `--color-typo-primary` for default body text and core labels
- use `--color-typo-secondary` for supporting copy, metadata, descriptions, and helper text
- use `--color-typo-tertiary` for quiet labels, placeholders, and low-priority interface detail
- use `--color-typo-inverse` on dark or accent surface
- use `--color-typo-disabled` for disabled text

### Surfaces Variables

```css
@theme {
  --color-surface-base: var(--color-container);
  --color-surface-raised: light-dark(var(--color-white), var(--color-gray-90));
  --color-surface-subtle: light-dark(var(--color-gray-5), var(--color-gray-80));
  --color-surface-strong: light-dark(var(--color-gray-10), var(--color-gray-70));
  --color-surface-disabled: light-dark(var(--color-gray-10), var(--color-gray-90));
}
```

- `--color-surface-base` is the default app background or main container surface
- `--color-surface-raised` is for cards, panels, sheets, and elevated modules
- `--color-surface-subtle` is for grouped regions, secondary sections, row hover states, and quiet highlights
- `--color-surface-strong` is for emphasized modules that still should remain neutral
- `--color-surface-disabled` is for disabled surfaces

### Status Variables

```css
@theme {
  --color-status-success: var(--color-green-base);
  --color-status-success-surface: light-dark(var(--color-green-10), var(--color-green-90));

  --color-status-warning: var(--color-orange-base);
  --color-status-warning-surface: light-dark(var(--color-orange-10), var(--color-orange-90));

  --color-status-danger: var(--color-red-base);
  --color-status-danger-surface: light-dark(var(--color-red-10), var(--color-red-90));

  --color-status-info: var(--color-blue-base);
  --color-status-info-surface: light-dark(var(--color-blue-10), var(--color-blue-90));
}
```

---

## Action Rules

- primary CTA uses `--color-accent`
- only one primary action should dominate within the same local area
- secondary buttons should stay neutral unless the product pattern explicitly requires otherwise
- ghost buttons and low-emphasis actions should rely on text, border, and subtle hover surfaces
- links should use accent only when they are truly interactive, not as a decorative text color

---

## Accessibility

Reference: [www.w3.org](https://www.w3.org/WAI/WCAG21/)

- all text must maintain accessible contrast against its background
- color must not be the only signal for error, success, warning, selection, or focus
- pair color with iconography, labels, copy, structure, or state indicators where needed
- subtle UI is acceptable only when readability remains intact in both light and dark mode

---

## Decision Model for AI

When generating UI, choose colors in this order:

1. pick the correct semantic role
2. apply the appropriate component pattern
3. apply the required interaction state
4. only then resolve to the underlying token

---

## AI Implementation Rules

When generating UI, Claude must follow these rules:

- start with neutral surfaces and neutral text
- use `--color-accent` for the main action, focus, selection, and intentional product emphasis
- use status colors only when the interface contains actual status meaning
- prefer semantic aliases over palette tokens
- avoid high-chroma backgrounds in core product UI
- if multiple choices are plausible, choose the quieter neutral option
- never invent new tokens, aliases, or unexplained color exceptions
