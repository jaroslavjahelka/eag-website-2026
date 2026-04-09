# Review: Mobile fixes and image optimization — v1

## Verdict

pass

## Scope

code

## Summary

All five fixes implemented correctly with minimal, targeted changes:
1. Story mobile year labels aligned left (`text-center` → `text-left`)
2. Projects loading animation removed (removed `data-reveal`, `useScrollReveal`, `reveal-delay-1`)
3. Story mobile timeline animation removed (removed `data-reveal` from mobile items)
4. Media article images: `sizes` attribute added matching grid breakpoints
5. Hero images: `priority` prop added to story, projects, media, team hero backgrounds

TypeScript compiles with zero errors. No desktop animations broken. Home and team page animations unaffected.

## Findings

- severity: minor (fixed during review)
- title: Orphaned data-reveal in story.tsx HeroSection
- problem: `h1` and `p` in story hero had `data-reveal` and `reveal-delay-1` that were already non-functional (no observer mounted). Cleaned up during review.

## Approval

approved
