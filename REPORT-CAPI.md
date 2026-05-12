# Advenire — Stato sito & azioni da chiudere

**Data:** 8 maggio 2026
**Sito live:** [https://www.advenire.it](https://www.advenire.it)
**Stato:** Online, navigabile, build production stabile.

---

## Cosa è già fatto

- Sito pubblicato sul dominio `www.advenire.it` (DNS ok, HTTPS ok, redirect `advenire.it` → `www.advenire.it`).
- Tutte le 4 pagine principali online: Home, Investimenti Immobiliari, Nuove Costruzioni, Chi Siamo, Contatti.
- Pagine legali stub create: `/privacy` e `/cookie-policy` (testi GDPR di base).
- Form contatti: il visitatore preme "Apri nella mia app mail" → si apre l'app email del suo dispositivo con destinatario, oggetto e tutti i campi compilati pronti da inviare a `info@advenire.it`.
- Favicon Advenire (logo "A" verde) attiva su browser e iOS home screen.
- SEO baseline: metadata, Open Graph, Twitter Card, sitemap, robots, JSON-LD organizzazione.
- Security headers attivi (HSTS, X-Frame-Options, Permissions-Policy).
- Accessibilità WCAG AA: skip-link, focus visibili, label associati, alt su tutte le immagini.
- Ultimo audit completo + fix applicati: `LAUNCH-REPORT.md` nel repo.

---

## Da chiudere prima del go-live commerciale

### 🔴 Bloccanti — richiedono dato/decisione esterna

| # | Cosa serve | A chi tocca | Note |
|---|---|---|---|
| 1 | **Dati legali Advenire S.r.l.** da inserire nel footer: P.IVA, sede legale completa, numero REA, eventuale capitale sociale, eventuale PEC | Giacomo / Matteo | Obbligatorio per legge per S.r.l. italiana |
| 2 | **Revisione legale di Privacy Policy e Cookie Policy** | Consulente legale Advenire | I testi attuali sono modello GDPR generico. Vanno validati prima del lancio commerciale (warning indicato in fondo a ciascuna pagina) |

### 🟠 Importanti — qualità lancio

| # | Cosa serve | A chi tocca | Note |
|---|---|---|---|
| 3 | **OG image social** (1200×630 px) brandata | Design | Quando qualcuno condivide il link su WhatsApp / LinkedIn / Slack vede l'anteprima — oggi è generica |
| 4 | **Compressione foto team** | Design | Le 3 foto pesano ~1.9 MB ciascuna. Con WebP → 200 KB. Build più veloce, niente scatti di carico |
| 5 | **Numero di telefono** se vogliamo metterlo nel footer | Marketing | Oggi solo email |
| 6 | **Eventuali link social** (LinkedIn, Instagram) da aggiungere a footer e schema JSON-LD | Marketing | Ora vuoti |

### 🟡 Da decidere — direzione strategica

| # | Decisione | A chi tocca | Note |
|---|---|---|---|
| 7 | **Form contatti: tenere `mailto:` o passare a invio diretto via Resend?** | Matteo / Giacomo | Mailto = funziona ovunque, nessun costo, ma il visitatore deve avere un client mail configurato. Resend = invia tutto direttamente, costa pochi euro/mese, serve setup |
| 8 | **Analytics: che tool usiamo?** | Marketing | Plausible (privacy-friendly, niente cookie banner) ~9€/mese · GA4 (gratis ma serve cookie banner consenso). Vercel Analytics (~10€/mese) opzionale |
| 9 | **Profiler edilizio** (calcolatore preventivi) — c'è già il codice ma non è collegato. Lo attiviamo? | Prodotto | Esiste in `components/profiler/` — calcolo costi nuova costruzione |
| 10 | **Cookie banner** | Quando attiviamo Analytics o chat widget | Oggi non serve perché non c'è nessun tracker. Va aggiunto solo quando si introducono cookie di terze parti |

### 🟢 Polish — quando c'è tempo

- Standardizzazione apostrofi tipografici nel copy editoriale (oggi mix `'` dritto vs `'` curly — preferenza editoriale italiana per il curly)
- Test reale Lighthouse mobile + desktop (atteso ≥ 90)
- Test cross-browser su Safari/Firefox/Edge prima della comunicazione esterna
- Pulizia codice orphan: cartella `components/profiler/`, pagina `/grazie`, splash `ComingSoon.tsx` (se confermiamo che non li riusiamo)

---

## Scadenza suggerita

- **Settimana prossima:** chiudere punti 1, 2, 3 (legale + brand)
- **Quando attiviamo comunicazione esterna:** punti 4–8
- **Pre-lancio campagna marketing:** punto 10 + Lighthouse + cross-browser

---

## Note tecniche per il team

- Repository: `/Users/matteo/Desktop/ADVENIRE-GIACOMO/ADVENIRE RESTYLE EVOLVE/advenire/`
- Hosting: Vercel project `advenire-restyle` (team `marketing398's-projects`)
- Stack: Next.js 16.2.5 + React 19 + Tailwind v4 + Framer Motion 12 + TypeScript
- Audit tecnico completo e dettagliato: `LAUNCH-REPORT.md` (stesso repo)
