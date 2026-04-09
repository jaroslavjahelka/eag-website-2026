# Mobile fixes and image optimization plan

## Context summary

Five targeted improvements to the EAG website focusing on mobile UX and image performance:
1. Our Story mobile timeline — align card content to the left (currently centered year labels)
2. Projects page — remove scroll-reveal animation on mobile (fade+slide is not working well on mobile)
3. Media page — images load slowly (WordPress external images + no optimization)
4. Overall image loading audit — hero images missing `priority`, no `width`/`height` on images
5. Our Story mobile — remove scroll-reveal animation on mobile (same issue as Projects)

## Scope

- IN:
  - `app/routes/story.tsx` — mobile timeline layout alignment + remove `data-reveal` on mobile
  - `app/routes/projects.tsx` — remove `data-reveal` animation on mobile
  - `app/routes/media.tsx` — improve image loading for article cards
  - `app/components/optimized-image.tsx` — add `width`/`height` support for CLS prevention
  - `app/hooks/use-scroll-reveal.ts` — add mobile breakpoint awareness (optional, if needed)
  - Hero images across all routes — add `priority` prop for above-fold images
- OUT:
  - New components or pages
  - WordPress image server optimization (external, not our control)
  - srcset/responsive image generation (build pipeline change)
  - AVIF format support
  - Desktop animation changes

## Implementation steps

1. **Our Story mobile: align data left + remove mobile animation** — agent: developer
   - In `story.tsx` mobile section (`md:hidden`), change year label from `text-center` to `text-left`
   - Remove `data-reveal` from mobile timeline cards (keep it for desktop)
   - Split mobile and desktop rendering to have independent animation control

2. **Projects: remove scroll-reveal on mobile** — agent: developer
   - In `projects.tsx`, conditionally apply `data-reveal` only on `md:` and up
   - Approach: use CSS to override `reveal-base` on mobile, or conditionally render

3. **Image loading optimization** — agent: developer
   - Add `priority` prop to all hero/above-fold `OptimizedImage` usages:
     - `story.tsx` hero bg
     - `projects.tsx` hero bg
     - `media.tsx` hero bg
     - `home.tsx` hero fallback bg
     - `team.tsx` hero bg
     - `contact-section.tsx` bg
   - Add explicit `width` and `height` attributes to `OptimizedImage` where possible for CLS
   - For media article images: add `sizes` attribute to help browser choose correct resolution

4. **Review** — agent: reviewer
   - Verify all changes work correctly
   - Verify no desktop animations broken
   - Verify image priority is set correctly

## Dependencies

- Steps 1, 2, 3 are independent — can execute in parallel
- Step 4 depends on all prior steps

## Self-validation report

| Criterion           | Verdict   |
| ------------------- | --------- |
| Scope clarity       | pass      |
| Decomposition       | pass      |
| Dependency map      | pass      |
| Design-system fit   | pass      |
| State coverage      | pass      |
| Scope discipline    | pass      |
| Implementation path | pass      |

## Overall verdict

ready
