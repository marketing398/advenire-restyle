'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
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

// ─── Right column: graphic + integrated "INIZIA ORA" CTA ─────────────────────
function HeroCTAGraphic({
  onOpen,
  shouldReduce,
}: {
  onOpen: () => void
  shouldReduce: boolean | null
}) {
  const [hovered, setHovered] = useState(false)
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduce) { onOpen(); return }
    const rect = e.currentTarget.getBoundingClientRect()
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setTimeout(() => { setRipple(null); onOpen() }, 420)
  }

  return (
    <motion.div
      data-hover
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      style={{ position: 'relative', cursor: 'none' }}
      aria-label="Inizia ora — avvia il preventivo"
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen()}
    >
      {/* Building graphic */}
      <ArchitectureGraphic />

      {/* Hover: coral glow from bottom */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(253,167,126,0.09) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* CTA annotation — blueprint style, bottom of graphic */}
      <div style={{
        position: 'absolute',
        bottom: '9%',
        left: '8%',
        right: '8%',
        pointerEvents: 'none',
      }}>
        {/* Extending coral line */}
        <motion.div
          style={{
            height: '1px',
            background: 'rgba(253,167,126,0.7)',
            marginBottom: '0.55rem',
            transformOrigin: 'left',
          }}
          animate={{ scaleX: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.35 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Label */}
          <motion.span
            className="font-label"
            style={{ fontSize: '10px', letterSpacing: '0.32em' }}
            animate={{ color: hovered ? 'rgba(253,167,126,1)' : 'rgba(253,167,126,0.5)' }}
            transition={{ duration: 0.3 }}
          >
            INIZIA ORA
          </motion.span>

          {/* Arrow */}
          <motion.span
            animate={{ x: hovered ? 6 : 0, opacity: hovered ? 1 : 0.35 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: 'rgba(253,167,126,0.9)', fontSize: '1.1rem', display: 'inline-block' }}
            aria-hidden="true"
          >
            →
          </motion.span>
        </div>
      </div>

      {/* Click ripple — coral ring expanding from click point */}
      <AnimatePresence>
        {ripple && (
          <motion.div
            key="ripple"
            style={{
              position: 'absolute',
              left: ripple.x,
              top: ripple.y,
              translateX: '-50%',
              translateY: '-50%',
              borderRadius: '50%',
              border: '1px solid rgba(253,167,126,0.7)',
              pointerEvents: 'none',
            }}
            initial={{ width: 0, height: 0, opacity: 0.9 }}
            animate={{ width: 560, height: 560, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>
    </motion.div>
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

      {/* ── WORDMARK — sticky ── */}
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

      {/* ── CONTENT BLOCK ── */}
      <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'var(--color-primary)' }}>

        {/* NAV ROW */}
        <div className="border-b border-background/10">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
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

        {/* ── HERO GRID ── */}
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 pt-8 pb-12 lg:pt-10 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16 items-start">

            {/* LEFT: heading + sottotitolo + mobile CTA */}
            <div className="flex flex-col gap-5 lg:gap-7">
              <SwappingHeading />

              <p className="font-body font-light text-background/50 text-[14px] leading-relaxed max-w-sm">
                Esperienza al servizio del tuo capitale.
              </p>

              {/* Citazioni */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <p className="font-body font-light text-[#f6efe5]/70 text-[13px] leading-relaxed italic">
                  — Trasformiamo il tuo investimento immobiliare in un progetto solido, sicuro e costruito per crescere nel tempo.
                </p>
                <p className="font-body font-light text-[#f6efe5]/70 text-[13px] leading-relaxed italic">
                  — Diamo valore al tuo capitale immobiliare con consulenze su misura, basate su esperienza, mercato e visione strategica.
                </p>
              </div>

              {/* Mobile-only CTA */}
              <motion.div
                className="lg:hidden"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: shouldReduce ? 0 : 0.88, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => setProfilerOpen(true)}
                  className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.14em] bg-accent text-primary rounded-full px-6 py-2.5 hover:opacity-85 transition-opacity duration-200"
                  style={{ cursor: 'pointer' }}
                >
                  Inizia ora <span aria-hidden="true">→</span>
                </button>
              </motion.div>
            </div>

            {/* RIGHT: grafica + CTA integrata — solo desktop */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: shouldReduce ? 0 : 0.5 }}
            >
              <HeroCTAGraphic
                onOpen={() => setProfilerOpen(true)}
                shouldReduce={shouldReduce}
              />
            </motion.div>

          </div>
        </div>

      </div>

      <ProfilerModal isOpen={profilerOpen} onClose={() => setProfilerOpen(false)} />
    </section>
  )
}
