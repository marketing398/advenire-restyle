import type { Metadata } from 'next'
import LegalPageLayout from '@/components/legal/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).',
  robots: { index: true, follow: false },
}

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      kicker="Privacy Policy"
      titolo="Informativa sul trattamento dei dati personali"
      ultimoAggiornamento="8 maggio 2026"
    >
      <p>
        La presente informativa è resa ai sensi degli articoli 13 e 14 del Regolamento UE 2016/679
        (&laquo;GDPR&raquo;) e descrive le modalità con cui Advenire S.r.l. tratta i dati personali
        degli utenti che visitano questo sito o che si mettono in contatto attraverso i canali
        indicati.
      </p>

      <h2>Titolare del trattamento</h2>
      <p>
        <strong>Advenire S.r.l.</strong>, con sede legale in Italia. Per qualsiasi richiesta relativa
        al trattamento dei dati personali è possibile scrivere a{' '}
        <a href="mailto:info@advenire.it">info@advenire.it</a>.
      </p>

      <h2>Categorie di dati trattati</h2>
      <ul>
        <li>Dati identificativi e di contatto forniti spontaneamente dall&apos;utente (nome, cognome, email, numero di telefono, contenuto del messaggio).</li>
        <li>Dati di navigazione raccolti automaticamente dai sistemi informatici (indirizzo IP anonimizzato, tipo di browser, pagine visitate, data e orario della richiesta).</li>
        <li>Eventuali dati conferiti dall&apos;utente nelle comunicazioni via email.</li>
      </ul>

      <h2>Finalità e base giuridica</h2>
      <ul>
        <li><strong>Riscontro alle richieste di contatto</strong> — base giuridica: esecuzione di misure precontrattuali su richiesta dell&apos;interessato (art. 6, par. 1, lett. b GDPR).</li>
        <li><strong>Adempimenti di legge</strong> — base giuridica: obbligo legale (art. 6, par. 1, lett. c GDPR).</li>
        <li><strong>Sicurezza del sito e prevenzione abusi</strong> — base giuridica: legittimo interesse del titolare (art. 6, par. 1, lett. f GDPR).</li>
      </ul>

      <h2>Modalità di trattamento</h2>
      <p>
        I dati sono trattati con strumenti elettronici, nel rispetto dei principi di liceità,
        correttezza, trasparenza, minimizzazione e integrità. Vengono adottate misure tecniche e
        organizzative adeguate a prevenire accessi non autorizzati, perdita o distruzione dei dati.
      </p>

      <h2>Conservazione dei dati</h2>
      <p>
        I dati sono conservati per il tempo strettamente necessario al perseguimento delle finalità
        per cui sono stati raccolti e, in ogni caso, non oltre 24 mesi dall&apos;ultimo contatto
        utile. I log di sistema sono conservati per un periodo massimo di 12 mesi.
      </p>

      <h2>Comunicazione e trasferimento dei dati</h2>
      <p>
        I dati possono essere comunicati a soggetti terzi che svolgono attività strumentali per
        conto del titolare (hosting provider, servizi di invio email transazionali, consulenti
        professionali), nominati Responsabili del trattamento ai sensi dell&apos;art. 28 GDPR. Non è
        previsto alcun trasferimento extra-UE; nel caso si rendesse necessario, sarà effettuato nel
        rispetto delle garanzie previste dal GDPR.
      </p>

      <h2>Diritti dell&apos;interessato</h2>
      <p>
        L&apos;utente ha il diritto di:
      </p>
      <ul>
        <li>accedere ai propri dati personali (art. 15 GDPR);</li>
        <li>chiederne la rettifica (art. 16) o la cancellazione (art. 17);</li>
        <li>chiedere la limitazione del trattamento (art. 18);</li>
        <li>opporsi al trattamento (art. 21);</li>
        <li>ricevere i dati in formato strutturato (portabilità, art. 20);</li>
        <li>proporre reclamo all&apos;Autorità Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>).</li>
      </ul>
      <p>
        I diritti possono essere esercitati scrivendo a{' '}
        <a href="mailto:info@advenire.it">info@advenire.it</a>.
      </p>

      <h2>Modifiche all&apos;informativa</h2>
      <p>
        Advenire S.r.l. si riserva il diritto di aggiornare la presente informativa in qualsiasi
        momento. Eventuali modifiche saranno pubblicate su questa pagina con indicazione della data
        di ultimo aggiornamento.
      </p>

      <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '3rem', fontStyle: 'italic' }}>
        Documento di riferimento. Il testo definitivo sarà validato dal consulente legale prima del
        go-live commerciale.
      </p>
    </LegalPageLayout>
  )
}
