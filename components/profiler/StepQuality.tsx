'use client'

import { motion } from 'framer-motion'
import type { QualityLevel, ExtraType, ProfilerData } from './types'

const LEVELS: { value: QualityLevel; label: string; desc: string; detail: string }[] = [
  {
    value: 'standard',
    label: 'Standard',
    desc: 'Finiture commerciali di qualità',
    detail: 'Materiali standard, impianti a norma, soluzioni collaudate. Ideale per investimento e locazione.',
  },
  {
    value: 'premium',
    label: 'Premium',
    desc: 'Alta qualità con cura ai dettagli',
    detail: 'Materiali selezionati, progettazione curata, impianti di fascia alta. Per abitazioni e uffici di rappresentanza.',
  },
  {
    value: 'excellence',
    label: 'Excellence',
    desc: 'Lusso, unicità, soluzioni su misura',
    detail: 'Materiali esclusivi, progettazione d\'autore, tecnologie avanzate. Per proprietà di pregio o destinazioni di lusso.',
  },
]

const EXTRAS: { value: ExtraType; label: string; icon: string }[] = [
  { value: 'domotica',       label: 'Domotica / Smart Home',              icon: '🏠' },
  { value: 'fotovoltaico',   label: 'Impianto fotovoltaico',              icon: '☀️' },
  { value: 'certificazione', label: 'Certificazione energetica A/A+',     icon: '🌱' },
  { value: 'antisismica',    label: 'Progettazione antisismica avanzata', icon: '🔩' },
  { value: 'ecosostenibile', label: 'Materiali ecosostenibili certificati',icon: '♻️' },
  { value: 'accessibilita',  label: 'Accessibilità / Abbattimento barriere', icon: '♿' },
  { value: 'piscina',        label: 'Piscina / Spazi esterni attrezzati', icon: '🏊' },
  { value: 'garage',         label: 'Garage / Autorimessa interrata',     icon: '🚗' },
]

interface Props {
  data: ProfilerData
  onUpdate: <K extends keyof ProfilerData>(key: K, value: ProfilerData[K]) => void
  onToggleExtra: (extra: ExtraType) => void
}

export default function StepQuality({ data, onUpdate, onToggleExtra }: Props) {
  const selectedLevel = LEVELS.find(l => l.value === data.qualityLevel)

  return (
    <div>
      <motion.p
        className="font-label text-background/40"
        style={{ fontSize: '10px', letterSpacing: '0.25em', marginBottom: '1.25rem' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        04 / 05
      </motion.p>

      <motion.h2
        className="font-heading font-light text-background"
        style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '2.5rem' }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Che standard qualitativo
        <br />stai cercando?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Level toggle */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          border: '1px solid rgba(245,240,232,0.12)',
          marginBottom: '1rem',
        }}>
          {LEVELS.map((level, i) => (
            <button
              key={level.value}
              onClick={() => onUpdate('qualityLevel', level.value)}
              style={{
                padding: '1.25rem 1rem',
                textAlign: 'center',
                cursor: 'pointer',
                border: 'none',
                borderLeft: i > 0 ? '1px solid rgba(245,240,232,0.12)' : 'none',
                background: data.qualityLevel === level.value
                  ? 'rgba(253,167,126,0.1)'
                  : 'rgba(255,255,255,0.02)',
                transition: 'background 0.2s',
              }}
            >
              <span
                className="font-heading text-background"
                style={{
                  fontSize: '1rem',
                  fontWeight: 400,
                  display: 'block',
                  color: data.qualityLevel === level.value ? 'var(--color-accent)' : 'rgba(245,240,232,0.8)',
                  transition: 'color 0.2s',
                }}
              >
                {level.label}
              </span>
              <span className="font-body text-background/40" style={{ fontSize: '10px', display: 'block', marginTop: '0.25rem' }}>
                {level.desc}
              </span>
            </button>
          ))}
        </div>

        {/* Level description */}
        <motion.p
          key={data.qualityLevel}
          className="font-body text-background/55"
          style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '2rem', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {selectedLevel?.detail}
        </motion.p>

        {/* Extras */}
        <div>
          <label className="font-label text-background/40" style={{ fontSize: '10px', letterSpacing: '0.2em', display: 'block', marginBottom: '1rem' }}>
            REQUISITI AGGIUNTIVI
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '0.5rem',
          }}>
            {EXTRAS.map(extra => {
              const isChecked = data.extras.includes(extra.value)
              return (
                <label
                  key={extra.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    border: `1px solid ${isChecked ? 'rgba(253,167,126,0.4)' : 'rgba(245,240,232,0.1)'}`,
                    background: isChecked ? 'rgba(253,167,126,0.06)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleExtra(extra.value)}
                    style={{ accentColor: 'var(--color-accent)', flexShrink: 0 }}
                  />
                  <span aria-hidden="true" style={{ fontSize: '1rem', flexShrink: 0 }}>{extra.icon}</span>
                  <span className="font-body text-background/70" style={{ fontSize: '12px', lineHeight: 1.3 }}>
                    {extra.label}
                  </span>
                </label>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
