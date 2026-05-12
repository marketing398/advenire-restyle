import Hero from '@/components/home/Hero'
import ServiziSection from '@/components/home/ServiziSection'
import QuoteSection from '@/components/home/QuoteSection'
import ConsulenzaDifferenteSection from '@/components/home/ConsulenzaDifferenteSection'
import FAQSection from '@/components/home/FAQSection'

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
