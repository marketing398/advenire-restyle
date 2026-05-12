'use client'

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

type Props = {
  kicker: string
  titolo: string
  ultimoAggiornamento: string
  children: React.ReactNode
}

export default function LegalPageLayout({ kicker, titolo, ultimoAggiornamento, children }: Props) {
  const shouldReduce = useReducedMotion()

  return (
    <main className="bg-background">
      <section className="pt-28 lg:pt-40 pb-16 lg:pb-24 border-b border-border" data-section-tone="light">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <motion.span
            className="font-label text-[12px] uppercase tracking-[0.2em] text-primary/70 block mb-8"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {kicker}
          </motion.span>

          <motion.div
            className="bg-primary mb-10"
            style={{ height: '2px' }}
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ duration: 0.7, ease: EASE }}
          />

          <motion.h1
            className="font-heading font-light italic text-primary max-w-4xl"
            style={{ fontSize: 'clamp(2.1rem, 4.2vw, 4rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
          >
            {titolo}
          </motion.h1>

          <p className="font-body font-light text-foreground/60 text-[13px] mt-6">
            Ultimo aggiornamento: {ultimoAggiornamento}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24" data-section-tone="light">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <article className="font-body font-light text-foreground/85 max-w-3xl text-[15px] md:text-[16px] leading-relaxed [&_h2]:font-heading [&_h2]:italic [&_h2]:text-primary [&_h2]:font-light [&_h2]:text-[1.65rem] [&_h2]:lg:text-[2rem] [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:tracking-[-0.015em] [&_h2]:leading-[1.2] [&_h3]:font-heading [&_h3]:text-primary [&_h3]:font-light [&_h3]:text-[1.2rem] [&_h3]:lg:text-[1.35rem] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:mb-5 [&_ul]:pl-6 [&_ul]:list-disc [&_li]:mb-2 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-accent [&_a:hover]:text-accent [&_strong]:font-medium [&_strong]:text-primary">
            {children}
          </article>
        </div>
      </section>
    </main>
  )
}
