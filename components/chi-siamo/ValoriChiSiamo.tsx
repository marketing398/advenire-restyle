'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

export default function ValoriChiSiamo() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-accent py-24 lg:py-32 relative overflow-hidden" data-section-tone="accent">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        <motion.span
          className="font-label text-[12px] uppercase tracking-[0.2em] text-primary/70 block mb-8"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Chi siamo
        </motion.span>

        <motion.div
          className="bg-primary mb-10"
          style={{ height: '2px' }}
          initial={{ width: 0 }}
          whileInView={{ width: '3rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <SplitText
          el="p"
          text="Siamo professionisti che mettono competenza e concretezza al centro di ogni scelta, uniti da un unico obiettivo: trasformare ogni progetto in un risultato solido e duraturo. Dalla progettazione alla gestione operativa della commessa, fino alla valutazione strategica degli investimenti immobiliari. È proprio questa profondità di esperienza che ci ha permesso di costruire una società capace di seguire ogni progetto nella sua interezza, senza delegare le fasi critiche. Oggi siamo il punto di riferimento per chi vuole investire nel mattone con metodo e consapevolezza, e per chi sceglie di costruire una casa che rispecchi davvero il proprio stile di vita."
          className="font-heading font-light text-primary max-w-4xl text-left md:text-justify md:hyphens-auto md:[text-justify:inter-word]"
          style={{
            fontSize: 'clamp(1.2rem, 2.2vw, 2rem)',
            lineHeight: '1.45',
            letterSpacing: '-0.015em',
          }}
          delay={shouldReduce ? 0 : 0.1}
          stagger={0.018}
          duration={0.6}
        />

        <SplitText
          el="p"
          text="Dalla verifica dell'investimento alla costruzione in bioedilizia, offriamo un percorso completo e strutturato. L'integrazione delle nostre tre professionalità garantisce qualità, controllo e una visione orientata al lungo termine."
          className="font-body font-light text-primary/90 text-[14.5px] md:text-[16px] leading-relaxed mt-12 max-w-3xl text-left md:text-justify md:hyphens-auto md:[text-justify:inter-word]"
          stagger={0.012}
          delay={shouldReduce ? 0 : 0.4}
          duration={0.55}
        />

        <motion.div
          className="flex flex-wrap gap-4 mt-12"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/servizi/investimenti-immobiliari"
            className="group inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.15em] bg-primary text-background rounded-full px-7 py-3 hover:bg-primary/85 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
          >
            Investimenti immobiliari <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
          <Link
            href="/servizi/nuove-costruzioni"
            className="group inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.15em] border border-primary/40 text-primary rounded-full px-7 py-3 hover:bg-primary hover:text-background hover:border-primary transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Nuove costruzioni <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
