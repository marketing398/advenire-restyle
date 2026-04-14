# PROMPT PER CLAUDE CODE — Audit UX/UI Completo

> **Copia-incolla questo intero blocco nell'input di Claude Code.**

---

## ISTRUZIONI

Devi eseguire un audit UX/UI completo del sito Advenire. Procedi in questo ordine esatto:

### STEP 1 — Carica il contesto
Leggi questi file nell'ordine:
1. `CLAUDE.md` (contesto progetto e design system)
2. `agents/AGENT-UX-UI.md` (istruzioni dell'agente UX/UI)
3. `app/globals.css` (design tokens: colori, font, spacing)

### STEP 2 — Analizza OGNI componente visivo
Leggi e analizza uno per uno tutti i seguenti file. Per ciascuno, valuta:
- Gerarchia tipografica (font corretto per heading/body/label?)
- Spaziatura (padding/margin coerenti col resto del sito?)
- Palette (colori dal design system o hardcoded?)
- Responsive (breakpoint sm/md/lg gestiti?)
- Animazioni Framer Motion (easing, durata, useReducedMotion?)

**Homepage:**
- `components/home/Hero.tsx` — hero fullscreen con logo, nav, heading, CircleCTA
- `components/home/QuoteSection.tsx` — citazione con SplitText
- `components/home/ConsulenzaDifferenteSection.tsx` — 6 card differenziazione
- `components/home/ServiziSection.tsx` — 3 card servizi con illustrazioni
- `components/home/ConsulenzaSection.tsx` — sezione "Lavoriamo con chi ha visione"
- `components/home/CTAFinale.tsx` — CTA finale verde scuro

**Cosa Facciamo:**
- `components/cosa-facciamo/HeroCosaFacciamo.tsx`
- `components/cosa-facciamo/ServiziGrid.tsx`
- `components/cosa-facciamo/FamilyOfficeSection.tsx`

**Chi Siamo:**
- `components/chi-siamo/HeroChiSiamo.tsx`
- `components/chi-siamo/TeamSection.tsx`
- `components/chi-siamo/ValoriChiSiamo.tsx`

**Contatti:**
- `components/contatti/ContattiHero.tsx`
- `components/contatti/ContattiForm.tsx`
- `components/profiler/ProfilerInline.tsx`

**Layout globale:**
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`
- `app/layout.tsx`

**Componenti UI condivisi:**
- `components/ui/Button.tsx`
- `components/ui/AccordionItem.tsx`
- `components/ui/SectionLabel.tsx`
- `components/ui/SplitText.tsx`
- `components/ui/CustomCursor.tsx`
- `components/ui/SmoothScroll.tsx`
- `components/ui/PageTransition.tsx`
- `components/ui/FadeInView.tsx`
- `components/ui/BlueprintGrid.tsx`
- `components/ui/ArchitecturalLines.tsx`

### STEP 3 — Verifica coerenza cross-page
Dopo aver analizzato tutti i componenti, verifica:

1. **Griglia e contenitori**: tutti usano `max-w-[1440px] mx-auto px-6 lg:px-16`? (o px-8 lg:px-20?) Se ci sono discrepanze, segnalale.

2. **Spaziatura sezioni**: il ritmo verticale è coerente? Le sezioni usano tutte `py-20 lg:py-28` (o varianti ragionate)? Segnala sezioni con padding anomalo.

3. **Tipografia coerente**:
   - h1: `font-heading font-light` con `clamp()` responsive — un solo h1 per pagina?
   - h2: `font-heading font-light italic` — dimensione coerente tra sezioni?
   - Body: `font-body font-light text-[13px]-[15px]`
   - Label: `font-label text-[9px]-[11px] uppercase tracking-widest`
   - Nessun font-size hardcoded in px che rompe il ritmo

4. **Colori**: cerca qualsiasi colore hardcoded (hex, rgb, rgba) che non sia un token del design system. Eccezione: `rgba` con opacity su colori brand è accettabile.

5. **Animazioni**:
   - Tutte usano `[0.16, 1, 0.3, 1]` come easing?
   - Tutte hanno `viewport={{ once: true }}` per whileInView?
   - `useReducedMotion()` è usato in OGNI componente client con animazioni?

6. **Responsive**: simula mentalmente il layout a 375px (mobile), 768px (tablet), 1440px (desktop). Ci sono elementi che si rompono o overflow?

7. **Hero specifica**:
   - Il LogoWordmark con parallax scroll funziona bene? Il `height: 'clamp(120px, 38vh, 380px)'` è adeguato?
   - La CircleCTA (SVG 220x220) è proporzionata e leggibile su mobile?
   - Il heading `clamp(3rem, 6vw, 6.5rem)` è troppo grande su mobile (375px)?
   - Tutto sta in 100vh senza scroll?

### STEP 4 — Produci il report
Salva il report in `agents/reports/REPORT-UX-UI.md` con questo formato esatto:

```markdown
# REPORT AUDIT UX/UI — Advenire
Data: [oggi]

## SCORE COMPLESSIVO: [x/100]

---

## ✅ CONFORME (nessuna azione richiesta)
- [componente]: [cosa è fatto bene]

---

## 🔴 DA CORREGGERE — Priorità ALTA
Problemi che impattano direttamente l'esperienza utente.

### [Numero]. [Titolo problema]
- **File**: `[path relativo]`
- **Riga**: [numero]
- **Problema**: [descrizione chiara]
- **Codice attuale**:
```tsx
[codice da sostituire — copia esatta dal file]
```
- **Codice corretto**:
```tsx
[codice sostitutivo — pronto da incollare]
```
- **Motivo**: [perché questa modifica migliora la UX]

---

## 🟡 DA CORREGGERE — Priorità MEDIA
Inconsistenze di design system o polish mancante.

### [Numero]. [Titolo]
[stesso formato di sopra]

---

## 💡 SUGGERIMENTI — Priorità BASSA
Miglioramenti opzionali che alzano il livello.

### [Numero]. [Titolo]
[stesso formato di sopra]

---

## 📐 RIEPILOGO COERENZA DESIGN SYSTEM

| Area | Status | Note |
|------|--------|------|
| Font heading | ✅/⚠️/❌ | |
| Font body | ✅/⚠️/❌ | |
| Font label | ✅/⚠️/❌ | |
| Palette colori | ✅/⚠️/❌ | |
| Griglia/contenitori | ✅/⚠️/❌ | |
| Spaziatura sezioni | ✅/⚠️/❌ | |
| Responsive mobile | ✅/⚠️/❌ | |
| Responsive tablet | ✅/⚠️/❌ | |
| Animazioni FM | ✅/⚠️/❌ | |
| useReducedMotion | ✅/⚠️/❌ | |

---

## 📋 LISTA FILE DA MODIFICARE (ordinata per priorità)

| # | File | Modifiche | Priorità |
|---|------|-----------|----------|
| 1 | | | Alta |
| 2 | | | Alta |
| ... | | | |
```

### STEP 5 — Verifica finale
Dopo aver scritto il report, rileggilo e verifica che:
- Ogni "codice attuale" corrisponde ESATTAMENTE a ciò che c'è nel file
- Ogni "codice corretto" è sintatticamente valido e non rompe nulla
- Non hai suggerito modifiche che contraddicono il design system in CLAUDE.md
- Non hai suggerito colori, font o librerie fuori dal design system

---

## REGOLE ASSOLUTE
- NON modificare nessun file del progetto — produci SOLO il report
- NON inventare problemi — se un componente è conforme, dillo
- NON suggerire librerie esterne (no shadcn, no MUI, no Radix)
- NON aggiungere emoji o icone Unicode nei componenti
- Ogni suggerimento DEVE avere il codice pronto da applicare
- Il report deve essere self-contained: chi lo legge deve poter applicare le fix senza leggere altro
