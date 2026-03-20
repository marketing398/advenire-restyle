'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { EstimateResult } from './types'
import { formatCurrency } from './types'

function useAnimatedNumber(target: number, duration = 800) {
  const [value, setValue] = useState(target)
  const startRef = useRef(target)
  const frameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const startValue = startRef.current
    const diff = target - startValue
    if (diff === 0) return

    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(startValue + diff * eased))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        startRef.current = target
      }
    }

    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(tick)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [target, duration])

  return value
}

interface Props {
  estimate: EstimateResult | null
  compact?: boolean
}

export default function EstimateWidget({ estimate, compact = false }: Props) {
  const animMin = useAnimatedNumber(estimate?.min ?? 0)
  const animMax = useAnimatedNumber(estimate?.max ?? 0)
  const animPerSqmMin = useAnimatedNumber(estimate?.perSqmMin ?? 0)
  const animPerSqmMax = useAnimatedNumber(estimate?.perSqmMax ?? 0)

  const borderStyle = {
    border: '1px solid rgba(253,167,126,0.25)',
    borderRadius: '2px',
    background: 'rgba(253,167,126,0.04)',
  }

  if (!estimate) {
    return (
      <div style={{ ...borderStyle, padding: compact ? '1.25rem' : '1.5rem', opacity: 0.4 }}>
        <p className="font-label text-background/40" style={{ fontSize: '9px', letterSpacing: '0.2em' }}>
          STIMA PRELIMINARE
        </p>
        <p className="font-body text-background/30" style={{ fontSize: '12px', marginTop: '0.75rem' }}>
          Compila i campi per vedere la stima in tempo reale.
        </p>
      </div>
    )
  }

  return (
    <motion.div
      style={{ ...borderStyle, padding: compact ? '1.25rem' : '1.75rem' }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="font-label" style={{
        fontSize: '9px',
        letterSpacing: '0.25em',
        color: 'var(--color-accent)',
        marginBottom: '1rem',
      }}>
        LA TUA STIMA PRELIMINARE
      </p>

      {/* Total range */}
      <AnimatePresence mode="wait">
        <div style={{ marginBottom: '1rem' }}>
          <p className="font-heading text-background" style={{
            fontSize: compact ? '1.6rem' : '2rem',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            {formatCurrency(animMin)} – {formatCurrency(animMax)}
          </p>
          <p className="font-body text-background/50" style={{ fontSize: '11px', marginTop: '0.25rem' }}>
            totale stimato
          </p>
        </div>
      </AnimatePresence>

      {/* Per sqm */}
      <div style={{
        padding: '0.75rem 0',
        borderTop: '1px solid rgba(245,240,232,0.1)',
        borderBottom: '1px solid rgba(245,240,232,0.1)',
        marginBottom: '1rem',
      }}>
        <p className="font-label text-background/40" style={{ fontSize: '9px', letterSpacing: '0.15em', marginBottom: '0.25rem' }}>
          COSTO PER MQ
        </p>
        <p className="font-body text-background/70" style={{ fontSize: '13px' }}>
          €{animPerSqmMin.toLocaleString('it-IT')} – €{animPerSqmMax.toLocaleString('it-IT')} / mq
        </p>
      </div>

      {/* Disclaimer */}
      <p className="font-body text-background/35" style={{ fontSize: '10px', lineHeight: 1.5 }}>
        ⚠ Stima indicativa basata su parametri medi di mercato. La stima è puramente indicativa e non costituisce offerta contrattuale.
      </p>
    </motion.div>
  )
}
