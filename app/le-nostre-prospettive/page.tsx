'use client'

import { motion, useReducedMotion } from 'framer-motion'

const articoli = [
  {
    categoria: 'Mercati',
    titolo: "Sette tendenze tecnologiche per l'edilizia",
    data: 'Feb 2025',
    testo: "Come l'intelligenza artificiale e i nuovi materiali stanno trasformando il settore immobiliare residenziale e commerciale negli Stati Uniti.",
  },
  {
    categoria: 'Strategie',
    titolo: 'Pianificazione degli investimenti immobiliari nel 2025',
    data: 'Gen 2025',
    testo: "Un'analisi delle opportunità e dei rischi nel mercato immobiliare americano, con focus su Los Angeles e New York.",
  },
  {
    categoria: 'Opportunità',
    titolo: 'Costruttori consapevoli: investire con intenzione',
    data: 'Nov 2024',
    testo: 'Come integrare i criteri ESG nella gestione patrimoniale senza sacrificare il rendimento a lungo termine.',
  },
  {
    categoria: 'Mercati',
    titolo: "Tassi d'interesse e portafogli multi-asset",
    data: 'Ott 2024',
    testo: 'Strategie di allocazione in un contesto di normalizzazione dei tassi dopo il ciclo di rialzi della Fed.',
  },
  {
    categoria: 'Eredità',
    titolo: 'Trasferire il patrimonio alla prossima generazione',
    data: 'Set 2024',
    testo: 'Strumenti e strategie per una successione efficiente dal punto di vista fiscale e relazionale.',
  },
  {
    categoria: 'Tecnologia',
    titolo: 'Il futuro della gestione patrimoniale digitale',
    data: 'Ago 2024',
    testo: 'Come le piattaforme tecnologiche stanno migliorando la trasparenza e l\'efficienza nei servizi di wealth management.',
  },
]

export default function ProspettivePage() {
  const shouldReduce = useReducedMotion()

  return (
    <main>
      {/* Page header */}
      <section className="bg-primary grain" style={{ paddingTop: '72px' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-16 pb-0">
          <motion.span
            className="font-label text-[10px] uppercase tracking-[0.25em] text-background/35 block mb-10"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: shouldReduce ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Prospettive
          </motion.span>
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-end pb-16 lg:pb-24">
            <motion.h1
              className="font-heading font-light text-background"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 6rem)',
                lineHeight: '1.0',
                letterSpacing: '-0.025em',
              }}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.05, delay: shouldReduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Le nostre opinioni sui mercati, strategie e opportunità.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: shouldReduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="bg-background/20 mb-6"
                style={{ height: '1px' }}
                initial={{ width: 0 }}
                animate={{ width: '2.5rem' }}
                transition={{ duration: 0.7, delay: shouldReduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
              <p className="font-body font-light text-background/55 text-[14px] leading-relaxed max-w-sm">
                Analisi, approfondimenti e punti di vista dal team Advenire sui temi che contano per il tuo patrimonio.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="bg-background py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {articoli.map((a, i) => (
              <motion.article
                key={a.titolo}
                initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{
                  duration: 0.7,
                  delay: shouldReduce ? 0 : (i % 3) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group border-b border-border p-8 pb-px flex flex-col${i % 3 !== 2 ? ' border-r border-r-border' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-muted/15 overflow-hidden mb-6">
                  <div
                    className="w-full h-full bg-gradient-to-br from-border to-muted/30"
                    style={{
                      transform: 'scale(1)',
                      transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                    }}
                  />
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-accent">
                    {a.categoria}
                  </span>
                  <span className="font-label text-[10px] text-muted">
                    {a.data}
                  </span>
                </div>

                <h2
                  className="font-heading font-light text-foreground group-hover:text-primary leading-snug mb-3"
                  style={{
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                    letterSpacing: '-0.01em',
                    transition: 'color 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {a.titolo}
                </h2>

                <p className="font-body font-light text-[13px] text-muted leading-relaxed mb-4 flex-1">
                  {a.testo}
                </p>

                <span className="mt-auto font-label text-[10px] uppercase tracking-widest text-primary opacity-0 group-hover:opacity-60 transition-opacity duration-400">
                  Leggi →
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
