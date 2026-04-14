'use client'

import { motion, useReducedMotion } from 'framer-motion'

const valori = [
  {
    num: '01',
    titolo: 'Integrità, senza compromessi',
    testo:
      "Agiamo con incrollabile onestà e decisione, guidati sempre dagli interessi a lungo termine dei nostri clienti e dalla fiducia che ripongono in noi.",
  },
  {
    num: '02',
    titolo: 'Partnership con uno scopo',
    testo:
      'Coltiviamo relazioni basate su empatia, intuizione e allineamento. Non siamo al fianco dei nostri clienti, ma al loro fianco come creatori della loro eredità.',
  },
  {
    num: '03',
    titolo: "L'eccellenza come standard",
    testo:
      "Puntiamo alla maestria in tutto ciò che facciamo, offrendo soluzioni raffinate, una guida preventiva e uno standard di servizio che riflette l'ambizione dei nostri clienti.",
  },
]

export default function ValoriChiSiamo() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-background py-20 lg:py-28 border-b border-border">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 mb-14 pb-10 border-b border-border items-end">
          <motion.span
            className="font-label text-[10px] uppercase tracking-[0.25em] text-muted"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            I nostri valori
          </motion.span>
          <motion.h2
            className="font-heading font-light italic text-foreground max-w-xl"
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
            Principi che guidano ogni nostra decisione.
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {valori.map((v, i) => (
            <motion.div
              key={v.titolo}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.75,
                delay: shouldReduce ? 0 : i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-t border-border pt-8 pb-10 pr-8 group"
            >
              <span className="font-label text-[10px] text-foreground/45 block mb-6 tracking-[0.15em]">
                {v.num}
              </span>
              <h3
                className="font-heading font-light text-foreground mb-4"
                style={{
                  fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {v.titolo}
              </h3>
              <p className="font-body text-[13px] font-light text-foreground/65 leading-relaxed">
                {v.testo}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
