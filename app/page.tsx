'use client'

import Hero from '@/components/home/Hero'
import MarqueeSection from '@/components/home/MarqueeSection'
import QuoteSection from '@/components/home/QuoteSection'
import ConsulenzaDifferenteSection from '@/components/home/ConsulenzaDifferenteSection'
import ServiziSection from '@/components/home/ServiziSection'
import ConsulenzaSection from '@/components/home/ConsulenzaSection'
import CTAFinale from '@/components/home/CTAFinale'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'

export default function HomePage() {
  return (
    <main>
      <ScrollProgressBar />
      <Hero />
      <MarqueeSection />
      <QuoteSection />
      <ConsulenzaDifferenteSection />
      <ServiziSection />
      <ConsulenzaSection />
      <CTAFinale />
    </main>
  )
}
