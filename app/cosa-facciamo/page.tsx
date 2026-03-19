import type { Metadata } from 'next'
import HeroCosaFacciamo from '@/components/cosa-facciamo/HeroCosaFacciamo'
import FamilyOfficeSection from '@/components/cosa-facciamo/FamilyOfficeSection'
import ServiziGrid from '@/components/cosa-facciamo/ServiziGrid'
import ProspettiveSection from '@/components/home/ProspettiveSection'

export const metadata: Metadata = {
  title: 'Cosa facciamo',
  description: 'Strategie patrimoniali adattive e personalizzate per famiglie e professionisti.',
}

export default function CosaFacciamoPage() {
  return (
    <main>
      <HeroCosaFacciamo />
      <FamilyOfficeSection />
      <ServiziGrid />
      <ProspettiveSection />
    </main>
  )
}
