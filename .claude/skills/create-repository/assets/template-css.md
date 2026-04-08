# Config CSS

---

```css
@import url("https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap");
@import "tailwindcss";

:root {
  color-scheme: light dark;
}

@layer base {
  html {
    font-synthesis: none;
    font-kerning: normal;
    font-variant-ligatures: common-ligatures;
    font-optical-sizing: auto;
    text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-rendering: optimizeLegibility;
  }

  body {
    background-color: var(--color-container);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @apply font-normal;
    @apply text-a3;
  }

  code,
  pre,
  kbd,
  samp {
    font-variant-ligatures: none;
    font-feature-settings: "calt" 0;
  }

  strong {
    @apply font-semibold;
  }
}

@layer components {
  .grid-main {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: var(--gap-main);
  }
}

@theme {
  --spacing: 1px;
  --gap-main: 40px;

  /*

 	TYPOGRAPHY

   */
  --font-sans: "Geist", "sans-serif";
  --font-mono: "Geist Mono", "monospace";
  --font-serif: "Source Serif 4", "serif";

  --font-weight-thin: 100;
  --font-weight-extralight: 190;
  --font-weight-light: 280;
  --font-weight-normal: 380;
  --font-weight-medium: 490;
  --font-weight-semibold: 540;
  --font-weight-bold: 680;
  --font-weight-extrabold: 780;
  --font-weight-black: 900;

  --text-*: initial;

  /*
   * A-SERIES - GENERAL TEXT
   *
   * Optimized for UI surfaces, interactive components, and data-dense layouts. The A-series covers everything
   * from primary interface labels down to compact microcopy, with optical sizing tuned for readability at small scales
   * and fast scanning. Use across dashboards, forms, navigation, cards, tables, and any context where text serves
   * a functional role within a product interface.
   *
   */
  --text-a1: clamp(1.1875rem, 2vw, 1.3125rem);
  --text-a1--line-height: 1.62;
  --text-a1--letter-spacing: 0.01em;
  --text-a1--font-weight: 415;

  --text-a2: 1.2rem;
  --text-a2--line-height: 1.6;
  --text-a2--letter-spacing: 0.01em;
  --text-a2--font-weight: 400;

  --text-a3: 1rem;
  --text-a3--line-height: 1.6;
  --text-a3--letter-spacing: 0.01em;
  --text-a3--font-weight: 395;

  --text-a4: 0.875rem;
  --text-a4--line-height: 1.54;
  --text-a4--letter-spacing: 0.01em;
  --text-a5--font-weight: 405;

  --text-a5: 0.75rem;
  --text-a5--line-height: 1.5;
  --text-a5--letter-spacing: 0.04em;
  --text-a5--font-weight: 415;

  --text-a6: 0.625rem;
  --text-a6--line-height: 1.5;
  --text-a6--letter-spacing: 0.04em;
  --text-a6--font-weight: 434;

  /*
   * B-SERIES - GENERAL HEADINGS
   *
   * Designed for long-form reading, editorial content, and structured documents. The B-series provides
   * a six-level heading hierarchy suited to articles, legal documents, reports, and any content where readers
   * follow a sustained narrative flow. Fluid sizing ensures consistent typographic hierarchy from mobile
   * to desktop without manual breakpoint management.
   *
   */
  --text-b1: clamp(2.25rem, 5vw, 3rem);
  --text-b1--line-height: 1.2;
  --text-b1--letter-spacing: -0.005em;
  --text-b1--font-weight: 640;

  --text-b2: clamp(1.75rem, 4vw, 2.25rem);
  --text-b2--line-height: 1.2;
  --text-b2--letter-spacing: -0.01em;
  --text-b2--font-weight: 650;

  --text-b3: clamp(1.5rem, 3.5vw, 1.75rem);
  --text-b3--line-height: 1.22;
  --text-b3--letter-spacing: 0.004em;
  --text-b3--font-weight: 660;

  --text-b4: clamp(1.3125rem, 3.2vw, 1.5rem);
  --text-b4--line-height: 1.3;
  --text-b4--letter-spacing: 0.004em;
  --text-b4--font-weight: 670;

  --text-b5: clamp(1.1875rem, 2vw, 1.25rem);
  --text-b5--line-height: 1.6;
  --text-b5--letter-spacing: 0.01em;
  --text-b5--font-weight: 680;

  --text-b6: 1.1rem;
  --text-b6--line-height: 1.6;
  --text-b6--letter-spacing: 0.024em;
  --text-b6--font-weight: 690;

  /*
   * C-SERIES - DISPLAY/MARKETING HEADINGS
   *
   * Designed for long-form reading, editorial content, and structured documents. The B-series provides
   * a six-level heading hierarchy suited to articles, legal documents, reports, and any content where readers
   * follow a sustained narrative flow. Fluid sizing ensures consistent typographic hierarchy from mobile
   * to desktop without manual breakpoint management.
   *
   */
  --text-c1: 15rem;
  --text-c1--line-height: 1;
  --text-c1--letter-spacing: 0em;
  --text-c1--font-weight: 680;

  --text-c2: clamp(5rem, 10vw, 10rem);
  --text-c2--line-height: 1;
  --text-c2--letter-spacing: -0.07em;
  --text-c2--font-weight: 680;

  --text-c3: clamp(4.5rem, 9vw, 7.5rem);
  --text-c3--line-height: 1.05;
  --text-c3--letter-spacing: -0.05em;
  --text-c3--font-weight: 680;

  --text-c4: clamp(4rem, 8vw, 6rem);
  --text-c4--line-height: 1.1;
  --text-c4--letter-spacing: -0.04em;
  --text-c4--font-weight: 680;

  --text-c5: clamp(3.5rem, 7vw, 4.5rem);
  --text-c5--line-height: 1.12;
  --text-c5--letter-spacing: -0.035em;
  --text-c5--font-weight: 680;

  --text-c6: clamp(3rem, 6vw, 3.5rem);
  --text-c6--line-height: 1.15;
  --text-c6--letter-spacing: -0.02em;
  --text-c6--font-weight: 680;

  /*

 	COLORS

   */
  --color-*: initial;

  --color-white: #fff;
  --color-black: #000;

  --color-accent: var(--color-coral-base);

  --color-typo-primary: light-dark(var(--color-gray-90), var(--color-white));
  --color-typo-secondary: light-dark(var(--color-gray-60), var(--color-gray-40));
  --color-typo-tertiary: light-dark(var(--color-gray-40), var(--color-gray-60));
  --color-typo-inverse: light-dark(var(--color-white), var(--color-gray-90));
  --color-typo-disabled: light-dark(var(--color-gray-40), var(--color-gray-60));

  --color-status-success: var(--color-green-base);
  --color-status-success-surface: light-dark(var(--color-green-10), var(--color-green-90));

  --color-status-warning: var(--color-orange-base);
  --color-status-warning-surface: light-dark(var(--color-orange-10), var(--color-orange-90));

  --color-status-danger: var(--color-red-base);
  --color-status-danger-surface: light-dark(var(--color-red-10), var(--color-red-90));

  --color-status-info: var(--color-blue-base);
  --color-status-info-surface: light-dark(var(--color-blue-10), var(--color-blue-90));

  /* BASE COLORS */
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

  /* COLOR PALETTES */
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
