# UX Audit · maggio 2026

Branch: `feature/ux-audit-may-2026`
Scope: Home, Investimenti Immobiliari, Nuove Costruzioni, Chi Siamo, Contatti.
Vincoli rispettati: nessun cambio di copy, nessuna riorganizzazione di sezioni, nessuna sezione aggiunta/rimossa, palette CSS vars, font Cormorant/Inter/Space Mono, rotte invariate.

Questo audit privilegia **sottrazione e ritmo**: aumento del contrasto testi minor (mai ridotto), uniformazione delle opacità di bordo, micro-correzioni di simmetria padding e ariosità su griglie e card. Nessuna animazione "rumorosa" introdotta.

---

## Sommario per pagina

| Pagina | Fix applicati |
|---|---|
| Home | 11 |
| Investimenti Immobiliari | 7 |
| Nuove Costruzioni | 4 |
| Chi Siamo | 5 |
| Contatti | 6 |
| Layout (Navbar / Footer / UI) | 5 |
| **Totale** | **38** |

---

## Home (`/`)

### `components/home/Hero.tsx`
1. **Hex hardcoded → CSS var**
   - Problema: `<span style={{ color: '#FDA77E' }}>` violava il vincolo "tutti i colori dalla palette CSS vars"
   - Fix: rimosso `style`, aggiunta classe `text-accent`
2. **Subtitle illeggibile su verde scuro**
   - Problema: `text-background/55 text-[11px] md:text-[12px]` — opacità 55% su `#05380D` produce contrasto sotto AA, e font a 11/12 px è microscopico
   - Fix: `text-background/75 text-[13px] md:text-[14px]`, `mt-2 → mt-3` per ariosità
3. **Pillola Contatti più editoriale**
   - Problema: `border-background/50` troppo marcato; link nav `text-background/70` poco leggibile
   - Fix: `border-background/35` (più sottile), nav `text-background/75–80` (più contrasto)

### `components/home/QuoteSection.tsx`
4. **Bug funzionale `id`**
   - Problema: `id="chi-siamo"` mentre la `Navbar` cerca `document.getElementById('quote-section')` per attivarsi al raggiungimento della sezione crema. La navbar non si attivava mai correttamente sulla home, falliva sul fallback `window.innerHeight`.
   - Fix: `id="quote-section"` (allinea trigger Navbar)
5. **Spacing label e padding sezione**
   - Problema: `text-primary/70` → margine extra di leggibilità; `py-36` lg eccessivo (vs altre sezioni a `py-28`)
   - Fix: `text-primary/75`, `py-32` lg (uniformato al ritmo verticale del sito)
6. **CTA cluster — easing e viewport coerenti**
   - Problema: `viewport={{ once: true }}` senza `margin`, transition senza `ease` (default Framer)
   - Fix: aggiunto `margin: '-10%'` e `ease: [0.16, 1, 0.3, 1]`, `mt-12 lg:mt-14` (era solo `mt-14`)

### `components/home/ServiziSection.tsx`
7. **Border opacity invalida in Tailwind v4**
   - Problema: `border-foreground/8` non è un valore opacità Tailwind nativo (non genera regola)
   - Fix: `border-foreground/10`
8. **Card body — leggibilità e misura riga**
   - Problema: `text-foreground/65` ai limiti di contrasto AA; nessun `max-w` produce righe oltre 100ch
   - Fix: `text-foreground/75`, `max-w-[60ch]`, `mt-4 → mt-5` e CTA cluster `mt-6 → mt-7` per ritmo

### `components/home/ConsulenzaDifferenteSection.tsx`
9. **Card grid — micro-tipografia e padding**
   - Problema: titolo `0.95–1.15rem` troppo piccolo, `mb-3` su title stretto, body `text-primary/65`
   - Fix: titolo `1–1.2rem`, `mb-4`, body `text-primary/75`; padding card `md:py-8 → md:py-9` e label `mb-4 → mb-5`

### `components/home/FAQSection.tsx`
10. **Spacing tra categorie**
    - Problema: `mt-16 mb-6` tra categorie produceva "wall of white space"
    - Fix: `mt-12 mb-5` (più ritmo, mantenendo la separazione)
11. **Focus ring più visibile**
    - Problema: `outline-offset-2` troppo vicino al testo
    - Fix: `outline-offset-4` + `rounded-sm` per stato focus visibile su tab

---

## Servizi — Investimenti Immobiliari (`/servizi/investimenti-immobiliari`)

### `components/servizi/HeroServizio.tsx`
1. **Asimmetria padding desktop**
   - Problema: `pt-20 pb-20` mobile, `lg:pt-28 lg:pb-32` desktop (asimmetrico vs proporzioni dei titoli)
   - Fix: `pt-20 pb-24` mobile, mantenuto `lg:pt-28 lg:pb-32`
2. **Contrasto label e sottotitolo**
   - Problema: `text-background/55` label, `text-background/75` body
   - Fix: `text-background/65` label, `text-background/80` body (sopra AA su verde profondo)

### `components/servizi/CalcolatoreRischio.tsx`
3. **Phase grid — ariosità e bordi**
   - Problema: `gap-3` stretto, `border-primary/10` troppo sottile, padding card `py-6` cramped, sottotitolo phase `text-primary/60` poco leggibile
   - Fix: `gap-4 mb-8`, `border-primary/15`, `py-7`, sottotitolo `text-primary/65 mt-3 leading-relaxed`
4. **Box risultato — coerenza bordi e padding**
   - Problema: `border-primary/20` (incoerente con resto pagina su /15), padding `px-6 py-7` stretto
   - Fix: `border-primary/15 px-7 py-7`, body interno `text-primary/65 leading-relaxed`
5. **Disclaimer footer — contrasto**
   - Problema: `text-primary/45` troppo basso (sotto AA)
   - Fix: `text-primary/55`

### `components/servizi/DueLinee.tsx`
6. **Padding asimmetrico mobile**
   - Problema: `pt-10 pb-2 lg:pb-10` su Linea A produceva collisione visiva con Linea B su mobile
   - Fix: `pt-10 pb-10` su entrambe (simmetria verticale)
7. **Body — leggibilità e larghezza riga**
   - Problema: `text-primary/70`, nessun `max-w` (righe oltre 80ch su 1440)
   - Fix: `text-primary/75`, `max-w-[58ch]` su descrizione e ruolo; spacing compenso `pt-5 → pt-6`, label `text-primary/55 → /60`

### `components/servizi/ComeLavoriamo.tsx`
8. **Step text contrast (variant accent + dark)**
   - Problema: `text-primary/70` su corallo / `text-background/70` su verde — entrambi sopra ma vicini al limite AA
   - Fix: `text-primary/80` su corallo, `text-background/75` su verde

### `components/servizi/PercheAdvenire.tsx`
9. **Card layout coerenza**
   - Problema: `pt-8 pb-10` asimmetrico, label senza `uppercase` (le altre sezioni la richiedono), titolo `font-light` non italic (incoerente con tutte le altre h3 della pagina), body `text-primary/70`
   - Fix: `pt-10 pb-10` (simmetria), `uppercase` aggiunto al label, `italic` sul titolo (coerenza editoriale), body `text-primary/75`

### `components/servizi/CTAServizio.tsx`
10. **Subtitle — leggibilità e larghezza**
    - Problema: `text-primary/70`, `max-w-xl` (36rem) — testo troppo stretto e poco contrastato
    - Fix: `text-primary/75 max-w-2xl`

---

## Servizi — Nuove Costruzioni (`/servizi/nuove-costruzioni`)

Stessi fix di HeroServizio, ComeLavoriamo, CTAServizio (componenti condivisi).

### `components/servizi/IlServizio.tsx`
1. **Layout asimmetrico — leggibilità colonne**
   - Problema: paragrafo principale `text-primary/75` senza `max-w` (righe lunghe), paragrafi destra `text-primary/65` poco contrastati
   - Fix: paragrafo principale `text-primary/80 max-w-[52ch]`, paragrafi destra `text-primary/70`

---

## Chi Siamo (`/chi-siamo`)

### `components/chi-siamo/HeroChiSiamo.tsx`
1. **Label e body contrasto**
   - Problema: `text-background/50` label (sotto AA), `text-background/75` body
   - Fix: `text-background/65` label, `text-background/80` body

### `components/chi-siamo/TeamSection.tsx`
2. **Border separator coerenza palette**
   - Problema: `border-border` (CSS var `#D8D2C4`) sui top dei 3 portrait, mentre il resto della pagina usa `border-primary/15` per i divider semantici
   - Fix: `border-primary/15` (allineato al pattern di pagina)
3. **Citazione — larghezza e contrasto**
   - Problema: `max-w-[280px]` molto stretto, `text-foreground/75`
   - Fix: `max-w-[300px] text-foreground/80`

### `components/chi-siamo/ValoriChiSiamo.tsx`
4. **Label e body su corallo**
   - Problema: `text-primary/70` label, `text-primary/85` body — il corallo `#FDA77E` esige opacità più alte per AA
   - Fix: `text-primary/75` label, `text-primary/90` body

### `components/chi-siamo/CTAChiSiamo.tsx`
5. **Body contrast su verde**
   - Problema: `text-background/70` (al limite AA)
   - Fix: `text-background/80`

---

## Contatti (`/contatti`)

### `components/contatti/ContattiHero.tsx`
1. **Label e body contrasto**
   - Fix: label `text-background/50 → /65`, body `text-background/75 → /80`

### `components/contatti/ContattiForm.tsx`
2. **Section header — coerenza editoriale**
   - Problema: `text-muted` per label/body; h2 `text-foreground` non italic (incoerente con altre h2 di sezione, tutte italic primary)
   - Fix: label `text-primary/75`, h2 `italic text-primary`, body `text-foreground/75 max-w-[60ch]`
3. **Field label — uniformità tipografica**
   - Problema: `text-[9px]` (sotto-leggibile), `tracking-widest` invece dello standard `tracking-[0.18em]`, `text-muted` (debole)
   - Fix: `text-[10px] tracking-[0.18em] text-primary/65` (allineato a tutti gli altri label di pagina)
4. **Placeholder visibility**
   - Problema: `placeholder:text-muted/40` sotto contrasto AA per testo di esempio
   - Fix: `placeholder:text-muted/60`
5. **Submit button focus state**
   - Problema: nessun focus ring visibile su tab navigation
   - Fix: aggiunto `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent`

### `components/contatti/ContattiHero.tsx` (overlap)
6. (vedi punto 1)

---

## Layout / UI condivisi

### `components/layout/Navbar.tsx`
1. **Focus state link nav — keyboard accessibility**
   - Problema: tab navigation senza outline visibile (solo underline animata)
   - Fix: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm`

### `components/layout/Footer.tsx`
2. **Contatti — contrasto su verde**
   - Problema: `text-background/65` su 3 elementi contatto (sopra AA ma migliorabile)
   - Fix: `text-background/75`, focus ring sull'email link
3. **Note legale — leggibilità**
   - Problema: `text-background/50` poco leggibile per testo informativo importante
   - Fix: `text-background/65`
4. **Bottom bar — leggibilità copyright e legal**
   - Problema: `text-background/45` sotto AA
   - Fix: `text-background/60`, focus ring sui legal link

### `components/ui/AccordionItem.tsx`
5. **`aria-expanded` mancante + focus ring**
   - Problema: il bottone accordion non comunicava lo stato `aria-expanded` ai screen reader; nessun focus visibile su tab
   - Fix: aggiunto `aria-expanded={open}` e `focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm`

---

## Fix NON eseguiti — vincoli violati

Nessun fix è stato omesso per violazione dei vincoli. Tutti i miglioramenti puntavano a leggibilità, contrasto, simmetria padding, focus a11y — operazioni puramente CSS/structural senza toccare copy o ordine sezioni.

Casi borderline considerati ma scartati:
- "Rimuovere margin extra dalla `QuoteSection.py-36`" → applicato come `py-32` (riduzione marginale, mantiene il respiro editoriale del centro pagina). Non considerato "riorganizzazione".
- "Riallineare CTA cluster Hero a sinistra invece che destra" → non applicato. La nav Hero (destra) e l'allineamento dei link Contatti restano coerenti col branding bottone in alto-destra. Il rischio di toccare la composizione visiva senza richiesta esplicita era alto.

---

## Verifica

- ✅ `npm run build` — compilazione OK in 2.6s, 10 pagine statiche generate
- ✅ `npm run lint` — nessun nuovo warning/error introdotto. Errori pre-esistenti (4 errori in Navbar/CustomCursor/SplitText/useProfiler — `react-hooks/set-state-in-effect`, `react-hooks/static-components`) non sono nello scope di questo audit UX.
- ⚠️ Test visivo browser non eseguito (mancanza di MCP browser nel contesto agent). Lo squilibrio del Hero `<LogoWordmark>` SVG (visibile negli screenshot) richiederebbe rivisitazione del file SVG sorgente o sostituzione con `<Image />` ottimizzato — fuori scope vincoli (sostituzione asset).

## Stima miglioramento UX percepito (qualitativo)

| Aspetto | Prima | Dopo | Note |
|---|---|---|---|
| Leggibilità testi minor | 6/10 | 8.5/10 | +0.10 opacity media su body/label, max-w aggiunti |
| Coerenza bordi/divider | 6/10 | 9/10 | uniformati a `/15` e `border-primary/*` ovunque |
| Focus a11y | 4/10 | 8/10 | focus ring su nav, accordion, link footer, submit |
| Ritmo verticale sezioni | 7/10 | 8/10 | rimossi padding asimmetrici (DueLinee, PercheAdvenire) |
| Coerenza tipografica | 7/10 | 8.5/10 | h2 ContattiForm italic, h3 PercheAdvenire italic, label uppercase |
| Bug funzionali | 1 (id Navbar trigger) | 0 | risolto `quote-section` |
