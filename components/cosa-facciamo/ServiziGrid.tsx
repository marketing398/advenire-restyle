'use client'

import { motion, useReducedMotion } from 'framer-motion'

const categorie = [
  {
    simbolo: '◈',
    titolo: 'Pianificazione finanziaria',
    descrizione: "Strategie integrate che guardano all'intero arco della vita.",
  },
  {
    simbolo: '◉',
    titolo: 'Gestione degli investimenti',
    descrizione: 'Portafogli personalizzati per ogni profilo di rischio e obiettivo.',
  },
  {
    simbolo: '◎',
    titolo: 'Pianificazione successoria',
    descrizione: 'Strutture per garantire una trasmissione efficiente del patrimonio.',
  },
  {
    simbolo: '◇',
    titolo: 'Consulenza fiscale',
    descrizione: "Coordinamento per ottimizzare l'efficienza tributaria complessiva.",
  },
  {
    simbolo: '◆',
    titolo: 'Real estate advisory',
    descrizione: 'Analisi e strategie per il patrimonio immobiliare.',
  },
  {
    simbolo: '○',
    titolo: 'Filantropia strategica',
    descrizione: 'Pianificazione degli impatti sociali e strutture donative.',
  },
  {
    simbolo: '●',
    titolo: 'Assicurazioni e protezione',
    descrizione: 'Soluzioni per proteggere il patrimonio da eventi inattesi.',
  },
  {
    simbolo: '◐',
    titolo: 'Coordinamento professionale',
    descrizione: 'Collaborazione con avvocati, commercialisti e notai.',
  },
]

export default function ServiziGrid() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-primary grain py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-10 border-b border-background/10">
          <motion.span
            className="font-label text-[10px] uppercase tracking-[0.25em] text-background/35"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Il tuo mondo è complesso
          </motion.span>
          <motion.h2
            className="font-heading font-light text-background max-w-xl md:text-right"
            style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Noi lo semplifichiamo con servizi completamente integrati.
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {categorie.map((c, i) => (
            <motion.div
              key={c.titolo}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{
                duration: 0.7,
                delay: shouldReduce ? 0 : i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-t border-background/10 pt-8 pb-10 pr-8 group"
              style={{
                transition: 'background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              whileHover={{ backgroundColor: 'rgba(245,240,232,0.04)' }}
            >
              <motion.span
                className="text-[20px] text-background/25 block mb-6"
                whileHover={{ scale: 1.15, color: 'var(--color-accent)' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block', transformOrigin: 'left center' }}
              >
                {c.simbolo}
              </motion.span>
              <h3
                className="font-heading font-light text-background mb-3"
                style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', letterSpacing: '-0.01em' }}
              >
                {c.titolo}
              </h3>
              <p className="font-body font-light text-[13px] text-background/45 leading-relaxed">
                {c.descrizione}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
