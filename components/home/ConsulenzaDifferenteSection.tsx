'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

const cards = [
  {
    num: '01',
    title: 'Trasparenza',
    text: 'Operiamo in piena autonomia di giudizio, senza vincoli esterni o interessi di parte. Ogni analisi e ogni raccomandazione sono fondate su criteri oggettivi, documentabili e allineati agli obiettivi del cliente.',
  },
  {
    num: '02',
    title: 'Interessi comuni',
    text: 'Ogni relazione che costruiamo è basata sulla fiducia e sulla condivisione degli obiettivi. Investiamo il nostro capitale professionale insieme ai nostri clienti, perché il loro successo è il nostro successo.',
  },
  {
    num: '03',
    title: 'Sartorialità',
    text: 'Ogni abitazione è unica perché uniche sono le persone che la vivono. Portiamo il nostro know-how tecnico nella realizzazione di residenze private, traducendo ogni esigenza in scelte progettuali concrete, sostenibili e di valore.',
  },
  {
    num: '04',
    title: 'Strategia',
    text: "Prima di ogni investimento, è fondamentale conoscere i numeri con precisione. Per questo offriamo analisi finanziarie su misura, che coprono l'intera struttura di costo del progetto, dalla fase preliminare fino alla consegna, per garantire decisioni consapevoli e risultati senza sorprese.",
  },
  {
    num: '05',
    title: 'Competenze integrate',
    text: 'Diverse competenze, un unico punto di riferimento. Il nostro team integra professionalità complementari, tecniche, progettuali e finanziarie per offrire una gestione completa e coordinata di ogni progetto, dalla prima consulenza fino alla consegna finale.',
  },
  {
    num: '06',
    title: 'Responsabilità',
    text: "Non deleghiamo le fasi critiche. Non passiamo il lavoro ad altri quando diventa complesso. Siamo presenti dall'inizio alla fine, con le stesse persone e la stessa dedizione, perché è questo il modo in cui costruiamo fiducia, oltre che progetti.",
  },
]

export default function ConsulenzaDifferenteSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-background relative overflow-hidden" data-section-tone="light">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20 lg:py-28 border-t border-primary/10 relative">

        <motion.span
          className="font-label text-[10px] uppercase tracking-[0.18em] text-primary/75 block mb-10"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Siamo differenti
        </motion.span>

        <motion.div
          className="bg-primary mb-10"
          style={{ height: '2px' }}
          initial={{ width: 0 }}
          whileInView={{ width: '3rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <SplitText
          el="h2"
          text="Facciamo le cose in modo diverso, per scelta."
          className="font-heading font-light italic text-primary max-w-3xl mb-12 lg:mb-16"
          style={{ fontSize: 'clamp(2.1rem, 4.2vw, 4rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
          delay={0.07}
          stagger={0.05}
        />

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
              <span className="font-label text-[10px] uppercase tracking-[0.18em] text-accent block mb-4 transition-colors duration-300">
                {card.num}
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
            href="/contatti"
            className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.12em] bg-primary text-background rounded-full px-6 py-2.5 hover:bg-primary/85 transition-colors duration-200"
            style={{ cursor: 'pointer' }}
          >
            Richiedi una consulenza <span aria-hidden="true">→</span>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
