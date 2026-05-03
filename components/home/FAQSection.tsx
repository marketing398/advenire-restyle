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
  const [aperta, setAperta] = useState<number | null>(null)

  return (
    <section className="bg-primary py-24 lg:py-32 relative overflow-hidden" data-section-tone="dark">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 relative">

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">

          {/* LEFT — sticky heading */}
          <div className="lg:sticky lg:top-32">
            <motion.span
              className="font-label text-[12px] uppercase tracking-[0.2em] text-background/70 block mb-8"
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
              whileInView={{ width: '4rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />

            <SplitText
              el="h2"
              text="Le risposte alle domande che ci fanno più spesso."
              className="font-heading font-light italic text-background"
              style={{
                fontSize: 'clamp(2.1rem, 4.2vw, 4rem)',
                lineHeight: '1.05',
                letterSpacing: '-0.02em',
              }}
              delay={shouldReduce ? 0 : 0.06}
              stagger={0.04}
            />
          </div>

          {/* RIGHT — accordion */}
          <div>
            {faqs.map((faq, i) => {
              const open = aperta === i
              const showCategoryDivider =
                i === 0 || faqs[i - 1].categoria !== faq.categoria

              return (
                <div key={faq.domanda}>
                  {showCategoryDivider && (
                    <motion.div
                      className="flex items-center gap-4 mt-14 mb-6 first:mt-0"
                      initial={{ opacity: 0, x: shouldReduce ? 0 : -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="font-label text-[10px] uppercase tracking-[0.22em] text-accent whitespace-nowrap">
                        {faq.categoria}
                      </span>
                      <motion.span
                        className="block h-px bg-accent/40 flex-1"
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </motion.div>
                  )}

                  <motion.div
                    className="border-t border-background/15"
                    initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-5%' }}
                    transition={{
                      duration: 0.75,
                      delay: shouldReduce ? 0 : (i % 3) * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setAperta(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      className="w-full flex items-start justify-between gap-8 py-7 text-left group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline focus-visible:outline-accent rounded-sm"
                    >
                      <span
                        className="font-heading font-light italic text-background group-hover:text-accent transition-colors duration-300"
                        style={{
                          fontSize: 'clamp(1.15rem, 1.7vw, 1.5rem)',
                          lineHeight: '1.3',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {faq.domanda}
                      </span>
                      <motion.span
                        aria-hidden="true"
                        className="relative shrink-0 mt-2 w-7 h-7 rounded-full border border-accent/40 group-hover:border-accent transition-colors duration-300"
                        animate={{ rotate: open ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="block w-2.5 h-px bg-accent" />
                        </span>
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="block w-px h-2.5 bg-accent" />
                        </span>
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-9 pr-4 max-w-2xl">
                            <p className="font-heading font-light italic text-accent text-[18px] md:text-[20px] leading-snug mb-5">
                              {faq.risposta}
                            </p>
                            <p className="font-body font-light text-background/85 text-[14px] md:text-[15px] leading-relaxed">
                              {faq.rispostaExt}
                            </p>
                            {faq.conclusione && (
                              <p className="font-body font-light italic text-background/75 text-[13.5px] md:text-[14.5px] leading-relaxed mt-4 pl-4 border-l-2 border-accent/40">
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
      </div>
    </section>
  )
}
