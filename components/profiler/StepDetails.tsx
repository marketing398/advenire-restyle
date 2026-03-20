'use client'

import { motion } from 'framer-motion'
import type { ZoneType, ProfilerData } from './types'

const REGIONS = [
  'Abruzzo','Basilicata','Calabria','Campania','Emilia-Romagna',
  'Friuli-Venezia Giulia','Lazio','Liguria','Lombardia','Marche',
  'Molise','Piemonte','Puglia','Sardegna','Sicilia','Toscana',
  'Trentino-Alto Adige','Umbria',"Valle d'Aosta",'Veneto',
]

const ZONES: { value: ZoneType; label: string }[] = [
  { value: 'centro_urbano', label: 'Centro urbano' },
  { value: 'periferia',     label: 'Periferia / Hinterland' },
  { value: 'extraurbana',   label: 'Zona extraurbana' },
  { value: 'montana',       label: 'Zona montana / isolata' },
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
  transition: 'border-color 0.2s',
  appearance: 'none',
}

interface Props {
  data: ProfilerData
  onUpdate: <K extends keyof ProfilerData>(key: K, value: ProfilerData[K]) => void
}

export default function StepDetails({ data, onUpdate }: Props) {
  const floorOptions = [1, 2, 3, 4]

  return (
    <div>
      <motion.p
        className="font-label text-background/40"
        style={{ fontSize: '10px', letterSpacing: '0.25em', marginBottom: '1.25rem' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        03 / 05
      </motion.p>

      <motion.h2
        className="font-heading font-light text-background"
        style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '2.5rem' }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Parlami del progetto
        <br />nel dettaglio.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
        }}
      >
        {/* LEFT — Superficie */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
              <label className="font-label text-background/50" style={{ fontSize: '10px', letterSpacing: '0.18em' }}>
                SUPERFICIE STIMATA
              </label>
              <span className="font-heading text-background" style={{ fontSize: '1.4rem', letterSpacing: '-0.02em' }}>
                {data.surface.toLocaleString('it-IT')} m²
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={5000}
              step={10}
              value={data.surface}
              onChange={e => onUpdate('surface', Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-accent)', cursor: 'pointer', height: '3px' }}
              aria-label="Superficie in metri quadri"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem' }}>
              <span className="font-label text-background/30" style={{ fontSize: '9px' }}>50 m²</span>
              <span className="font-label text-background/30" style={{ fontSize: '9px' }}>5.000 m²</span>
            </div>

            {/* Manual input */}
            <div style={{ marginTop: '1rem' }}>
              <input
                type="number"
                min={10}
                max={50000}
                value={data.surface}
                onChange={e => onUpdate('surface', Math.max(10, Number(e.target.value)))}
                style={{ ...inputStyle, width: '120px' }}
                aria-label="Superficie in metri quadri (campo numerico)"
                onFocus={e => (e.target.style.borderColor = 'rgba(253,167,126,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(245,240,232,0.2)')}
              />
              <span className="font-body text-background/40" style={{ fontSize: '12px', marginLeft: '0.5rem' }}>mq</span>
            </div>
          </div>

          {/* Piani */}
          <div>
            <label className="font-label text-background/50" style={{ fontSize: '10px', letterSpacing: '0.18em', display: 'block', marginBottom: '0.75rem' }}>
              NUMERO DI PIANI
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {floorOptions.map(f => (
                <button
                  key={f}
                  onClick={() => onUpdate('floors', f)}
                  style={{
                    width: '48px',
                    height: '48px',
                    border: `1px solid ${data.floors === f ? 'rgba(253,167,126,0.65)' : 'rgba(245,240,232,0.15)'}`,
                    background: data.floors === f ? 'rgba(253,167,126,0.1)' : 'rgba(255,255,255,0.03)',
                    color: data.floors === f ? 'var(--color-accent)' : 'rgba(245,240,232,0.6)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-label-var, monospace)',
                    fontSize: '14px',
                    transition: 'all 0.15s',
                  }}
                >
                  {f === 4 ? '4+' : f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Location */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Region */}
          <div>
            <label className="font-label text-background/50" style={{ fontSize: '10px', letterSpacing: '0.18em', display: 'block', marginBottom: '0.75rem' }}>
              REGIONE
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={data.region}
                onChange={e => onUpdate('region', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer', paddingRight: '2.5rem' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(253,167,126,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(245,240,232,0.2)')}
              >
                <option value="" style={{ background: '#05380d' }}>Seleziona regione...</option>
                {REGIONS.map(r => (
                  <option key={r} value={r} style={{ background: '#05380d' }}>{r}</option>
                ))}
              </select>
              <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(245,240,232,0.3)', pointerEvents: 'none', fontSize: '10px' }}>▼</span>
            </div>
          </div>

          {/* Zone */}
          <div>
            <label className="font-label text-background/50" style={{ fontSize: '10px', letterSpacing: '0.18em', display: 'block', marginBottom: '0.75rem' }}>
              ZONA
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {ZONES.map(z => (
                <label
                  key={z.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    border: `1px solid ${data.zone === z.value ? 'rgba(253,167,126,0.3)' : 'transparent'}`,
                    background: data.zone === z.value ? 'rgba(253,167,126,0.05)' : 'transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  <input
                    type="radio"
                    name="zone"
                    value={z.value}
                    checked={data.zone === z.value}
                    onChange={() => onUpdate('zone', z.value as ZoneType)}
                    style={{ accentColor: 'var(--color-accent)' }}
                  />
                  <span className="font-body text-background/70" style={{ fontSize: '13px' }}>{z.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
