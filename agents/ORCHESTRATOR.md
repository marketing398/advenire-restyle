# 🎯 ORCHESTRATOR — Sistema Multi-Agente Advenire

## COME FUNZIONA

Questo sistema è composto da **7 agenti specializzati** che collaborano per portare il sito Advenire alla qualità produzione. Ogni agente ha un dominio specifico e produce un report strutturato con azioni concrete.

### Agenti disponibili

| # | Agente | File | Dominio | Priorità |
|---|--------|------|---------|----------|
| 1 | 🎨 UX/UI Designer | `AGENT-UX-UI.md` | Design system, layout, tipografia, animazioni, responsive | Alta |
| 2 | 📝 Marketing & Copy | `AGENT-MARKETING.md` | Copy italiano, tono di voce, funnel, microcopy, disclaimer | Alta |
| 3 | 🔍 SEO Specialist | `AGENT-SEO.md` | Metadata, sitemap, structured data, keyword, heading hierarchy | Alta |
| 4 | 🔒 Sicurezza Web | `AGENT-SECURITY.md` | Security headers, GDPR, form validation, API protection, env vars | Critica |
| 5 | ⚡ Performance | `AGENT-PERFORMANCE.md` | Core Web Vitals, bundle size, immagini, font, caching | Media |
| 6 | ♿ Accessibilità | `AGENT-ACCESSIBILITY.md` | WCAG 2.1 AA, contrasto, keyboard nav, screen reader, motion | Media |
| 7 | 🚀 DevOps & Deploy | `AGENT-DEVOPS.md` | Build, Vercel config, Git, env vars, monitoring, post-deploy | Alta |

---

## MODALITÀ DI UTILIZZO

### 1️⃣ AUDIT COMPLETO (pre-deploy)
Invoca tutti gli agenti in sequenza per un audit a 360°.

**Prompt da dare a Claude Code:**
```
Leggi tutti i file nella cartella /agents/ in ordine.
Per ogni agente:
1. Leggi il file AGENT-*.md
2. Segui le istruzioni operative
3. Analizza i file del progetto pertinenti
4. Produci il report nel formato richiesto
5. Salva ogni report in /agents/reports/REPORT-[NOME].md

Alla fine, crea un REPORT-FINALE.md che riassume:
- Score complessivo per area
- Top 10 azioni prioritarie ordinate per impatto
- File da creare ex novo
- File da modificare (con diff suggeriti)
```

### 2️⃣ AUDIT SINGOLO (focus su un'area)
Invoca un solo agente per un'analisi mirata.

**Esempio:**
```
Leggi il file /agents/AGENT-SEO.md e segui le istruzioni operative.
Analizza tutti i file del progetto rilevanti per la SEO.
Produci il report completo nel formato richiesto.
```

### 3️⃣ FIX AUTOMATICO (dopo l'audit)
Dopo aver ottenuto i report, puoi chiedere a Code di applicare le fix.

**Prompt:**
```
Leggi il file /agents/reports/REPORT-FINALE.md.
Applica tutte le azioni classificate come 🔴 CRITICHE e 🟡 IMPORTANTI.
Per ogni modifica:
1. Mostra il diff prima di applicare
2. Verifica che la build passi dopo ogni modifica
3. Committa ogni gruppo di modifiche separatamente
```

### 4️⃣ REVIEW COLLABORATIVA (più agenti sulla stessa area)
Quando due agenti hanno giurisdizione sovrapposta, usali insieme.

**Sovrapposizioni note:**
| Area | Agenti coinvolti |
|------|-----------------|
| Hero section | UX/UI + Marketing + Performance |
| Form contatto | Security + Accessibility + UX/UI |
| Metadata | SEO + Marketing |
| Immagini | Performance + UX/UI |
| Font | Performance + UX/UI + Accessibility |
| Security headers | Security + DevOps |
| Privacy/Cookie pages | Security + SEO + Marketing |

---

## STRUTTURA CARTELLA

```
/agents/
├── ORCHESTRATOR.md          ← Questo file (istruzioni di coordinamento)
├── AGENT-UX-UI.md           ← Prompt agente UX/UI
├── AGENT-MARKETING.md       ← Prompt agente Marketing
├── AGENT-SEO.md             ← Prompt agente SEO
├── AGENT-SECURITY.md        ← Prompt agente Sicurezza
├── AGENT-PERFORMANCE.md     ← Prompt agente Performance
├── AGENT-ACCESSIBILITY.md   ← Prompt agente Accessibilità
├── AGENT-DEVOPS.md          ← Prompt agente DevOps
└── reports/                 ← Output degli audit (generata automaticamente)
    ├── REPORT-UX-UI.md
    ├── REPORT-MARKETING.md
    ├── REPORT-SEO.md
    ├── REPORT-SECURITY.md
    ├── REPORT-PERFORMANCE.md
    ├── REPORT-ACCESSIBILITY.md
    ├── REPORT-DEVOPS.md
    └── REPORT-FINALE.md     ← Sintesi con azioni prioritizzate
```

---

## ORDINE DI ESECUZIONE CONSIGLIATO

Per un audit pre-deploy completo, l'ordine ottimale è:

```
1. SECURITY    → prima di tutto, blocca vulnerabilità critiche
2. SEO         → metadata e struttura influenzano tutto il resto
3. UX/UI       → design system coerente prima di toccare il copy
4. MARKETING   → copy e tono con design system già verificato
5. ACCESSIBILITY → verifica su UI e copy già consolidati
6. PERFORMANCE → ottimizzazioni su codebase già stabile
7. DEVOPS      → deploy come ultimo step, su un sito già verificato
```

---

## REGOLE DI COORDINAMENTO

1. **Nessun agente modifica file direttamente** — produce solo report con suggerimenti
2. **Le fix vengono applicate dopo review umana** del REPORT-FINALE
3. **In caso di conflitto** tra agenti (es. Performance dice "rimuovi animazione", UX/UI dice "mantienila"), il REPORT-FINALE deve evidenziare il conflitto e proporre un compromesso
4. **Ogni modifica suggerita deve includere**:
   - File path esatto
   - Codice attuale (old)
   - Codice suggerito (new)
   - Motivazione
   - Agente che lo propone
5. **Build verification**: dopo ogni batch di modifiche, `npm run build` deve passare

---

## PROMPT RAPIDI

### Audit veloce (solo critici)
```
Leggi tutti gli AGENT-*.md nella cartella /agents/.
Per ogni agente, analizza SOLO le sezioni 🔴 CRITICHE.
Produci un report unificato con max 20 azioni ordinate per impatto.
```

### Fix automatico sicurezza
```
Leggi /agents/AGENT-SECURITY.md. Esegui l'audit completo.
Poi applica automaticamente TUTTE le fix classificate come 🔴 CRITICHE.
Verifica che la build passi dopo ogni modifica.
```

### Review pre-commit
```
Leggi /agents/AGENT-DEVOPS.md, sezione "Pre-flight check".
Esegui tutti i controlli.
Se tutto ok, fai commit e push su main.
```

### Ottimizzazione immagini
```
Leggi /agents/AGENT-PERFORMANCE.md, sezione "Audit immagini".
Elenca tutte le immagini con dimensione >500kb.
Suggerisci formato e dimensione ottimali per ognuna.
```
