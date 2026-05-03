'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface SectionLineProps {
  className?: string
  color?: string
}

export default function SectionLine({ className = '', color = 'var(--color-border)' }: SectionLineProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })
  const shouldReduce = useReducedMotion()

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ scaleX: shouldReduce ? 1 : 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: shouldReduce ? 1 : 0 }}
        transition={{ duration: shouldReduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0, backgroundColor: color, height: '1px', width: '100%' }}
      />
    </div>
  )
}
