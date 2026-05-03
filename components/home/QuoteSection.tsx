'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'
import ArchitecturalLines from '@/components/ui/ArchitecturalLines'

export default function QuoteSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="quote-section" className="bg-accent relative overflow-hidden" data-section-tone="accent">
      <ArchitecturalLines position="top-right" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 lg:py-32 relative">

        <motion.span
          className="font-label text-[12px] uppercase tracking-[0.2em] text-primary/70 block mb-8"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Chi siamo
        </motion.span>

        <motion.div
          className="bg-primary mb-16"
          style={{ height: '2px' }}
          initial={{ width: 0 }}
          whileInView={{ width: '4rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <SplitText
          el="p"
          text="Siamo professionisti che mettono competenza e concretezza al centro di ogni scelta, uniti da un unico obiettivo: trasformare ogni progetto in un risultato solido e duraturo. Dalla progettazione alla gestione operativa della commessa, fino alla valutazione strategica degli investimenti immobiliari. È proprio questa profondità di esperienza che ci ha permesso di costruire una società capace di seguire ogni progetto nella sua interezza, senza delegare le fasi critiche. Oggi siamo il punto di riferimento per chi vuole investire nel mattone con metodo e consapevolezza, e per chi sceglie di costruire una casa che rispecchi davvero il proprio stile di vita."
          className="font-heading font-light italic text-primary max-w-4xl mx-auto text-center"
          style={{
            fontSize: 'clamp(1.5rem, 2.8vw, 2.6rem)',
            lineHeight: '1.35',
            letterSpacing: '-0.02em',
          }}
          delay={shouldReduce ? 0 : 0.1}
          stagger={0.035}
        />

        <motion.div
          className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-4 mt-12 lg:mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="/chi-siamo"
            className="group inline-flex items-center justify-center gap-2 font-label text-[11px] uppercase tracking-[0.12em] bg-primary text-background rounded-full px-6 py-2.5 hover:bg-primary-light transition-colors duration-300"
            style={{ cursor: 'pointer' }}
          >
            Scopri chi siamo <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="/contatti"
            className="group inline-flex items-center justify-center gap-2 font-label text-[11px] uppercase tracking-[0.12em] bg-background text-primary rounded-full px-6 py-2.5 hover:bg-background/85 transition-colors duration-300"
            style={{ cursor: 'pointer' }}
          >
            Chiedi una consulenza <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
