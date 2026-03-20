'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/home/Hero'
import QuoteSection from '@/components/home/QuoteSection'
import ConsulenzaDifferenteSection from '@/components/home/ConsulenzaDifferenteSection'
import ServiziSection from '@/components/home/ServiziSection'
import ValoriSection from '@/components/home/ValoriSection'
import ConsulenzaSection from '@/components/home/ConsulenzaSection'
import ProspettiveSection from '@/components/home/ProspettiveSection'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'
import ProfilerTrigger from '@/components/profiler/ProfilerTrigger'

function SectionDivider() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height: '1px',
        background: 'rgba(13, 26, 15, 0.1)',
        transformOrigin: 'left',
      }}
    />
  )
}

export default function HomePage() {
  return (
    <main>
      <ScrollProgressBar />
      <Hero />
      <SectionDivider />
      <QuoteSection />
      <div
        aria-hidden="true"
        style={{ height: '80px', background: 'linear-gradient(to bottom, var(--color-primary), var(--color-accent))' }}
      />
      <SectionDivider />
      <ConsulenzaDifferenteSection />
      <SectionDivider />
      <ServiziSection />
      <SectionDivider />
      <ValoriSection />
      <SectionDivider />
      <ConsulenzaSection />
      <SectionDivider />
      <ProspettiveSection />
      <SectionDivider />
      <ProfilerTrigger />
    </main>
  )
}
