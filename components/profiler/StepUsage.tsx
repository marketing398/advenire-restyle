'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { UsageType } from './types'

interface Props {
  value: UsageType | null
  onChange: (v: UsageType) => void
  onNext: () => void
}

const OPTIONS: { value: UsageType; icon: string; label: string; sub: string }[] = [
  { value: 'residenziale',  icon: '🏠', label: 'Residenziale privato',     sub: 'Prima casa o abitazione familiare' },
  { value: 'commerciale',   icon: '🏦', label: 'Commerciale / Uffici',     sub: 'Attività produttiva o direzionale' },
  { value: 'ricettivo',     icon: '🏨', label: 'Ricettivo / Hospitality',  sub: 'Hotel, B&B, strutture turistiche' },
  { value: 'industriale',   icon: '🏭', label: 'Industriale / Logistica',  sub: 'Capannoni, magazzini, produzione' },
  { value: 'agricolo',      icon: '🌾', label: 'Agricolo / Rurale',        sub: 'Strutture connesse ad attività agricole' },
  { value: 'istituzionale', icon: '🏫', label: 'Istituzionale / Pubblico', sub: 'Scuole, cliniche, enti' },
]

export default function StepUsage({ value, onChange, onNext }: Props) {
  const [pending, setPending] = useState<UsageType | null>(null)

  const handleSelect = (v: UsageType) => {
    if (pending) return
    setPending(v)
    onChange(v)
    setTimeout(() => { setPending(null); onNext() }, 500)
  }

  return (
    <div>
      <motion.p
        className="font-label text-background/40"
        style={{ fontSize: '10px', letterSpacing: '0.25em', marginBottom: '1.25rem' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        02 / 05
      </motion.p>

      <motion.h2
        className="font-heading font-light text-background"
        style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '2.5rem' }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Come verrà utilizzato
        <br />l&apos;immobile?
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '0.75rem',
      }}>
        {OPTIONS.map((opt, i) => {
          const isSelected = value === opt.value
          return (
            <motion.button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              style={{
                textAlign: 'left',
                padding: '1.25rem 1.25rem',
                background: isSelected ? 'rgba(253,167,126,0.1)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isSelected ? 'rgba(253,167,126,0.65)' : 'rgba(245,240,232,0.12)'}`,
                cursor: 'pointer',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            >
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.6rem' }} aria-hidden="true">
                {opt.icon}
              </span>
              <span className="font-heading text-background" style={{ fontSize: '1rem', fontWeight: 400, display: 'block', marginBottom: '0.25rem' }}>
                {opt.label}
              </span>
              <span className="font-body text-background/45" style={{ fontSize: '11px', lineHeight: 1.4, display: 'block' }}>
                {opt.sub}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
