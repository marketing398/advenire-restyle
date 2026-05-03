import type { Metadata } from 'next'
import HeroChiSiamo from '@/components/chi-siamo/HeroChiSiamo'
import TeamSection from '@/components/chi-siamo/TeamSection'
import ValoriChiSiamo from '@/components/chi-siamo/ValoriChiSiamo'
import CTAChiSiamo from '@/components/chi-siamo/CTAChiSiamo'

export const metadata: Metadata = {
  title: 'Chi siamo',
  description:
    'Tre professionisti, una visione. Esperienze diverse, una direzione comune: rigore, trasparenza e attenzione all’impatto di ciò che realizziamo.',
}

export default function ChiSiamoPage() {
  return (
    <main>
      <HeroChiSiamo />
      <TeamSection />
      <ValoriChiSiamo />
      <CTAChiSiamo />
    </main>
  )
}
