'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import AccordionItem from '@/components/ui/AccordionItem'
import SplitText from '@/components/ui/SplitText'
import ArchitecturalLines from '@/components/ui/ArchitecturalLines'

const target = [
  {
    label: 'Imprenditori Immobiliari',
    body: 'Strategie su misura per chi gestisce portafogli immobiliari complessi, con focus su fiscalità, ottimizzazione e liquidità.',
  },
  {
    label: "Professionisti dell'architettura",
    body: 'Soluzioni integrate per chi opera in proprio: protezione del patrimonio, pianificazione previdenziale e ottimizzazione fiscale.',
  },
  {
    label: 'Privati ecosostenibili',
    body: 'Supporto dedicato a chi vuole costruire o ristrutturare in bioedilizia, con attenzione alla sostenibilità, al risparmio energetico e alla valorizzazione nel tempo.',
  },
  {
    label: 'Agenzie immobiliari',
    body: 'Partnership strategiche per agenzie che vogliono offrire ai propri clienti un supporto specializzato in consulenza immobiliare e ottimizzazione degli investimenti.',
  },
]

export default function ConsulenzaSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-background py-20 lg:py-28 relative overflow-hidden">
      <ArchitecturalLines position="bottom-left" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 relative">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">

          {/* Left — sticky on desktop */}
          <div className="lg:sticky lg:top-32">
            <motion.span
              className="font-label text-foreground/65 uppercase tracking-[0.18em] text-[13px] block mb-8"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Per chi lavoriamo
            </motion.span>

            <SplitText
              el="h2"
              text="Lavoriamo con chi ha una visione."
              className="font-heading font-light text-foreground"
              style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3.5rem)', lineHeight: '1.06', letterSpacing: '-0.02em' }}
              delay={0.06}
              stagger={0.045}
            />

            <motion.p
              className="font-body font-light text-[13px] text-foreground/55 leading-relaxed mt-8 max-w-sm"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16, x: shouldReduce ? 0 : -12 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Accompagniamo imprenditori, professionisti e privati che cercano un partner esperto per trasformare
              idee in progetti concreti.
            </motion.p>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <Link
                href="/cosa-facciamo"
                className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.15em] bg-accent text-primary rounded-full px-6 py-2.5 hover:opacity-85 transition-opacity duration-200"
                style={{ cursor: 'pointer' }}
              >
                Scopri i nostri servizi <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20, x: shouldReduce ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pt-16"
          >
            <div className="border-t border-border">
              {target.map((item) => (
                <AccordionItem key={item.label} title={item.label}>
                  <span className="text-muted font-light text-[13px] leading-relaxed">
                    {item.body}
                  </span>
                </AccordionItem>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
