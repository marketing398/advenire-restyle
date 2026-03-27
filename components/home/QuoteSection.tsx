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
              text="Ogni investimento immobiliare è unico e merita una consulenza su misura, capace di adattarsi ai tuoi obiettivi e alla tua visione. La nostra esperienza nel mondo delle costruzioni si traduce in un supporto concreto e vicino alle tue esigenze: dalle operazioni orientate al reddito fino ai progetti più personali, come la casa che hai sempre immaginato."
              className="font-heading font-light text-background max-w-3xl"
              style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)', lineHeight: '1.45', letterSpacing: '-0.02em' }}
              delay={shouldReduce ? 0 : 0.1}
              stagger={0.035}
            />

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href="/chi-siamo"
                className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.12em] bg-[#f6efe5] text-[#0D1A0F] rounded-full px-6 py-2.5 hover:opacity-85 transition-opacity duration-200"
                style={{ cursor: 'pointer' }}
              >
                Scopri chi siamo <span aria-hidden="true">→</span>
              </a>
              <a
                href="/contatti"
                className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.12em] border border-[#f6efe5]/30 text-[#f6efe5] rounded-full px-6 py-2.5 hover:border-[#f6efe5]/60 transition-colors duration-200"
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
