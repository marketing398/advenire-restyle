'use client'

import { useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfiler } from './useProfiler'
import { useEstimator } from './useEstimator'
import EstimateWidget from './EstimateWidget'
import StepIntro from './StepIntro'
import StepProjectType from './StepProjectType'
import StepUsage from './StepUsage'
import StepDetails from './StepDetails'
import StepQuality from './StepQuality'
import StepBudget from './StepBudget'
import StepContact from './StepContact'

const TOTAL_STEPS = 7

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
}

export default function ProfilerInline() {
  const {
    currentStep, direction, data,
    isSubmitting,
    nextStep, prevStep, reset,
    updateData, updateContact, toggleExtra,
    setIsSubmitting, setIsSubmitted,
  } = useProfiler()

  const estimate = useEstimator(data)

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
        window.location.href = '/grazie'
      }
    } catch (err) {
      console.error('Submit error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }, [data, estimate, reset, setIsSubmitting, setIsSubmitted])

  const isEstimateLocked = !data.contact.email
  const handleUnlockEstimate = (email: string) => updateContact('email', email)
  const showSidebar = currentStep >= 3 && currentStep <= 5
  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100

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
      case 3: return <StepDetails data={data} onUpdate={updateData} />
      case 4: return <StepQuality data={data} onUpdate={updateData} onToggleExtra={toggleExtra} />
      case 5: return <StepBudget data={data} onUpdate={updateData} />
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
    <section className="bg-primary py-16 lg:py-24">
      <div
        style={{
          maxWidth: showSidebar ? '1100px' : '800px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* Progress bar */}
        <div className="h-px bg-background/10 mb-12 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Content grid */}
        <div
          style={{
            display: showSidebar ? 'grid' : 'block',
            gridTemplateColumns: showSidebar ? '1fr 300px' : undefined,
            gap: showSidebar ? '4rem' : undefined,
            alignItems: 'start',
          }}
        >
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

          {/* Sidebar stima (steps 3-5) */}
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

        {/* Navigation */}
        {currentStep > 0 && currentStep < 6 && (
          <div
            className="border-t border-background/10 mt-12 pt-6 flex justify-between items-center"
          >
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
                borderRadius: '999px',
                cursor: 'pointer',
                fontFamily: 'var(--font-label-var, monospace)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
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

        {currentStep === 6 && (
          <div className="border-t border-background/10 mt-12 pt-6">
            <button
              onClick={prevStep}
              className="font-label text-background/40 hover:text-background/60 transition-colors duration-200"
              style={{ fontSize: '11px', letterSpacing: '0.12em', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <span aria-hidden="true">←</span> Indietro
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
