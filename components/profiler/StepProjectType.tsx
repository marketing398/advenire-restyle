'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ProjectType } from './types'

interface Props {
  value: ProjectType | null
  onChange: (v: ProjectType) => void
  onNext: () => void
}

const OPTIONS: { value: ProjectType; icon: string; label: string; sub: string }[] = [
  { value: 'nuova_costruzione', icon: '🏗️', label: 'Nuova costruzione',    sub: 'Edificio residenziale o commerciale da zero' },
  { value: 'ristrutturazione',  icon: '🔨', label: 'Ristrutturazione',     sub: 'Intervento su struttura esistente' },
  { value: 'ampliamento',       icon: '🏢', label: 'Ampliamento',          sub: 'Aggiunta di volumetria o piani' },
  { value: 'riqualificazione',  icon: '🌿', label: 'Riqualificazione energetica', sub: 'Efficienza, cappotto, impianti' },
  { value: 'restauro',          icon: '🏛️', label: 'Restauro conservativo', sub: 'Immobili storici o vincolati' },
  { value: 'non_so',            icon: '📐', label: 'Non so ancora',         sub: 'Aiutami a capire cosa mi serve' },
]

export default function StepProjectType({ value, onChange, onNext }: Props) {
  const [pending, setPending] = useState<ProjectType | null>(null)

  const handleSelect = (v: ProjectType) => {
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
        01 / 05
      </motion.p>

      <motion.h2
        className="font-heading font-light text-background"
        style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '2.5rem' }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Che tipo di progetto
        <br />stai pianificando?
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '0.75rem',
      }}>
        {OPTIONS.map((opt, i) => {
          const isSelected = value === opt.value
          const isPending = pending === opt.value
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
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {isPending && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.45 }}
                  style={{ position: 'absolute', inset: 0, background: 'rgba(253,167,126,0.08)', transformOrigin: 'left' }}
                />
              )}
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
