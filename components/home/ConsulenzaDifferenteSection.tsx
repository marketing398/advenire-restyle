'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'
import CountUp from '@/components/ui/CountUp'

const cards = [
  {
    num: '01',
    title: 'Sincerità',
    text: 'La nostra consulenza è totalmente imparziale e garantisce una visione oggettiva e nel vostro interesse.',
  },
  {
    num: '02',
    title: 'Investiamo insieme ai nostri clienti',
    text: 'Costruiamo relazioni durature basate sulla fiducia reciproca investendo il nostro capitale professionale insieme ai nostri clienti.',
  },
  {
    num: '03',
    title: 'Investimenti personali',
    text: 'Con esperienza nella progettazione di abitazioni, apportiamo il nostro Know how nella realizzazione di residenze private.',
  },
  {
    num: '04',
    title: 'Strategie fiscalmente ottimizzate',
    text: 'Le nostre strategie e i nostri business plan per investimenti sono studiati per migliorare i risultati conteggiando anche le imposte relative agli interventi.',
  },
  {
    num: '05',
    title: 'Struttura di servizio integrata',
    text: 'Non operiamo con uffici dedicati a servizi specifici. Il team collabora in modo integrato per offrire consulenza e gestione unificata.',
  },
  {
    num: '06',
    title: 'Soluzioni specifiche',
    text: 'Andiamo oltre le soluzioni classiche. Elaboriamo la strategia più adatta per ottenere il massimo risultato.',
  },
]

export default function ConsulenzaDifferenteSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-background relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16 lg:py-28 border-t border-primary/10 relative">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-24 pb-12 lg:pb-16">
          <motion.span
            className="font-label text-[10px] uppercase tracking-[0.18em] text-primary/75"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Siamo differenti
          </motion.span>

          <SplitText
            el="h2"
            text="Facciamo le cose in modo diverso, per scelta."
            className="font-heading font-light italic text-primary"
            style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.8rem)', lineHeight: '1.2', letterSpacing: '-0.02em' }}
            delay={0.07}
            stagger={0.05}
          />
        </div>

        {/* 6-card grid — responsive 1/2/3 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {cards.map((card, i) => {
            // sm:2-col layout: rows of 2 → border-top from i>=2, border-right on even cols
            // md:3-col layout: rows of 3 → border-top from i>=3, border-right on cols 0,1
            const classes = [
              'p-6 md:px-8 md:py-8 group',
              // top borders
              i >= 2 ? 'sm:border-t border-primary/15' : '',
              i >= 3 ? 'md:border-t border-primary/15' : '',
              i < 3 ? 'md:border-t-0' : '',
              // right borders
              i % 2 === 0 ? 'sm:border-r border-primary/15' : 'sm:border-r-0',
              i % 3 !== 2 ? 'md:border-r border-primary/15' : 'md:border-r-0',
            ]
              .filter(Boolean)
              .join(' ')
            return (
            <motion.div
              key={card.num}
              className={classes}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.75,
                delay: shouldReduce ? 0 : (i % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -3 }}
            >
              <span className="font-label text-[10px] text-primary/45 block mb-4 group-hover:text-primary/70 transition-colors duration-300">
                <CountUp to={parseInt(card.num, 10)} delay={shouldReduce ? 0 : (i % 3) * 0.1 + 0.2} />
              </span>
              <h3
                className="font-heading font-normal text-primary mb-3 group-hover:text-primary/80"
                style={{
                  fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
                  lineHeight: '1.3',
                  transition: 'color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {card.title}
              </h3>
              <p className="font-body font-light text-primary/65 text-[13px] leading-relaxed">
                {card.text}
              </p>
            </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: shouldReduce ? 0 : 0.2 }}
        >
          <a
            href="/cosa-facciamo"
            className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.12em] bg-primary text-background rounded-full px-6 py-2.5 hover:bg-primary/85 transition-colors duration-200"
            style={{ cursor: 'pointer' }}
          >
            Scopri i nostri servizi <span aria-hidden="true">→</span>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
