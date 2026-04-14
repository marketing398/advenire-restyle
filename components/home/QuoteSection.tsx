'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'
import ArchitecturalLines from '@/components/ui/ArchitecturalLines'

export default function QuoteSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="chi-siamo" className="bg-accent relative overflow-hidden">
      <ArchitecturalLines position="top-right" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16 lg:py-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-4 lg:gap-24">

          {/* Label */}
          <motion.span
            className="font-label text-[10px] uppercase tracking-[0.18em] text-primary/70"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Chi siamo
          </motion.span>

          {/* Content */}
          <div>
            {/* Accent line */}
            <motion.div
              className="bg-primary mb-10"
              style={{ height: '2px' }}
              initial={{ width: 0 }}
              whileInView={{ width: '3rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Quote — word-by-word reveal */}
            <SplitText
              el="p"
              text="Ogni investimento immobiliare è unico e merita una consulenza su misura, capace di adattarsi ai tuoi obiettivi e alla tua visione. La nostra esperienza nel mondo delle costruzioni si traduce in un supporto concreto e vicino alle tue esigenze: dalle operazioni orientate al rendimento fino ai progetti più personali, come la casa che hai sempre immaginato."
              className="font-heading font-light text-primary max-w-3xl"
              style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2.4rem)', lineHeight: '1.45', letterSpacing: '-0.02em' }}
              delay={shouldReduce ? 0 : 0.1}
              stagger={0.035}
            />

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href="/chi-siamo"
                className="inline-flex items-center justify-center gap-2 font-label text-[11px] uppercase tracking-[0.12em] bg-primary text-background rounded-full px-6 py-2.5 hover:bg-primary-light transition-colors duration-200"
                style={{ cursor: 'pointer' }}
              >
                Scopri chi siamo <span aria-hidden="true">→</span>
              </a>
              <a
                href="/contatti"
                className="inline-flex items-center justify-center gap-2 font-label text-[11px] uppercase tracking-[0.12em] bg-background text-primary rounded-full px-6 py-2.5 hover:bg-background/85 transition-colors duration-200"
                style={{ cursor: 'pointer' }}
              >
                Chiedi una consulenza <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
