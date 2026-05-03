import type { Metadata } from 'next'
import ContattiHero from '@/components/contatti/ContattiHero'
import ContattiForm from '@/components/contatti/ContattiForm'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Scrivici per fissare un primo confronto sul tuo progetto immobiliare.',
}

export default function ContattiPage() {
  return (
    <main>
      <ContattiHero />
      <ContattiForm />
    </main>
  )
}
