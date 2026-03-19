'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import AccordionItem from '@/components/ui/AccordionItem'
import SplitText from '@/components/ui/SplitText'

const target = [
  {
    label: 'Imprenditori immobiliari',
    body: 'Strategie su misura per chi gestisce portafogli immobiliari complessi, con focus su fiscalità, successione e liquidità.',
  },
  {
    label: 'Agenti immobiliari',
    body: 'Pianificazione finanziaria orientata alla gestione dei flussi irregolari e alla costruzione di un patrimonio solido nel lungo termine.',
  },
  {
    label: "Professionisti dell'architettura",
    body: 'Soluzioni integrate per chi opera in proprio: protezione del patrimonio, pianificazione previdenziale e ottimizzazione fiscale.',
  },
  {
    label: 'Famiglie con patrimoni complessi',
    body: 'Un approccio multi-generazionale che coordina investimenti, pianificazione successoria e governance familiare.',
  },
]

export default function ConsulenzaSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-primary grain py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">

          {/* Left — sticky on desktop */}
          <div className="lg:sticky lg:top-32">
            <motion.span
              className="font-label text-background/35 uppercase tracking-[0.25em] text-[10px] block mb-8"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Per chi lavoriamo
            </motion.span>

            <SplitText
              el="h2"
              text="Consulenza finanziaria sofisticata e personalizzata pensata per te."
              className="font-heading font-light text-background"
              style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3.5rem)', lineHeight: '1.06', letterSpacing: '-0.02em' }}
              delay={0.06}
              stagger={0.045}
            />

            <motion.p
              className="font-body font-light text-[13px] text-background/55 leading-relaxed mt-8 max-w-sm"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16, x: shouldReduce ? 0 : -12 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Lavoriamo con famiglie e professionisti che hanno costruito qualcosa di significativo
              e desiderano preservarlo, farlo crescere e trasmetterlo con intelligenza e intenzione.
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
                className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.15em] border border-background/25 text-background rounded-full px-6 py-2.5 hover:bg-background hover:text-primary transition-all duration-300"
                style={{ cursor: 'pointer' }}
              >
                Scopri i nostri servizi <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Right — accordion, slides in from right */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20, x: shouldReduce ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pt-16"
          >
            <div className="border-t border-background/15">
              {target.map((item) => (
                <AccordionItem key={item.label} title={item.label} light>
                  <span className="text-background/55 font-light text-[13px] leading-relaxed">
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
