'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Advenire] Errore non gestito:', error)
  }, [error])

  return (
    <main
      className="bg-primary"
      data-section-tone="dark"
      style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full flex-1 flex flex-col justify-center py-24">
        <span className="font-label text-[12px] uppercase tracking-[0.22em] text-background/65 block mb-8">
          Errore imprevisto
        </span>

        <div className="bg-accent mb-10" style={{ height: '1.5px', width: '4rem' }} />

        <h1
          className="font-heading font-light italic text-background max-w-3xl mb-8"
          style={{ fontSize: 'clamp(2.4rem, 5.4vw, 5rem)', lineHeight: 1.04, letterSpacing: '-0.025em' }}
        >
          Qualcosa <span className="text-accent">non ha funzionato.</span>
        </h1>

        <p className="font-body font-light text-background/75 max-w-xl text-[14px] md:text-[15px] leading-relaxed mb-12">
          Si è verificato un errore imprevisto. Riprova oppure torna alla home. Se il problema persiste, scrivici e lo risolveremo subito.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-1.5 font-label text-[11px] uppercase tracking-[0.15em] bg-accent text-primary rounded-full px-6 py-3 hover:bg-accent/85 transition-colors duration-300"
            style={{ cursor: 'pointer' }}
          >
            Riprova <span aria-hidden="true">&rarr;</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 font-label text-[11px] uppercase tracking-[0.15em] border border-background/35 text-background rounded-full px-6 py-3 hover:border-background hover:bg-background/5 transition-colors duration-300"
          >
            Torna alla home <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {error.digest && (
          <p className="font-label text-[10px] tracking-[0.18em] uppercase text-background/40 mt-12">
            Riferimento errore: {error.digest}
          </p>
        )}
      </div>
    </main>
  )
}
