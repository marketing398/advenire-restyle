import type { Metadata } from 'next'
import LegalPageLayout from '@/components/legal/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Informativa sull’uso dei cookie e di tecnologie analoghe sul sito advenire.it.',
  robots: { index: true, follow: false },
}

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      kicker="Cookie Policy"
      titolo="Informativa sull'uso dei cookie"
      ultimoAggiornamento="8 maggio 2026"
    >
      <p>
        Questa pagina descrive l&apos;utilizzo dei cookie e di tecnologie analoghe sul sito{' '}
        <strong>advenire.it</strong>, in conformità al Provvedimento del Garante per la protezione
        dei dati personali del 10 giugno 2021 e al Regolamento UE 2016/679 (GDPR).
      </p>

      <h2>Cosa sono i cookie</h2>
      <p>
        I cookie sono piccoli file di testo che i siti visitati inviano al terminale
        dell&apos;utente, dove vengono memorizzati e poi ritrasmessi agli stessi siti alla visita
        successiva. Sono utilizzati per finalità tecniche, di analisi e di personalizzazione.
      </p>

      <h2>Categorie di cookie utilizzati</h2>

      <h3>Cookie tecnici (necessari)</h3>
      <p>
        Strettamente necessari al funzionamento del sito. Non richiedono il consenso
        dell&apos;utente. Sono utilizzati per:
      </p>
      <ul>
        <li>memorizzare le preferenze di navigazione (es. selezione lingua);</li>
        <li>mantenere lo stato della sessione;</li>
        <li>garantire la sicurezza del sito.</li>
      </ul>

      <h3>Cookie analytics</h3>
      <p>
        Attualmente il sito non utilizza strumenti di analytics di terze parti. Qualora venissero
        introdotti, saranno configurati con anonimizzazione dell&apos;indirizzo IP e attivati solo
        previo consenso esplicito dell&apos;utente tramite il banner cookie.
      </p>

      <h3>Cookie di profilazione e marketing</h3>
      <p>Il sito non utilizza cookie di profilazione o marketing.</p>

      <h2>Gestione del consenso</h2>
      <p>
        Al primo accesso il sito mostra un banner che consente all&apos;utente di accettare,
        rifiutare o personalizzare l&apos;uso dei cookie non tecnici. La scelta può essere
        modificata in qualsiasi momento accedendo al pannello di preferenze cookie disponibile in
        questa pagina.
      </p>

      <h2>Disattivazione dei cookie dal browser</h2>
      <p>
        È possibile disattivare i cookie direttamente dalle impostazioni del proprio browser.
        Si segnala che la disattivazione dei cookie tecnici potrebbe compromettere il corretto
        funzionamento di alcune sezioni del sito. Le istruzioni sono disponibili sui siti dei
        principali browser:
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.microsoft.com/it-it/microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>

      <h2>Titolare del trattamento</h2>
      <p>
        <strong>Advenire S.r.l.</strong> — per qualsiasi domanda relativa ai cookie:{' '}
        <a href="mailto:info@advenire.it">info@advenire.it</a>.
      </p>

      <h2>Aggiornamenti</h2>
      <p>
        La presente informativa potrà essere aggiornata in caso di modifiche normative o tecniche.
        Si invita l&apos;utente a verificarla periodicamente.
      </p>

      <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '3rem', fontStyle: 'italic' }}>
        Documento di riferimento. Il testo definitivo sarà validato dal consulente legale prima del
        go-live commerciale.
      </p>
    </LegalPageLayout>
  )
}
