'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionLineProps {
  className?: string
  color?: string
}

export default function SectionLine({ className = '', color = 'var(--color-border)' }: SectionLineProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ originX: 0, backgroundColor: color, height: '1px', width: '100%' }}
      />
    </div>
  )
}
