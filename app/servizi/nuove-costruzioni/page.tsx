import type { Metadata } from 'next'
import HeroServizio from '@/components/servizi/HeroServizio'
import IlServizio from '@/components/servizi/IlServizio'
import ComeLavoriamo from '@/components/servizi/ComeLavoriamo'
import CTAServizio from '@/components/servizi/CTAServizio'

export const metadata: Metadata = {
  title: 'Nuove costruzioni',
  description:
    "Abitazioni su misura in bioedilizia, con strutture in legno o acciaio, tempi certi e un unico team responsabile dall'inizio alla consegna.",
}

export default function NuoveCostruzioniPage() {
  return (
    <main>
      <HeroServizio
        label="Nuove costruzioni"
        titolo="Costruiamo per durare."
        sottotitolo="Abitazioni su misura in bioedilizia, con strutture in legno o acciaio: tempi certi e un unico team responsabile dall'inizio alla consegna."
      />

      <IlServizio
        titolo="Costruire bene significa eliminare le variabili."
        sottotitolo="Un unico interlocutore, un'unica responsabilità: consegnare un risultato finale solido, efficiente e coerente con il progetto."
        paragrafi={[
          "Lavoriamo con strutture prefabbricate in legno o acciaio: una scelta tecnica che garantisce tempi certi, costi sotto controllo e qualità costante, lontano dalle incertezze del cantiere tradizionale.",
          "Seguiamo ogni progetto per intero — dalla nuova costruzione alla ristrutturazione completa — perché il valore nasce dal controllo totale del processo, non dagli interventi parziali.",
        ]}
      />

      <ComeLavoriamo
        variant="accent"
        titolo="Dalla fattibilità al cantiere: tutto sotto controllo."
        steps={[
          {
            titolo: 'Call conoscitiva (20–30 min)',
            testo:
              'Un primo confronto per capire esigenze, budget e fattibilità reale del progetto. Analizziamo il contesto e individuiamo fin da subito eventuali criticità, proponendo alternative più efficaci se necessario.',
          },
          {
            titolo: 'Fattibilità e progetto preliminare',
            testo:
              'Definiamo cosa puoi costruire, con una visione chiara di costi e tempi. Una base concreta che ti permette di prendere decisioni consapevoli, senza incertezze.',
          },
          {
            titolo: 'Progettazione esecutiva',
            testo:
              'Ogni dettaglio viene sviluppato e coordinato: struttura, impianti e materiali. Tutto è definito e documentato per evitare imprevisti e garantire coerenza in cantiere.',
          },
          {
            titolo: 'Cantiere e consegna',
            testo:
              "Gestiamo l'intero processo fino alla consegna chiavi in mano, coordinando tutte le fasi operative. Tempi, costi e qualità restano sempre sotto controllo.",
          },
        ]}
      />

      <CTAServizio
        titolo="Hai un terreno o solo un'idea?"
        testo="È sufficiente. Partiamo da lì e ti diciamo cosa è davvero realizzabile."
        pulsante="Prenota la call"
      />
    </main>
  )
}
