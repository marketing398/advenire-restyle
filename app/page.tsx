'use client'

import dynamic from 'next/dynamic'
import Hero from '@/components/home/Hero'

const ServiziSection = dynamic(() => import('@/components/home/ServiziSection'), { ssr: true })
const QuoteSection = dynamic(() => import('@/components/home/QuoteSection'), { ssr: true })
const ConsulenzaDifferenteSection = dynamic(
  () => import('@/components/home/ConsulenzaDifferenteSection'),
  { ssr: true },
)
const FAQSection = dynamic(() => import('@/components/home/FAQSection'), { ssr: true })

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServiziSection />
      <QuoteSection />
      <ConsulenzaDifferenteSection />
      <FAQSection />
    </main>
  )
}
