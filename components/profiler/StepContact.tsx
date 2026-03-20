'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ProfilerData, EstimateResult } from './types'
import { formatCurrency } from './types'
import EstimateWidget from './EstimateWidget'

const SOURCES = [
  { value: '',           label: 'Come ci hai trovato?' },
  { value: 'google',     label: 'Google' },
  { value: 'passaparola',label: 'Passaparola' },
  { value: 'social',     label: 'Social media' },
  { value: 'evento',     label: 'Evento / Fiera' },
  { value: 'altro',      label: 'Altro' },
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
  estimate: EstimateResult | null
  onUpdateContact: <K extends keyof ProfilerData['contact']>(key: K, value: ProfilerData['contact'][K]) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export default function StepContact({ data, estimate, onUpdateContact, onSubmit, isSubmitting }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!data.contact.name.trim()) e.name = 'Campo obbligatorio'
    if (!data.contact.email.trim()) e.email = 'Campo obbligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact.email)) e.email = 'Email non valida'
    if (!data.contact.privacyAccepted) e.privacy = 'Devi accettare la privacy policy'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (validate()) onSubmit()
  }

  const LABEL_TYPES: Record<string, string> = {
    nuova_costruzione: 'Nuova costruzione',
    ristrutturazione: 'Ristrutturazione',
    ampliamento: 'Ampliamento',
    riqualificazione: 'Riqualificazione energetica',
    restauro: 'Restauro conservativo',
    non_so: 'Da definire',
  }
  const LABEL_USAGE: Record<string, string> = {
    residenziale: 'Residenziale',
    commerciale: 'Commerciale',
    ricettivo: 'Ricettivo',
    industriale: 'Industriale',
    agricolo: 'Agricolo',
    istituzionale: 'Istituzionale',
  }

  return (
    <div>
      <motion.h2
        className="font-heading font-light text-background"
        style={{ fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '2.5rem' }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Dove ti mandiamo
        <br />l&apos;analisi?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        {/* LEFT — Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Name */}
          <div>
            <label className="font-label text-background/45" style={{ fontSize: '10px', letterSpacing: '0.18em', display: 'block', marginBottom: '0.5rem' }}>
              NOME E COGNOME *
            </label>
            <input
              type="text"
              value={data.contact.name}
              onChange={e => onUpdateContact('name', e.target.value)}
              placeholder="Mario Rossi"
              style={inputStyle}
              className="placeholder:text-background/20"
              onFocus={e => (e.target.style.borderColor = 'rgba(253,167,126,0.5)')}
              onBlur={e => (e.target.style.borderColor = errors.name ? 'rgba(253,80,80,0.5)' : 'rgba(245,240,232,0.2)')}
              aria-required="true"
            />
            {errors.name && <p style={{ color: 'rgba(253,100,100,0.9)', fontSize: '11px', marginTop: '0.25rem' }}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="font-label text-background/45" style={{ fontSize: '10px', letterSpacing: '0.18em', display: 'block', marginBottom: '0.5rem' }}>
              EMAIL *
            </label>
            <input
              type="email"
              value={data.contact.email}
              onChange={e => onUpdateContact('email', e.target.value)}
              placeholder="mario@esempio.it"
              style={inputStyle}
              className="placeholder:text-background/20"
              onFocus={e => (e.target.style.borderColor = 'rgba(253,167,126,0.5)')}
              onBlur={e => (e.target.style.borderColor = errors.email ? 'rgba(253,80,80,0.5)' : 'rgba(245,240,232,0.2)')}
              aria-required="true"
            />
            {errors.email && <p style={{ color: 'rgba(253,100,100,0.9)', fontSize: '11px', marginTop: '0.25rem' }}>{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="font-label text-background/45" style={{ fontSize: '10px', letterSpacing: '0.18em', display: 'block', marginBottom: '0.5rem' }}>
              TELEFONO
            </label>
            <input
              type="tel"
              value={data.contact.phone}
              onChange={e => onUpdateContact('phone', e.target.value)}
              placeholder="+39 333 1234567"
              style={inputStyle}
              className="placeholder:text-background/20"
              onFocus={e => (e.target.style.borderColor = 'rgba(253,167,126,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(245,240,232,0.2)')}
            />
          </div>

          {/* Company */}
          <div>
            <label className="font-label text-background/45" style={{ fontSize: '10px', letterSpacing: '0.18em', display: 'block', marginBottom: '0.5rem' }}>
              AZIENDA / STUDIO <span style={{ opacity: 0.5 }}>(opzionale)</span>
            </label>
            <input
              type="text"
              value={data.contact.company}
              onChange={e => onUpdateContact('company', e.target.value)}
              placeholder="Rossi Costruzioni Srl"
              style={inputStyle}
              className="placeholder:text-background/20"
              onFocus={e => (e.target.style.borderColor = 'rgba(253,167,126,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(245,240,232,0.2)')}
            />
          </div>

          {/* Source */}
          <div>
            <div style={{ position: 'relative' }}>
              <select
                value={data.contact.source}
                onChange={e => onUpdateContact('source', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer', paddingRight: '2.5rem' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(253,167,126,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(245,240,232,0.2)')}
              >
                {SOURCES.map(s => (
                  <option key={s.value} value={s.value} style={{ background: '#05380d' }}>{s.label}</option>
                ))}
              </select>
              <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(245,240,232,0.3)', pointerEvents: 'none', fontSize: '10px' }}>▼</span>
            </div>
          </div>

          {/* Privacy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer', alignItems: 'flex-start' }}>
              <input
                type="checkbox"
                checked={data.contact.privacyAccepted}
                onChange={e => onUpdateContact('privacyAccepted', e.target.checked)}
                style={{ accentColor: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }}
              />
              <span className="font-body text-background/55" style={{ fontSize: '12px', lineHeight: 1.5 }}>
                Accetto la <a href="/privacy" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>privacy policy</a> e autorizzo il trattamento dei dati *
              </span>
            </label>
            {errors.privacy && <p style={{ color: 'rgba(253,100,100,0.9)', fontSize: '11px' }}>{errors.privacy}</p>}

            <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer', alignItems: 'flex-start' }}>
              <input
                type="checkbox"
                checked={data.contact.newsletter}
                onChange={e => onUpdateContact('newsletter', e.target.checked)}
                style={{ accentColor: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }}
              />
              <span className="font-body text-background/55" style={{ fontSize: '12px', lineHeight: 1.5 }}>
                Desidero ricevere aggiornamenti su mercato e opportunità edilizie
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: isSubmitting ? 'rgba(253,167,126,0.5)' : 'var(--color-accent)',
              color: 'var(--color-primary)',
              border: 'none',
              cursor: isSubmitting ? 'wait' : 'pointer',
              fontFamily: 'var(--font-label-var, monospace)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginTop: '0.5rem',
              width: '100%',
              transition: 'opacity 0.2s',
            }}
          >
            {isSubmitting ? 'Invio in corso...' : <>Invia e ricevi la tua analisi <span aria-hidden="true">→</span></>}
          </button>

          <p className="font-body text-background/30" style={{ fontSize: '11px', lineHeight: 1.5 }}>
            La stima è puramente indicativa e non costituisce offerta contrattuale. I costi effettivi dipendono da perizie, progettazione e condizioni di mercato locali.
          </p>
        </div>

        {/* RIGHT — Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Project recap */}
          <div style={{
            border: '1px solid rgba(245,240,232,0.12)',
            padding: '1.25rem',
            background: 'rgba(255,255,255,0.02)',
          }}>
            <p className="font-label text-background/40" style={{ fontSize: '9px', letterSpacing: '0.2em', marginBottom: '1rem' }}>
              RIEPILOGO PROGETTO
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                ['Tipologia', data.projectType ? LABEL_TYPES[data.projectType] : '—'],
                ['Destinazione', data.usage ? LABEL_USAGE[data.usage] : '—'],
                ['Superficie', `${data.surface.toLocaleString('it-IT')} mq — ${data.floors} ${data.floors === 1 ? 'piano' : 'piani'}`],
                ['Regione', data.region || '—'],
                ['Standard', data.qualityLevel.charAt(0).toUpperCase() + data.qualityLevel.slice(1)],
                ...(data.extras.length > 0 ? [['Extra', `${data.extras.length} opzioni selezionate`]] : []),
                ...(data.budgetRange ? [['Budget', BUDGETS_LABEL[data.budgetRange] || data.budgetRange]] : []),
              ].map(([key, val]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <span className="font-label text-background/35" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>{key}</span>
                  <span className="font-body text-background/70" style={{ fontSize: '12px', textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Estimate */}
          <EstimateWidget estimate={estimate} compact />
        </div>
      </motion.div>
    </div>
  )
}

const BUDGETS_LABEL: Record<string, string> = {
  sotto_100k:  'Sotto €100k',
  '100k_200k': '€100k – €200k',
  '200k_500k': '€200k – €500k',
  '500k_1M':   '€500k – €1M',
  '1M_3M':     '€1M – €3M',
  oltre_3M:    'Oltre €3M',
  da_definire: 'Da definire',
}
