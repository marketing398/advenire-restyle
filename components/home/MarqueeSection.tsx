'use client'

import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const row1 = [
  { text: 'Consulenza', accent: false },
  { text: '\u00B7', accent: true },
  { text: 'Investimento Immobiliare', accent: false },
  { text: '\u00B7', accent: true },
  { text: 'Bioedilizia', accent: false },
  { text: '\u00B7', accent: true },
  { text: 'Costruzioni Consapevoli', accent: false },
  { text: '\u00B7', accent: true },
  { text: 'Tecnologia Edile', accent: false },
  { text: '\u00B7', accent: true },
  { text: 'Patrimonio', accent: false },
  { text: '\u00B7', accent: true },
]

const row2 = [
  { text: 'Visione Strategica', accent: false },
  { text: '\u00B7', accent: true },
  { text: 'Business Plan', accent: false },
  { text: '\u00B7', accent: true },
  { text: 'Fiscalit\u00E0 Ottimizzata', accent: false },
  { text: '\u00B7', accent: true },
  { text: 'Sostenibilit\u00E0', accent: false },
  { text: '\u00B7', accent: true },
  { text: 'Residenziale', accent: false },
  { text: '\u00B7', accent: true },
  { text: 'Progetto su Misura', accent: false },
  { text: '\u00B7', accent: true },
]

function MarqueeItem({ text, accent }: { text: string; accent: boolean }) {
  return (
    <span
      className={accent ? 'marquee-accent' : 'marquee-content'}
      style={{
        display: 'inline-block',
        padding: accent ? '0 1.8rem' : '0',
        fontFamily: accent
          ? 'var(--font-label-var, monospace)'
          : 'var(--font-heading-var, Georgia, serif)',
        fontSize: accent ? '1rem' : '2rem',
        fontWeight: 300,
        letterSpacing: accent ? '0.05em' : '-0.02em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        color: accent ? 'rgba(253,167,126,0.5)' : 'rgba(246,239,229,0.25)',
      }}
    >
      {text}
    </span>
  )
}

function MarqueeRow({
  items,
  direction,
  duration,
  paused,
  isVisible,
}: {
  items: typeof row1
  direction: 1 | -1
  duration: number
  paused: boolean
  isVisible: boolean
}) {
  const doubled = [...items, ...items]

  return (
    <div style={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div
        className="animate-gpu"
        style={{
          display: 'flex',
          alignItems: 'center',
          animation: `marquee-${direction === 1 ? 'right' : 'left'} ${duration}s linear infinite`,
          animationPlayState: paused || !isVisible ? 'paused' : 'running',
        }}
      >
        {doubled.map((item, i) => (
          <MarqueeItem key={i} text={item.text} accent={item.accent} />
        ))}
      </div>
    </div>
  )
}

export default function MarqueeSection() {
  const shouldReduce = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @keyframes marquee-right {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-left {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
      `}</style>
      <section
        ref={sectionRef}
        className="bg-primary"
        style={{ overflow: 'hidden', borderTop: '1px solid rgba(246,239,229,0.08)' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={{ paddingTop: '3.5rem', paddingBottom: '1.5rem' }}>
          <MarqueeRow
            items={row1}
            direction={1}
            duration={shouldReduce ? 0 : 28}
            paused={paused}
            isVisible={isVisible}
          />
        </div>

        <div style={{ position: 'relative', height: '1px', background: 'rgba(246,239,229,0.08)', margin: '0 2rem' }}>
          <div
            className="animate-gpu"
            style={{
              position: 'absolute',
              top: '-3px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#FDA77E',
              animation: 'marquee-right 6s linear infinite',
              animationPlayState: paused || !isVisible ? 'paused' : 'running',
            }}
          />
        </div>

        <div style={{ paddingTop: '1.5rem', paddingBottom: '3.5rem' }}>
          <MarqueeRow
            items={row2}
            direction={-1}
            duration={shouldReduce ? 0 : 22}
            paused={paused}
            isVisible={isVisible}
          />
        </div>
      </section>
    </>
  )
}
