'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

export default function QuoteSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-primary grain">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-24">

          {/* Label */}
          <motion.span
            className="font-label text-[10px] uppercase tracking-[0.25em] text-background/40"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Chi siamo
          </motion.span>

          {/* Content */}
          <div>
            {/* Coral accent line */}
            <motion.div
              className="bg-accent mb-10"
              style={{ height: '1px' }}
              initial={{ width: 0 }}
              whileInView={{ width: '2.5rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Quote — word-by-word reveal */}
            <SplitText
              el="p"
              text="La tua vita si evolve. E anche noi. Offriamo soluzioni adattive e lungimiranti, pensate per anticipare il futuro, non per reagire."
              className="font-heading font-light text-background max-w-3xl"
              style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)', lineHeight: '1.45', letterSpacing: '-0.02em' }}
              delay={shouldReduce ? 0 : 0.1}
              stagger={0.035}
            />

            {/* Author */}
            <motion.p
              className="font-label text-[10px] text-background/35 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              — Giulio Di Mariano Servo
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
