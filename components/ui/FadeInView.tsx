'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface FadeInViewProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'left' | 'none'
  className?: string
  amount?: number | 'some' | 'all'
}

export default function FadeInView({
  children,
  delay = 0,
  duration = 0.75,
  direction = 'up',
  className,
  amount,
}: FadeInViewProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%', amount })
  const shouldReduce = useReducedMotion()

  const initial = {
    opacity: 0,
    y: direction === 'up' && !shouldReduce ? 20 : 0,
    x: direction === 'left' && !shouldReduce ? 20 : 0,
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
