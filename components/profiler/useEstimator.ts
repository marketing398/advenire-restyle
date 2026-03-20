import { useMemo } from 'react'
import type { ProfilerData, EstimateResult } from './types'

const BASE_COST: Record<string, { min: number; max: number }> = {
  nuova_costruzione: { min: 1200, max: 2000 },
  ristrutturazione:  { min: 600,  max: 1400 },
  ampliamento:       { min: 900,  max: 1600 },
  riqualificazione:  { min: 300,  max: 700  },
  restauro:          { min: 1500, max: 3000 },
  non_so:            { min: 800,  max: 1800 },
}

const USE_MULTIPLIER: Record<string, number> = {
  residenziale:  1.0,
  commerciale:   1.2,
  ricettivo:     1.4,
  industriale:   0.8,
  agricolo:      0.7,
  istituzionale: 1.3,
}

const FINISH_MULTIPLIER: Record<string, number> = {
  standard:   1.0,
  premium:    1.35,
  excellence: 1.75,
}

const ZONE_MULTIPLIER: Record<string, number> = {
  centro_urbano: 1.2,
  periferia:     1.0,
  extraurbana:   0.9,
  montana:       1.1,
}

const EXTRAS_FLAT: Record<string, number> = {
  domotica:       15000,
  fotovoltaico:   12000,
  certificazione:  5000,
  antisismica:     8000,
  accessibilita:   6000,
  piscina:        40000,
  garage:         25000,
}

export function useEstimator(data: ProfilerData): EstimateResult | null {
  return useMemo(() => {
    if (!data.projectType || !data.usage || data.surface < 10) return null

    const base = BASE_COST[data.projectType]
    const useM = USE_MULTIPLIER[data.usage] ?? 1.0
    const finishM = FINISH_MULTIPLIER[data.qualityLevel]
    const zoneM = data.zone ? (ZONE_MULTIPLIER[data.zone] ?? 1.0) : 1.0
    const floorFactor = 1 + (data.floors - 1) * 0.08

    const perSqmMin = base.min * useM * finishM * zoneM
    const perSqmMax = base.max * useM * finishM * zoneM

    let totalMin = perSqmMin * data.surface * floorFactor
    let totalMax = perSqmMax * data.surface * floorFactor

    for (const extra of data.extras) {
      const flat = EXTRAS_FLAT[extra]
      if (flat) { totalMin += flat; totalMax += flat }
    }

    if (data.extras.includes('ecosostenibile')) {
      totalMin *= 1.05
      totalMax *= 1.05
    }

    return {
      min: Math.round(totalMin),
      max: Math.round(totalMax),
      perSqmMin: Math.round(perSqmMin),
      perSqmMax: Math.round(perSqmMax),
    }
  }, [data])
}
