# REPORT AUDIT UX/UI — Advenire
Data: 2026-03-31

## SCORE COMPLESSIVO: 71/100

La base tecnica è solida: palette coerente, easing `[0.16, 1, 0.3, 1]` usato ovunque, `viewport={{ once: true }}` rispettato in ogni componente, gerarchia tipografica quasi integralmente corretta. Il punteggio è penalizzato da tre violazioni dirette delle regole di CLAUDE.md (simboli Unicode, overflow hero mobile, sidebar profiler non responsiva) e da `useReducedMotion()` mancante in 6 componenti.

---

## ✅ CONFORME (nessuna azione richiesta)

- `QuoteSection`: griglia `px-6 lg:px-16`, spaziatura `py-20 lg:py-28`, `useReducedMotion` presente, `viewport={{ once: true }}` ✅
- `ConsulenzaSection`: griglia, spaziatura, `useReducedMotion`, easing, viewport ✅
- `ServiziSection` (card grid): responsive 1→3 col, `useReducedMotion`, easing, `Image` con `mix-blend-mode: luminosity` ✅
- `HeroCosaFacciamo` / `HeroChiSiamo` / `ContattiHero`: `useReducedMotion`, easing, griglia corretta ✅
- `FamilyOfficeSection`: `useReducedMotion`, griglia, spacing `py-20 lg:py-28` ✅
- `TeamSection` / `ValoriChiSiamo`: `useReducedMotion`, easing, viewport ✅
- `ContattiForm`: `useReducedMotion`, viewport, form con label font-label, `focus:border-primary` ✅
- `Hero` (desktop): LogoWordmark con parallax + spring + blur su scroll, `useReducedMotion`, CircleCTA easing ✅
- `SplitText`: `useReducedMotion`, easing `[0.16, 1, 0.3, 1]`, `viewport={{ once: true }}` ✅
- `AccordionItem`: easing, AnimatePresence con height animate ✅
- `CustomCursor`: rilevamento `pointer: fine` / `pointer: coarse`, logica luminance background, spring smooth ✅
- `SmoothScroll`: Lenis implementato correttamente ✅
- `BlueprintGrid`: nessuna animazione, puramente decorativo ✅
- `Navbar`: hide-on-scroll, smart visibility su homepage (appare dopo quote-section), scroll progress indicator ✅
- `Footer`: griglia `px-6 lg:px-16`, `viewport={{ once: true }}`, easing ✅
- `app/layout.tsx`: `lang="it"`, font variables corretti, Navbar + Footer + CustomCursor + SmoothScroll ✅
- Easing `[0.16, 1, 0.3, 1]`: coerente in tutti i componenti animati ✅
- `max-w-[1440px]`: presente in tutti i contenitori ✅
- Palette: nessun colore hardcoded fuori dal design system (i `rgba` su token brand sono accettabili) ✅
- `viewport={{ once: true }}`: rispettato in ogni `whileInView` del codebase ✅

---

## 🔴 DA CORREGGERE — Priorità ALTA
Problemi che impattano direttamente l'esperienza utente.

### 1. Hero: overflow 100vh su mobile 375px
- **File**: `components/home/Hero.tsx`
- **Riga**: 100 (LogoWordmark) e 210–217 (wrapper CircleCTA)
- **Problema**: Su schermo 375×667px (iPhone SE) la hero non sta in 100vh. Il calcolo: LogoWordmark `38vh` = ~253px + nav ~50px + padding + h1 (~96px) + paragraph (~60px) + gap-6 (~24px) + CircleCTA (220px fisso) + pb-12 (~48px) = ~781px > 667px. Su iPhone 14 (390×844) è ~851px vs 844px, ancora fuori. Il CLAUDE.md richiede che tutto stia in viewport senza scroll.
- **Codice attuale**:
```tsx
// LogoWordmark — riga ~100
height: 'clamp(120px, 38vh, 380px)',
```
```tsx
// Wrapper CircleCTA — righe 210-217
<motion.div
  className="flex items-center justify-center lg:justify-end"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: shouldReduce ? 0 : 0.65 }}
>
  <CircleCTA />
</motion.div>
```
- **Codice corretto**:
```tsx
// LogoWordmark — riduce l'altezza del logo su mobile
height: 'clamp(90px, 22vh, 380px)',
```
```tsx
// Wrapper CircleCTA — nasconde su mobile, mantiene su md+
<motion.div
  className="hidden md:flex items-center justify-center lg:justify-end"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: shouldReduce ? 0 : 0.65 }}
>
  <CircleCTA />
</motion.div>
```
- **Motivo**: Con `22vh` su iPhone SE (667px) il logo misura ~147px. Nascondendo la CircleCTA su mobile (il nav in Hero già contiene il CTA "Contattaci"), il totale scende a ~433px, ampiamente dentro 100vh. Su desktop il comportamento è identico all'attuale.

---

### 2. ProfilerInline: sidebar rompe layout su mobile
- **File**: `components/profiler/ProfilerInline.tsx`
- **Riga**: 134–141
- **Problema**: La griglia `gridTemplateColumns: '1fr 300px'` è applicata via inline style senza breakpoint responsivo. Su schermi < 700px (es. 375px) i due colonne occupano rispettivamente ~75px e 300px, causando overflow orizzontale nella sezione profiler (steps 3–5).
- **Codice attuale**:
```tsx
<div
  style={{
    display: showSidebar ? 'grid' : 'block',
    gridTemplateColumns: showSidebar ? '1fr 300px' : undefined,
    gap: showSidebar ? '4rem' : undefined,
    alignItems: 'start',
  }}
>
```
- **Codice corretto**:
```tsx
<div
  className={showSidebar ? 'lg:grid lg:grid-cols-[1fr_300px] lg:gap-16' : ''}
  style={{ alignItems: 'start' }}
>
```
- **Motivo**: Con le classi Tailwind responsive la sidebar compare solo da `lg` (1024px+). Su mobile il contenuto scorre in blocco singolo senza overflow. La sidebar stima è accessibile anche su mobile perché lo step 6 (StepContact) mostra la stima inline.

---

### 3. Simboli Unicode in ServiziGrid e ValoriChiSiamo
- **File**: `components/cosa-facciamo/ServiziGrid.tsx` e `components/chi-siamo/ValoriChiSiamo.tsx`
- **Riga**: ServiziGrid righe 6–46 (dati) e 100–108 (render); ValoriChiSiamo righe 5–24 (dati) e 75–82 (render)
- **Problema**: CLAUDE.md vieta esplicitamente "MAI icone Unicode, MAI emoji nei componenti". I simboli `◈ ◉ ◎ ◇ ◆ ○ ● ◐` in ServiziGrid e `◆ ◉ ◎` in ValoriChiSiamo sono icone Unicode decorative. Il design system prescrive numerazione Space Mono (01, 02, 03).

**ServiziGrid.tsx — Codice attuale (array dati)**:
```tsx
const categorie = [
  {
    simbolo: '◈',
    titolo: 'Pianificazione finanziaria',
    descrizione: "Strategie integrate che guardano all'intero arco della vita.",
  },
  {
    simbolo: '◉',
    titolo: 'Gestione degli investimenti',
    descrizione: 'Portafogli personalizzati per ogni profilo di rischio e obiettivo.',
  },
  {
    simbolo: '◎',
    titolo: 'Pianificazione successoria',
    descrizione: 'Strutture per garantire una trasmissione efficiente del patrimonio.',
  },
  {
    simbolo: '◇',
    titolo: 'Consulenza fiscale',
    descrizione: "Coordinamento per ottimizzare l'efficienza tributaria complessiva.",
  },
  {
    simbolo: '◆',
    titolo: 'Real estate advisory',
    descrizione: 'Analisi e strategie per il patrimonio immobiliare.',
  },
  {
    simbolo: '○',
    titolo: 'Filantropia strategica',
    descrizione: 'Pianificazione degli impatti sociali e strutture donative.',
  },
  {
    simbolo: '●',
    titolo: 'Assicurazioni e protezione',
    descrizione: 'Soluzioni per proteggere il patrimonio da eventi inattesi.',
  },
  {
    simbolo: '◐',
    titolo: 'Coordinamento professionale',
    descrizione: 'Collaborazione con avvocati, commercialisti e notai.',
  },
]
```
**ServiziGrid.tsx — Codice attuale (render simbolo)**:
```tsx
<motion.span
  className="text-[20px] text-background/25 block mb-6"
  whileHover={{ scale: 1.15, color: 'var(--color-accent)' }}
  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
  style={{ display: 'inline-block', transformOrigin: 'left center' }}
>
  {c.simbolo}
</motion.span>
```
**ServiziGrid.tsx — Codice corretto (array dati)**:
```tsx
const categorie = [
  {
    num: '01',
    titolo: 'Pianificazione finanziaria',
    descrizione: "Strategie integrate che guardano all'intero arco della vita.",
  },
  {
    num: '02',
    titolo: 'Gestione degli investimenti',
    descrizione: 'Portafogli personalizzati per ogni profilo di rischio e obiettivo.',
  },
  {
    num: '03',
    titolo: 'Pianificazione successoria',
    descrizione: 'Strutture per garantire una trasmissione efficiente del patrimonio.',
  },
  {
    num: '04',
    titolo: 'Consulenza fiscale',
    descrizione: "Coordinamento per ottimizzare l'efficienza tributaria complessiva.",
  },
  {
    num: '05',
    titolo: 'Real estate advisory',
    descrizione: 'Analisi e strategie per il patrimonio immobiliare.',
  },
  {
    num: '06',
    titolo: 'Filantropia strategica',
    descrizione: 'Pianificazione degli impatti sociali e strutture donative.',
  },
  {
    num: '07',
    titolo: 'Assicurazioni e protezione',
    descrizione: 'Soluzioni per proteggere il patrimonio da eventi inattesi.',
  },
  {
    num: '08',
    titolo: 'Coordinamento professionale',
    descrizione: 'Collaborazione con avvocati, commercialisti e notai.',
  },
]
```
**ServiziGrid.tsx — Codice corretto (render numero)**:
```tsx
<span className="font-label text-[10px] text-background/25 block mb-6 tracking-[0.15em]">
  {c.num}
</span>
```

**ValoriChiSiamo.tsx — Codice attuale (array dati)**:
```tsx
const valori = [
  {
    simbolo: '◆',
    titolo: 'Integrità, senza compromessi',
    ...
  },
  {
    simbolo: '◉',
    titolo: 'Partnership con uno scopo',
    ...
  },
  {
    simbolo: '◎',
    titolo: "L'eccellenza come standard",
    ...
  },
]
```
**ValoriChiSiamo.tsx — Codice attuale (render simbolo)**:
```tsx
<motion.span
  className="text-[20px] text-muted/35 block mb-6"
  whileHover={{ scale: 1.15, color: 'var(--color-accent)' }}
  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
  style={{ display: 'inline-block', transformOrigin: 'left center' }}
>
  {v.simbolo}
</motion.span>
```
**ValoriChiSiamo.tsx — Codice corretto (array dati)**:
```tsx
const valori = [
  {
    num: '01',
    titolo: 'Integrità, senza compromessi',
    ...
  },
  {
    num: '02',
    titolo: 'Partnership con uno scopo',
    ...
  },
  {
    num: '03',
    titolo: "L'eccellenza come standard",
    ...
  },
]
```
**ValoriChiSiamo.tsx — Codice corretto (render numero)**:
```tsx
<span className="font-label text-[10px] text-muted/35 block mb-6 tracking-[0.15em]">
  {v.num}
</span>
```
- **Motivo**: CLAUDE.md regola assoluta — "MAI icone Unicode nei componenti". La numerazione Space Mono è coerente con il design system e con ConsulenzaDifferenteSection che già la usa correttamente.

---

## 🟡 DA CORREGGERE — Priorità MEDIA
Inconsistenze di design system o polish mancante.

### 4. useReducedMotion mancante in 6 componenti
I seguenti componenti hanno animazioni Framer Motion ma non importano né usano `useReducedMotion()`, violando la regola del design system.

#### 4a. ConsulenzaDifferenteSection.tsx
- **File**: `components/home/ConsulenzaDifferenteSection.tsx`
- **Riga**: 3 (import) e ~41 (export default)
- **Codice attuale**:
```tsx
import { motion } from 'framer-motion'
```
```tsx
export default function ConsulenzaDifferenteSection() {
  return (
```
```tsx
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.75,
                delay: (i % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
```
- **Codice corretto**:
```tsx
import { motion, useReducedMotion } from 'framer-motion'
```
```tsx
export default function ConsulenzaDifferenteSection() {
  const shouldReduce = useReducedMotion()
  return (
```
```tsx
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.75,
                delay: shouldReduce ? 0 : (i % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
```
- **Motivo**: Gli utenti con `prefers-reduced-motion: reduce` devono vedere i contenuti senza delay né spostamenti.

#### 4b. CTAFinale.tsx
- **File**: `components/home/CTAFinale.tsx`
- **Riga**: 5 (import) e 6 (export default)
- **Codice attuale**:
```tsx
import { motion } from 'framer-motion'

export default function CTAFinale() {
  return (
```
```tsx
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
```
```tsx
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
```
- **Codice corretto**:
```tsx
import { motion, useReducedMotion } from 'framer-motion'

export default function CTAFinale() {
  const shouldReduce = useReducedMotion()
  return (
```
```tsx
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
```
```tsx
          initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: shouldReduce ? 0 : 0.2 }}
```
- **Motivo**: La CTA finale è un elemento chiave della conversione — deve essere visibile senza animazione per gli utenti con reduced motion.

#### 4c. FadeInView.tsx
- **File**: `components/ui/FadeInView.tsx`
- **Riga**: 3 (import) e 22 (initial)
- **Codice attuale**:
```tsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
```
```tsx
  const initial = {
    opacity: 0,
    y: direction === 'up' ? 20 : 0,
    x: direction === 'left' ? 20 : 0,
  }
```
- **Codice corretto**:
```tsx
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
```
```tsx
  const shouldReduce = useReducedMotion()
  const initial = {
    opacity: 0,
    y: direction === 'up' && !shouldReduce ? 20 : 0,
    x: direction === 'left' && !shouldReduce ? 20 : 0,
  }
```
- **Motivo**: FadeInView è un componente condiviso usato da più sezioni — correggere qui copre tutti i punti di uso.

#### 4d. PageTransition.tsx
- **File**: `components/ui/PageTransition.tsx`
- **Riga**: 3 (import) e 6 (export default)
- **Codice attuale**:
```tsx
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
```
- **Codice corretto**:
```tsx
import { motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduce ? 0.15 : 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
```
- **Motivo**: La transizione di pagina si attiva ad ogni navigazione — è una delle animazioni più frequenti del sito. Per reduced motion deve essere quasi istantanea.

#### 4e. ArchitecturalLines.tsx
- **File**: `components/ui/ArchitecturalLines.tsx`
- **Riga**: 3 (import) e 27 (motion.div)
- **Codice attuale**:
```tsx
import { motion } from 'framer-motion'
```
```tsx
    <motion.div
      className={`absolute ${positionClasses[position]} pointer-events-none`}
      style={{ width: 'clamp(120px, 15vw, 240px)', height: 'clamp(120px, 15vw, 240px)' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: 0.3 }}
    >
```
- **Codice corretto**:
```tsx
import { motion, useReducedMotion } from 'framer-motion'
```
```tsx
  const shouldReduce = useReducedMotion()
    <motion.div
      className={`absolute ${positionClasses[position]} pointer-events-none`}
      style={{ width: 'clamp(120px, 15vw, 240px)', height: 'clamp(120px, 15vw, 240px)' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: shouldReduce ? 0 : 1.2, delay: shouldReduce ? 0 : 0.3 }}
    >
```
- **Motivo**: Elemento puramente decorativo — deve apparire immediatamente per chi ha reduced motion abilitato.

#### 4f. Footer.tsx
- **File**: `components/layout/Footer.tsx`
- **Riga**: 5 (import) e 18 (colVariants)
- **Codice attuale**:
```tsx
import { motion } from 'framer-motion'
```
```tsx
const colVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function Footer() {
  return (
```
- **Codice corretto**:
```tsx
import { motion, useReducedMotion } from 'framer-motion'
```
```tsx
export default function Footer() {
  const shouldReduce = useReducedMotion()

  const colVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, delay: shouldReduce ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
    }),
  }

  return (
```
- **Motivo**: Spostando `colVariants` dentro il componente si può usare `shouldReduce` dalla hook. Il footer viene visto a ogni fine pagina — gli stagger delay devono essere rimossi per reduced motion.

---

### 5. Griglia inconsistente: ServiziSection e Navbar usano padding diverso
- **File**: `components/home/ServiziSection.tsx` riga 102 e `components/layout/Navbar.tsx` riga 109
- **Problema**: Standard sito = `px-6 lg:px-16`. ServiziSection usa `px-8 lg:px-20`, Navbar usa `px-8 lg:px-20`. Anche Hero.tsx righe 140 e 183 usano `px-8` invece di `px-6` (mobile). Questo crea un allineamento visivo disomogeneo tra le sezioni.

**ServiziSection.tsx — Codice attuale** (riga 102):
```tsx
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 relative">
```
**ServiziSection.tsx — Codice corretto**:
```tsx
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 relative">
```

**Navbar.tsx — Codice attuale** (riga 109):
```tsx
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
```
**Navbar.tsx — Codice corretto**:
```tsx
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
```

**Hero.tsx — Codice attuale** (riga 140):
```tsx
          <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
```
**Hero.tsx — Codice corretto** (riga 140):
```tsx
          <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
```

**Hero.tsx — Codice attuale** (riga 183):
```tsx
          className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-8 pb-12 lg:pt-10 lg:pb-16 w-full"
```
**Hero.tsx — Codice corretto** (riga 183):
```tsx
          className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-8 pb-12 lg:pt-10 lg:pb-16 w-full"
```
- **Motivo**: La coerenza della griglia fa sì che i contenuti siano visivamente allineati verticalmente tra tutte le sezioni. `px-8` su mobile equivale a 32px vs i 24px standard — una differenza percepibile.

---

### 6. ConsulenzaDifferenteSection: spaziatura verticale ridotta
- **File**: `components/home/ConsulenzaDifferenteSection.tsx`
- **Riga**: 45
- **Problema**: La sezione usa `py-14 lg:py-20` mentre lo standard del sito è `py-20 lg:py-28`. Il ritmo verticale è spezzato: dopo QuoteSection (py-20 lg:py-28) e prima di ServiziSection (py-20 lg:py-28), questa sezione appare visivamente compressa.
- **Codice attuale**:
```tsx
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-14 lg:py-20 border-t border-border relative">
```
- **Codice corretto**:
```tsx
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20 lg:py-28 border-t border-border relative">
```
- **Motivo**: Il ritmo verticale coerente tra sezioni è fondamentale per la percezione di qualità editoriale. Una sezione compressa rompe il respiro del layout.

---

### 7. Section label font-size a 13px (spec: 9–11px)
- **File**: `components/home/QuoteSection.tsx` riga 18, `components/home/ConsulenzaDifferenteSection.tsx` riga 51, `components/home/ConsulenzaSection.tsx` riga 42
- **Problema**: Il design system specifica `font-label text-[9px]-[11px] uppercase tracking-widest` per le label di sezione. Tre componenti usano `text-[13px]`, dimensione riservata al body text leggero, non alle micro-label.

**QuoteSection.tsx — Codice attuale** (riga 18):
```tsx
          className="font-label text-[13px] uppercase tracking-[0.18em] text-foreground/65"
```
**QuoteSection.tsx — Codice corretto**:
```tsx
          className="font-label text-[10px] uppercase tracking-[0.18em] text-foreground/65"
```

**ConsulenzaDifferenteSection.tsx — Codice attuale** (riga 51):
```tsx
            className="font-label text-[13px] uppercase tracking-[0.18em] text-foreground/75"
```
**ConsulenzaDifferenteSection.tsx — Codice corretto**:
```tsx
            className="font-label text-[10px] uppercase tracking-[0.18em] text-foreground/75"
```

**ConsulenzaSection.tsx — Codice attuale** (riga 42):
```tsx
              className="font-label text-foreground/65 uppercase tracking-[0.18em] text-[13px] block mb-8"
```
**ConsulenzaSection.tsx — Codice corretto**:
```tsx
              className="font-label text-foreground/65 uppercase tracking-[0.18em] text-[10px] block mb-8"
```
- **Motivo**: Le label di sezione devono essere micro-testo sopra i titoli, non competere visivamente con il body. `text-[13px]` con Space Mono uppercase appare troppo prominente e squilibra la gerarchia visiva.

---

## 💡 SUGGERIMENTI — Priorità BASSA
Miglioramenti opzionali che alzano il livello.

### 8. h1 italic inconsistente tra le pagine hero
- **File**: `components/home/Hero.tsx` riga 191, `components/cosa-facciamo/HeroCosaFacciamo.tsx` riga 25, `components/chi-siamo/HeroChiSiamo.tsx` riga 24
- **Problema**: CLAUDE.md: "Heading display: sempre font-heading font-light italic". `ContattiHero.tsx` rispetta la regola con `font-heading font-light italic text-background`. Gli altri tre hero mancano della classe `italic`. L'incoerenza è visibile confrontando i titoli tra pagine.
- **Codice attuale** (Hero.tsx riga 191):
```tsx
                className="font-heading font-light text-background"
```
- **Codice corretto**:
```tsx
                className="font-heading font-light italic text-background"
```
- Stessa modifica per HeroCosaFacciamo.tsx riga 25 e HeroChiSiamo.tsx riga 24 (aggiungere `italic`).
- **Motivo**: Cormorant Garamond italic è il tono editoriale distintivo del brand. Applicarlo uniformemente agli h1 hero rafforza l'identità visiva.

---

### 9. HeroCosaFacciamo: pattern `not-italic` + inline fontStyle ridondante
- **File**: `components/cosa-facciamo/HeroCosaFacciamo.tsx`
- **Riga**: 36
- **Problema**: L'elemento `<em>` usa sia la classe Tailwind `not-italic` (che sovrascrive lo stile default di `<em>`) sia `style={{ fontStyle: 'italic' }}` che lo re-applica. Il risultato finale è corretto ma il codice è contraddittorio e confuso.
- **Codice attuale**:
```tsx
            <em className="not-italic" style={{ fontStyle: 'italic' }}>che si adatta a te.</em>
```
- **Codice corretto**:
```tsx
            <em className="italic">che si adatta a te.</em>
```
- **Motivo**: `italic` è la classe Tailwind corretta per applicare `font-style: italic`. Nessun inline style necessario.

---

### 10. CustomCursor: valore rgba background leggermente non allineato al token
- **File**: `components/ui/CustomCursor.tsx`
- **Riga**: 37, 38, 44, 45
- **Problema**: Il cursore usa `rgba(245,240,232,...)` come colore "dark mode" mentre il token `--color-background` è `#F6EFE5 = rgb(246,239,229)`. La differenza (1 unità sui canali R e B) è quasi impercettibile a occhio, ma tecnicamente non è il token corretto.
- **Codice attuale**:
```tsx
const RING_COLOR: Record<CursorMode, string> = {
  interactive: 'rgba(253,167,126,1)',
  dark:        'rgba(245,240,232,0.9)',
  light:       'rgba(5,56,13,0.55)',
}

const DOT_COLOR: Record<CursorMode, string> = {
  interactive: 'rgba(253,167,126,0)',
  dark:        'rgba(245,240,232,0.95)',
  light:       'rgba(5,56,13,0.9)',
}
```
- **Codice corretto**:
```tsx
const RING_COLOR: Record<CursorMode, string> = {
  interactive: 'rgba(253,167,126,1)',
  dark:        'rgba(246,239,229,0.9)',
  light:       'rgba(5,56,13,0.55)',
}

const DOT_COLOR: Record<CursorMode, string> = {
  interactive: 'rgba(253,167,126,0)',
  dark:        'rgba(246,239,229,0.95)',
  light:       'rgba(5,56,13,0.9)',
}
```
- **Motivo**: Allineare i valori rgba al token esatto del design system evita deriva cromatica nel tempo se il token viene aggiornato.

---

## 📐 RIEPILOGO COERENZA DESIGN SYSTEM

| Area | Status | Note |
|------|--------|------|
| Font heading | ⚠️ | italic mancante su 3 h1 hero; h2 CTAFinale/QuoteSection corretti |
| Font body | ✅ | Inter applicato correttamente ovunque |
| Font label | ⚠️ | text-[13px] in 3 componenti invece di text-[10px] spec |
| Palette colori | ✅ | Nessun colore fuori sistema; rgba su token accettabili |
| Griglia/contenitori | ⚠️ | ServiziSection e Navbar usano px-8 lg:px-20; Hero usa px-8 mobile |
| Spaziatura sezioni | ⚠️ | ConsulenzaDifferenteSection usa py-14 lg:py-20 vs standard py-20 lg:py-28 |
| Responsive mobile | ❌ | Hero overflow 100vh su 375px; Profiler sidebar rompe su < 700px |
| Responsive tablet | ✅ | Layout a 768px generalmente corretto |
| Animazioni FM | ✅ | Easing [0.16,1,0.3,1] e viewport once:true coerenti in tutto il codebase |
| useReducedMotion | ❌ | Mancante in 6 componenti: ConsulenzaDifferente, CTAFinale, FadeInView, PageTransition, ArchitecturalLines, Footer |
| Icone Unicode | ❌ | ServiziGrid e ValoriChiSiamo violano la regola CLAUDE.md |

---

## 📋 LISTA FILE DA MODIFICARE (ordinata per priorità)

| # | File | Modifiche | Priorità |
|---|------|-----------|----------|
| 1 | `components/home/Hero.tsx` | Ridurre logo height mobile (`22vh`), nascondere CircleCTA su mobile (`hidden md:flex`), correggere `px-8` → `px-6` (2 punti) | Alta |
| 2 | `components/profiler/ProfilerInline.tsx` | Griglia sidebar con breakpoint Tailwind `lg:grid lg:grid-cols-[1fr_300px]` | Alta |
| 3 | `components/cosa-facciamo/ServiziGrid.tsx` | Rimuovere simboli Unicode, aggiungere `num` numerico, cambiare render | Alta |
| 4 | `components/chi-siamo/ValoriChiSiamo.tsx` | Rimuovere simboli Unicode, aggiungere `num` numerico, cambiare render | Alta |
| 5 | `components/home/ConsulenzaDifferenteSection.tsx` | Aggiungere `useReducedMotion`, correggere delay e y condizionali, correggere spaziatura `py-20 lg:py-28` | Media |
| 6 | `components/home/CTAFinale.tsx` | Aggiungere `useReducedMotion`, correggere delay e y condizionali | Media |
| 7 | `components/ui/FadeInView.tsx` | Aggiungere `useReducedMotion`, rendere y/x condizionali | Media |
| 8 | `components/ui/PageTransition.tsx` | Aggiungere `useReducedMotion`, ridurre y e duration per reduced motion | Media |
| 9 | `components/ui/ArchitecturalLines.tsx` | Aggiungere `useReducedMotion`, duration 0 per reduced motion | Media |
| 10 | `components/layout/Footer.tsx` | Aggiungere `useReducedMotion`, spostare colVariants dentro il componente | Media |
| 11 | `components/home/ServiziSection.tsx` | Correggere `px-8 lg:px-20` → `px-6 lg:px-16` | Media |
| 12 | `components/layout/Navbar.tsx` | Correggere `px-8 lg:px-20` → `px-6 lg:px-16` | Media |
| 13 | `components/home/QuoteSection.tsx` | Label `text-[13px]` → `text-[10px]` | Media |
| 14 | `components/home/ConsulenzaSection.tsx` | Label `text-[13px]` → `text-[10px]` | Media |
| 15 | `components/home/Hero.tsx` | Aggiungere `italic` a h1 | Bassa |
| 16 | `components/cosa-facciamo/HeroCosaFacciamo.tsx` | Aggiungere `italic` a h1, semplificare `<em>` | Bassa |
| 17 | `components/chi-siamo/HeroChiSiamo.tsx` | Aggiungere `italic` a h1 | Bassa |
| 18 | `components/ui/CustomCursor.tsx` | Allineare rgba a token esatto `rgb(246,239,229)` | Bassa |
