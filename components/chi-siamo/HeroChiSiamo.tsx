'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function HeroChiSiamo() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-primary grain" style={{ paddingTop: '72px' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-16 pb-0">

        {/* Label */}
        <motion.span
          className="font-label text-[10px] uppercase tracking-[0.25em] text-background/35 block mb-10"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: shouldReduce ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Chi siamo
        </motion.span>

        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-end pb-16 lg:pb-24">
          <motion.h1
            className="font-heading font-light text-background"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 6rem)',
              lineHeight: '1.0',
              letterSpacing: '-0.025em',
            }}
            initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: shouldReduce ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            Non ci limitiamo a gestire la ricchezza, ma progettiamo anche eredità.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: shouldReduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Animated accent line */}
            <motion.div
              className="bg-background/20 mb-6"
              style={{ height: '1px' }}
              initial={{ width: 0 }}
              animate={{ width: '2.5rem' }}
              transition={{ duration: 0.7, delay: shouldReduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
            <p className="font-body font-light text-background/55 text-[14px] leading-relaxed max-w-sm">
              Grazie a un mix di competenze nel settore immobiliare e di una collaborazione
              attenta, siamo un partner per la vita con una visione a lungo termine.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
