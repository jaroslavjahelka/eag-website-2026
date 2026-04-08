# Review: VideoHero component and page integrations

## Verdict

fail

## Scope

code | design

## Summary

The VideoHero component is well-structured, uses the correct tech stack (tv(), Phosphor Icons, GSAP, Geist/Source Serif 4 fonts), handles HLS video with proper SSR-safe lazy import and cleanup, and respects prefers-reduced-motion. However, there are several issues that prevent approval: CTA anchor links point to non-existent IDs on all four pages, the SVG filter/gradient IDs are hardcoded and will collide if multiple VideoHero instances ever render in the same document, there are orphaned i18n keys left behind from the old hero implementation, and the glass card inline style helper is unnecessary complexity when a plain object would suffice.

## Findings

- severity: critical
- title: CTA anchor targets do not exist
- problem: Each page passes a `ctaTo` prop pointing to a fragment identifier (`#timeline`, `#team-grid`, `#media-content`, `#projects-grid`), but none of these IDs exist on any element in the respective page files. The CTA button scrolls nowhere.
- impact: Users clicking the primary call-to-action get no response. This breaks the core hero interaction on all four pages.
- required change: Add `id="timeline"` to the `<section>` in `TimelineSection` in story.tsx, `id="team-grid"` to the team grid `<section>` in team.tsx, `id="media-content"` to the content `<section>` in media.tsx, and `id="projects-grid"` to the projects grid `<section>` in projects.tsx.

---

- severity: major
- title: SVG filter and gradient IDs will collide across instances
- problem: The SVG inside VideoHero uses hardcoded `id="hero-glow-blur"` and `id="hero-glow-grad"`. If two VideoHero components ever render in the same document (e.g., during a page transition in React Router, or if the component is used in a layout that mounts two), the duplicate IDs cause the browser to use the first definition found, producing incorrect rendering for the second instance.
- impact: Visual corruption of the glow effect on subsequent hero instances; invalid HTML (duplicate IDs).
- required change: Use `useId()` from React 19 to generate unique IDs for the SVG filter and gradient, e.g. `const filterId = useId(); const gradId = useId();` and reference them via `filter={`url(#${filterId})`}`.

---

- severity: major
- title: Orphaned i18n keys from old team hero
- problem: The i18n file still contains `team.hero.title` and `team.hero.subtitle` (lines 283-284 EN, lines 657-658 CS) which are no longer referenced anywhere in the codebase. The new VideoHero uses `team.hero.headline`, `team.hero.headlineAccent`, etc.
- impact: Dead translation keys increase maintenance burden and cause confusion about which keys are canonical.
- required change: Remove `team.hero.title` and `team.hero.subtitle` from both the EN and CS translation objects in `app/i18n.tsx`.

---

- severity: minor
- title: parseInlineStyles helper is unnecessary complexity
- problem: The `parseInlineStyles` function (lines 346-360) parses a CSS string into a React style object at runtime. This is a fragile approach (no vendor prefix handling beyond what happens to work, no validation) when the same result can be achieved with a plain object literal.
- impact: Unnecessary runtime parsing on every render; the `-webkit-backdrop-filter` property is correctly converted only by accident because the kebab-to-camel regex produces `WebkitBackdropFilter` which React accepts, but this is brittle.
- required change: Replace the `glassCardCss` string and `parseInlineStyles` call with a direct style object: `{ background: "rgba(255,255,255,0.01)", backgroundBlendMode: "luminosity", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)" }`.

---

- severity: minor
- title: Native HLS path has no cleanup
- problem: In the `useHls` hook, the Safari branch (line 102-105) sets `video.src` and calls `play()`, but the cleanup function (line 130-134) only destroys the `hls.js` instance. If the native path was taken, no cleanup resets the video source on unmount.
- impact: Minor memory leak potential on Safari when the component unmounts while video is playing. The video element's internal resources may not be released promptly.
- required change: In the cleanup function, add a fallback that pauses the video and removes the source when hls.js was not used: `if (!hls && video) { video.pause(); video.removeAttribute("src"); video.load(); }`.

---

- severity: minor
- title: Glass card has fixed pixel dimensions
- problem: The card slot style uses `h-[200px] w-[200px]` which creates a rigid box that does not adapt to content length or screen size.
- impact: On smaller screens or with longer translated text (Czech translations tend to be longer), the card content may overflow or be clipped.
- required change: Consider using `min-h-[200px] w-[200px]` or responsive sizing to allow the card to grow when content requires more space.

---

- severity: minor
- title: Video element lacks poster attribute
- problem: The `<video>` element has no `poster` attribute. Before the HLS stream loads (or if it fails and `hlsFailed` becomes true late), users see a blank/black area.
- impact: Flash of empty content during initial load, especially on slower connections.
- required change: Add a `poster` prop to VideoHeroProps (with a sensible default) and apply it to the `<video>` element for a graceful loading state.

## Missing checks

- Visual regression testing was not performed; the review is code-only.
- The `useScrollReveal` hook referenced in page files was not audited as it is outside the scope of this review.
- The `HorizontalScroll` lazy-loaded component in story.tsx was not reviewed.
- Mobile viewport behavior of the VideoHero was not tested in a browser.
- Performance profiling of hls.js bundle size impact was not measured.

## Approval

not-approved
