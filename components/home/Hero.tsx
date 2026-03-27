'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import ProfilerModal from '@/components/profiler/ProfilerModal'

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
          height: '18vw',
        }}
      >
        <motion.img
          src="/images/logo-hero.png"
          alt="ADVENIRE"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            marginTop: '-11vw',
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
        <div className="border-t border-background/10">
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
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16 items-center">

            {/* LEFT: heading + paragrafi */}
            <div className="flex flex-col gap-5 lg:gap-7">

              <h1
                className="font-heading font-light text-background"
                style={{
                  fontSize: 'clamp(3rem, 5.5vw, 6.5rem)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.025em',
                }}
              >
                Esperienza al servizio<br />
                Del tuo capitale.
              </h1>

              {/* Paragrafi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                <p className="font-body font-light text-[#f6efe5]/70 text-[13px] leading-relaxed">
                  Trasformiamo il tuo investimento immobiliare in un progetto solido, sicuro e costruito per crescere nel tempo.
                </p>
                <p className="font-body font-light text-[#f6efe5]/70 text-[13px] leading-relaxed">
                  Diamo valore al tuo capitale immobiliare con consulenze su misura, basate su esperienza, mercato e visione strategica.
                </p>
              </div>

            </div>

            {/* RIGHT: CTA semplice */}
            <motion.div
              className="flex items-center justify-center lg:justify-end"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: shouldReduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setProfilerOpen(true)}
                className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.18em] bg-accent text-primary rounded-full px-8 py-3.5 hover:opacity-85 transition-opacity duration-200"
                style={{ cursor: 'pointer' }}
              >
                Inizia ora <span aria-hidden="true">→</span>
              </button>
            </motion.div>

          </div>
        </div>

      </div>

      <ProfilerModal isOpen={profilerOpen} onClose={() => setProfilerOpen(false)} />
    </section>
  )
}
