'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 25, suffix: '+', label: 'Anni di esperienza combinata' },
  { value: 3, suffix: '', label: 'Partner fondatori certificati' },
  { value: 100, suffix: '%', label: 'Fee-only, nessun conflitto di interesse' },
  { value: 2, suffix: '', label: 'Sedi: Los Angeles e New York' },
]

function StatNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let raf: number
    const start = performance.now()
    const duration = 1400

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="bg-background border-b border-border">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="border-r border-border last:border-r-0 px-8 lg:px-12 py-14"
            >
              <p
                className="font-heading font-light text-foreground"
                style={{
                  fontSize: 'clamp(2.8rem, 5vw, 5.5rem)',
                  lineHeight: '1',
                  letterSpacing: '-0.03em',
                }}
              >
                <StatNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-body font-light text-muted text-[12px] leading-snug mt-3 max-w-[160px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
