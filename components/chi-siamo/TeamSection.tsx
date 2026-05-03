'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const team = [
  {
    nome: 'Armand Guzhda',
    ruolo: 'Co-founder & Architetto',
    citazione:
      'Innovare non significa complicare. Significa chiarire. L’innovazione porta alla libertà di fare scelte consapevoli.',
    immagine: '/images/team/armand.png',
  },
  {
    nome: 'Alessandro Panaia',
    ruolo: 'Co-founder & Project Manager',
    citazione:
      'Ogni cliente deve sentirsi guidato e assistito in ogni passo. Non va mai lasciato solo.',
    immagine: '/images/team/alessandro.png',
  },
  {
    nome: 'Giacomo Giacalone',
    ruolo: 'Co-founder & Interior Designer',
    citazione: 'La casa è un progetto di vita, non un prodotto.',
    immagine: '/images/team/giacomo.png',
  },
]

export default function TeamSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-background py-20 lg:py-28 border-t border-primary/10" data-section-tone="light">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        <motion.span
          className="font-label text-[10px] uppercase tracking-[0.18em] text-primary/70 block mb-10"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Il team
        </motion.span>

        <motion.div
          className="bg-primary mb-10"
          style={{ height: '2px' }}
          initial={{ width: 0 }}
          whileInView={{ width: '3rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.h2
          className="font-heading font-light italic text-primary max-w-3xl mb-14 lg:mb-16"
          style={{
            fontSize: 'clamp(2.1rem, 4.2vw, 4rem)',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
          }}
          initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Tre percorsi, un&apos;identità condivisa: dare forma a progetti che abbiano senso
          oggi e valore nel tempo.
        </motion.h2>

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
              className={`border-t border-primary/15 pt-8 pb-10 md:px-6 group ${
                i < team.length - 1 ? 'md:border-r md:border-primary/15' : ''
              }`}
            >
              <div className="aspect-[3/4] bg-card overflow-hidden relative">
                <Image
                  src={membro.immagine}
                  alt={`Ritratto di ${membro.nome}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top"
                  style={{ mixBlendMode: 'luminosity' }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-accent/50"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <h3
                className="font-heading font-light italic text-foreground mt-6"
                style={{ fontSize: 'clamp(1.3rem, 1.7vw, 1.6rem)', letterSpacing: '-0.01em' }}
              >
                {membro.nome}
              </h3>
              <p className="font-label text-[11px] uppercase tracking-[0.15em] text-accent mt-2">
                {membro.ruolo}
              </p>
              <p className="font-body font-light italic text-[14px] text-foreground/80 leading-relaxed mt-6 max-w-[300px]">
                &ldquo;{membro.citazione}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
