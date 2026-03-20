export type ProjectType =
  | 'nuova_costruzione'
  | 'ristrutturazione'
  | 'ampliamento'
  | 'riqualificazione'
  | 'restauro'
  | 'non_so'

export type UsageType =
  | 'residenziale'
  | 'commerciale'
  | 'ricettivo'
  | 'industriale'
  | 'agricolo'
  | 'istituzionale'

export type QualityLevel = 'standard' | 'premium' | 'excellence'

export type ZoneType = 'centro_urbano' | 'periferia' | 'extraurbana' | 'montana'

export type ExtraType =
  | 'domotica'
  | 'fotovoltaico'
  | 'certificazione'
  | 'antisismica'
  | 'ecosostenibile'
  | 'accessibilita'
  | 'piscina'
  | 'garage'

export interface ContactData {
  name: string
  email: string
  phone: string
  company: string
  source: string
  privacyAccepted: boolean
  newsletter: boolean
}

export interface ProfilerData {
  projectType: ProjectType | null
  usage: UsageType | null
  surface: number
  floors: number
  region: string
  zone: ZoneType | null
  qualityLevel: QualityLevel
  extras: ExtraType[]
  budgetRange: string | null
  timeline: string | null
  notes: string
  contact: ContactData
}

export interface EstimateResult {
  min: number
  max: number
  perSqmMin: number
  perSqmMax: number
}

export function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `€${Math.round(n / 1_000)}k`
  return `€${n}`
}
