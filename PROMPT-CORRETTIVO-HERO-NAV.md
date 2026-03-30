# PROMPT CORRETTIVO — Hero, Navbar, CTA "Inizia ora" → "Contatti"

## CONTESTO
Il sito Advenire ha bisogno di correzioni su Hero, Navbar e tutte le CTA.
La pagina `/contatti` deve chiamarsi "Contatti" ovunque (non "Inizia ora").
L'heading hero deve essere più grande. Il logo hero un po' più grande. La nav deve stare più in alto.

---

## 1. HERO — `components/home/Hero.tsx`

### 1a. Logo più grande
Cambia le dimensioni del logo da `width: '50%'` / `maxWidth: '650px'` a:
```tsx
style={{
  display: 'block',
  width: '60%',
  maxWidth: '780px',
  height: 'auto',
  margin: '0 auto',
}}
```

### 1b. Navbar più in alto
Il container WORDMARK ha `paddingTop: '2.5vw'`. Riducilo a:
```tsx
paddingTop: '1.5vw',
paddingBottom: '0.5vw',
```

### 1c. Heading più grande
L'heading hero attualmente ha `fontSize: 'clamp(2rem, 4vw, 5rem)'`. Ingrandiscilo a:
```tsx
style={{
  fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
  lineHeight: 1.05,
  letterSpacing: '-0.03em',
}}
```

### 1d. CTA "Inizia ora" → "Contattaci"
Nel nav row della hero (riga ~100), cambia:
```
Inizia ora <span aria-hidden="true">→</span>
```
in:
```
Contattaci <span aria-hidden="true">→</span>
```

Nel CTA grande in basso a destra nella hero grid (riga ~154), cambia ugualmente:
```
Inizia ora <span aria-hidden="true">→</span>
```
in:
```
Contattaci <span aria-hidden="true">→</span>
```

---

## 2. NAVBAR — `components/layout/Navbar.tsx`

### 2a. CtaPill: "Inizia ora" → "Contattaci"
Nel componente `CtaPill()` (riga ~61), cambia il testo:
```tsx
// DA:
Inizia ora
// A:
Contattaci
```

### 2b. Mobile menu: "Inizia ora" → "Contattaci"
Nel mobile overlay (riga ~209), cambia:
```tsx
// DA:
Inizia ora <span aria-hidden="true">→</span>
// A:
Contattaci <span aria-hidden="true">→</span>
```

---

## 3. CTA FINALE — `components/home/CTAFinale.tsx`

Attualmente ci sono DUE bottoni: "Inizia ora" e "Contattaci". Rimuovi il bottone "Inizia ora" e tieni solo "Contattaci":

```tsx
<motion.div
  className="mt-10 flex flex-wrap justify-center gap-4"
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  <Link
    href="/contatti"
    className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.15em] bg-accent text-primary rounded-full px-8 py-3 hover:opacity-85 transition-opacity duration-200"
  >
    Contattaci <span aria-hidden="true">→</span>
  </Link>
</motion.div>
```

---

## 4. CONTATTI PAGE — `app/contatti/page.tsx`

Cambia il metadata title:
```tsx
// DA:
title: 'Inizia ora',
// A:
title: 'Contatti',
```

---

## 5. CONTATTI HERO — `components/contatti/ContattiHero.tsx`

Cambia il label "Inizia ora" (riga ~18):
```tsx
// DA:
Inizia ora
// A:
Contatti
```

---

## RIEPILOGO MODIFICHE

| File | Cosa cambiare |
|------|--------------|
| `components/home/Hero.tsx` | Logo 60%/780px, paddingTop 1.5vw, heading clamp(2.5rem,5vw,5.5rem), 2x "Inizia ora" → "Contattaci" |
| `components/layout/Navbar.tsx` | CtaPill "Inizia ora" → "Contattaci", mobile menu "Inizia ora" → "Contattaci" |
| `components/home/CTAFinale.tsx` | Rimuovi bottone "Inizia ora", tieni solo "Contattaci" con stile accent |
| `app/contatti/page.tsx` | metadata title: "Contatti" |
| `components/contatti/ContattiHero.tsx` | label "Inizia ora" → "Contatti" |

## ATTENZIONE
- NON toccare nessun altro file
- NON modificare la struttura delle sezioni
- NON cambiare colori o font
- Mantieni tutte le animazioni Framer Motion esistenti
