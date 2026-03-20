'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import ArchitectureGraphic from '@/components/ui/ArchitectureGraphic'
import ProfilerModal from '@/components/profiler/ProfilerModal'

const LINE_HEIGHT = 1.08
const SWAP_INTERVAL = 3400
const SWAP_DURATION = 0.9

function SwappingHeading() {
  const [flipped, setFlipped] = useState(false)
  const [mounted, setMounted] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (shouldReduce || !mounted) return
    const id = setInterval(() => setFlipped((f) => !f), SWAP_INTERVAL)
    return () => clearInterval(id)
  }, [shouldReduce, mounted])

  const lines = ['Ricchezza adattiva.', 'Eredità duratura.']
  const fontSize = 'clamp(3rem, 5.5vw, 6.5rem)'
  const posOf = (i: number) => (flipped ? 1 - i : i)

  return (
    <h1
      className="font-heading font-light text-background"
      style={{
        fontSize,
        lineHeight: LINE_HEIGHT,
        letterSpacing: '-0.025em',
        position: 'relative',
        height: `${LINE_HEIGHT * 2}em`,
        overflow: 'hidden',
      }}
      aria-label="Ricchezza adattiva. Eredità duratura."
    >
      {lines.map((line, i) => (
        <motion.span
          key={line}
          style={{ position: 'absolute', top: 0, left: 0, display: 'block', width: '100%' }}
          initial={{
            y: shouldReduce ? `${i * LINE_HEIGHT}em` : `${(i + 0.55) * LINE_HEIGHT}em`,
            opacity: 0,
          }}
          animate={{ y: `${posOf(i) * LINE_HEIGHT}em`, opacity: 1 }}
          transition={{
            y: { duration: SWAP_DURATION, ease: [0.76, 0, 0.24, 1], delay: shouldReduce ? 0 : i * 0.1 },
            opacity: { duration: 0.5, delay: shouldReduce ? 0 : i * 0.1 },
          }}
        >
          {line}
        </motion.span>
      ))}
    </h1>
  )
}

const navLinks = [
  { label: 'Cosa facciamo', href: '/cosa-facciamo' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Le nostre prospettive', href: '/le-nostre-prospettive' },
]

export default function Hero() {
  const shouldReduce = useReducedMotion()
  const [profilerOpen, setProfilerOpen] = useState(false)

  return (
    <section className="bg-primary grain">

      {/* ── WORDMARK — sticky, coperto dal contenuto che scorre ── */}
      {/*
        Logo container ridotto a 22vw: il nav row compare visivamente
        più vicino alla wordmark. Il testo ADVENIRE resta leggibile
        (mostriamo i top ~80% dei glyph — effetto "taglio" voluto).
      */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0,
          height: '25vw',
        }}
      >
        <motion.img
          src="/images/logo-hero.png"
          alt="ADVENIRE"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            marginTop: '-15.5vw',
          }}
          initial={{ opacity: 0, scale: 1.012 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: 0.9 },
            scale: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
          }}
        />
      </div>

      {/* ── CONTENT BLOCK — z:1 + bg solido → copre il logo ── */}
      <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'var(--color-primary)' }}>

        {/* NAV ROW — invariato, ora visivamente più vicino alla wordmark */}
        <div className="border-t border-b border-background/10">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
            <motion.div
              className="flex items-center justify-end gap-6 lg:gap-10 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: shouldReduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <nav className="hidden md:flex items-center gap-6 lg:gap-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: shouldReduce ? 0 : 0.35 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="font-label text-[11px] uppercase tracking-widest text-background/60 hover:text-background transition-colors duration-300 whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: shouldReduce ? 0 : 0.58, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/contatti"
                  className="inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-[0.12em] border border-background/30 text-background rounded-full px-5 py-2 hover:bg-background hover:text-primary transition-all duration-300 whitespace-nowrap"
                  style={{ cursor: 'pointer' }}
                >
                  Contattaci <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── HERO CONTENT ─────────────────────────────────────────────
            Left  (3fr): heading sollevato + sottotitolo sotto
            Right (2fr): grafica architettonica interattiva
        ── */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-8 pb-12 lg:pt-10 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16 items-start">

            {/* LEFT: heading + sottotitolo */}
            <div className="flex flex-col gap-5 lg:gap-7">
              <SwappingHeading />

              <motion.p
                className="font-body font-light text-background/50 text-[14px] leading-relaxed max-w-sm"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: shouldReduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                Una società privata che progetta eredità destinate a durare.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: shouldReduce ? 0 : 0.88, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => setProfilerOpen(true)}
                  className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.14em] bg-accent text-primary rounded-full px-6 py-2.5 hover:opacity-85 transition-opacity duration-200 whitespace-nowrap"
                  style={{ cursor: 'pointer' }}
                >
                  Avvia il preventivo <span aria-hidden="true">→</span>
                </button>
              </motion.div>
            </div>

            {/* RIGHT: grafica architettonica — solo desktop */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: shouldReduce ? 0 : 0.5 }}
            >
              <ArchitectureGraphic />
            </motion.div>

          </div>
        </div>

      </div>

      <ProfilerModal isOpen={profilerOpen} onClose={() => setProfilerOpen(false)} />
    </section>
  )
}
