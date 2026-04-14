'use client'

import { createElement } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type TagName = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'

interface Props {
  text: string
  el?: TagName
  className?: string
  style?: React.CSSProperties
  delay?: number
  stagger?: number
}

export default function SplitText({
  text,
  el: Tag = 'span',
  className,
  style,
  delay = 0,
}: Props) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return createElement(Tag, { className, style }, text)
  }

  const MotionTag = motion.create(Tag)

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </MotionTag>
  )
}
