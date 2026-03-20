'use client'

import { motion } from 'framer-motion'
import type { ProfilerData } from './types'

const BUDGETS = [
  { value: 'sotto_100k',  label: 'Sotto €100k' },
  { value: '100k_200k',   label: '€100k – €200k' },
  { value: '200k_500k',   label: '€200k – €500k' },
  { value: '500k_1M',     label: '€500k – €1M' },
  { value: '1M_3M',       label: '€1M – €3M' },
  { value: 'oltre_3M',    label: 'Oltre €3M' },
  { value: 'da_definire', label: 'Da definire' },
]

const TIMELINES = [
  { value: 'entro_3m',    label: 'Entro 3 mesi' },
  { value: '3_6m',        label: '3 – 6 mesi' },
  { value: '6_12m',       label: '6 – 12 mesi' },
  { value: 'oltre_1a',    label: 'Oltre 1 anno' },
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(245,240,232,0.2)',
  color: '#F5F0E8',
  padding: '0.75rem 1rem',
  fontSize: '14px',
  fontFamily: 'inherit',
  outline: 'none',
  resize: 'vertical',
  minHeight: '80px',
  transition: 'border-color 0.2s',
}

interface Props {
  data: ProfilerData
  onUpdate: <K extends keyof ProfilerData>(key: K, value: ProfilerData[K]) => void
}

export default function StepBudget({ data, onUpdate }: Props) {
  return (
    <div>
      <motion.p
        className="font-label text-background/40"
        style={{ fontSize: '10px', letterSpacing: '0.25em', marginBottom: '1.25rem' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        05 / 05
      </motion.p>

      <motion.h2
        className="font-heading font-light text-background"
        style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '2.5rem' }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Hai già un&apos;idea di budget
        <br />e tempistiche?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
      >
        {/* Budget */}
        <div>
          <label className="font-label text-background/40" style={{ fontSize: '10px', letterSpacing: '0.2em', display: 'block', marginBottom: '1rem' }}>
            FASCIA DI BUDGET
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.5rem' }}>
            {BUDGETS.map(b => (
              <button
                key={b.value}
                onClick={() => onUpdate('budgetRange', b.value)}
                style={{
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: `1px solid ${data.budgetRange === b.value ? 'rgba(253,167,126,0.65)' : 'rgba(245,240,232,0.12)'}`,
                  background: data.budgetRange === b.value ? 'rgba(253,167,126,0.08)' : 'rgba(255,255,255,0.02)',
                  color: data.budgetRange === b.value ? 'var(--color-accent)' : 'rgba(245,240,232,0.7)',
                  fontFamily: 'var(--font-body-var, system-ui)',
                  fontSize: '13px',
                  transition: 'all 0.15s',
                }}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <label className="font-label text-background/40" style={{ fontSize: '10px', letterSpacing: '0.2em', display: 'block', marginBottom: '1rem' }}>
            AVVIO CANTIERE DESIDERATO
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {TIMELINES.map(t => (
              <button
                key={t.value}
                onClick={() => onUpdate('timeline', t.value)}
                style={{
                  padding: '0.625rem 1.25rem',
                  cursor: 'pointer',
                  border: `1px solid ${data.timeline === t.value ? 'rgba(253,167,126,0.65)' : 'rgba(245,240,232,0.12)'}`,
                  background: data.timeline === t.value ? 'rgba(253,167,126,0.08)' : 'rgba(255,255,255,0.02)',
                  color: data.timeline === t.value ? 'var(--color-accent)' : 'rgba(245,240,232,0.7)',
                  fontFamily: 'var(--font-body-var, system-ui)',
                  fontSize: '13px',
                  transition: 'all 0.15s',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="font-label text-background/40" style={{ fontSize: '10px', letterSpacing: '0.2em', display: 'block', marginBottom: '0.75rem' }}>
            NOTE AGGIUNTIVE <span style={{ opacity: 0.5 }}>(opzionale)</span>
          </label>
          <textarea
            value={data.notes}
            onChange={e => onUpdate('notes', e.target.value.slice(0, 300))}
            placeholder="Esigenze specifiche, vincoli particolari, informazioni utili..."
            style={inputStyle}
            className="placeholder:text-background/25"
            onFocus={e => (e.target.style.borderColor = 'rgba(253,167,126,0.5)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(245,240,232,0.2)')}
          />
          <p className="font-label text-background/25" style={{ fontSize: '10px', marginTop: '0.35rem', textAlign: 'right' }}>
            {data.notes.length} / 300
          </p>
        </div>
      </motion.div>
    </div>
  )
}
