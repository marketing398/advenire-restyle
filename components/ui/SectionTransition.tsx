'use client'

import { motion, useReducedMotion } from 'framer-motion'

type Tone = 'background' | 'accent' | 'primary' | 'card'

const toneToCSSVar: Record<Tone, string> = {
  background: 'var(--color-background)',
  accent: 'var(--color-accent)',
  primary: 'var(--color-primary)',
  card: 'var(--color-card)',
}

type Props = {
  from: Tone
  position?: 'top' | 'bottom'
  height?: number
}

export default function SectionTransition({ from, position = 'top', height = 120 }: Props) {
  const shouldReduce = useReducedMotion()
  const color = toneToCSSVar[from]

  const gradient =
    position === 'top'
      ? `linear-gradient(to bottom, ${color} 0%, transparent 100%)`
      : `linear-gradient(to top, ${color} 0%, transparent 100%)`

  const positionStyle =
    position === 'top'
      ? { top: 0 as const, left: 0 as const, right: 0 as const }
      : { bottom: 0 as const, left: 0 as const, right: 0 as const }

  return (
    <motion.div
      aria-hidden="true"
      className="absolute pointer-events-none z-10"
      style={{
        ...positionStyle,
        height: `${height}px`,
        background: gradient,
      }}
      initial={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}
