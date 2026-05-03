'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

type Props = {
  titolo: string
  sottotitolo: string
  paragrafi: string[]
}

export default function IlServizio({ titolo, sottotitolo, paragrafi }: Props) {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-background py-20 lg:py-32" data-section-tone="light">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        <motion.span
          className="font-label text-[12px] uppercase tracking-[0.2em] text-primary/70 block mb-8"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Il servizio
        </motion.span>

        <motion.div
          className="bg-primary mb-10"
          style={{ height: '2px' }}
          initial={{ width: 0 }}
          whileInView={{ width: '3rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <SplitText
          el="h2"
          text={titolo}
          className="font-heading font-light italic text-primary max-w-4xl"
          style={{
            fontSize: 'clamp(2.1rem, 4.2vw, 4rem)',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
          }}
          delay={shouldReduce ? 0 : 0.06}
          stagger={0.04}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 mt-14 lg:mt-20 items-start">
          <motion.p
            className="font-body font-light text-primary/80 text-[14.5px] md:text-[16px] leading-relaxed max-w-[52ch]"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {sottotitolo}
          </motion.p>

          <div className="flex flex-col gap-5 text-right ml-auto max-w-xl">
            {paragrafi.map((p, i) => (
              <motion.p
                key={i}
                className="font-body font-light text-primary/70 text-[13.5px] md:text-[14.5px] leading-relaxed"
                initial={{ opacity: 0, y: shouldReduce ? 0 : 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: shouldReduce ? 0 : 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
