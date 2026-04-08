# Video hero sections plan

## Context summary

Replace the static image hero sections on 4 subpages (Our Story, Our Team, Media, Projects) with a high-end dark-themed video hero. The hero features an HLS video background, decorative grid lines, a central SVG glow, a "liquid glass" floating card, GSAP entrance animations, and responsive typography. A single reusable `VideoHero` component accepts props for page-specific content (eyebrow, headline, description, CTA, glass card content). The visual style follows the provided CodeNest reference but uses EAG branding, colors (eag-teal), fonts (Geist/Source Serif 4), and Phosphor Icons. The existing AppHeader is unchanged.

## Scope

- IN:
  - Install `hls.js` dependency
  - Create `VideoHero` component at `app/components/video-hero.tsx` with: HLS video background, gradient overlays, grid lines, central glow SVG, liquid glass card, eyebrow + headline + description + CTA, GSAP reveal animations, reduced-motion support, responsive design
  - Replace hero sections in `story.tsx`, `team.tsx`, `media.tsx`, `projects.tsx` with `VideoHero`
  - Add i18n keys for all 4 page heroes (eyebrow, headline, description, CTA, card tag, card title, card description)
- OUT:
  - No changes to AppHeader or global navigation
  - No new fonts (using existing Geist/Source Serif 4)
  - No lucide-react (using existing Phosphor Icons)
  - No changes to home page hero (globe hero stays)
  - No changes to page content below the hero

## Implementation steps

1. **Install hls.js** — agent: developer
   - `bun add hls.js`
   - Add to SSR bundled dependencies in react-router config if needed

2. **Create VideoHero component** — agent: developer
   - File: `app/components/video-hero.tsx`
   - Props: `eyebrow`, `headline`, `headlineAccent` (teal-colored portion), `description`, `ctaText`, `ctaTo`, `cardTag`, `cardTitle`, `cardTitleAccent` (serif italic portion), `cardDescription`
   - Sub-elements:
     - HLS video `<video>` with hls.js (enableWorker: false), 60% opacity, muted/autoplay/loop/playsInline
     - Left gradient (#0a0a0a → transparent) + bottom gradient
     - 3 vertical grid lines at 25%/50%/75% (white/10 opacity, desktop only)
     - Central SVG ellipse glow (cyan/dark-teal, 25px gaussian blur)
     - Liquid glass card (200×200px, translate-y-[-50px], glass CSS with backdrop-blur, gradient border via ::before mask-composite)
     - Eyebrow: text-a5, font-bold, uppercase, tracking-widest, eag-teal
     - Headline: text-b2 mobile → text-c5 desktop, uppercase, tracking-tight, extrabold. Accent portion in eag-teal
     - Description: text-a3, white/70 opacity, max-w-lg
     - CTA: rounded-full, bg-eag-teal, text-eag-black, uppercase, bold, ArrowRight icon
   - GSAP timeline: staggered reveal of card → eyebrow → headline → description → CTA
   - Reduced motion: instant display via `useReducedMotion`
   - Uses `tv()` from tailwind-variants for styling slots

3. **Add i18n keys** — agent: developer
   - Add translation keys for all 4 pages in `app/i18n.tsx`:
     - story: eyebrow, headline, description, CTA, card content
     - team: eyebrow, headline, description, CTA, card content
     - media: eyebrow, headline, description, CTA, card content
     - projects: eyebrow, headline, description, CTA, card content

4. **Integrate VideoHero into 4 pages** — agent: developer
   - `story.tsx`: replace `HeroSection()` with `<VideoHero>` passing story-specific props
   - `team.tsx`: replace inline hero `<section>` with `<VideoHero>` passing team-specific props
   - `media.tsx`: replace `HeroSection()` with `<VideoHero>` passing media-specific props
   - `projects.tsx`: replace `HeroSection()` with `<VideoHero>` passing projects-specific props

5. **Review** — agent: reviewer
   - Design review: component fits dark theme, uses design tokens, responsive
   - Code review: accessibility (alt text, aria, semantics), hls.js cleanup, GSAP cleanup

## Dependencies

- Step 1 (install) must complete before Step 2 (component)
- Step 2 (component) + Step 3 (i18n) can run in parallel
- Step 4 (integration) depends on Steps 2 + 3
- Step 5 (review) depends on Step 4

## Self-validation report

| Criterion           | Verdict |
| ------------------- | ------- |
| Scope clarity       | pass    |
| Decomposition       | pass    |
| Dependency map      | pass    |
| Design-system fit   | pass    |
| State coverage      | pass    |
| Scope discipline    | pass    |
| Implementation path | pass    |

## Overall verdict

ready
