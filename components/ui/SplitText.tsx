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
  stagger?: number
  duration?: number
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export default function SplitText({
  text,
  el: Tag = 'span',
  className,
  style,
  delay = 0,
  stagger = 0,
  duration = 0.7,
}: Props) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce || stagger === 0) {
    return createElement(Tag, { className, style }, text)
  }

  const MotionTag = motionTags[Tag]
  const tokens = text.split(/(\s+)/)

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {tokens.map((token, i) =>
        /^\s+$/.test(token) ? (
          <span key={i} aria-hidden="true">
            {token}
          </span>
        ) : (
          <motion.span
            key={i}
            className="inline-block will-change-transform"
            variants={wordVariants}
            transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            {token}
          </motion.span>
        ),
      )}
    </MotionTag>
  )
}
