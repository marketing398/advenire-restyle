'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

const articoli = [
  {
    categoria: 'Mercati',
    titolo: 'Sette tendenze tecnologiche per l\'edilizia',
    data: 'Feb 2025',
    slug: 'tendenze-tecnologiche-edilizia',
  },
  {
    categoria: 'Strategie',
    titolo: 'Pianificazione degli investimenti immobiliari',
    data: 'Gen 2025',
    slug: 'pianificazione-investimenti-immobiliari',
  },
  {
    categoria: 'Opportunità',
    titolo: 'Costruttori consapevoli',
    data: 'Nov 2024',
    slug: 'costruttori-consapevoli',
  },
]

export default function ProspettiveSection() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-background py-20 lg:py-28 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 pb-10 border-b border-border">
          <div>
            <motion.span
              className="font-label text-[10px] uppercase tracking-[0.25em] text-muted block mb-5"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Prospettive
            </motion.span>

            <SplitText
              el="h2"
              text="Le nostre opinioni sui mercati, strategie e opportunità."
              className="font-heading font-light text-foreground max-w-lg"
              style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.8rem)', lineHeight: '1.1', letterSpacing: '-0.015em' }}
              delay={0.07}
              stagger={0.045}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/le-nostre-prospettive"
              className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.15em] border border-primary text-primary rounded-full px-6 py-2.5 hover:bg-primary hover:text-background transition-all duration-400"
              style={{ cursor: 'pointer' }}
            >
              Tutte le prospettive <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Three-across articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {articoli.map((a, i) => (
            <motion.article
              key={a.slug}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 30, scale: shouldReduce ? 1 : 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.85,
                delay: shouldReduce ? 0 : i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className={`group border-r border-border last:border-r-0 pr-8 last:pr-0 flex flex-col${i > 0 ? ' pl-8' : ''}`}
            >
              <Link href={`/le-nostre-prospettive/${a.slug}`} className="flex flex-col flex-1">
                {/* Image — clip-path wipe left→right */}
                <motion.div
                  className="overflow-hidden bg-border/30 aspect-[4/3] mb-6"
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{
                    duration: 0.9,
                    delay: shouldReduce ? 0 : i * 0.12 + 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div
                    className="w-full h-full bg-gradient-to-br from-border/60 via-muted/20 to-border/40"
                    style={{
                      transform: 'scale(1)',
                      transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                    }}
                  />
                </motion.div>

                {/* Meta */}
                <motion.div
                  className="flex items-center justify-between mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: shouldReduce ? 0 : i * 0.12 + 0.35 }}
                >
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-accent">
                    {a.categoria}
                  </span>
                  <span className="font-label text-[10px] text-muted">
                    {a.data}
                  </span>
                </motion.div>

                <h3
                  className="font-heading font-light text-foreground leading-snug mb-4"
                  style={{
                    fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
                    letterSpacing: '-0.01em',
                    transition: 'color 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--color-primary)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.color = ''
                  }}
                >
                  {a.titolo}
                </h3>

                <span className="mt-auto inline-flex items-center gap-1 font-label text-[10px] uppercase tracking-widest text-primary opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                  Leggi →
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
