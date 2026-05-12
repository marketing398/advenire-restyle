'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'
import LineFade from '@/components/ui/LineFade'

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
          <SplitText
            el="p"
            text={sottotitolo}
            className="font-body font-light text-primary/80 text-[14.5px] md:text-[16px] leading-relaxed max-w-[52ch] text-left md:text-justify md:hyphens-none md:[text-justify:inter-word]"
            stagger={0.012}
            delay={shouldReduce ? 0 : 0.2}
            duration={0.55}
          />

          <div className="flex flex-col gap-5 text-right ml-auto max-w-xl">
            {paragrafi.map((p, i) => (
              <LineFade
                key={i}
                el="p"
                text={p}
                className="font-body font-light text-primary/70 text-[13.5px] md:text-[14.5px] leading-relaxed text-left md:text-justify md:hyphens-none md:[text-justify:inter-word]"
                lineStagger={0.16}
                delay={shouldReduce ? 0 : 0.3 + i * 0.08}
                duration={0.55}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
