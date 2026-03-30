# ADVENIRE — Consulenza Patrimoniale Immobiliare

## Progetto
Sito web Next.js 16 (App Router) + Tailwind CSS v4 + Framer Motion + TypeScript.
Lingua: italiano. Deploy: Vercel (region CDG1).

## Design System
- Palette: crema `#F6EFE5` (bg), verde `#05380D` (primary), corallo `#FDA77E` (accent), foreground `#1A1A18`, card `#F0EAE0`
- Font: Cormorant Garamond (heading italic), Inter (body), Space Mono (label)
- Illustrazioni: sketch B&W con `mix-blend-mode: luminosity`
- Tono: editoriale, raffinato, autorevole ma umano
- MAI icone Unicode, MAI emoji nei componenti

## Struttura pagine
- `/` — Home: Hero → QuoteSection → ConsulenzaDifferente → ServiziSection → ConsulenzaSection → CTAFinale
- `/cosa-facciamo` — HeroCosaFacciamo → ServiziGrid → FamilyOfficeSection
- `/chi-siamo` — HeroChiSiamo → TeamSection → ValoriChiSiamo
- `/contatti` — ContattiHero → ProfilerInline → ContattiForm

## Sistema Multi-Agente
Nella cartella `agents/` ci sono 7 agenti specializzati + 1 orchestratore per audit e quality assurance:

| Comando | Agente | Cosa fa |
|---------|--------|---------|
| `Leggi agents/AGENT-UX-UI.md e esegui` | UX/UI Designer | Audit visivo, design system, responsive, animazioni |
| `Leggi agents/AGENT-MARKETING.md e esegui` | Marketing & Copy | Audit copy italiano, tono, funnel, residui USA |
| `Leggi agents/AGENT-SEO.md e esegui` | SEO Specialist | Metadata, sitemap, structured data, keyword |
| `Leggi agents/AGENT-SECURITY.md e esegui` | Sicurezza Web | Headers, GDPR, form validation, API, env vars |
| `Leggi agents/AGENT-PERFORMANCE.md e esegui` | Performance | Core Web Vitals, bundle, immagini, font |
| `Leggi agents/AGENT-ACCESSIBILITY.md e esegui` | Accessibilità | WCAG 2.1 AA, contrasto, keyboard, screen reader |
| `Leggi agents/AGENT-DEVOPS.md e esegui` | DevOps & Deploy | Build, Vercel, Git, monitoring |
| `Leggi agents/ORCHESTRATOR.md e esegui tutto` | Orchestratore | Tutti gli agenti in sequenza, report finale |

I report vengono salvati in `agents/reports/`.

## Regole
- Il sito è in ITALIANO — nessun contenuto in inglese
- Tailwind v4: usa `@theme` in globals.css, NON tailwind.config.ts per i token
- Heading display: sempre font-heading font-light italic
- Animazioni: easing `[0.16, 1, 0.3, 1]`, `whileInView` con `once: true`
- `useReducedMotion()` rispettato in ogni componente animato
- Nessun placeholder generico (no emoji, no icone stock)
