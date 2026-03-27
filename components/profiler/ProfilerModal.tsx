'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfiler } from './useProfiler'
import { useEstimator } from './useEstimator'
import StepIndicator from './StepIndicator'
import EstimateWidget from './EstimateWidget'
import StepIntro from './StepIntro'
import StepProjectType from './StepProjectType'
import StepUsage from './StepUsage'
import StepDetails from './StepDetails'
import StepQuality from './StepQuality'
import StepBudget from './StepBudget'
import StepContact from './StepContact'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
}

export default function ProfilerModal({ isOpen, onClose }: Props) {
  const {
    currentStep, direction, data,
    isSubmitting, isSubmitted,
    nextStep, prevStep, reset,
    updateData, updateContact, toggleExtra,
    setIsSubmitting, setIsSubmitted,
  } = useProfiler()

  const estimate = useEstimator(data)

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    try {
      const payload = {
        timestamp: new Date().toISOString(),
        project: {
          type: data.projectType,
          usage: data.usage,
          surface_sqm: data.surface,
          floors: data.floors,
          region: data.region,
          zone: data.zone,
          quality_level: data.qualityLevel,
          extras: data.extras,
          budget_range: data.budgetRange,
          timeline: data.timeline,
          notes: data.notes,
        },
        estimate: estimate
          ? { min: estimate.min, max: estimate.max, per_sqm_min: estimate.perSqmMin, per_sqm_max: estimate.perSqmMax }
          : null,
        contact: data.contact,
      }

      const res = await fetch('/api/profiler/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setIsSubmitted(true)
        reset()
        onClose()
        window.location.href = '/grazie'
      }
    } catch (err) {
      console.error('Submit error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }, [data, estimate, reset, onClose, setIsSubmitting, setIsSubmitted])

  const isEstimateLocked = !data.contact.email
  const handleUnlockEstimate = (email: string) => updateContact('email', email)

  // Show estimate sidebar from step 2 onward (have type + usage)
  const showSidebar = currentStep >= 3 && currentStep <= 5

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepIntro onNext={nextStep} />
      case 1: return (
        <StepProjectType
          value={data.projectType}
          onChange={v => updateData('projectType', v)}
          onNext={nextStep}
        />
      )
      case 2: return (
        <StepUsage
          value={data.usage}
          onChange={v => updateData('usage', v)}
          onNext={nextStep}
        />
      )
      case 3: return (
        <StepDetails data={data} onUpdate={updateData} />
      )
      case 4: return (
        <StepQuality data={data} onUpdate={updateData} onToggleExtra={toggleExtra} />
      )
      case 5: return (
        <StepBudget data={data} onUpdate={updateData} />
      )
      case 6: return (
        <StepContact
          data={data}
          estimate={estimate}
          onUpdateContact={updateContact}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onUnlockEstimate={handleUnlockEstimate}
        />
      )
      default: return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Modulo preventivo edilizio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9997,
            backgroundColor: 'var(--color-primary)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Sticky header */}
          <StepIndicator currentStep={currentStep} onClose={handleClose} />

          {/* Main content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{
              flex: 1,
              maxWidth: showSidebar ? '1200px' : '800px',
              margin: '0 auto',
              width: '100%',
              padding: '3rem 1.5rem',
              display: showSidebar ? 'grid' : 'block',
              gridTemplateColumns: showSidebar ? '1fr 340px' : undefined,
              gap: showSidebar ? '4rem' : undefined,
              alignItems: 'start',
            }}>
              {/* Step content */}
              <div>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Sidebar estimate widget (steps 3-5) */}
              {showSidebar && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'sticky', top: '80px' }}
                >
                  <p className="font-label text-background/30" style={{ fontSize: '9px', letterSpacing: '0.2em', marginBottom: '1rem' }}>
                    STIMA IN TEMPO REALE
                  </p>
                  <EstimateWidget
                    estimate={estimate}
                    isLocked={isEstimateLocked}
                    onUnlock={handleUnlockEstimate}
                  />
                </motion.div>
              )}
            </div>
          </div>

          {/* Navigation footer (all steps except 0 and 6) */}
          {currentStep > 0 && currentStep < 6 && (
            <div style={{
              borderTop: '1px solid rgba(245,240,232,0.08)',
              padding: '1rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              maxWidth: '1200px',
              margin: '0 auto',
              width: '100%',
            }}>
              <button
                onClick={prevStep}
                className="font-label text-background/45 hover:text-background/70 transition-colors duration-200"
                style={{ fontSize: '11px', letterSpacing: '0.12em', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <span aria-hidden="true">←</span> Indietro
              </button>

              <button
                onClick={nextStep}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.625rem 1.5rem',
                  background: 'transparent',
                  color: 'var(--color-accent)',
                  border: '1px solid rgba(253,167,126,0.4)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-label-var, monospace)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(253,167,126,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(253,167,126,0.7)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(253,167,126,0.4)'
                }}
              >
                Avanti <span aria-hidden="true">→</span>
              </button>
            </div>
          )}

          {/* Back button for step 6 */}
          {currentStep === 6 && (
            <div style={{
              borderTop: '1px solid rgba(245,240,232,0.08)',
              padding: '1rem 1.5rem',
              maxWidth: '1200px',
              margin: '0 auto',
              width: '100%',
            }}>
              <button
                onClick={prevStep}
                className="font-label text-background/40 hover:text-background/60 transition-colors duration-200"
                style={{ fontSize: '11px', letterSpacing: '0.12em', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <span aria-hidden="true">←</span> Indietro
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
