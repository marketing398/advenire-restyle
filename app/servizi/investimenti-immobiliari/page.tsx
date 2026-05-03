import type { Metadata } from 'next'
import HeroServizio from '@/components/servizi/HeroServizio'
import CalcolatoreRischio from '@/components/servizi/CalcolatoreRischio'
import DueLinee from '@/components/servizi/DueLinee'
import ComeLavoriamo from '@/components/servizi/ComeLavoriamo'
import PercheAdvenire from '@/components/servizi/PercheAdvenire'
import CTAServizio from '@/components/servizi/CTAServizio'

export const metadata: Metadata = {
  title: 'Investimenti immobiliari',
  description:
    'Un’operazione immobiliare attraversa fasi molto diverse tra loro. Sbagliarne una sola può erodere l’intero margine. Analizziamo, strutturiamo e ti affianchiamo.',
}

export default function InvestimentiImmobiliariPage() {
  return (
    <main>
      <HeroServizio
        label="Investimenti immobiliari"
        titolo="Fare un'operazione immobiliare da soli è possibile. Farla in modo professionale è meglio."
        sottotitolo="Un'operazione immobiliare attraversa fasi molto diverse tra loro: valutazione finanziaria, due diligence urbanistica, progettazione, contrattualistica, gestione cantiere, strategia di vendita. Ognuna richiede competenze specifiche. Sbagliare una sola di queste fasi può erodere l'intero margine dell'operazione. O peggio."
      />

      <CalcolatoreRischio />

      <DueLinee />

      <ComeLavoriamo
        variant="accent"
        titolo="Ogni fase ha le sue insidie. Noi le conosciamo tutte."
        steps={[
          {
            titolo: 'Prima call',
            testo:
              "Ci racconti l'operazione o i tuoi obiettivi. Ti diamo un feedback preliminare onesto in 20 minuti. Nessun impegno.",
          },
          {
            titolo: 'Analisi',
            testo:
              "Valore reale dell'immobile, costi realistici, margini, rischi esplicitati. Decidi se procedere con dati in mano, non con impressioni.",
          },
          {
            titolo: 'Processo',
            testo:
              'Struttura finanziaria, tempistiche, strategia di uscita. Tutto definito prima di firmare qualsiasi cosa.',
          },
          {
            titolo: 'Affiancamento operativo',
            testo:
              'Trattativa, cantiere, vendita. Siamo presenti nelle fasi in cui una decisione sbagliata costa di più. Il livello di coinvolgimento dipende dal servizio scelto.',
          },
        ]}
      />

      <PercheAdvenire />

      <CTAServizio
        titolo="Hai un'operazione da valutare o un budget che vorresti investire nel settore immobiliare?"
        testo="Raccontacelo, siamo qui per ascoltarti. Facciamo un primo confronto insieme e ti diciamo se vale la pena approfondire, senza impegno."
        pulsante="Prenota la call"
      />
    </main>
  )
}
