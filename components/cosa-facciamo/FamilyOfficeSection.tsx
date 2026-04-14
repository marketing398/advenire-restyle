'use client'

import { motion, useReducedMotion } from 'framer-motion'
import AccordionItem from '@/components/ui/AccordionItem'

const servizi = [
  {
    titolo: 'Gestione degli investimenti',
    testo:
      'Portafogli personalizzati costruiti per preservare e accrescere il patrimonio nel lungo termine. Utilizziamo una disciplina rigorosa basata su dati e ricerca fondamentale.',
    open: true,
  },
  {
    titolo: 'Pianificazione finanziaria integrata',
    testo:
      "Strategie che uniscono obiettivi di vita, gestione del patrimonio e pianificazione fiscale in un'unica visione coerente. Nessun silos, nessuna disconnessione.",
  },
  {
    titolo: 'Protezione e successione patrimoniale',
    testo:
      'Strutture legali, assicurative e fiscali pensate per proteggere ciò che hai costruito e garantire una trasmissione efficiente alle generazioni future.',
  },
  {
    titolo: 'Coordinamento con professionisti esterni',
    testo:
      'Collaboriamo con avvocati, commercialisti e notai di fiducia per garantire che ogni aspetto della tua situazione patrimoniale sia coordinato e ottimizzato.',
  },
  {
    titolo: 'Reporting e trasparenza totale',
    testo:
      'Accesso completo e in tempo reale alla tua situazione patrimoniale. Report chiari, comprensibili e aggiornati. Zero sorprese.',
  },
]

export default function FamilyOfficeSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-background py-20 lg:py-28 border-b border-border">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-32">
            <motion.span
              className="font-label text-[10px] uppercase tracking-[0.25em] text-muted block mb-8"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Personal Office
            </motion.span>

            <motion.h2
              className="font-heading font-light text-foreground"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
                lineHeight: '1.06',
                letterSpacing: '-0.02em',
              }}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              Un&apos;esperienza di{' '}
              <em className="not-italic" style={{ fontStyle: 'italic' }}>Personal Office</em>{' '}
              pensata per la vita moderna.
            </motion.h2>

            <motion.p
              className="font-body font-light text-[13px] text-foreground/65 leading-relaxed mt-8 max-w-sm"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              Consulenza finanziaria sofisticata e personalizzata. Gestione
              patrimoniale olistica pensata per te.
            </motion.p>
          </div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pt-16"
          >
            <div className="border-t border-border">
              {servizi.map((s) => (
                <AccordionItem key={s.titolo} title={s.titolo} defaultOpen={s.open}>
                  <span className="font-body font-light text-[13px] text-foreground/65">{s.testo}</span>
                </AccordionItem>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
