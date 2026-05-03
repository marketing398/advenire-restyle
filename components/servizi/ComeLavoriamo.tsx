'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

type Step = {
  titolo: string
  testo: string
}

type Props = {
  titolo: string
  steps: Step[]
  variant?: 'accent' | 'primary'
}

export default function ComeLavoriamo({ titolo, steps, variant = 'accent' }: Props) {
  const shouldReduce = useReducedMotion()
  const isAccent = variant === 'accent'

  const bg = isAccent ? 'bg-accent' : 'bg-primary'
  const headingColor = isAccent ? 'text-primary' : 'text-background'
  const labelColor = isAccent ? 'text-primary/70' : 'text-background/70'
  const lineColor = isAccent ? 'bg-primary' : 'bg-background'
  const stepBorder = isAccent ? 'border-primary/20' : 'border-background/15'
  const numColor = isAccent ? 'text-primary/50' : 'text-background/45'
  const stepTitleColor = isAccent ? 'text-primary' : 'text-background'
  const stepTextColor = isAccent ? 'text-primary/80' : 'text-background/75'

  return (
    <section className={`${bg} py-20 lg:py-28 relative overflow-hidden`} data-section-tone={isAccent ? 'accent' : 'dark'}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 relative">

        <motion.span
          className={`font-label text-[12px] uppercase tracking-[0.2em] ${labelColor} block mb-8`}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Come lavoriamo
        </motion.span>

        <motion.div
          className={`${lineColor} mb-10`}
          style={{ height: '2px' }}
          initial={{ width: 0 }}
          whileInView={{ width: '3rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <SplitText
          el="h2"
          text={titolo}
          className={`font-heading font-light italic ${headingColor} max-w-3xl mb-16 lg:mb-20`}
          style={{ fontSize: 'clamp(2.1rem, 4.2vw, 4rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
          delay={shouldReduce ? 0 : 0.06}
          stagger={0.04}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {steps.map((s, i) => {
            const classes = [
              'p-6 md:px-8 md:py-10 group',
              `border-t ${stepBorder}`,
              i % 2 === 0 ? `md:border-r ${stepBorder}` : '',
            ]
              .filter(Boolean)
              .join(' ')
            return (
              <motion.div
                key={s.titolo}
                className={classes}
                initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{
                  duration: 0.75,
                  delay: shouldReduce ? 0 : (i % 2) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className={`font-label text-[10px] uppercase tracking-[0.18em] ${numColor} block mb-4`}>
                  Step {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className={`font-heading font-normal ${stepTitleColor} mb-3`}
                  style={{
                    fontSize: 'clamp(1.05rem, 1.4vw, 1.35rem)',
                    lineHeight: '1.25',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s.titolo}
                </h3>
                <p className={`font-body font-light ${stepTextColor} text-[13.5px] md:text-[14px] leading-relaxed`}>
                  {s.testo}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
