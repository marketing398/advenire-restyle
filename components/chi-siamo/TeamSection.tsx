'use client'

import { motion, useReducedMotion } from 'framer-motion'

const team = [
  {
    nome: 'E.J. Kahn',
    ruolo: 'Socio amministratore',
    bio: 'Con oltre 25 anni di esperienza nella gestione patrimoniale, E.J. ha guidato la crescita di famiglie imprenditoriali attraverso cicli economici complessi.',
    iniziali: 'EK',
  },
  {
    nome: 'Adam Wanstock, CFP®',
    ruolo: 'Socio amministratore',
    bio: "Specializzato in pianificazione finanziaria integrata, Adam costruisce strategie che uniscono investimenti, fiscalità e successione in un'unica visione.",
    iniziali: 'AW',
  },
  {
    nome: 'Raz Den Tachlan CIMA, CAIA®',
    ruolo: 'Direttore degli Investimenti e della Conformità',
    bio: 'Con un background quantitativo e una profonda conoscenza dei mercati globali, Raz guida la costruzione e il monitoraggio dei portafogli di investimento.',
    iniziali: 'RD',
  },
]

export default function TeamSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-10 border-b border-border">
          <motion.span
            className="font-label text-[10px] uppercase tracking-[0.25em] text-muted"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Il nostro team
          </motion.span>
          <motion.h2
            className="font-heading font-light text-foreground max-w-lg md:text-right"
            style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Il nostro team multigenerazionale crea un ambiente di consulenza agile, perspicace e lungimirante.
          </motion.h2>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {team.map((membro, i) => (
            <motion.div
              key={membro.nome}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.75,
                delay: shouldReduce ? 0 : i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-t border-border pt-8 pb-10 pr-8 group"
            >
              {/* Portrait placeholder — refined */}
              <div className="aspect-[3/4] bg-muted/8 border border-border mb-6 overflow-hidden relative">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-muted/5 to-muted/15" />
                {/* Initials centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-heading font-light text-muted/20 select-none"
                    style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
                  >
                    {membro.iniziali}
                  </span>
                </div>
                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-accent/40"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <h3
                className="font-heading font-light text-foreground mb-1"
                style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', letterSpacing: '-0.01em' }}
              >
                {membro.nome}
              </h3>
              <p className="font-label text-[9px] uppercase tracking-widest text-muted mb-4">
                {membro.ruolo}
              </p>
              <p className="font-body font-light text-[13px] text-foreground/65 leading-relaxed">
                {membro.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
