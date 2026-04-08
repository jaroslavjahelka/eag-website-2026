# SEO Improvement Plan — EAG Website

## Context summary

Kompletní SEO audit odhalil, že web má **solidní technický základ** (SSR, sémantické HTML, lazy loading obrázků s WebP, code splitting, bot detection), ale **chybí mu klíčové SEO prvky** potřebné pro viditelnost ve vyhledávačích. Žádná stránka nemá Open Graph tagy, Twitter Cards, canonical URL, strukturovaná data (JSON-LD), sitemap.xml ani robots.txt.

---

## Audit — co funguje dobře

| Oblast | Stav |
|--------|------|
| Meta title + description na všech stránkách | ✅ |
| Sémantické HTML (header, nav, main, section, footer) | ✅ |
| Správná hierarchie nadpisů (h1→h2→h3) | ✅ |
| Obrázky — WebP s fallbackem, lazy loading, async decoding | ✅ |
| Font loading — display=swap, preconnect | ✅ |
| SSR s bot detection (isbot) | ✅ |
| Code splitting s Suspense | ✅ |
| Accessibility — aria-label, aria-current, role | ✅ |
| Viewport + charset správně nastavené | ✅ |

## Audit — co chybí (kritické)

| # | Problém | Dopad |
|---|---------|-------|
| 1 | **Žádné Open Graph tagy** — sdílení na sociálních sítích bez náhledu | Vysoký |
| 2 | **Žádné Twitter Cards** — sdílení na X/Twitter bez náhledu | Vysoký |
| 3 | **Chybí canonical URL** — riziko duplicitního obsahu | Vysoký |
| 4 | **Chybí sitemap.xml** — crawlery nemají mapu webu | Vysoký |
| 5 | **Chybí robots.txt** — žádné instrukce pro crawlery | Střední |
| 6 | **Žádná strukturovaná data (JSON-LD)** — žádné rich snippety ve výsledcích | Střední |
| 7 | **Chybí hreflang tagy** — web má CS/EN, ale Google neví o jazykových variantách | Střední |
| 8 | **Chybí vercel.json** — žádné security/cache headers | Nízký |
| 9 | **Chybí theme-color meta tag** — nevyužitý branding v prohlížeči | Nízký |
| 10 | **html lang="en" hardcoded** — nereflektuje aktuální jazyk | Střední |

---

## Scope

Implementace 7 kroků zaměřených na kritické a střední SEO nedostatky. Neřešíme: URL-based i18n routing (velká architektonická změna), security headers (samostatný task), ani content marketing strategii.

---

## Implementation steps

### Step 1 — Shared SEO meta utility (developer)
**Soubor:** `app/utils/seo.ts`

Vytvořit helper funkci `generateMeta()` která pro každou stránku vygeneruje kompletní pole meta tagů:
- `title`, `description`
- `og:title`, `og:description`, `og:image`, `og:type`, `og:url`, `og:site_name`, `og:locale`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- `canonical` link
- `robots` (index/noindex)

Vstup: objekt `{ title, description, url, image?, noindex? }`
Výstup: pole kompatibilní s React Router `meta()` exportem.

### Step 2 — Aplikovat SEO meta na všechny routes (developer)
**Soubory:** `app/routes/home.tsx`, `projects.tsx`, `team.tsx`, `story.tsx`, `media.tsx`

Nahradit stávající ruční `meta()` exporty voláním `generateMeta()` z kroku 1. Každá stránka dostane:
- Unikátní title a description (zachovat stávající)
- OG image (použít `/assets/og/og-default.jpg` nebo stránkově specifický)
- Canonical URL
- Správný `og:type` (website pro home, article pro ostatní)

### Step 3 — Dynamický html lang atribut (developer)
**Soubor:** `app/root.tsx`

Změnit hardcoded `<html lang="en">` na dynamický atribut reflektující aktuální jazyk z i18n kontextu. Přidat `<meta name="theme-color" content="#000000">`.

### Step 4 — robots.txt + sitemap.xml (developer)
**Soubory:** `app/routes/robots[.]txt.ts`, `app/routes/sitemap[.]xml.ts`

Vytvořit serverové route handlery:
- **robots.txt**: Allow all, Disallow /api/, odkaz na sitemap
- **sitemap.xml**: Dynamicky generovaný seznam všech veřejných URL s `lastmod`, `changefreq`, `priority`. Zahrnout hreflang alternates pro EN/CS.

### Step 5 — JSON-LD strukturovaná data (developer)
**Soubor:** `app/components/structured-data.tsx`

Vytvořit komponentu pro injektování JSON-LD do `<head>`:
- **Organization schema** (v root.tsx): název, logo, URL, kontaktní info, sameAs pro sociální sítě
- **BreadcrumbList** (na podstránkách): navigační drobečky
- **WebSite schema** (na home): s potentialAction pro SearchAction

### Step 6 — hreflang tagy (developer)
**Soubor:** `app/root.tsx` nebo utility

Přidat `<link rel="alternate" hreflang="en" href="...">` a `<link rel="alternate" hreflang="cs" href="...">` a `<link rel="alternate" hreflang="x-default" href="...">` do hlavičky. Jelikož web nemá URL-based routing pro jazyky, hreflang bude odkazovat na stejné URL s `x-default`.

### Step 7 — OG image assets (architect)
**Soubor:** `public/assets/og/`

Vytvořit nebo specifikovat OG image pro sdílení:
- Výchozí OG image 1200×630px s EAG logem a tagline
- Pokyny pro stránkově specifické varianty

---

## Dependencies

| Step | Závisí na |
|------|-----------|
| 1 | — (žádná) |
| 2 | Step 1 |
| 3 | — (nezávislý) |
| 4 | — (nezávislý) |
| 5 | — (nezávislý) |
| 6 | Step 3 (potřebuje dynamický lang) |
| 7 | — (nezávislý, ale Step 2 bude referencovat výstup) |

Paralelizace: Kroky 1, 3, 4, 5, 7 mohou začít současně. Krok 2 čeká na 1. Krok 6 čeká na 3.

---

## Self-validation report

| Check | Status |
|-------|--------|
| Pokrývá všechny kritické nálezy z auditu? | ✅ Ano — OG, Twitter Cards, canonical, sitemap, robots, JSON-LD, hreflang |
| Kroky jsou v správném pořadí se závislostmi? | ✅ Ano |
| Každý krok má jasný výstup? | ✅ Ano — konkrétní soubory |
| Není out of scope? | ✅ Ano — neřeší URL i18n routing ani security headers |
| Kompatibilní s tech stackem (React Router 7, Vite, Vercel)? | ✅ Ano |
| Kroky jsou reviewovatelné? | ✅ Ano — každý produkuje testovatelné soubory |

---

## Overall verdict

**READY** — Plán pokrývá všechny identifikované SEO mezery, kroky jsou jasně definované s konkrétními soubory a závislostmi. Implementace nevyžaduje žádné architektonické změny.
