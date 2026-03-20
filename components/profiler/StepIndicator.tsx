'use client'

import { motion } from 'framer-motion'
import { TOTAL_STEPS } from './useProfiler'

interface Props {
  currentStep: number
  onClose: () => void
}

export default function StepIndicator({ currentStep, onClose }: Props) {
  const progress = currentStep === 0 ? 0 : (currentStep / (TOTAL_STEPS - 1)) * 100

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backgroundColor: 'var(--color-primary)',
      borderBottom: '1px solid rgba(245,240,232,0.08)',
    }}>
      {/* Progress line */}
      <div style={{ height: '2px', background: 'rgba(245,240,232,0.08)', position: 'relative' }}>
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            background: 'var(--color-accent)',
            transformOrigin: 'left',
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        height: '56px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Logo */}
        <span className="font-label text-background/60" style={{ fontSize: '10px', letterSpacing: '0.2em' }}>
          ADVENIRE
        </span>

        {/* Step counter */}
        {currentStep > 0 && (
          <motion.span
            className="font-label text-background/40"
            style={{ fontSize: '10px', letterSpacing: '0.15em' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {currentStep} / {TOTAL_STEPS - 1}
          </motion.span>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Chiudi"
          className="font-label text-background/50 hover:text-background transition-colors duration-200"
          style={{ fontSize: '11px', letterSpacing: '0.1em', cursor: 'pointer', background: 'none', border: 'none' }}
        >
          ESC
        </button>
      </div>
    </div>
  )
}
