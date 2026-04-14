'use client'

import dynamic from 'next/dynamic'
import Hero from '@/components/home/Hero'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'

const ServiziSection = dynamic(() => import('@/components/home/ServiziSection'), { ssr: true })
const QuoteSection = dynamic(() => import('@/components/home/QuoteSection'), { ssr: true })
const ConsulenzaDifferenteSection = dynamic(
  () => import('@/components/home/ConsulenzaDifferenteSection'),
  { ssr: true },
)

export default function HomePage() {
  return (
    <main>
      <ScrollProgressBar />
      <Hero />
      <ServiziSection />
      <QuoteSection />
      <ConsulenzaDifferenteSection />
    </main>
  )
}
