'use client'

import { createElement, useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

type TagName = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'

interface Props {
  text: string
  el?: TagName
  className?: string
  style?: React.CSSProperties
  delay?: number
  speed?: number
  cursor?: boolean
}

export default function Typewriter({
  text,
  el: Tag = 'span',
  className,
  style,
  delay = 0,
  speed = 22,
  cursor = false,
}: Props) {
  const shouldReduce = useReducedMotion()
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [displayed, setDisplayed] = useState(shouldReduce ? text : '')
  const [done, setDone] = useState<boolean>(!!shouldReduce)

  useEffect(() => {
    if (shouldReduce || done || !inView) return
    let i = 0
    const startId = window.setTimeout(() => {
      const intervalId = window.setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          window.clearInterval(intervalId)
          setDone(true)
        }
      }, speed)
    }, delay * 1000)
    return () => window.clearTimeout(startId)
  }, [inView, shouldReduce, text, speed, delay, done])

  return createElement(
    Tag,
    {
      ref,
      className,
      style,
      'aria-label': text,
    },
    <>
      <span aria-hidden="true">{displayed}</span>
      {cursor && !done && (
        <span
          aria-hidden="true"
          className="inline-block ml-[2px] w-[1px] align-baseline animate-pulse"
          style={{
            height: '0.9em',
            background: 'currentColor',
            transform: 'translateY(0.05em)',
          }}
        />
      )}
    </>,
  )
}
