# Fastback website migration plan

## Context summary

Migration of the Fastback automotive dealership management platform website into a new React 19 + React Router 7 + Vite + Tailwind 4 stack. The repo is freshly scaffolded with all dependencies installed (GSAP, Lenis, React Aria, Tailwind Variants, Phosphor Icons). The design system (typography A/B/C series, full color palettes, spacing 1px base) is already configured in `app.css`. Lenis smooth scrolling is wired in `root.tsx`. There are no existing components — only a placeholder `home.tsx` route.

The website is a B2B SaaS marketing site for Fastback — a suite of dealership management solutions (new car sales, used car sales, pricing, sourcing, insurance, CRM, workshop, etc.). The site needs multi-language support (EN/FR/NL) from the start using localStorage for language preference. All images use placeholders. Icons use Phosphor Icons library. No e-commerce. No CRM/backend integration.

Key modernization goals: Bento grid layouts, glassmorphism sticky nav, GSAP scroll-triggered animations, animated stats counters, off-canvas drawers for product details, modern SaaS visual language with generous whitespace.

## Scope

- IN:
  - i18n system (EN/FR/NL) with localStorage persistence, translation files, language switcher
  - Shared foundation components: Section, Container, Button, Navigation (glassmorphism mega-menu), Footer, Language Switcher, Cookie Consent
  - Content components: Hero Section (SaaS style), Pricing/Product Cards, Animated Stats Counter, Testimonials Carousel, Bento Feature Grid, Lead-gen Form (frontend-only), Rich Text Drawer (off-canvas)
  - Pages: Homepage, About, Our Solutions (overview), individual solution pages (up to 17 products), Training Programs, News, Contact, Privacy Policy, Terms & Conditions, Cookies Policy
  - GSAP scroll-triggered animations on section reveals, counter animations, card entrances
  - Lenis smooth scrolling (already configured)
  - Responsive design (mobile, tablet, desktop)
  - SEO meta tags per page
  - Placeholder images throughout, Phosphor Icons for all icons

- OUT:
  - E-commerce / cart / checkout
  - CRM or backend form submission
  - Real image assets (placeholders only)
  - Analytics / tracking
  - reCAPTCHA
  - Server-side i18n routing (localStorage only)
  - Blog/news CMS functionality (static content only)

## Decisions

| Decision | Resolution |
| --- | --- |
| i18n approach | Client-side with localStorage, translation JSON files per language, React context provider |
| Navigation style | Glassmorphism sticky mega-menu with backdrop-blur, Phosphor Icons |
| Product detail views | Dedicated route pages (not drawers) — drawers reserved for supplementary info |
| State management | React Context for i18n and cookie consent — no external state library needed |
| Assets | Placeholder `div` blocks with background color for images, Phosphor Icons for all iconography |
| Animation | GSAP ScrollTrigger for section reveals, counter animations; keep animations purposeful per design-motion.md |

## Implementation steps

### Phase 1 — i18n foundation and layout primitives

1. Create i18n system: translation JSON files (en.json, fr.json, nl.json), LanguageProvider context, useTranslation hook, localStorage persistence — agent: Developer
2. Create `Section` component (semantic page block, outer padding) — workflow: create-component, agents: Architect → Developer
3. Create `Container` component (inner content width, centering) — workflow: create-component, agents: Architect → Developer
4. Create `Button` component (primary, secondary, ghost variants, sizes, link mode) — workflow: create-component, agents: Architect → Developer

### Phase 2 — Global shell components

5. Create `Navigation` component (glassmorphism sticky bar, mega-menu dropdown for Solutions, language switcher slot, mobile hamburger, backdrop-blur) — workflow: create-component, agents: Architect → Developer
6. Create `LanguageSwitcher` component (EN/FR/NL toggle, reads/writes localStorage, updates LanguageProvider) — workflow: create-component, agents: Architect → Developer
7. Create `Footer` component (product links, company links, legal links, social placeholders) — workflow: create-component, agents: Architect → Developer
8. Create `CookieConsent` component (React Aria dialog, accept all / accept essential, localStorage persistence) — workflow: create-component, agents: Architect → Developer
9. Wire Navigation + Footer + CookieConsent into root layout — agent: Developer

### Phase 3 — Content components

10. Create `HeroSection` component (SaaS-style: dynamic heading, subheading, primary CTA, placeholder background) — workflow: create-component, agents: Architect → Developer
11. Create `StatsCounter` component (GSAP-animated number counter with scroll trigger, label, suffix) — workflow: create-component, agents: Architect → Developer
12. Create `ProductCard` component (name, short description, price indicator, CTA button) — workflow: create-component, agents: Architect → Developer
13. Create `BentoGrid` component (asymmetric grid for feature/service modules, icon + heading + text cells) — workflow: create-component, agents: Architect → Developer
14. Create `TestimonialsCarousel` component (horizontal slider, drag-to-swipe, navigation dots, quote + author + role) — workflow: create-component, agents: Architect → Developer
15. Create `LeadGenForm` component (React Aria form fields, frontend validation, GDPR checkbox, success/error states) — workflow: create-component, agents: Architect → Developer
16. Create `Drawer` component (React Aria off-canvas panel, slide-in from right, overlay, close button) — workflow: create-component, agents: Architect → Developer
17. Create `Accordion` component (React Aria disclosure, GSAP height animation) — workflow: create-component, agents: Architect → Developer
18. Create `FeatureShowcase` component (icon + heading + description, alternating left/right layout for product pages) — workflow: create-component, agents: Architect → Developer

### Phase 4 — Page routes (main pages)

19. Create Homepage route: Hero → Product Cards grid → Stats Counter row → Bento Services Grid → Testimonials → Lead-gen CTA — workflow: create-route, agents: Developer → Copywriter
20. Create About route: Hero → Company story → Vision → Stats → Team placeholder → CTA — workflow: create-route, agents: Developer → Copywriter
21. Create Our Solutions overview route: Hero → ProductCard grid (all 17 products) → CTA — workflow: create-route, agents: Developer → Copywriter
22. Create Contact route: Lead-gen form → Office locations → CTA — workflow: create-route, agents: Developer → Copywriter

### Phase 5 — Page routes (product pages)

23. Design reusable product page pattern from the richest product (Used Car Sales): Hero → Feature sections → Accordion details → Cross-sell CTA → FAQ — workflow: design-process, agent: Architect
24. Implement product page template and apply to all solution routes: New Car Sales, Used Car Sales, Pricing, Sourcing, Vehicle Insurance, Autotracer, Fastback Trade, Rental, CarAudit, CRM, Workshop, Planner, Warehouse, Time-keeping, Accounting, Reporting, Stock Report — workflow: create-route, agents: Developer → Copywriter

### Phase 6 — Page routes (supplementary)

25. Create Training Programs route — workflow: create-route, agents: Developer → Copywriter
26. Create News route (static article list template) — workflow: create-route, agents: Developer → Copywriter
27. Create Privacy Policy route — workflow: create-route, agents: Developer → Copywriter
28. Create Terms & Conditions route — workflow: create-route, agents: Developer → Copywriter
29. Create Cookies Policy route — workflow: create-route, agents: Developer → Copywriter

### Phase 7 — Routing, navigation wiring, SEO

30. Update `routes.ts` with complete URL structure for all pages — agent: Developer
31. Wire mega-menu links to all solution routes with descriptions — agent: Developer
32. Wire footer links (products, company, legal sections) — agent: Developer
33. Set meta tags per page (title, description, OG, Twitter) using route-architecture.md template — agents: Developer → Copywriter
34. Create proper 404 error boundary page — agent: Developer

### Phase 8 — GSAP animations and polish

35. Add GSAP ScrollTrigger fade-in animations to all page sections — agent: Developer
36. Add GSAP entrance animations to ProductCards, BentoGrid cells, Testimonials — agent: Developer
37. Verify Lenis smooth scroll works across all pages — agent: Developer
38. Verify glassmorphism nav doesn't degrade text readability — agent: Architect

### Phase 9 — Validation

39. `bun run build` — clean production build — agent: Developer
40. `bun run typecheck` — no TypeScript errors — agent: Developer
41. Responsiveness check (mobile 375px, tablet 768px, desktop 1440px) — agent: Developer
42. Accessibility check: keyboard navigation, ARIA labels, focus management — agent: Developer
43. All internal links resolve (no 404s) — agent: Developer
44. i18n check: switch languages, verify all visible strings update — agent: Developer

## Dependencies

- Phase 1 has no dependencies (foundation)
- Phase 2 depends on Phase 1 (components need i18n hook and layout primitives)
- Phase 3 depends on Phase 1 (content components need Section, Container, Button)
- Phase 4 depends on Phase 2 + Phase 3 (pages compose shell + content components)
- Phase 5 depends on Phase 3 + Phase 4 step 21 (product pages need content components + Solutions overview as reference)
- Phase 6 depends on Phase 2 + Phase 3 (supplementary pages need shell + basic components)
- Phase 5 and Phase 6 can run in parallel
- Phase 7 depends on Phase 4 + Phase 5 + Phase 6 (all routes must exist)
- Phase 8 depends on Phase 7 (animations apply to assembled pages)
- Phase 9 depends on Phase 8 (validation is final)

## Self-validation report

| Criterion | Verdict |
| --- | --- |
| Scope clarity | pass |
| Decomposition | pass |
| Dependency map | pass |
| Design-system fit | pass |
| State coverage | pass |
| Scope discipline | pass |
| Implementation path | pass |

## Overall verdict

ready
