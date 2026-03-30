'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

const cards = [
  {
    numero: '01',
    titolo: 'Consulenza per investimento immobiliare',
    testo: 'Consulenza specializzata per valutare e pianificare il tuo investimento immobiliare in modo consapevole e strategico. Analizziamo ogni opportunità con un approccio tecnico e orientato al valore, per guidarti verso scelte solide e sostenibili. Dalla prima valutazione alla definizione della strategia, ti accompagniamo in ogni fase del tuo investimento.',
    immagine: '/images/services/consulenza-investimento.png',
  },
  {
    numero: '02',
    titolo: 'Costruzioni consapevoli',
    testo: 'Realizziamo case su misura in bioedilizia, progettate intorno alle tue esigenze e al tuo stile di vita. Ti accompagniamo in ogni fase, fino alla consegna chiavi in mano, per offrirti un\'abitazione sostenibile, pronta da vivere.',
    immagine: '/images/services/costruzioni-consapevoli.png',
  },
  {
    numero: '03',
    titolo: 'Servizi tecnologici per l\'edilizia',
    testo: 'Offriamo soluzioni tecnologiche avanzate per l\'edilizia, progettate per ottimizzare tempi, costi e qualità degli interventi. Dalla gestione digitale dei progetti all\'analisi dei dati, trasformiamo il modo di costruire in un processo più efficiente, preciso e innovativo.',
    immagine: '/images/services/tech-edilizia.png',
  },
]

function ServiceCard({ card, i, shouldReduce }: { card: typeof cards[0]; i: number; shouldReduce: boolean | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{ duration: 0.75, delay: shouldReduce ? 0 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden min-w-0"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <Image
          src={card.immagine}
          alt={card.titolo}
          fill
          className="object-cover"
          style={{ mixBlendMode: 'luminosity' }}
        />
      </div>

      {/* Content */}
      <div className="p-7 lg:p-8 flex flex-col gap-4 flex-1">
        <span className="font-label text-[10px] tracking-[0.15em] text-foreground/30">
          {card.numero}
        </span>
        <h3
          className="font-heading font-light text-foreground"
          style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)', lineHeight: '1.2', letterSpacing: '-0.01em' }}
        >
          {card.titolo}
        </h3>
        <p className="font-body font-light text-[13px] text-foreground/55 leading-relaxed flex-1">
          {card.testo}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/cosa-facciamo"
            className="inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-[0.12em] bg-primary text-background rounded-full px-5 py-2 hover:bg-primary-light transition-colors duration-300"
            style={{ cursor: 'pointer' }}
          >
            Scopri servizio <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/contatti"
            className="inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-[0.12em] bg-accent text-primary rounded-full px-5 py-2 hover:opacity-85 transition-opacity duration-200"
            style={{ cursor: 'pointer' }}
          >
            Chiedi una consulenza
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServiziSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-accent py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="bricks" width="60" height="30" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="58" height="13" fill="none" stroke="currentColor" strokeWidth="0.4" rx="1" />
              <rect x="30" y="15" width="58" height="13" fill="none" stroke="currentColor" strokeWidth="0.4" rx="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bricks)" />
        </svg>
      </div>
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 relative">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-foreground/10">
          <div>
            <motion.span
              className="font-label text-[13px] uppercase tracking-[0.18em] text-foreground/70 block mb-5"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Servizi
            </motion.span>

            <SplitText
              el="h2"
              text="Strumenti al servizio del tuo capitale immobiliare."
              className="font-heading font-light text-foreground max-w-lg"
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
              className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.15em] bg-primary text-background rounded-full px-6 py-2.5 hover:bg-primary-light transition-colors duration-300"
              style={{ cursor: 'pointer' }}
            >
              Tutti i servizi <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <ServiceCard key={card.numero} card={card} i={i} shouldReduce={shouldReduce} />
          ))}
        </div>
      </div>
    </section>
  )
}
