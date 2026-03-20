import { useState, useCallback, useEffect } from 'react'
import type { ProfilerData, ExtraType } from './types'

const STORAGE_KEY = 'advenire_profiler_v1'
export const TOTAL_STEPS = 7

const initialData: ProfilerData = {
  projectType: null,
  usage: null,
  surface: 200,
  floors: 1,
  region: '',
  zone: null,
  qualityLevel: 'premium',
  extras: [],
  budgetRange: null,
  timeline: null,
  notes: '',
  contact: {
    name: '',
    email: '',
    phone: '',
    company: '',
    source: '',
    privacyAccepted: false,
    newsletter: false,
  },
}

export function useProfiler() {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(1) // 1=forward, -1=backward
  const [data, setData] = useState<ProfilerData>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.data) setData({ ...initialData, ...parsed.data })
        if (typeof parsed.step === 'number' && parsed.step > 0 && parsed.step < TOTAL_STEPS) {
          setCurrentStep(parsed.step)
        }
      }
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step: currentStep }))
    } catch { /* ignore */ }
  }, [data, currentStep])

  const nextStep = useCallback(() => {
    setDirection(1)
    setCurrentStep(s => Math.min(s + 1, TOTAL_STEPS - 1))
  }, [])

  const prevStep = useCallback(() => {
    setDirection(-1)
    setCurrentStep(s => Math.max(s - 1, 0))
  }, [])

  const reset = useCallback(() => {
    setCurrentStep(0)
    setDirection(1)
    setData(initialData)
    setIsSubmitted(false)
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
  }, [])

  const updateData = useCallback(<K extends keyof ProfilerData>(
    key: K,
    value: ProfilerData[K]
  ) => {
    setData(prev => ({ ...prev, [key]: value }))
  }, [])

  const updateContact = useCallback(<K extends keyof ProfilerData['contact']>(
    key: K,
    value: ProfilerData['contact'][K]
  ) => {
    setData(prev => ({ ...prev, contact: { ...prev.contact, [key]: value } }))
  }, [])

  const toggleExtra = useCallback((extra: ExtraType) => {
    setData(prev => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter(e => e !== extra)
        : [...prev.extras, extra],
    }))
  }, [])

  return {
    currentStep,
    direction,
    totalSteps: TOTAL_STEPS,
    data,
    isSubmitting,
    isSubmitted,
    nextStep,
    prevStep,
    reset,
    updateData,
    updateContact,
    toggleExtra,
    setIsSubmitting,
    setIsSubmitted,
  }
}
