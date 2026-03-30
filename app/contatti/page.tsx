import type { Metadata } from 'next'
import ContattiHero from '@/components/contatti/ContattiHero'
import ProfilerInline from '@/components/profiler/ProfilerInline'
import ContattiForm from '@/components/contatti/ContattiForm'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Ottieni una stima personalizzata per il tuo progetto immobiliare o contattaci direttamente.',
}

export default function ContattiPage() {
  return (
    <main>
      <ContattiHero />
      <ProfilerInline />
      <ContattiForm />
    </main>
  )
}
