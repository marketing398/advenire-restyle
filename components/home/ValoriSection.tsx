'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

const valori = [
  {
    simbolo: '◈',
    numero: '01',
    titolo: 'Integri',
    testo:
      "Agiamo sempre nell'interesse del cliente. La trasparenza non è un optional, è il fondamento di ogni relazione.",
  },
  {
    simbolo: '◉',
    numero: '02',
    titolo: 'Adattativi',
    testo:
      'Il mondo cambia. Le famiglie cambiano. Le strategie patrimoniali devono farlo con loro.',
  },
  {
    simbolo: '◎',
    numero: '03',
    titolo: 'Lungimiranti',
    testo:
      'Investiamo in relazioni multigenerazionali, costruendo piani che guardano a decenni, non a trimestri.',
  },
  {
    simbolo: '◇',
    numero: '04',
    titolo: 'Integrati',
    testo:
      "Coordiniamo fiscalità, pianificazione successoria e gestione degli investimenti in un'unica visione coerente.",
  },
]

export default function ValoriSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 pb-10 border-b border-border">
          <div>
            <motion.span
              className="font-label text-[10px] uppercase tracking-[0.25em] text-muted block mb-5"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Come lavoriamo
            </motion.span>

            <SplitText
              el="h2"
              text="Facciamo le cose in modo diverso, per scelta."
              className="font-heading font-light text-foreground max-w-xl"
              style={{ fontSize: 'clamp(1.7rem, 3.5vw, 3rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
              delay={0.06}
              stagger={0.05}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {valori.map((v, i) => (
            <motion.div
              key={v.numero}
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.8,
                delay: shouldReduce ? 0 : i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -5 }}
              className="border-t border-border pt-8 pb-10 pr-8 group"
            >
              {/* Symbol — spring spin entrance */}
              <motion.span
                className="text-[20px] text-muted/35 block mb-6"
                initial={{ scale: 0, rotate: -45, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 14,
                  delay: shouldReduce ? 0 : i * 0.1 + 0.25,
                }}
                whileHover={{ scale: 1.2, color: 'var(--color-accent)' }}
                style={{ display: 'inline-block', transformOrigin: 'left center' }}
              >
                {v.simbolo}
              </motion.span>
              <h3
                className="font-heading font-light text-foreground mb-4 group-hover:text-primary transition-colors duration-400"
                style={{
                  fontSize: 'clamp(1.3rem, 1.8vw, 1.7rem)',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {v.titolo}
              </h3>
              <motion.p
                className="font-body text-[13px] font-light text-muted leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: shouldReduce ? 0 : i * 0.1 + 0.4 }}
              >
                {v.testo}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
