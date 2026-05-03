'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function ContattiHero() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-primary" data-section-tone="dark" style={{ paddingTop: '72px' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-16 pb-16 lg:pb-24">

        <motion.span
          className="font-label text-[12px] uppercase tracking-[0.2em] text-background/70 block mb-8"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: shouldReduce ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Contatti
        </motion.span>

        <motion.h1
          className="font-heading font-light italic text-background max-w-3xl"
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)',
            lineHeight: '1.05',
            letterSpacing: '-0.025em',
          }}
          initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: shouldReduce ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          Il tuo progetto inizia qui.
        </motion.h1>

        <motion.p
          className="font-body font-light text-background/80 text-[15px] leading-relaxed mt-8 max-w-xl"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: shouldReduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          Scrivici per fissare un primo confronto sul tuo progetto.
          Ti rispondiamo entro 24 ore lavorative.
        </motion.p>

      </div>
    </section>
  )
}
