import Hero from '@/components/home/Hero'
import QuoteSection from '@/components/home/QuoteSection'
import ConsulenzaDifferenteSection from '@/components/home/ConsulenzaDifferenteSection'
import ServiziSection from '@/components/home/ServiziSection'
import ValoriSection from '@/components/home/ValoriSection'
import ConsulenzaSection from '@/components/home/ConsulenzaSection'
import ProspettiveSection from '@/components/home/ProspettiveSection'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <QuoteSection />
      <div
        aria-hidden="true"
        style={{ height: '80px', background: 'linear-gradient(to bottom, var(--color-primary), var(--color-accent))' }}
      />
      <ConsulenzaDifferenteSection />
      <ServiziSection />
      <ValoriSection />
      <ConsulenzaSection />
      <ProspettiveSection />
    </main>
  )
}
