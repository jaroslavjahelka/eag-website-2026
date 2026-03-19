# Typography System

Located at: `app/app.css`

Typography should preserve hierarchy, readability, and consistency across product UI.

## Rules

- use the established type scale
- use semantic text roles consistently
- preserve readable line length and density
- do not invent one-off display styles for product pages without system approval

---

## Font-family Stack

- Geist is the primary sans-serif typeface used for body copy, headings, UI labels, and all general-purpose text. Loaded with a variable weight axis (`100..900`) for maximum flexibility across light, regular, medium, semibold, and bold treatments.
- Geist Mono is monospaced companion to Geist. Use for `<pre>` blocks, inline `<code>` snippets, data tables, and any context where fixed-width alignment improves readability. Supports the same variable weight range (`100..900`).
- Source Serif 4 is optional for editorial content, long-form reading, pull quotes, and anywhere a traditional typographic tone is needed. Variable weight axis (`200..900`) plus italic support.

```css
@import url("https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap");

@theme {
  --font-sans: "Geist", "Arial", sans-serif;
  --font-mono: "Geist Mono", "Courier New", monospace;
  --font-serif: "Source Serif 4", "Georgia", serif;
}
```

---

## `font-weight` Calibration

This makes fine-tuning critical: small deviations from standard weights (e.g. `380` instead of `400` for regular) allow precise optical calibration per use case, surface, and text size. In UI contexts, perceived weight shifts with font size, background luminance, and anti-aliasing rendering.

```css
@theme {
  --font-weight-thin: 100;
  --font-weight-extralight: 190;
  --font-weight-light: 280;
  --font-weight-normal: 380;
  --font-weight-medium: 490;
  --font-weight-semibold: 540;
  --font-weight-bold: 680;
  --font-weight-extrabold: 780;
  --font-weight-black: 900;
}
```

---

## Global Font Rendering (`html`)

- Prevents browsers from auto-generating fake bold/italic glyphs (`font-synthesis: none`)
- enables proper kerning pairs (`font-kerning: normal;`)
- activates common ligatures (`fi`, `fl`, etc.)
- lets variable fonts adjust optical size automatically (`font-optical-sizing: auto;`)
- Stop mobile browsers from inflating font sizes in landscape orientation (`text-size-adjust: 100%`)

```css
@layer base {
  html {
    font-synthesis: none;
    font-kerning: normal;
    font-variant-ligatures: common-ligatures;
    font-optical-sizing: auto;
    text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
}
```

---

## Heading legibility (`h1`–`h6`)

Enables `optimizeLegibility` for all heading levels. This activates additional kerning tables and ligature data that browsers skip by default on smaller text for performance. Headings are large enough that the rendering cost is negligible, and the visual improvement — tighter, more even letter spacing — is significant.

```css
@layer base {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-rendering: optimizeLegibility;
  }
}
```

---

## `body` defaults

- Prevents horizontal overflow to eliminate unwanted scrollbars
- Applies sub-pixel antialiasing on macOS (`-webkit-font-smoothing: antialiased`) and its Firefox equivalent (`-moz-osx-font-smoothing: grayscale`) for thinner, crisper glyph rendering
- Sets the base font weight to `normal` and the default text size to the `text-a3` design token

```css
@layer base {
  body {
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @apply font-normal;
    @apply text-a3;
  }
}
```

---

## Code blocks (`code`, `pre`, `kbd`, `samp`)

Disables ligatures and contextual alternates for all monospaced elements. In code contexts, characters like `!=`, `=>`, and `fi` must render as distinct glyphs so they are not visually merged — readability and accurate character counting depend on one-to-one glyph representation.

```css
@layer base {
  code,
  pre,
  kbd,
  samp {
    font-variant-ligatures: none;
    font-feature-settings: "calt" 0;
  }
}
```

---

## `<strong>` override

We are using `font-semibold` instead of the browser default `bold`. This keeps emphasis visually distinct without appearing overly heavy, especially in `Geist` where semibold provides clear contrast against the regular weight.

```css
@layer base {
  strong {
    @apply font-semibold;
  }
}
```

---

# Typography Classes

- Always use the classes — never hand-roll custom combos

```css
@theme {
  /* Tailwind CSS Defaults override */
  --text-*: initial;
}
```

## A-Series - Text Classes

Optimized for UI surfaces, interactive components, and data-dense layouts. The A-series covers everything from primary interface labels down to compact microcopy, with optical sizing tuned for readability at small scales and fast scanning. Use across dashboards, forms, navigation, cards, tables, and any context where text serves a functional role within a product interface.

### A1 — Perex

- The "intro paragraph" style for larger than body, used right under page titles / section headlines to set context.
- Recommended line-length: `max-w-[63ch]`.

```css
@theme {
  --text-a1: clamp(1.1875rem, 2vw, 1.3125rem);
  --text-a1--line-height: 1.62;
  --text-a1--letter-spacing: 0.01em;
  --text-a1--font-weight: 415;
}
```

### A2 — Reading Copy

- Use for long-form reading content where comfort over extended passages is the priority. Ideal for article body copy, documentation, and editorial prose.
- Recommended line-length: `max-w-[65ch]`.

```css
@theme {
  --text-a2: 1.2rem;
  --text-a2--line-height: 1.6;
  --text-a2--letter-spacing: 0.01em;
  --text-a2--font-weight: 400;
}
```

### A3 — Bodycopy / Base

- Use for standard interface body copy, descriptions, and paragraph text. The workhorse text style for most readable content across the product.
- Recommended line-length: `max-w-[60ch]`.

```css
@theme {
  --text-a3: 1rem;
  --text-a3--line-height: 1.6;
  --text-a3--letter-spacing: 0.01em;
  --text-a3--font-weight: 395;
}
```

### A4 — Bodycopy Small

- Use for supporting body text, secondary descriptions, and supplementary content that sits alongside primary text without competing with it.
- Recommended line-length: `max-w-[56ch]`.

```css
@theme {
  --text-a4: 0.875rem;
  --text-a4--line-height: 1.54;
  --text-a4--letter-spacing: 0.01em;
  --text-a5--font-weight: 405;
}
```

### A5 — Supporting Copy

- Use for small but still readable supporting text: legal disclaimers, footnotes, and any supplementary text that must be present but not prominent.
- Recommended line-length: `max-w-[52ch]`.

```css
@theme {
  --text-a5: 0.75rem;
  --text-a5--line-height: 1.5;
  --text-a5--letter-spacing: 0.04em;
  --text-a5--font-weight: 415;
}
```

### A6 — Microcopy

- Use for secondary UI labels and status microcopy (glanceable text like "new" or "beta"), compact meta (timestamps, IDs), secondary metrics, helper hints in dense components, and other non-critical annotations. **Do not** use for anything users must reliably read.
- Recommended line-length: `max-w-[48ch]`.

```css
@theme {
  --text-a6: 0.625rem;
  --text-a6--line-height: 1.5;
  --text-a6--letter-spacing: 0.04em;
  --text-a6--font-weight: 434;
}
```

---

## B-Series - Headings Classes

Designed for long-form reading, editorial content, and structured documents. The B-series provides a six-level heading hierarchy suited to articles, legal documents, reports, and any content where readers follow a sustained narrative flow. Fluid sizing ensures consistent typographic hierarchy from mobile to desktop without manual breakpoint management.

### B1 – Article Title

Use for primary article headlines, legal document titles, and main page headers. Sets the visual anchor of any long-form content.

```css
@theme {
  --text-b1: clamp(2.25rem, 5vw, 3rem);
  --text-b1--line-height: 1.2;
  --text-b1--letter-spacing: -0.005em;
  --text-b1--font-weight: 640;
}
```

### B2 – Section Title

Use for major section headings in articles, chapter titles in legal documents, and primary content divisions. Establishes clear hierarchy beneath the main title.

```css
@theme {
  --text-b2: clamp(1.75rem, 4vw, 2.25rem);
  --text-b2--line-height: 1.2;
  --text-b2--letter-spacing: -0.01em;
  --text-b2--font-weight: 650;
}
```

### B3 – Subsection Title

Use for subsection headings in articles, clause headings in legal documents, and secondary content groupings. Provides intermediate hierarchy for structured long-form content.

```css
@theme {
  --text-b3: clamp(1.5rem, 3.5vw, 1.75rem);
  --text-b3--line-height: 1.22;
  --text-b3--letter-spacing: 0.004em;
  --text-b3--font-weight: 660;
}
```

### B4 – Group Heading

Use for paragraph-level headings, sub-clause titles in legal documents, FAQ questions, sidebar headings, and card titles. **Do not** use for body text or primary section breaks.

```css
@theme {
  --text-b4: clamp(1.3125rem, 3.2vw, 1.5rem);
  --text-b4--line-height: 1.3;
  --text-b4--letter-spacing: 0.004em;
  --text-b4--font-weight: 670;
}
```

### B5 – Minor Heading

Use for inline section labels, list group headings, table headers, definition terms, and tertiary divisions in dense legal or editorial content. **Do not** use where a B4 or B6 would create clearer hierarchy.

```css
@theme {
  --text-b5: clamp(1.1875rem, 2vw, 1.25rem);
  --text-b5--line-height: 1.6;
  --text-b5--letter-spacing: 0.01em;
  --text-b5--font-weight: 680;
}
```

### B6 – Base Heading

Use for the smallest heading level: inline section labels, list group headings, table headers, definition terms, and tertiary divisions in dense content. The bridge between body text and heading hierarchy.

```css
@theme {
  --text-b6: 1.1rem;
  --text-b6--line-height: 1.6;
  --text-b6--letter-spacing: 0.024em;
  --text-b6--font-weight: 690;
}
```

---

## C-Series - Display Classes

Display styles for hero sections, landing pages, and marketing surfaces where the heading carries the entire visual weight.

### C1 – Huge Display

Use for primary landing page headlines, campaign titles, and large-scale feature callouts where the heading carries the entire visual weight of a section. **Do not** use for content that needs to wrap beyond a short phrase.

```css
@theme {
  --text-c1: 15rem;
  --text-c1--line-height: 1;
  --text-c1--letter-spacing: 0em;
  --text-c1--font-weight: 680;
}
```

### C2 – Hero Display

Use for dominant hero headlines, campaign entries, and large marketing statements where the heading should immediately define the tone of the page. This is still a high-impact display size, but more flexible than `C1` and better suited for short headlines that may wrap to two lines.

```css
@theme {
  --text-c2: clamp(5rem, 10vw, 10rem);
  --text-c2--line-height: 1;
  --text-c2--letter-spacing: -0.07em;
  --text-c2--font-weight: 680;
}
```

### C3 – Large Display

Use for main section headlines, product storytelling surfaces, and feature-led landing page blocks where strong visual emphasis is still required, but the layout needs more flexibility than a top-level hero. Works well for short-to-medium phrases across responsive breakpoints.

```css
@theme {
  --text-c3: clamp(4.5rem, 9vw, 7.5rem);
  --text-c3--line-height: 1.05;
  --text-c3--letter-spacing: -0.05em;
  --text-c3--font-weight: 680;
}
```

### C4 – Section Display

Use for large section openers, campaign modules, and high-importance content blocks where the heading should feel expressive and premium without overwhelming the page. This is a strong bridge between oversized display typography and more structured heading usage.

```css
@theme {
  --text-c4: clamp(4rem, 8vw, 6rem);
  --text-c4--line-height: 1.1;
  --text-c4--letter-spacing: -0.04em;
  --text-c4--font-weight: 680;
}
```

### C5 – Compact Display

Use for secondary hero titles, promo sections, and visually expressive headings inside tighter page compositions. This size still carries display character, but is restrained enough for layouts where supporting content, UI, or imagery must share more attention.

```css
@theme {
  --text-c5: clamp(3.5rem, 7vw, 4.5rem);
  --text-c5--line-height: 1.12;
  --text-c5--letter-spacing: -0.035em;
  --text-c5--font-weight: 680;
}
```

### C6 – Small Display

Use for compact marketing headings, feature intros, banners, and smaller promotional surfaces where you want a display tone without breaking layout density. This is the lowest entry in the C-series and the point where display typography becomes more practical for mixed content environments.

```css
@theme {
  --text-c6: clamp(3rem, 6vw, 3.5rem);
  --text-c6--line-height: 1.15;
  --text-c6--letter-spacing: -0.02em;
  --text-c6--font-weight: 680;
}
```
