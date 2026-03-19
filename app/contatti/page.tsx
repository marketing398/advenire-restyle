import type { Metadata } from 'next'
import SediSection from '@/components/contatti/SediSection'
import ContattiForm from '@/components/contatti/ContattiForm'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Il tuo partner patrimoniale da costa a costa. Sedi a Los Angeles e New York.',
}

export default function ContattiPage() {
  return (
    <main>
      <SediSection />
      <ContattiForm />
    </main>
  )
}
