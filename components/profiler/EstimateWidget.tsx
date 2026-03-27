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
  isLocked?: boolean
  onUnlock?: (email: string) => void
}

export default function EstimateWidget({
  estimate,
  compact = false,
  isLocked = false,
  onUnlock,
}: Props) {
  const [emailInput, setEmailInput] = useState('')
  const [emailError, setEmailError] = useState('')

  const animMin = useAnimatedNumber(estimate?.min ?? 0)
  const animMax = useAnimatedNumber(estimate?.max ?? 0)
  const animPerSqmMin = useAnimatedNumber(estimate?.perSqmMin ?? 0)
  const animPerSqmMax = useAnimatedNumber(estimate?.perSqmMax ?? 0)

  const borderStyle = {
    border: '1px solid rgba(253,167,126,0.25)',
    borderRadius: '2px',
    background: 'rgba(253,167,126,0.04)',
  }

  const handleUnlock = () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.trim())
    if (!valid) { setEmailError('Inserisci un\'email valida'); return }
    setEmailError('')
    onUnlock?.(emailInput.trim())
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
      style={{ ...borderStyle, padding: compact ? '1.25rem' : '1.75rem', position: 'relative', overflow: 'hidden' }}
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
        STIMA INDICATIVA PRELIMINARE
      </p>

      {/* Numbers — blurred when locked */}
      <motion.div
        animate={{ filter: isLocked ? 'blur(7px)' : 'blur(0px)', opacity: isLocked ? 0.45 : 1 }}
        transition={{ duration: 0.4 }}
        style={{ userSelect: isLocked ? 'none' : 'auto' }}
      >
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
      </motion.div>

      {/* Lock overlay */}
      <AnimatePresence>
        {isLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.25rem',
              backdropFilter: 'blur(2px)',
              background: 'rgba(5,56,13,0.55)',
              gap: '0.75rem',
            }}
          >
            <span style={{ fontSize: '1.25rem' }} aria-hidden="true">🔒</span>
            <p className="font-body text-background/80 text-center" style={{ fontSize: '12px', lineHeight: 1.5, maxWidth: '200px' }}>
              Inserisci la tua email per sbloccare la stima
            </p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <input
                type="email"
                value={emailInput}
                onChange={e => { setEmailInput(e.target.value); setEmailError('') }}
                onKeyDown={e => e.key === 'Enter' && handleUnlock()}
                placeholder="la@tua.email"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.06)',
                  border: `1px solid ${emailError ? 'rgba(253,100,100,0.6)' : 'rgba(245,240,232,0.25)'}`,
                  color: '#F5F0E8',
                  padding: '0.5rem 0.75rem',
                  fontSize: '12px',
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
                className="placeholder:text-background/30"
              />
              {emailError && (
                <p style={{ color: 'rgba(253,100,100,0.9)', fontSize: '10px' }}>{emailError}</p>
              )}
              <button
                onClick={handleUnlock}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  background: 'var(--color-accent)',
                  color: 'var(--color-primary)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-label-var, monospace)',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Sblocca →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Disclaimer — sempre visibile */}
      {!isLocked && (
        <div style={{
          borderTop: '1px solid rgba(245,240,232,0.08)',
          paddingTop: '0.75rem',
        }}>
          <p className="font-body text-background/40" style={{ fontSize: '10px', lineHeight: 1.55 }}>
            <strong style={{ color: 'rgba(253,167,126,0.6)', fontWeight: 500 }}>Stima di massima</strong> — i valori sono calcolati su parametri medi di mercato. La stima reale richiede una consulenza approfondita per definire specifiche tecniche, fornitori e condizioni locali. Non costituisce offerta contrattuale.
          </p>
        </div>
      )}
    </motion.div>
  )
}
