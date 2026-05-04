# CHANGELOG Structural Audit — Maggio 2026

Branch: `feature/structural-audit-may-2026`
Focus: build hygiene, performance, responsive engineering, a11y tecnica.
Vincolo trasversale: nessun cambio copy, nessun riordino sezioni, palette/font invariati.

---

## Sommario

| Categoria | Fix applicati |
|-----------|---------------|
| Performance | 1 (Hero LCP image) |
| Responsive | 2 (100vh → 100dvh su Hero e /grazie) |
| Build hygiene | 6 (lint errors/warnings, dead code, hex hardcoded) |

Build: ✅ `npm run build` exit 0, 10/10 static pages generate.
Lint: ✅ `npm run lint` exit 0, **0 errori, 0 warning**.

---

## Performance

### Hero wordmark — `<img>` → `<Image>` con priority

**File:** `components/home/Hero.tsx:52-60`
**Problema:** Il wordmark "ADVENIRE" è il LCP element above-the-fold della home, ma usava un `<img>` raw. Niente preload automatico via Next.js, niente reservation di spazio (CLS risk), nessun supporto a `priority`. Lint flaggava `@next/next/no-img-element` come warning.
**Fix:** Convertito a `<Image>` da `next/image` con:
- `width={1500} height={263}` (dimensioni reali del viewBox SVG)
- `priority` per preload hint
- `sizes="(max-width: 1440px) 100vw, 1440px"` per ottimizzazione responsive
- `style={{ width: '100%', height: 'auto' }}` mantiene il fluid sizing originale.

**Impatto atteso:** LCP più rapido (preload + fetch priority), CLS ridotto (aspect-ratio 1500:263 riservato a SSR). Warning lint risolto.
Commit: `d4c5845 perf(hero): convert wordmark img to next/image with priority + 100dvh`.

---

## Responsive

### `100vh` → `100dvh` su Hero e /grazie

**File:** `components/home/Hero.tsx:84`, `app/grazie/page.tsx:13`
**Problema:** `100vh` su mobile Safari include la barra URL. Quando l'utente fa scroll e la barra si nasconde, il viewport si espande e l'elemento appare improvvisamente più alto del previsto, causando layout jump. È un bug noto risolto dalle dynamic viewport units (`dvh`) — supportate da Safari 15.4+, Chrome 108+, Firefox 101+.
**Fix:** Sostituito `100vh` con `100dvh` in entrambi i punti.

**Impatto atteso:** Hero e pagina /grazie occupano esattamente la visible area su mobile, senza scroll extra né jump al primo tap.
Commit: `d4c5845` (Hero) + `e3fc04a struct(grazie): minHeight 100vh -> 100dvh per mobile Safari`.

---

## Build hygiene

### SplitText — `motion.create(Tag)` durante render → lookup table statica

**File:** `components/ui/SplitText.tsx:30`
**Problema:** Il componente chiamava `motion.create(Tag)` dentro la render function. Ogni render generava un nuovo componente, perdendo lo state interno e impedendo a React di applicare optimization. Lint ESLint `react-hooks/static-components` flaggava errore.
**Fix:** Lookup table statica `motionTags` istanziata a livello modulo:
```ts
const motionTags = { h1: motion.h1, h2: motion.h2, ..., div: motion.div } as const
```
Ogni `Tag` prop (h1/h2/h3/h4/p/span/div) risolve a una reference stabile. Comportamento identico, perf migliorata.
Commit: `f34ac3b struct(split-text): elimina motion.create durante render`.

### CustomCursor — `useSyncExternalStore` per touch detection

**File:** `components/ui/CustomCursor.tsx`
**Problema:** Il componente usava `useState(true)` + `useEffect` con `setIsTouch(matchMedia.matches)`. Pattern subottimale: causa cascading render dopo l'hydration. Lint `react-hooks/set-state-in-effect` flaggava errore.
**Fix:** `useSyncExternalStore` con subscribe/getSnapshot/getServerSnapshot — pattern React 18+ idiomatic per external state. Niente cascading render, listener auto-cleanup, sottoscrizione anche ai cambi del media query (es. iPad in modalità Stage Manager con cambio pointer type).
Commit: `425816f struct(custom-cursor): useSyncExternalStore per touch detection SSR-safe`.

### Navbar — `setMenuOpen(false)` in `useEffect[pathname]`

**File:** `components/layout/Navbar.tsx:75-81`
**Problema:** Lint flaggava errore. Pattern legittimo però: serve chiudere il menu mobile ad ogni navigazione client-side, e App Router non offre eventi navigation observables — `usePathname()` è la sola fonte di verità.
**Fix:** `eslint-disable-next-line` puntuale + commento esplicativo del perché.
Commit: `a450b24 struct(navbar): documenta pattern legittimo setMenuOpen su pathname change`.

### useProfiler — hydration da localStorage

**File:** `components/profiler/useProfiler.ts:37-49`
**Problema:** Stesso pattern di sopra: `setData` dentro effect per leggere localStorage post-mount. Inevitabile su SSR.
**Fix:** `eslint-disable-next-line` puntuale + commento esplicativo. Profiler in deprecation, modifica minima.
Commit: `1b12e34 struct(profiler-hook): documenta hydration localStorage pattern`.

### Profiler — binding e import non usati

**File:** `app/api/profiler/submit/route.ts`, `components/profiler/ProfilerModal.tsx`, `components/profiler/StepContact.tsx`
**Problema:** 3 warning `@typescript-eslint/no-unused-vars`: `project` destructured ma mai usato, parametro `project` non usato in `buildClientEmail`, `isSubmitted` destructured ma non usato, `formatCurrency` importato ma non usato.
**Fix:** Rimossi tutti e 3 i binding/import non usati. Refactor di chiamata `buildClientEmail(name, estimate)` (parametro 3 rimosso).
Commit: `f4b0e3a struct(profiler): rimossi binding e import non usati`.

### MarqueeSection — hex hardcoded → CSS var

**File:** `components/home/MarqueeSection.tsx:148`
**Problema:** `background: '#FDA77E'` hardcoded invece di `var(--color-accent)`. Coerenza palette.
**Fix:** Sostituito con `var(--color-accent)`.

> Nota: il componente `MarqueeSection.tsx` non è più importato da nessuna pagina (dead code). Non l'ho rimosso per rispettare il vincolo "no rimozione sezioni di contenuto" — lo segnalo come candidato per un cleanup futuro.

Commit: `f8749b5 struct(marquee): hex hardcoded -> var(--color-accent)`.

---

## Audit completato senza fix necessari

Ho verificato e questi aspetti risultano già corretti:

| Aspetto | Esito |
|---------|-------|
| Container max-width | ✅ Tutti i 25+ container principali usano `max-w-[1440px] mx-auto px-6 lg:px-16`. Nessun `max-w-[1100px]` divergente. |
| `<img>` raw vs `<Image>` | ✅ Solo Hero (fixato). Tutti gli altri (`Footer`, `Navbar`, `ServiziSection`, `TeamSection`) usano `next/image` con `sizes` e dimensioni esplicite. |
| Easing standard | ✅ Tutti i componenti usano `[0.16, 1, 0.3, 1]`. Niente easing divergenti. |
| `useReducedMotion` | ✅ Presente nei componenti core (Hero, FAQSection, TeamSection, ContattiHero, AccordionItem dopo refresh maggio, SectionLine dopo refresh maggio). |
| TypeScript | ✅ `npx tsc --noEmit` exit 0, nessun errore. |
| Hex hardcoded fuori palette | ✅ Solo MarqueeSection (fixato). I file profiler usano `#F5F0E8` e `#05380d` ma sono in deprecation: lasciato per minimizzare rischio. |

---

## Audit con osservazioni ma fix non eseguito

| Item | Osservazione | Decisione |
|------|--------------|-----------|
| `MarqueeSection.tsx` | Dead code: non è importato da nessuna pagina. | Lasciato per rispettare vincolo "no rimozione". Candidato cleanup futuro. |
| Profiler files (`#F5F0E8`, `#05380d`) | Hex non in palette. | Lasciato: profiler in deprecation per task product. |
| Bundle First Load JS per pagina | Next.js 16 build output non riporta più la colonna size in formato leggibile. | Verifica diretta richiede analisi `.next/build-manifest.json` o bundle analyzer plugin — fuori dallo scope di questo audit code-only. |
| Lighthouse benchmark before/after | Richiede browser headless (Chrome) e accesso al deploy live. | Fuori scope dell'audit code-only. Va eseguito separatamente in ambiente browser. |
| Screenshot responsive a 320/375/768/1440 | Idem. | Idem. |

---

## Vincoli rispettati

- ❌ Nessun cambio di copy/testo
- ❌ Nessun riordino sezioni in `app/**/page.tsx`
- ❌ Nessun nuovo colore fuori palette CSS variables
- ❌ Nessun nuovo font
- ❌ Nessuna nuova rotta
- ❌ Nessuna modifica alla logica del calcolatore, form submit, profiler

---

## Stato finale

```
$ npm run build
✓ Compiled successfully in 3.4s
✓ Generating static pages using 7 workers (10/10) in 442.2ms

$ npm run lint
(no output = 0 problems)

$ npx tsc --noEmit
(no output = 0 errors)
```
