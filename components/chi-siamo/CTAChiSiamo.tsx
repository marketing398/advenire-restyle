'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

export default function CTAChiSiamo() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-primary py-24 lg:py-32 relative overflow-hidden" data-section-tone="dark">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 text-center">
        <motion.div
          className="bg-accent mx-auto mb-10"
          style={{ height: '2px' }}
          initial={{ width: 0 }}
          whileInView={{ width: '3rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <SplitText
          el="h2"
          text="Hai un'operazione immobiliare da analizzare o una nuova costruzione in bioedilizia da realizzare?"
          className="font-heading font-light italic text-background mx-auto"
          style={{
            fontSize: 'clamp(2.1rem, 4.2vw, 4rem)',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
          }}
          delay={shouldReduce ? 0 : 0.06}
          stagger={0.04}
        />

        <motion.p
          className="font-body font-light text-background/70 text-[14px] md:text-[15px] leading-relaxed mt-6 max-w-xl mx-auto"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Raccontacelo. Ti diamo un primo riscontro onesto, senza impegno.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/contatti"
            className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.15em] bg-accent text-primary rounded-full px-8 py-3.5 hover:bg-accent/85 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
          >
            Prenota una call <span aria-hidden="true">&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
