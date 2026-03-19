'use client'

import { motion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'
import CountUp from '@/components/ui/CountUp'

const cards = [
  {
    num: '01',
    title: '100% dipendenti',
    text: 'Agiamo sempre nell\'esclusivo interesse del cliente. Non riceviamo commissioni da terzi né retrocessioni di alcun tipo: la nostra unica remunerazione proviene dal cliente.',
  },
  {
    num: '02',
    title: 'Investiamo insieme ai nostri clienti',
    text: 'Costruiamo relazioni durature basate sulla fiducia reciproca, la comprensione profonda degli obiettivi familiari e un impegno costante verso la trasparenza.',
  },
  {
    num: '03',
    title: 'Investimenti alternativi fatti in modo diverso',
    text: 'Portafogli personalizzati costruiti per preservare e accrescere il patrimonio nel lungo termine, con accesso a strategie alternative riservate agli investitori istituzionali.',
  },
  {
    num: '04',
    title: 'Pioniere nelle strategie fiscalmente vantaggiose',
    text: 'Coordinamento con i vostri consulenti fiscali per ottimizzare l\'efficienza tributaria complessiva del portafoglio, integrando la pianificazione fiscale nella strategia di investimento.',
  },
  {
    num: '05',
    title: 'Struttura di servizio integrata',
    text: 'Un servizio completo e integrato per le famiglie con patrimoni complessi e multi-generazionali, che coordina ogni aspetto della gestione patrimoniale in un\'unica relazione.',
  },
  {
    num: '06',
    title: 'Soluzioni di investimento proprietarie',
    text: 'Coordiniamo fiscalità, pianificazione successoria e gestione degli investimenti in un\'unica visione coerente, con soluzioni costruite internamente e non distribuite sul mercato.',
  },
]

export default function ConsulenzaDifferenteSection() {
  return (
    <section className="bg-accent">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-14 lg:py-20">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-24 pb-12 lg:pb-16">
          <motion.span
            className="font-label text-[10px] uppercase tracking-[0.25em] text-foreground/60"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Consulenza differente
          </motion.span>

          <SplitText
            el="h2"
            text="Facciamo le cose in modo diverso, per scelta."
            className="font-heading font-light text-foreground"
            style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.8rem)', lineHeight: '1.2', letterSpacing: '-0.02em' }}
            delay={0.07}
            stagger={0.05}
          />
        </div>

        {/* 6-card grid — 2 rows × 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.num}
              className={[
                'px-0 md:px-8 py-10 group',
                i >= 3 ? 'border-t border-foreground/15' : '',
                i % 3 !== 2 ? 'md:border-r border-foreground/15' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{
                duration: 0.75,
                delay: (i % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -3 }}
            >
              <span className="font-label text-[10px] text-foreground/35 block mb-4 group-hover:text-foreground/60 transition-colors duration-300">
                <CountUp to={parseInt(card.num, 10)} delay={(i % 3) * 0.1 + 0.2} />
              </span>
              <h3
                className="font-heading font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-400"
                style={{
                  fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
                  lineHeight: '1.3',
                  transition: 'color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {card.title}
              </h3>
              <p className="font-body font-light text-foreground/65 text-[13px] leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
