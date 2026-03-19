'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface Props {
  to: number
  from?: number
  duration?: number
  delay?: number
  format?: (n: number) => string
  className?: string
}

export default function CountUp({
  to,
  from = 0,
  duration = 1.2,
  delay = 0,
  format = (n) => String(n).padStart(2, '0'),
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })
  const shouldReduce = useReducedMotion()
  const [value, setValue] = useState(shouldReduce ? to : from)
  const started = useRef(false)

  useEffect(() => {
    if (shouldReduce || !inView || started.current) return
    started.current = true
    const startTime = performance.now() + delay * 1000
    const range = to - from

    const tick = (now: number) => {
      if (now < startTime) { requestAnimationFrame(tick); return }
      const elapsed = (now - startTime) / 1000
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(from + range * eased))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref} className={className}>{format(value)}</span>
}
