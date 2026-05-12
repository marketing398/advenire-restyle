'use client'

import { createElement } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

type TagName = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const

interface Props {
  text: string
  el?: TagName
  className?: string
  style?: React.CSSProperties
  delay?: number
  lineStagger?: number
  duration?: number
}

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

function splitIntoLines(text: string) {
  const parts = text.split(/(?<=[.!?])\s+/g).filter(Boolean)
  return parts.length > 0 ? parts : [text]
}

export default function LineFade({
  text,
  el: Tag = 'p',
  className,
  style,
  delay = 0,
  lineStagger = 0.14,
  duration = 0.65,
}: Props) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return createElement(Tag, { className, style }, text)
  }

  const MotionTag = motionTags[Tag]
  const lines = splitIntoLines(text)

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      transition={{ staggerChildren: lineStagger, delayChildren: delay }}
      aria-label={text}
    >
      {lines.map((line, i) => (
        <motion.span
          key={i}
          variants={lineVariants}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          {line}
          {i < lines.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </MotionTag>
  )
}
