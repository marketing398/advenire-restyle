'use client'

import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  label: string
  titolo: string
  sottotitolo: string
}

export default function HeroServizio({ label, titolo, sottotitolo }: Props) {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-primary relative overflow-hidden" data-section-tone="dark" style={{ paddingTop: '72px' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-20 pb-24 lg:pt-28 lg:pb-32 relative">

        <motion.span
          className="font-label text-[10px] uppercase tracking-[0.25em] text-background/65 block mb-12"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: shouldReduce ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {label}
        </motion.span>

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
          {titolo}
        </motion.h1>

        <motion.div
          className="bg-accent mt-12 mb-8"
          style={{ height: '1.5px' }}
          initial={{ width: 0 }}
          animate={{ width: '3rem' }}
          transition={{ duration: 0.8, delay: shouldReduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.p
          className="font-body font-light text-background/80 text-[14px] md:text-[15px] leading-relaxed max-w-2xl"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: shouldReduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {sottotitolo}
        </motion.p>
      </div>
    </section>
  )
}
