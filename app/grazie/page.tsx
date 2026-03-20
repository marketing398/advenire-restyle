import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Richiesta ricevuta',
  description: 'Abbiamo ricevuto il tuo preventivo. Ti contatteremo entro 24 ore.',
}

export default function GraziePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '560px' }}>
        <p
          className="font-label"
          style={{
            fontSize: '10px',
            letterSpacing: '0.25em',
            color: 'var(--color-accent)',
            marginBottom: '1.5rem',
          }}
        >
          RICHIESTA RICEVUTA
        </p>

        <h1
          className="font-heading font-light text-background"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            marginBottom: '1.5rem',
          }}
        >
          Grazie.
          <br />
          Ci sentiamo presto.
        </h1>

        <p
          className="font-body text-background/55"
          style={{
            fontSize: '15px',
            lineHeight: 1.65,
            marginBottom: '3rem',
          }}
        >
          Il nostro team ha ricevuto il tuo preventivo e ti contatterà entro 24 ore per discutere nel dettaglio il tuo progetto edilizio.
        </p>

        <div
          style={{
            borderTop: '1px solid rgba(245,240,232,0.1)',
            paddingTop: '2rem',
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/"
            className="font-label text-background/50 hover:text-background transition-colors duration-200"
            style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
          >
            ← Torna alla home
          </Link>
          <Link
            href="/cosa-facciamo"
            className="font-label text-background/50 hover:text-background transition-colors duration-200"
            style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
          >
            Cosa facciamo →
          </Link>
        </div>
      </div>
    </main>
  )
}
