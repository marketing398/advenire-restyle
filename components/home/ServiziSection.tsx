'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'
import LineFade from '@/components/ui/LineFade'

const cards = [
  {
    titolo: 'Consulenza per investimento immobiliare',
    testo: "Ogni decisione immobiliare ha un impatto significativo, sul tuo patrimonio, sul tuo futuro e sulle scelte che ne derivano. Per questo la nostra consulenza non si ferma alla superficie: parte dall'analisi tecnica del valore, studia le variabili di rischio e costruisce una strategia su misura per i tuoi obiettivi. Ti affianchiamo con metodo e competenza, perché ogni fase del percorso sia chiara, consapevole e orientata al risultato.",
    href: '/servizi/investimenti-immobiliari',
  },
  {
    titolo: 'Costruzioni consapevoli',
    testo: "Costruire in bioedilizia significa scegliere un'abitazione pensata per durare, per consumare meno e per adattarsi al tuo modo di vivere. Ma significa anche affidarsi a professionisti che traducono le tue esigenze in scelte tecniche concrete, senza compromessi sulla qualità. Seguiamo ogni fase del progetto, dalla progettazione alla consegna chiavi in mano, con un approccio su misura che mette al centro le tue necessità. Il risultato: una casa sostenibile, efficiente e pronta da essere vissuta.",
    href: '/servizi/nuove-costruzioni',
  },
]

const anim = {
  ease: [0.16, 1, 0.3, 1] as const,
  duration: 0.7,
}

function ServiceCard({ card, i, isLast, shouldReduce }: { card: typeof cards[0]; i: number; isLast: boolean; shouldReduce: boolean | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{ duration: anim.duration, delay: shouldReduce ? 0 : i * 0.12, ease: anim.ease }}
      className={`group ${!isLast ? 'border-b border-foreground/10 pb-16 lg:pb-24' : ''}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-stretch">
        {/* LEFT — title + CTAs (CTA pinned to bottom, allineati ultima riga del paragrafo) */}
        <div className="flex flex-col items-start lg:justify-between gap-10 lg:gap-12">
          <SplitText
            el="h3"
            text={card.titolo}
            className="font-heading font-light italic text-primary"
            style={{
              fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
            }}
            stagger={0.05}
            delay={shouldReduce ? 0 : i * 0.12}
          />

          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-start gap-4">
            <Link
              href={card.href}
              className="group/btn inline-flex items-center justify-center gap-1.5 font-label text-[12px] uppercase tracking-[0.14em] border border-primary/60 text-primary rounded-full px-6 py-3 hover:bg-primary hover:text-background hover:border-primary transition-colors duration-300"
            >
              Scopri servizio <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </Link>
            <Link
              href="/contatti"
              className="group/btn inline-flex items-center justify-center gap-1.5 font-label text-[12px] uppercase tracking-[0.14em] bg-accent text-primary rounded-full px-6 py-3 hover:bg-accent/85 transition-colors duration-300"
            >
              Richiedi consulenza <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* RIGHT — description */}
        <LineFade
          el="p"
          text={card.testo}
          className="font-body font-light text-foreground/85 text-left md:text-justify md:hyphens-none md:[text-justify:inter-word]"
          style={{
            fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)',
            lineHeight: 1.7,
            letterSpacing: '0',
          }}
          lineStagger={0.16}
          delay={shouldReduce ? 0 : 0.25 + i * 0.12}
          duration={0.6}
        />
      </div>
    </motion.div>
  )
}

export default function ServiziSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="servizi-section" className="bg-background py-24 lg:py-32" data-section-tone="light">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        <motion.span
          className="font-label text-[12px] uppercase tracking-[0.2em] text-primary/70 block mb-8"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, ease: anim.ease }}
        >
          Servizi
        </motion.span>

        <motion.div
          className="bg-primary mb-10"
          style={{ height: '2px' }}
          initial={{ width: 0 }}
          whileInView={{ width: '4rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: anim.ease }}
        />

        <motion.h2
          className="font-heading font-light italic text-primary max-w-4xl mb-16 lg:mb-20"
          style={{ fontSize: 'clamp(2.1rem, 4.2vw, 4rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1, ease: anim.ease }}
        >
          Due servizi, una sola direzione: il valore che dura.
        </motion.h2>

        {/* Cards */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {cards.map((card, i) => (
            <ServiceCard
              key={card.titolo}
              card={card}
              i={i}
              isLast={i === cards.length - 1}
              shouldReduce={shouldReduce}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
