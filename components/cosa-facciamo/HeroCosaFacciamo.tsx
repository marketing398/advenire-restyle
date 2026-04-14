'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function HeroCosaFacciamo() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-primary" style={{ paddingTop: '72px' }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-16 pb-0">

        {/* Label */}
        <motion.span
          className="font-label text-[10px] uppercase tracking-[0.25em] text-background/50 block mb-10"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: shouldReduce ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Cosa facciamo
        </motion.span>

        {/* Heading + body */}
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
            Una strategia{' '}
            <em className="italic">che si adatta a te.</em>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: shouldReduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="bg-background/20 mb-6"
              style={{ height: '1px' }}
              initial={{ width: 0 }}
              animate={{ width: '2.5rem' }}
              transition={{ duration: 0.7, delay: shouldReduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
            <p className="font-body font-light text-background/75 text-[14px] leading-relaxed max-w-sm">
              Non esiste una soluzione uguale per tutti. Costruiamo strategie patrimoniali personalizzate
              che evolvono con la tua vita, la tua famiglia e le tue ambizioni.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
