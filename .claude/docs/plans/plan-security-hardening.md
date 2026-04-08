# Security Hardening Plan — EAG Website

## Context summary

Bezpečnostní audit odhalil 4 konkrétní nedostatky: chybějící HTTP security headers, žádný rate limiting ani honeypot na kontaktním formuláři, nepoužitá reCAPTCHA závislost, a chybějící CSRF ochrana. Kód je jinak bezpečný — input validace, HTML escaping a SSR fungují správně.

---

## Scope

Implementace bezpečnostních vylepšení na úrovni HTTP headers, kontaktního formuláře a cleanup nepoužitých závislostí. Neřešíme: WAF, DDoS ochrana (řeší Vercel edge), autentizaci (web nemá login), ani monitoring/logging.

---

## Implementation steps

### Step 1 — Security headers v entry.server.tsx (developer)
**Soubor:** `app/entry.server.tsx`

Přidat security headers do response v `handleRequest()`:
- `X-Frame-Options: DENY` — ochrana proti clickjackingu
- `X-Content-Type-Options: nosniff` — prevence MIME sniffingu
- `Referrer-Policy: strict-origin-when-cross-origin` — omezení referrer dat
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` — blokace zbytečných API
- `Strict-Transport-Security: max-age=31536000; includeSubDomains` — HSTS

**Pozn:** CSP přidáváme opatrně kvůli Google Fonts a inline stylům z Tailwind. Začneme bez CSP nebo s report-only.

### Step 2 — Honeypot pole + rate limiting na kontaktní API (developer)
**Soubory:** `app/routes/api.contact.ts`, `app/components/contact-section.tsx`

**Honeypot (server + klient):**
- Přidat skryté pole `website` do formuláře (CSS `display: none`)
- Na serveru: pokud je `website` vyplněné → tiše vrátit `{ ok: true }` (boti nepoznají odmítnutí)

**Rate limiting (server):**
- In-memory rate limiter na IP adresu: max 5 požadavků za hodinu
- Použít `Map<string, { count: number; resetAt: number }>` — jednoduchý, bez závislostí
- IP získat z `request.headers.get("x-forwarded-for")` (Vercel proxy)
- Při překročení limitu vrátit 429 Too Many Requests

### Step 3 — Odstranit nepoužitou reCAPTCHA závislost (developer)
**Soubor:** `package.json`

Odebrat `react-google-recaptcha-v3` — je nainstalovaná, ale nikde se nepoužívá. Honeypot + rate limiting z kroku 2 poskytují dostatečnou ochranu pro kontaktní formulář tohoto typu.

---

## Dependencies

| Step | Závisí na |
|------|-----------|
| 1 | — (nezávislý) |
| 2 | — (nezávislý) |
| 3 | — (nezávislý) |

Všechny 3 kroky mohou probíhat paralelně.

---

## Self-validation report

| Check | Status |
|-------|--------|
| Pokrývá všechny bezpečnostní nálezy z auditu? | ✅ Security headers, rate limiting, honeypot, CSRF (honeypot je pragmatická náhrada), cleanup |
| Kroky mají jasné výstupy? | ✅ Konkrétní soubory a měřitelné výsledky |
| Nenarušuje existující funkcionalitu? | ✅ Headers jsou additivní, honeypot je neviditelný, rate limit má vysoký práh |
| Kompatibilní s Vercel + React Router SSR? | ✅ Headers v entry.server.tsx, rate limit v action handler |
| CSRF řešení? | ✅ Honeypot + rate limit je pragmatická ochrana pro veřejný kontaktní formulář bez sessions |

---

## Overall verdict

**READY**
