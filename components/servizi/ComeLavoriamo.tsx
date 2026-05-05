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
  variant?: 'accent' | 'primary' | 'light'
}

const variants = {
  accent: {
    bg: 'bg-accent',
    headingColor: 'text-primary',
    labelColor: 'text-primary/70',
    lineColor: 'bg-primary',
    stepBorder: 'border-primary/20',
    numColor: 'text-primary/50',
    stepTitleColor: 'text-primary',
    stepTextColor: 'text-primary/80',
    tone: 'accent',
  },
  primary: {
    bg: 'bg-primary',
    headingColor: 'text-background',
    labelColor: 'text-background/70',
    lineColor: 'bg-background',
    stepBorder: 'border-background/15',
    numColor: 'text-background/45',
    stepTitleColor: 'text-background',
    stepTextColor: 'text-background/75',
    tone: 'dark',
  },
  light: {
    bg: 'bg-background',
    headingColor: 'text-primary',
    labelColor: 'text-primary/70',
    lineColor: 'bg-primary',
    stepBorder: 'border-primary/15',
    numColor: 'text-primary/55',
    stepTitleColor: 'text-primary',
    stepTextColor: 'text-primary/80',
    tone: 'light',
  },
} as const

export default function ComeLavoriamo({ titolo, steps, variant = 'accent' }: Props) {
  const shouldReduce = useReducedMotion()
  const v = variants[variant]
  const { bg, headingColor, labelColor, lineColor, stepBorder, numColor, stepTitleColor, stepTextColor, tone } = v

  return (
    <section className={`${bg} py-20 lg:py-28 relative overflow-hidden`} data-section-tone={tone}>
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
                <SplitText
                  el="h3"
                  text={s.titolo}
                  className={`font-heading font-normal ${stepTitleColor} mb-3`}
                  style={{
                    fontSize: 'clamp(1.05rem, 1.4vw, 1.35rem)',
                    lineHeight: '1.25',
                    letterSpacing: '-0.01em',
                  }}
                  stagger={0.04}
                  delay={shouldReduce ? 0 : (i % 2) * 0.1}
                />
                <SplitText
                  el="p"
                  text={s.testo}
                  className={`font-body font-light ${stepTextColor} text-[13.5px] md:text-[14px] leading-relaxed text-left md:text-justify md:hyphens-auto md:[text-justify:inter-word]`}
                  stagger={0.01}
                  delay={shouldReduce ? 0 : 0.18 + (i % 2) * 0.1}
                  duration={0.5}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
