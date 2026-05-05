'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Typewriter from '@/components/ui/Typewriter'

export default function SediSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-primary" style={{ paddingTop: '72px' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-16 pb-0">

        {/* Label */}
        <motion.span
          className="font-label text-[10px] uppercase tracking-[0.25em] text-background/35 block mb-10"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: shouldReduce ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Contatti
        </motion.span>

        {/* Heading */}
        <motion.h1
          className="font-heading font-light text-background max-w-2xl"
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 6rem)',
            lineHeight: '1.0',
            letterSpacing: '-0.025em',
          }}
          initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: shouldReduce ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          Il tuo partner, lungo tutta la Penisola.
        </motion.h1>

        {/* Addresses row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-14 pb-16 lg:pb-24 border-t border-background/10 pt-10"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: shouldReduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="font-label text-[9px] uppercase tracking-widest text-background/35 mb-4">
              Sede operativa
            </p>
            <address className="font-body font-light text-background/60 text-[14px] leading-loose not-italic">
              <p>Advenire S.r.l.</p>
              <p>Italia</p>
              <a
                href="mailto:info@advenire.it"
                className="block mt-3 hover:text-background transition-colors duration-300"
              >
                info@advenire.it
              </a>
            </address>
          </div>

          <div>
            <p className="font-label text-[9px] uppercase tracking-widest text-background/35 mb-4">
              Su appuntamento
            </p>
            <Typewriter
              el="p"
              text="Riceviamo i nostri clienti su appuntamento. Scrivici per fissare un primo confronto: ti rispondiamo entro 24 ore lavorative."
              delay={shouldReduce ? 0 : 0.4}
              speed={14}
              className="font-body font-light text-background/60 text-[14px] leading-loose text-left md:text-justify md:hyphens-auto md:[text-justify:inter-word]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
