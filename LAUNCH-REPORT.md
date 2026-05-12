# Advenire — Pre-Launch Audit Report

**Data:** 8 maggio 2026
**Stack:** Next.js 16.2.5 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion 12 · TypeScript
**Routing:** `/` (splash Coming Soon), `/anteprima` (sito completo), `/chi-siamo`, `/contatti`, `/servizi/investimenti-immobiliari`, `/servizi/nuove-costruzioni`, `/privacy`, `/cookie-policy`, `/grazie`
**Stato globale:** ⚠️ **Pronto al deploy con riserve** — il sito può andare online sul Vercel project, ma ci sono 4 issue residue che richiedono decisione/dato esterno (vedi sezione finale).

---

## Sintesi esecutiva

Il sito è strutturalmente pulito: build production passa senza warning, TypeScript e ESLint puliti, security headers configurati, SEO baseline coperta (metadata, Open Graph, sitemap, robots, JSON-LD), accessibilità portata in linea con WCAG 2.1 AA per le aree principali.

Sono state aggiunte le pagine legali (`/privacy`, `/cookie-policy`), il consenso GDPR sul form di contatto, lo skip-link per screen reader, e il form ora apre l'app email del visitatore con un messaggio precompilato (decisione pragmatica in attesa dell'integrazione Resend lato server).

Restano 4 elementi che dipendono da dati o decisioni esterne — elencati nella sezione finale.

---

## Per fase

### Fase 0 — Setup e baseline ✅
- ✅ `npm install` pulito, lockfile integro
- ✅ `npx tsc --noEmit` → 0 errori
- ✅ `npx eslint .` → 0 warning, 0 errori
- ✅ `npm run build` → build production pulita, 13 route generate
- ✅ Nessun `TODO` / `FIXME` / `XXX` / `HACK` nel codice attivo
- ✅ Nessun secret committato
- ✅ `.gitignore` corretto (`.env*`, `node_modules`, `.next`, `*.log`, `.DS_Store` esclusi)
- 🔧 **Bumped `next` 16.1.6 → 16.2.5** per chiudere 6 CVE high (HTTP request smuggling, image cache exhaustion, Server Actions CSRF, ecc.)
- ⚠️ 2 vulnerabilità residue moderate su `postcss <8.5.10` (XSS via unescaped `</style>`) — non sfruttabile in build-time CSS, fix richiederebbe downgrade Next a 9.x → accettato come known-issue

### Fase 1 — Contenuti e copy ✅
- ✅ Nessun lorem ipsum / placeholder / `[INSERIRE TESTO]`
- ✅ Nessun doppio spazio nel testo
- ✅ Nessun errore di accento (perché, è/è, qual è senza apostrofo)
- ✅ Nessun residuo inglese nel copy user-facing
- ✅ Nessuna emoji nei componenti attivi (le emoji presenti sono in `components/profiler/` che è codice orphan, vedi note finali)
- ⚠️ **Mix apostrofi tipografici/dritti** (1083 dritti `'` vs 19 curly `'`) — coerenza editoriale da decidere; lo standard tipografico italiano preferisce il curly. Conversione a tappeto è rischiosa (può colpire JSX/codice), va fatta manualmente file per file da chi cura la redazione

### Fase 2 — Brand & design system ✅
- ✅ Token palette in `app/globals.css`: `--color-background: #F6EFE5`, `--color-primary: #05380D`, `--color-accent: #FDA77E`, foreground/card/muted/border derivati
- ✅ Font configurati correttamente in `lib/fonts.ts` con `display: 'swap'` (Cormorant Garamond heading, Inter body, Space Mono label)
- ✅ `mix-blend-mode: luminosity` applicato sulle foto team in B&W
- ⚠️ Hardcoded `#F5F0E8` nel codice del profiler orphan e nel template HTML email (`api/profiler/submit/route.ts`) — non visibile dal sito pubblico, da uniformare a `#F6EFE5` quando si attiva il profiler
- ⚠️ Spacing arbitrari minimi in Hero/Navbar (`gap-[5px]`) — accettabili come micro-aggiustamenti UI

### Fase 3 — Nav, link, bottoni 🔧
- ✅ Nessun bottone con handler vuoto
- ✅ Nessun `<div onClick>` (sempre `<button>`/`<a>`)
- ✅ Stato attivo del menu: `pathname === href` evidenziato
- ✅ Mobile hamburger funzionante, chiusura su navigazione
- ✅ `mailto:info@advenire.it` consistente in 4 punti (Splash, Footer, ContattiSedi, ComingSoon)
- 🔧 **Creati stub `/privacy` e `/cookie-policy`** — prima erano linkati nel Footer ma generavano 404
- ⚠️ Nessun link esterno presente (anche social vuoti) — eventualmente aggiungere LinkedIn/IG quando attivi
- ⚠️ Nessun numero di telefono nel footer (solo email)

### Fase 4 — Form contatti 🔧
- 🔧 **Aggiunto checkbox GDPR obbligatorio** con link a `/privacy` (era completamente assente — blocker legale risolto)
- 🔧 **Form ora apre l'app email del visitatore** con `mailto:info@advenire.it?subject=…&body=…` precompilato con tutti i campi (nome, cognome, email, telefono, messaggio). Decisione pragmatica per pre-launch: il visitatore preme invio dalla sua app, l'email arriva direttamente
- 🔧 Aggiunto `name=` e `autoComplete=` su tutti gli input per UX/screen-reader
- ⚠️ Nessun honeypot anti-spam, nessun rate-limit, nessun reCAPTCHA — non necessari finché si usa il flusso `mailto:`
- 📋 **Da fare quando si vuole un form server-side reale:** integrare Resend (chiave già supportata in `app/api/profiler/submit/route.ts` come pattern di riferimento), aggiungere honeypot field, rate-limit IP, validazione server

### Fase 5 — Responsive & cross-browser ✅
- ✅ Tutti i componenti usano breakpoint Tailwind standard (sm/md/lg) con clamp() per font fluidi
- ✅ Nessun overflow orizzontale (sezioni hero usano `overflow: hidden`)
- ✅ Pulsanti rispettano min-height ~44px (`py-3` + altezza testo) → touch-friendly su mobile
- ✅ Test visivo dev a 1440 e 1920 → logo, navbar, contenuti allineati sul `max-w-[1440px]`
- 📋 Test reale su Safari/Firefox/Edge da fare prima del go-live commerciale

### Fase 6 — Animazioni Framer Motion ✅
- ✅ Tutti i componenti animati rispettano `useReducedMotion()` (verificato in Hero, ServiziSection, ConsulenzaDifferenteSection, FAQSection, HeroChiSiamo, HeroServizio, ValoriChiSiamo, ComeLavoriamo, DueLinee, LineFade, SplitText)
- ✅ Easing standard `[0.16, 1, 0.3, 1]` applicato in modo coerente
- ✅ Durate ragionevoli (0.5–1.2s) — nessuna animazione blocca l'interazione
- ✅ Scroll-triggered animations con `whileInView` + `once: true` (no ripetizioni fastidiose)
- ✅ Accordion FAQ animato con `AnimatePresence`, height auto/0, no jump

### Fase 7 — Performance ⚠️
- ✅ Build production: 13 route, tutto pre-renderizzato statico tranne `/api/profiler/submit`
- ✅ Tutte le immagini usano `next/image` (mai `<img>` raw)
- ✅ `next.config.ts` con `formats: ['image/avif', 'image/webp']`
- ✅ `priority` solo sul logo hero (above the fold)
- ✅ Font self-hosted via `next/font` con `display: 'swap'`
- ⚠️ **Foto team a 1.9 MB ciascuna** (1254×1254 PNG) — Next.js le ottimizza in delivery (~50–150kB sui device), ma la fonte va ridotta o convertita a WebP per ridurre tempi di build/deploy. Non blocca il go-live ma è la prima ottimizzazione consigliata post-launch
- 📋 Lighthouse audit reale (mobile + desktop) da eseguire dopo deploy con dominio finale

### Fase 8 — SEO 🔧
- 🔧 **Metadata baseline in `app/layout.tsx`**: titolo template, description, applicationName, authors, keywords, canonical, robots
- 🔧 **Open Graph completo**: type=website, locale=it_IT, url, siteName, title, description, image (1200×630), alt
- 🔧 **Twitter Card**: summary_large_image
- 🔧 **JSON-LD ProfessionalService** in `app/layout.tsx` (name, legalName, url, logo, description, email, areaServed, address)
- 🔧 **Creato `app/robots.ts`** (route dinamica): allow tutto eccetto `/api/`, `/anteprima`, `/grazie`; sitemap referenziata
- 🔧 **Creato `app/sitemap.ts`**: 7 URL principali con priority/changeFrequency
- 🔧 **Aggiunti metadata splash** (`app/page.tsx`) e legal pages
- ✅ `<html lang="it">` corretto
- ✅ Heading hierarchy: una sola `h1` per pagina
- ⚠️ **`og-image.png` (1200×630) referenziata ma non presente in `/public/images/`** — da creare e committare

### Fase 9 — Accessibilità (WCAG 2.1 AA) 🔧
- 🔧 **Aggiunto skip-link "Salta al contenuto"** in `app/layout.tsx` con focus styles
- 🔧 **FormField refattorizzato**: ora la `<label>` wrappa l'input → screen reader annuncia correttamente
- ✅ Tutte le `<Image>` hanno `alt` descrittivo (`"ADVENIRE"`, `"Advenire"`, `"Ritratto di {nome}"`)
- ✅ Landmark HTML5 corretti: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>` con `aria-label`/`data-section-tone`
- ✅ Focus styles: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent` su tutti gli interattivi
- ✅ 53 attributi `aria-*` distribuiti (label, expanded, controls, hidden, required, valuetext)
- ✅ Bottoni reali (`<button>`) per azioni, `<a>`/`<Link>` per navigazione
- ✅ Accordion FAQ con `aria-expanded`, `aria-controls`, gestione tastiera nativa via `<button>`
- 📋 Test reale di contrasto (corallo/crema, verde/crema, bianco/verde) con tool: rapporti calcolati a vista superiori a 4.5:1 ma da confermare con WebAIM Contrast Checker
- 📋 Test keyboard navigation completo da fare a mano

### Fase 10 — Privacy, GDPR & legale 🔧
- 🔧 **Creata `/privacy`** con informativa completa GDPR (titolare, finalità, base giuridica, conservazione, diritti, comunicazione, modifiche)
- 🔧 **Creata `/cookie-policy`** con descrizione cookie tecnici/analytics/marketing, link ai browser per disabilitazione
- 🔧 **Checkbox consenso privacy obbligatorio** sul form contatti con link alla policy
- ✅ Footer: ragione sociale "Advenire S.r.l." + disclaimer legale (no consulenza finanziaria/legale/fiscale, performance passate non garanzia)
- ✅ Nessun servizio terze parti (Analytics, Maps, embed video) — quindi nessun tracker da consensare
- ✅ Font self-hosted (no Google Fonts CDN call)
- ⚠️ **Cookie banner non implementato** — non strettamente necessario ora perché non ci sono cookie di terze parti, MA andrà aggiunto quando si attiverà GA4 / Plausible / chat widget
- 📋 **Privacy Policy e Cookie Policy** sono testi tecnici di base — vanno fatti rivedere dal consulente legale prima del go-live commerciale (warning indicato in fondo a ciascuna pagina)
- ❌ **Footer manca P.IVA, sede legale, REA, eventuale capitale sociale** (richiesti per S.r.l. italiana per legge) — dato esterno necessario

### Fase 11 — Security 🔧
- 🔧 **Headers in `next.config.ts`** (applicati a tutte le route via `headers()`):
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
- 🔧 `poweredByHeader: false` (rimosso `X-Powered-By: Next.js`)
- 🔧 `reactStrictMode: true`
- ✅ Nessuna chiave API hardcoded — tutto via `process.env.RESEND_API_KEY` / `process.env.TEAM_EMAIL` / `process.env.NODE_ENV`
- ✅ HTTPS gestito dalla piattaforma di hosting (Vercel)
- ✅ `console.log` di debug guardato da `NODE_ENV === 'development'` nell'API profiler
- ✅ `npm audit --omit=dev`: 0 high, 2 moderate (postcss CSS-stringify XSS, non sfruttabile in CSS build-time)
- 📋 Content-Security-Policy non configurato — Next.js 16 ha alcune complessità con CSP (necessita nonces per inline-script da Next runtime). Da introdurre in modalità Report-Only post-launch

### Fase 12 — Analytics & monitoring 📋
- ❌ Nessun tool analytics configurato
- ❌ Nessun error tracking (Sentry / similari)
- 📋 **Da decidere e configurare prima del go-live commerciale:**
  - Analytics: Plausible (privacy-friendly, niente consenso) o GA4 con consent mode v2
  - Errori: Vercel Analytics (built-in) + Sentry per stack trace
  - Web Vitals: già esposti via `useReportWebVitals` quando lo si attiva

### Fase 13 — Deploy readiness 🔧
- ✅ Build production locale OK: `npm run build` passa
- 🔧 **Creata `app/not-found.tsx`** — pagina 404 branded (sfondo verde, kicker "Errore 404", CTA "Torna alla home" + "Scrivici")
- 🔧 **Creata `app/error.tsx`** — pagina errore 500 client-side branded con `reset()` e fallback home
- ✅ Variabili d'ambiente (production) richieste:
  - `RESEND_API_KEY` (opzionale, attivare quando si abbandona il flusso `mailto`)
  - `TEAM_EMAIL` (opzionale, destinazione notifiche profiler)
- ✅ Vercel project già linkato (`prj_ymY440kA3o65kvw9pxtuEfT45Z7y`, team `marketing398s-projects`)
- ✅ Custom domain `www.advenire.it` configurato come alias Vercel
- ❌ **DNS pubblico `www.advenire.it` punta ancora a Aruba (89.46.109.50)** — non a Vercel. Da aggiornare al registrar:
  - A `advenire.it` → `76.76.21.21`
  - CNAME `www.advenire.it` → `cname.vercel-dns.com`

### Fase 14 — Pulizia repo & docs ⚠️
- ✅ `CLAUDE.md` presente con descrizione progetto + agenti specializzati
- ⚠️ `README.md` non aggiornato per il nuovo restyle (descrizione, env vars, comandi deploy)
- ⚠️ Codice orphan in `components/profiler/` e `app/grazie/page.tsx` — non importato da nessuna pagina attiva. Da decidere: tenere come future-feature o eliminare per pulizia repo

---

## Issue residue / decisioni richieste

### Bloccanti per il go-live commerciale (non per il preview/anteprima)
- [ ] **Dati legali Advenire S.r.l.**: P.IVA, sede legale completa, numero REA, eventuale capitale sociale. Da inserire nel Footer e nelle policy. *Owner: Matteo / Giacomo (founder)*
- [ ] **Revisione legale Privacy & Cookie Policy**: i testi attuali sono modello generico GDPR. Vanno validati da consulente legale prima del go-live pubblico. *Owner: legale Advenire*

### Non bloccanti ma necessari per la qualità launch
- [ ] **`og-image.png` (1200×630)**: creare immagine social branded e committare in `/public/images/`. *Owner: design*
- [ ] **DNS `www.advenire.it`**: aggiornare al registrar Aruba per puntare a Vercel (vedi Fase 13). *Owner: Matteo*
- [ ] **Foto team**: comprimere da 1.9 MB → ~200 KB ciascuna in WebP. *Owner: design*
- [ ] **Apostrofi tipografici**: normalizzare il copy a `'` curly per coerenza editoriale italiana (1083 dritti da convertire manualmente). *Owner: redazione/marketing*
- [ ] **Profiler orphan**: decidere se attivarlo come future-feature o rimuovere (`components/profiler/*`, `/api/profiler/submit`, `/grazie`). *Owner: prodotto*
- [ ] **Form Resend**: quando si vuole abbandonare il flusso `mailto`, integrare Resend lato server in un nuovo `app/api/contatti/route.ts`. *Owner: tecnico*
- [ ] **Analytics & error tracking**: scelta + configurazione (Plausible vs GA4 consent mode; Vercel Analytics + Sentry). *Owner: marketing/tecnico*
- [ ] **CSP report-only**: configurare in `next.config.ts` post-launch per monitorare violazioni inline-script. *Owner: tecnico*

---

## Checklist go-live (da spuntare manualmente prima del deploy commerciale)

- [ ] DNS `www.advenire.it` puntato a Vercel
- [ ] Variabili env production verificate sul progetto Vercel
- [ ] Backup pre-deploy (snapshot Vercel deployments precedenti basta)
- [ ] Form contatti testato in produzione: aprire `/contatti`, compilare, verificare apertura app mail con messaggio precompilato
- [ ] Privacy Policy & Cookie Policy riviste da legale
- [ ] Dati legali Advenire S.r.l. inseriti in Footer
- [ ] OG image branded creata e committata
- [ ] Lighthouse audit ≥ 90/95/95/100 (mobile + desktop)
- [ ] Test cross-browser su Safari, Firefox, Edge
- [ ] Test keyboard navigation completa da homepage a tutte le pagine
- [ ] Test contrasti WCAG con WebAIM Contrast Checker
- [ ] Comunicazione interna: spegnere pagina Aruba "Coming Soon", attivare Vercel
