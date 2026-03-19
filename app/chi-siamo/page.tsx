import type { Metadata } from 'next'
import HeroChiSiamo from '@/components/chi-siamo/HeroChiSiamo'
import ValoriChiSiamo from '@/components/chi-siamo/ValoriChiSiamo'
import TeamSection from '@/components/chi-siamo/TeamSection'

export const metadata: Metadata = {
  title: 'Chi siamo',
  description: 'Non ci limitiamo a gestire la ricchezza, ma progettiamo anche eredità.',
}

export default function ChiSiamoPage() {
  return (
    <main>
      <HeroChiSiamo />
      <ValoriChiSiamo />
      <TeamSection />
    </main>
  )
}
