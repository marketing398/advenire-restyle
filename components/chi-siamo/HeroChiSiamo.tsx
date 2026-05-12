'use client'

import { motion, useReducedMotion } from 'framer-motion'
import LineFade from '@/components/ui/LineFade'

export default function HeroChiSiamo() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-primary" data-section-tone="dark" style={{ paddingTop: '72px' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-16 pb-20 lg:pt-24 lg:pb-28">

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
        <motion.h1
          className="font-heading font-light italic text-background max-w-5xl"
          style={{
            fontSize: 'clamp(2.2rem, 5.4vw, 5.8rem)',
            lineHeight: '1.02',
            letterSpacing: '-0.025em',
          }}
          initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: shouldReduce ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          Tre professionisti, una visione. Costruiamo valore, progettiamo futuro.
        </motion.h1>

        {/* Animated accent line */}
        <motion.div
          className="bg-accent mt-12 mb-8"
          style={{ height: '1.5px' }}
          initial={{ width: 0 }}
          animate={{ width: '3rem' }}
          transition={{ duration: 0.8, delay: shouldReduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
        />

        <LineFade
          el="p"
          text="Esperienze diverse, una direzione comune: lavoriamo con rigore, trasparenza e attenzione all'impatto di ciò che realizziamo."
          delay={shouldReduce ? 0 : 0.55}
          lineStagger={0.18}
          className="font-body font-light text-background/80 text-[14px] md:text-[15px] leading-relaxed max-w-3xl text-left"
        />
      </div>
    </section>
  )
}
