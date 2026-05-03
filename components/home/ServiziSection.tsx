'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const cards = [
  {
    titolo: 'Consulenza per investimento immobiliare',
    testo: "Ogni decisione immobiliare ha un impatto significativo, sul tuo patrimonio, sul tuo futuro e sulle scelte che ne derivano. Per questo la nostra consulenza non si ferma alla superficie: parte dall'analisi tecnica del valore, studia le variabili di rischio e costruisce una strategia su misura per i tuoi obiettivi. Ti affianchiamo con metodo e competenza, perché ogni fase del percorso sia chiara, consapevole e orientata al risultato.",
    immagine: '/images/services/2.webp',
    href: '/servizi/investimenti-immobiliari',
  },
  {
    titolo: 'Costruzioni consapevoli',
    testo: "Costruire in bioedilizia significa scegliere un'abitazione pensata per durare, per consumare meno e per adattarsi al tuo modo di vivere. Ma significa anche affidarsi a professionisti che traducono le tue esigenze in scelte tecniche concrete, senza compromessi sulla qualità. Seguiamo ogni fase del progetto, dalla progettazione alla consegna chiavi in mano, con un approccio su misura che mette al centro le tue necessità. Il risultato: una casa sostenibile, efficiente e pronta da essere vissuta.",
    immagine: '/images/services/1.webp',
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
      className={!isLast ? 'border-b border-foreground/8 pb-16 lg:pb-24' : ''}
    >
      <div className="flex flex-col md:flex-row gap-8 lg:gap-14 items-start">
        {/* Image */}
        <div className="w-full md:w-[42%] flex-shrink-0 max-w-[80%] mx-auto md:mx-0 md:max-w-none">
          <div
            className="relative w-full aspect-[4/3]"
            style={{
              maskImage: 'radial-gradient(ellipse 85% 85% at 35% 40%, black 50%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 35% 40%, black 50%, transparent 100%)',
            }}
          >
            <Image
              src={card.immagine}
              alt={card.titolo}
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-contain"
              style={{ mixBlendMode: 'luminosity', opacity: 0.9 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3
            className="font-heading font-light italic text-foreground"
            style={{ fontSize: 'clamp(2rem, 3.6vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            {card.titolo}
          </h3>

          <p className="font-body font-light text-[14px] text-foreground/65 leading-relaxed mt-4">
            {card.testo}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
            <Link
              href={card.href}
              className="inline-flex items-center justify-center gap-1.5 font-label text-[11px] uppercase tracking-[0.12em] border border-primary/60 text-primary rounded-full px-5 py-2 hover:bg-primary hover:text-background transition-colors duration-300"
            >
              Scopri servizio <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center gap-1.5 font-label text-[11px] uppercase tracking-[0.12em] bg-accent text-primary rounded-full px-5 py-2 hover:bg-accent/80 transition-colors duration-300"
            >
              Richiedi consulenza <span aria-hidden="true">→</span>
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
    <section className="bg-background py-20 lg:py-28" data-section-tone="light">
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
          className="font-heading font-light italic text-primary max-w-3xl mb-16 lg:mb-20"
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

        {/* Global CTA */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: shouldReduce ? 0 : 0.2, ease: anim.ease }}
        >
          <Link
            href="/contatti"
            className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.12em] bg-primary text-background rounded-full px-6 py-2.5 hover:bg-primary/85 transition-colors duration-200"
          >
            Richiedi una consulenza gratuita <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
