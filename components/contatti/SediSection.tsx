'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function SediSection() {
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
          Il tuo partner, da costa a costa.
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
              Sede centrale di Los Angeles
            </p>
            <address className="font-body font-light text-background/60 text-[14px] leading-loose not-italic">
              <p>10877 Wilshire Blvd Suite 1406</p>
              <p>Los Angeles, CA 90024</p>
              <a
                href="tel:+14245004601"
                className="block mt-2 hover:text-background transition-colors duration-300"
              >
                (424) 500-4601
              </a>
              <a
                href="mailto:info@advenire.com"
                className="block mt-3 hover:text-background transition-colors duration-300"
              >
                info@advenire.com
              </a>
            </address>
          </div>

          {/* Placeholder immagine LA */}
          <div
            className="aspect-[4/3] md:aspect-auto"
            style={{ background: '#e8e0d0', border: '1px solid rgba(13,26,15,0.1)', minHeight: '180px' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
