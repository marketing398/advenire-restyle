import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pagina non trovata',
  description: 'La pagina che cerchi non è disponibile.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main
      className="bg-primary"
      data-section-tone="dark"
      style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full flex-1 flex flex-col justify-center py-24">
        <span className="font-label text-[12px] uppercase tracking-[0.22em] text-background/65 block mb-8">
          Errore 404
        </span>

        <div
          className="bg-accent mb-10"
          style={{ height: '1.5px', width: '4rem' }}
        />

        <h1
          className="font-heading font-light italic text-background max-w-3xl mb-8"
          style={{ fontSize: 'clamp(2.4rem, 5.4vw, 5rem)', lineHeight: 1.04, letterSpacing: '-0.025em' }}
        >
          La pagina che cerchi <span className="text-accent">non esiste.</span>
        </h1>

        <p className="font-body font-light text-background/75 max-w-xl text-[14px] md:text-[15px] leading-relaxed mb-12">
          Forse il link che hai seguito è obsoleto, o la pagina è stata spostata. Torna alla home oppure scrivici se hai bisogno di aiuto.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 font-label text-[11px] uppercase tracking-[0.15em] bg-accent text-primary rounded-full px-6 py-3 hover:bg-accent/85 transition-colors duration-300"
          >
            Torna alla home <span aria-hidden="true">&rarr;</span>
          </Link>
          <a
            href="mailto:info@advenire.it"
            className="inline-flex items-center justify-center gap-1.5 font-label text-[11px] uppercase tracking-[0.15em] border border-background/35 text-background rounded-full px-6 py-3 hover:border-background hover:bg-background/5 transition-colors duration-300"
          >
            Scrivici <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  )
}
