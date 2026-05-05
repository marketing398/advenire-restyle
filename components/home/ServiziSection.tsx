'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

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
      className={`group ${!isLast ? 'border-b border-foreground/10 pb-20 lg:pb-32' : ''}`}
    >
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <div className="flex-1 flex flex-col items-center w-full">
          <SplitText
            el="h3"
            text={card.titolo}
            className="font-heading font-light italic text-primary max-w-2xl mx-auto"
            style={{
              fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
            }}
            stagger={0.05}
            delay={shouldReduce ? 0 : i * 0.12}
          />

          <SplitText
            el="p"
            text={card.testo}
            className="font-body font-light text-foreground/85 mt-10 max-w-[52ch] mx-auto text-left md:text-justify md:hyphens-auto md:[text-justify:inter-word]"
            style={{
              fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)',
              lineHeight: 1.7,
              letterSpacing: '0',
              textAlignLast: 'center',
            }}
            stagger={0.012}
            delay={shouldReduce ? 0 : 0.25 + i * 0.12}
            duration={0.55}
          />

          <div className="mt-14 flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-center gap-4">
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
      </div>
    </motion.div>
  )
}

export default function ServiziSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-background pt-20 lg:pt-32 pb-32 lg:pb-44" data-section-tone="light">
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
          className="font-heading font-light italic text-primary max-w-4xl mb-20 lg:mb-28"
          style={{ fontSize: 'clamp(2.1rem, 4.2vw, 4rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1, ease: anim.ease }}
        >
          Due servizi, una sola direzione: il valore che dura.
        </motion.h2>

        {/* Cards */}
        <div className="flex flex-col gap-20 lg:gap-32">
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

        {/* Transition layer — breathing space verso la sezione corallo */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30%' }}
          transition={{ duration: 1.2, ease: anim.ease }}
          className="h-24 mt-16 lg:mt-24"
        />
      </div>
    </section>
  )
}
