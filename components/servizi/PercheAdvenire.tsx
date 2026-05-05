'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

const punti = [
  {
    num: '01',
    titolo: 'Non devi coprire tutto da solo.',
    testo:
      'Analisi finanziaria, due diligence e valutazione urbanistica, progettazione, contrattualistica, gestione cantiere, negoziazione con agenzie. Competenze che richiedono anni per essere acquisite singolarmente. Noi le portiamo tutte, integrate, sulla tua operazione.',
  },
  {
    num: '02',
    titolo: 'Non decidi mai da solo.',
    testo:
      'I momenti più rischiosi di un’operazione immobiliare sono quelli in cui devi decidere velocemente senza avere tutti i dati. Siamo sempre al tuo fianco in quei momenti.',
  },
  {
    num: '03',
    titolo: 'Lavoriamo dove operi tu.',
    testo:
      'Modena e Reggio Emilia. Non consultiamo dati da remoto: conosciamo il mercato, i prezzi reali, le dinamiche locali, i fornitori.',
  },
]

export default function PercheAdvenire() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-accent py-20 lg:py-28" data-section-tone="accent">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        <motion.span
          className="font-label text-[12px] uppercase tracking-[0.2em] text-primary/70 block mb-8"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Perché Advenire
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
          text="Quello che cambia quando non sei solo."
          className="font-heading font-light italic text-primary max-w-3xl mb-16 lg:mb-20"
          style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
            lineHeight: '1.15',
            letterSpacing: '-0.02em',
          }}
          delay={shouldReduce ? 0 : 0.06}
          stagger={0.04}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {punti.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{
                duration: 0.75,
                delay: shouldReduce ? 0 : i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`pt-10 pb-10 md:px-8 ${
                i < 2 ? 'md:border-r md:border-primary/15' : ''
              }`}
            >
              <span className="font-label text-[10px] uppercase tracking-[0.18em] text-primary/60 block mb-6">
                {p.num}
              </span>
              <SplitText
                el="h3"
                text={p.titolo}
                className="font-heading font-light italic text-primary mb-4"
                style={{
                  fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)',
                  lineHeight: '1.25',
                  letterSpacing: '-0.01em',
                }}
                stagger={0.04}
                delay={shouldReduce ? 0 : i * 0.1}
              />
              <SplitText
                el="p"
                text={p.testo}
                className="font-body text-[13.5px] md:text-[14px] font-light text-primary/75 leading-relaxed text-left md:text-justify md:hyphens-auto md:[text-justify:inter-word]"
                stagger={0.01}
                delay={shouldReduce ? 0 : 0.18 + i * 0.1}
                duration={0.5}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
