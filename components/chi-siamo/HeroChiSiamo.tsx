'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Typewriter from '@/components/ui/Typewriter'

export default function HeroChiSiamo() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-primary" data-section-tone="dark" style={{ paddingTop: '72px' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-16 pb-0">

        {/* Label */}
        <motion.span
          className="font-label text-[12px] uppercase tracking-[0.2em] text-background/70 block mb-8"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: shouldReduce ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Chi siamo
        </motion.span>

        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-end pb-16 lg:pb-24">
          <motion.h1
            className="font-heading font-light italic text-background"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 6rem)',
              lineHeight: '1.0',
              letterSpacing: '-0.025em',
            }}
            initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: shouldReduce ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            Tre professionisti, una visione. Costruiamo valore, progettiamo futuro.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: shouldReduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Animated accent line */}
            <motion.div
              className="bg-accent mb-6"
              style={{ height: '1.5px' }}
              initial={{ width: 0 }}
              animate={{ width: '6rem' }}
              transition={{ duration: 0.8, delay: shouldReduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
            <Typewriter
              el="p"
              text="Esperienze diverse, una direzione comune: lavoriamo con rigore, trasparenza e attenzione all'impatto di ciò che realizziamo."
              delay={shouldReduce ? 0 : 0.8}
              speed={16}
              className="font-body font-light text-background/80 text-[14px] leading-relaxed max-w-sm text-left md:text-justify md:hyphens-auto md:[text-justify:inter-word]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
