# CHANGELOG UX/UI Refresh — Maggio 2026

Branch: `feature/ux-refresh-may-2026`
Audit basato sugli screenshot live di `advenire-restyle.vercel.app` del 2026-05-03.

---

## Sommario per pagina

| Pagina | Fix applicati |
|--------|---------------|
| `/chi-siamo` | 1 (critico — mapping foto-nome team) |
| Layout globale (Navbar) | 1 (a11y — focus visible su hamburger e link mobile) |
| `/contatti` | 1 (a11y — focus visible su input e aria-required) |
| Componente UI condiviso | 2 (a11y — useReducedMotion in AccordionItem e SectionLine) |

---

## Fix critico

### CHI-SIAMO — mapping foto-nome team

**Problema:** Le foto dei tre fondatori erano associate al nome sbagliato. I file PNG fisici (`alessandro.png`, `giacomo.png`, `armand.png`) contenevano ciascuno il volto di un'altra persona, e l'array nel componente li mappava in ordine Alessandro → Giacomo → Armand. Effetto visibile sul live: il volto di Giacomo era etichettato come "Alessandro Panaia", quello di Armand come "Giacomo Giacalone", quello di Alessandro come "Armand Guzhda".

**Fix:**
- `public/images/team/` — rinominati i 3 file (3-step rename con temp filename per evitare collisioni) così che il contenuto del file corrisponda al nome del file.
- `components/chi-siamo/TeamSection.tsx:6-27` — riordinato l'array `team` nell'ordine richiesto: **Giacomo → Armand → Alessandro** (posizioni 1, 2, 3 sx → dx). Il mapping nome ↔ ruolo ↔ citazione resta legato alla persona corretta.

**Verifica visiva attesa su `/chi-siamo`:**
- Posizione 1 → volto Giacomo + "Giacomo Giacalone — Co-founder & Interior Designer" + quote "La casa è un progetto di vita, non un prodotto."
- Posizione 2 → volto Armand + "Armand Guzhda — Co-founder & Architetto" + quote sull'innovazione.
- Posizione 3 → volto Alessandro + "Alessandro Panaia — Co-founder & Project Manager" + quote sul cliente assistito.

Commit: `d188b2c ux(chi-siamo): correzione mapping foto-nome team`.

---

## Fix accessibilità

### Navbar — focus-visible su hamburger e link mobile

**File:** `components/layout/Navbar.tsx:124-130`, `:167-172`
**Problema:** Il button hamburger del menu mobile e i Link nell'overlay menu non avevano un outline visibile per la navigazione da tastiera (WCAG 2.1 SC 2.4.7 Focus Visible).
**Fix:** Aggiunto `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent` + `rounded-sm` sul button hamburger; aggiunto pattern equivalente sui Link del menu mobile. Aggiunto anche `aria-expanded={menuOpen}` per stato semantico corretto.
Commit: `8f407d2 ux(navbar): focus-visible su hamburger e link menu mobile`.

### ContattiForm — focus-visible su input/textarea + aria-required

**File:** `components/contatti/ContattiForm.tsx` (5 campi)
**Problema:** Tutti i campi del form (`type="text"`, `type="email"`, `type="tel"`, `<textarea>`) usavano `focus:outline-none` senza alternativa visibile. Per chi naviga da tastiera era impossibile capire quale campo avesse il focus. I campi `required` HTML5 non avevano l'attributo `aria-required` esplicito.
**Fix:** Aggiunto `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent` su tutti i 5 campi (replace_all). Aggiunto `aria-required="true"` su nome, cognome, email, textarea (i 4 campi obbligatori). L'animazione esistente `focus:border-primary` resta invariata per il focus da mouse.
Commit: `9de023d ux(contatti-form): focus-visible accent + aria-required su campi obbligatori`.

### AccordionItem — useReducedMotion

**File:** `components/ui/AccordionItem.tsx`
**Problema:** Il componente animava height transitions, fade-in del contenuto e rotazione dell'icona +/× senza condizionare durate e offset alla preferenza di sistema `prefers-reduced-motion` (WCAG 2.3.3 Animation from Interactions).
**Fix:** Importato `useReducedMotion` da `framer-motion`. Le durate, i delay e l'offset `y: 8` vengono azzerati quando l'utente ha attivato la riduzione del movimento. Lo stato finale degli elementi resta identico (l'accordion si apre/chiude istantaneamente).
Commit: `f9e1e3e ux(ui): rispetta prefers-reduced-motion in AccordionItem e SectionLine`.

### SectionLine — useReducedMotion

**File:** `components/ui/SectionLine.tsx`
**Problema:** L'animazione di `scaleX: 0 → 1` per disegnare la linea divider non rispettava `prefers-reduced-motion`.
**Fix:** Importato `useReducedMotion`. Quando attivo, la linea appare già al suo stato finale (`scaleX: 1`) con `duration: 0` invece di animarsi.
Commit: `f9e1e3e ux(ui): rispetta prefers-reduced-motion in AccordionItem e SectionLine`.

---

## Fix non eseguiti perché vincolo

| Considerazione | Esito | Motivazione |
|----------------|-------|-------------|
| Accorciare paragrafo coral QuoteSection | ❌ skip | Sarebbe cambio di copy. La sezione ha già `max-w-4xl mx-auto text-center` con font-size clamp generoso — il ritmo lettura è accettabile. |
| Rimuovere `<ProfilerInline />` da `/contatti` | ❌ skip | Esplicito nel briefing: deprecation gestita in altro task di product. |
| Modificare `CalcolatoreRischio.tsx` | ❌ skip | Esplicito nel briefing: framing/copy/logica invariati. |
| Riformulare alt text dei portrait team | ❌ skip | Il template `alt={\`Ritratto di ${membro.nome}\`}` è generato dinamicamente dal nome. Dopo il fix del mapping, è già corretto. |

---

## Stato build & lint

- `npm run build` → ✅ exit 0, 0 errori TypeScript, 10/10 static pages generate.
- `npm run lint` sui file modificati → ✅ pulito (l'unico warning su `Navbar.tsx:76` è preesistente in un `useEffect` non toccato da questo refresh).

---

## Vincoli rispettati

- ❌ Nessun cambio di copy/testo (headline, body, label, FAQ, CTA, alt narrativi)
- ❌ Nessun riordino sezioni in `app/**/page.tsx`
- ❌ Nessun nuovo colore fuori palette CSS variables
- ❌ Nessun nuovo font
- ❌ Nessuna nuova rotta
- ❌ Nessuna modifica al `CalcolatoreRischio.tsx`
- ❌ `<ProfilerInline />` su `/contatti` invariato
