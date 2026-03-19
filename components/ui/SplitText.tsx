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

const container = (delay: number, stagger: number) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

const word = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] } },
}

export default function SplitText({
  text,
  el = 'span',
  className,
  style,
  delay = 0,
  stagger = 0.04,
}: Props) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    return createElement(el, { className, style }, text)
  }

  return createElement(
    el,
    { className, style },
    <motion.span
      style={{ display: 'block' }}
      variants={container(delay, stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
    >
      {text.split(' ').map((w, i, arr) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
            paddingBottom: '0.12em',
            marginBottom: '-0.12em',
          }}
        >
          <motion.span variants={word} style={{ display: 'inline-block' }}>
            {w}
          </motion.span>
          {i < arr.length - 1 && '\u00A0'}
        </span>
      ))}
    </motion.span>
  )
}
