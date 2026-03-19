'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

const servizi = [
  {
    numero: '01',
    titolo: 'Pianificazione finanziaria',
    testo: 'Strategie integrate che uniscono obiettivi di vita, gestione del patrimonio e pianificazione fiscale.',
  },
  {
    numero: '02',
    titolo: 'Gestione degli investimenti',
    testo: 'Portafogli personalizzati costruiti per preservare e accrescere il patrimonio nel lungo termine.',
  },
  {
    numero: '03',
    titolo: 'Pianificazione successoria',
    testo: 'Strutture patrimoniali pensate per garantire una trasmissione efficiente alle generazioni future.',
  },
  {
    numero: '04',
    titolo: 'Consulenza fiscale',
    testo: "Coordinamento con i vostri consulenti fiscali per ottimizzare l'efficienza tributaria.",
  },
  {
    numero: '05',
    titolo: 'Family Office',
    testo: 'Un servizio completo e integrato per le famiglie con patrimoni complessi e multi-generazionali.',
  },
  {
    numero: '06',
    titolo: 'Reporting e trasparenza',
    testo: 'Accesso completo alla vostra situazione patrimoniale in tempo reale, senza sorprese.',
  },
]

function ServiziRow({ s, i, shouldReduce }: { s: typeof servizi[0]; i: number; shouldReduce: boolean | null }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.li
      initial={{ opacity: 0, y: shouldReduce ? 0 : 20, x: shouldReduce ? 0 : -24 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{ duration: 0.75, delay: shouldReduce ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-background/10 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-6 md:py-7">
        {/* Number */}
        <motion.span
          className="font-label text-[10px] tracking-[0.15em] text-background/30 md:w-12 flex-shrink-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: shouldReduce ? 0 : i * 0.08 + 0.15 }}
        >
          {s.numero}
        </motion.span>
        <h3
          className="font-heading font-light text-background flex-1 transition-colors duration-400"
          style={{
            fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
            letterSpacing: '-0.01em',
            lineHeight: '1.2',
            color: hovered ? 'var(--color-accent)' : undefined,
            transition: 'color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {s.titolo}
        </h3>
        <motion.p
          className="font-body font-light text-[13px] text-background/45 leading-relaxed max-w-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: shouldReduce ? 0 : i * 0.08 + 0.25 }}
        >
          {s.testo}
        </motion.p>
        {/* Arrow — slides in on hover */}
        <motion.span
          className="hidden md:block font-label text-[11px] text-accent flex-shrink-0"
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          →
        </motion.span>
      </div>
    </motion.li>
  )
}

export default function ServiziSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-primary grain py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-background/10">
          <div>
            <motion.span
              className="font-label text-[10px] uppercase tracking-[0.25em] text-background/35 block mb-5"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Servizi
            </motion.span>

            <SplitText
              el="h2"
              text="Strumenti patrimoniali al servizio della vita che stai costruendo."
              className="font-heading font-light text-background max-w-lg"
              style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.8rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
              delay={0.07}
              stagger={0.04}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/cosa-facciamo"
              className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.15em] border border-background/25 text-background rounded-full px-6 py-2.5 hover:bg-background hover:text-primary transition-all duration-400"
              style={{ cursor: 'pointer' }}
            >
              Tutti i servizi <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Services list */}
        <ul>
          {servizi.map((s, i) => (
            <ServiziRow key={s.titolo} s={s} i={i} shouldReduce={shouldReduce} />
          ))}
        </ul>
      </div>
    </section>
  )
}
