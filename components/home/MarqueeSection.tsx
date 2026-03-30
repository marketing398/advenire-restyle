'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const row1 = [
  { text: 'Consulenza', accent: false },
  { text: '·', accent: true },
  { text: 'Investimento Immobiliare', accent: false },
  { text: '·', accent: true },
  { text: 'Bioedilizia', accent: false },
  { text: '·', accent: true },
  { text: 'Costruzioni Consapevoli', accent: false },
  { text: '·', accent: true },
  { text: 'Tecnologia Edile', accent: false },
  { text: '·', accent: true },
  { text: 'Patrimonio', accent: false },
  { text: '·', accent: true },
]

const row2 = [
  { text: 'Visione Strategica', accent: false },
  { text: '·', accent: true },
  { text: 'Business Plan', accent: false },
  { text: '·', accent: true },
  { text: 'Fiscalità Ottimizzata', accent: false },
  { text: '·', accent: true },
  { text: 'Sostenibilità', accent: false },
  { text: '·', accent: true },
  { text: 'Residenziale', accent: false },
  { text: '·', accent: true },
  { text: 'Progetto su Misura', accent: false },
  { text: '·', accent: true },
]

function MarqueeItem({ text, accent }: { text: string; accent: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        color: accent
          ? hovered ? '#ffffff' : 'rgba(253,167,126,0.5)'
          : hovered ? '#FDA77E' : 'rgba(246,239,229,0.25)',
        scale: hovered && !accent ? 1.04 : 1,
      }}
      transition={{ duration: 0.25 }}
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
        cursor: accent ? 'default' : 'default',
        whiteSpace: 'nowrap',
        willChange: 'transform',
      }}
    >
      {text}
    </motion.span>
  )
}

function MarqueeRow({
  items,
  direction,
  duration,
  paused,
}: {
  items: typeof row1
  direction: 1 | -1
  duration: number
  paused: boolean
}) {
  const doubled = [...items, ...items]

  return (
    <div style={{ overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <motion.div
        style={{ display: 'flex', alignItems: 'center', willChange: 'transform' }}
        animate={
          paused
            ? false
            : { x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'] }
        }
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        {doubled.map((item, i) => (
          <MarqueeItem key={i} text={item.text} accent={item.accent} />
        ))}
      </motion.div>
    </div>
  )
}

export default function MarqueeSection() {
  const shouldReduce = useReducedMotion()
  const [paused, setPaused] = useState(false)

  return (
    <section
      className="bg-primary grain"
      style={{ overflow: 'hidden', borderTop: '1px solid rgba(246,239,229,0.08)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Riga 1 — verso destra */}
      <div style={{ paddingTop: '3.5rem', paddingBottom: '1.5rem' }}>
        <MarqueeRow
          items={row1}
          direction={1}
          duration={shouldReduce ? 0 : 28}
          paused={paused}
        />
      </div>

      {/* Divisore centrale con punto mobile */}
      <div style={{ position: 'relative', height: '1px', background: 'rgba(246,239,229,0.08)', margin: '0 2rem' }}>
        <motion.div
          style={{
            position: 'absolute',
            top: '-3px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#FDA77E',
          }}
          animate={paused ? {} : { left: ['0%', '100%'] }}
          transition={{ duration: 6, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
        />
      </div>

      {/* Riga 2 — verso sinistra */}
      <div style={{ paddingTop: '1.5rem', paddingBottom: '3.5rem' }}>
        <MarqueeRow
          items={row2}
          direction={-1}
          duration={shouldReduce ? 0 : 22}
          paused={paused}
        />
      </div>
    </section>
  )
}
