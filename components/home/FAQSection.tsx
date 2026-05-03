'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

type FAQ = {
  categoria: string
  domanda: string
  risposta: string
  rispostaExt: string
  conclusione?: string
}

const faqs: FAQ[] = [
  {
    categoria: 'Investimenti immobiliari',
    domanda: 'Non ho esperienza come investitore immobiliare: ha senso partire comunque?',
    risposta: 'Sì, se parti nel modo giusto.',
    rispostaExt:
      'Il problema non è l’esperienza, ma prendere decisioni senza numeri. Se lo fai, ti esponi a un rischio elevato di perdere buona parte del tuo capitale. Il nostro lavoro è darti un’analisi chiara dell’operazione, dei costi, dei margini e dei rischi, così puoi capire subito se ha senso procedere o no.',
    conclusione:
      'Se l’operazione non è valida, te lo diciamo subito, prima che tu investa dei capitali. E poi, insieme, possiamo trovare delle operazioni migliori.',
  },
  {
    categoria: 'Investimenti immobiliari',
    domanda: 'Come faccio a capire se un’operazione è davvero conveniente?',
    risposta: 'Con i numeri e una strategia corretta, non con le sensazioni.',
    rispostaExt:
      'Valutiamo il valore reale dell’immobile, i costi totali, gli scenari di rendimento e le variabili di rischio. Il risultato è uno studio che ti permette di vedere chiaramente dove stai guadagnando — e dove potresti perdere.',
    conclusione: 'Senza questo passaggio, stai investendo alla cieca.',
  },
  {
    categoria: 'Investimenti immobiliari',
    domanda: 'Quando decidete di investire anche voi nell’operazione?',
    risposta: 'Lo decidiamo insieme.',
    rispostaExt:
      'Se lo vorrai, oltre al nostro servizio di consulenza a 360 gradi, possiamo anche sostenere noi direttamente tutte le spese tecniche e ottimizzare il ROI dell’operazione a fronte di una condivisione degli utili.',
    conclusione:
      'Non è un servizio standard e non succede su ogni operazione: è il cliente a scegliere fino a dove vuole essere assistito. Lasciamo sempre ai nostri clienti la massima libertà di scelta.',
  },
  {
    categoria: 'Nuove costruzioni',
    domanda: 'Quanto è davvero possibile prevedere costi e tempi di costruzione?',
    risposta: 'Molto più di quanto succede nell’edilizia tradizionale.',
    rispostaExt:
      'Il nostro metodo, insieme all’utilizzo di strutture prefabbricate e a una progettazione completa prima di iniziare il cantiere, riduce drasticamente le variabili in fase esecutiva. Questo ci permette di definire budget e tempistiche con un livello di precisione che difficilmente trovi nei metodi tradizionali.',
    conclusione: 'Più decisioni a monte = meno imprevisti = più controllo.',
  },
  {
    categoria: 'Nuove costruzioni',
    domanda: 'Posso rivolgermi a voi anche se ho solo un’idea e non un progetto definito?',
    risposta: 'Sì, ed è il momento migliore per farlo.',
    rispostaExt:
      'Intervenire all’inizio significa evitare errori costosi dopo. Partiamo da budget, contesto e obiettivo, e ti diciamo cosa è davvero realizzabile, prima che tu investa tempo e soldi nella direzione sbagliata.',
  },
]

export default function FAQSection() {
  const shouldReduce = useReducedMotion()
  const [aperta, setAperta] = useState<number | null>(0)

  return (
    <section className="bg-primary py-20 lg:py-28 relative overflow-hidden" data-section-tone="dark">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        <motion.span
          className="font-label text-[10px] uppercase tracking-[0.18em] text-background/55 block mb-10"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Domande frequenti
        </motion.span>

        <motion.div
          className="bg-accent mb-10"
          style={{ height: '2px' }}
          initial={{ width: 0 }}
          whileInView={{ width: '3rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <SplitText
          el="h2"
          text="Le risposte alle domande che ci fanno più spesso."
          className="font-heading font-light italic text-background max-w-3xl"
          style={{
            fontSize: 'clamp(2.1rem, 4.2vw, 4rem)',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
          }}
          delay={shouldReduce ? 0 : 0.06}
          stagger={0.04}
        />

        <div className="mt-14 lg:mt-16">
          {faqs.map((faq, i) => {
            const open = aperta === i
            const showCategoryDivider =
              i === 0 || faqs[i - 1].categoria !== faq.categoria

            return (
              <div key={faq.domanda}>
                {showCategoryDivider && (
                  <motion.p
                    className="font-label text-[10px] uppercase tracking-[0.2em] text-accent mt-12 mb-5 first:mt-0"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {faq.categoria}
                  </motion.p>
                )}

                <motion.div
                  className="border-t border-background/15"
                  initial={{ opacity: 0, y: shouldReduce ? 0 : 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-5%' }}
                  transition={{
                    duration: 0.7,
                    delay: shouldReduce ? 0 : (i % 3) * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setAperta(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-start justify-between gap-6 py-6 text-left group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline focus-visible:outline-accent rounded-sm"
                  >
                    <span
                      className="font-heading font-light text-background"
                      style={{
                        fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)',
                        lineHeight: '1.35',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {faq.domanda}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      className="font-heading font-light text-accent text-2xl shrink-0 leading-none mt-0.5"
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pr-10 max-w-3xl">
                          <p className="font-body italic text-background/90 text-[15px] md:text-[16px] leading-relaxed mb-4">
                            {faq.risposta}
                          </p>
                          <p className="font-body font-light text-background/85 text-[14px] md:text-[15px] leading-relaxed">
                            {faq.rispostaExt}
                          </p>
                          {faq.conclusione && (
                            <p className="font-body font-light text-background/85 text-[14px] md:text-[15px] leading-relaxed mt-4">
                              {faq.conclusione}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {i === faqs.length - 1 && <div className="border-t border-background/15" />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
