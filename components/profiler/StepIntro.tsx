'use client'

import { motion } from 'framer-motion'

interface Props {
  onNext: () => void
}

export default function StepIntro({ onNext }: Props) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '70vh',
      maxWidth: '640px',
    }}>
      <motion.p
        className="font-label text-background/40"
        style={{ fontSize: '10px', letterSpacing: '0.25em', marginBottom: '2rem' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        PREVENTIVO EDILIZIO
      </motion.p>

      <motion.h1
        className="font-heading font-light text-background"
        style={{
          fontSize: 'clamp(2.8rem, 6vw, 5rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          marginBottom: '1.5rem',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        Costruiamo insieme
        <br />
        il tuo progetto.
      </motion.h1>

      <motion.p
        className="font-body text-background/55"
        style={{ fontSize: '15px', lineHeight: 1.65, marginBottom: '3rem', maxWidth: '420px' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        Rispondi a 5 domande. Ricevi una stima personalizzata e un contatto dal nostro team entro 24 ore.
      </motion.p>

      <motion.div
        style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
      >
        <button
          onClick={onNext}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.875rem 2rem',
            background: 'var(--color-accent)',
            color: 'var(--color-primary)',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-label-var, monospace)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Inizia <span aria-hidden="true">→</span>
        </button>

        <span className="font-label text-background/30" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>
          ~ 3 minuti
        </span>
      </motion.div>
    </div>
  )
}
