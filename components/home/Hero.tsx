'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'

const navLinks = [
  { label: 'Cosa facciamo', href: '/cosa-facciamo' },
  { label: 'Chi siamo', href: '/chi-siamo' },
]

// 14px font, ~150px per ripetizione, circonferenza 628px → 4 ripetizioni
const CIRCLE_TEXT = 'INIZIA ORA  ·  INIZIA ORA  ·  INIZIA ORA  ·  INIZIA ORA  ·  INIZIA ORA'

function CircleCTA() {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href="/contatti"
      style={{ display: 'inline-block', cursor: 'pointer' }}
      aria-label="Contattaci"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        viewBox="0 0 220 220"
        width="220"
        height="220"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          {/* r=84: testo staccato di ~16px dal bordo esterno (r=100) */}
          <path
            id="fullCircle"
            d="M 26,110 A 84,84 0 1,1 194,110 A 84,84 0 1,1 26,110"
          />
          <clipPath id="circleClip">
            <circle cx="110" cy="110" r="97" />
          </clipPath>
        </defs>

        {/* Bordo cerchio */}
        <circle cx="110" cy="110" r="100" fill="none" stroke="#FDA77E" strokeWidth="1.2" />

        {/* Icona Advenire — appare all'hover */}
        <image
          href="/images/icon-a-light.png"
          x="45" y="45"
          width="130" height="130"
          preserveAspectRatio="xMidYMid meet"
          clipPath="url(#circleClip)"
          style={{
            opacity: hovered ? 0.9 : 0,
            transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Testo circolare — font più grande, 4 ripetizioni */}
        <text
          fill="#FDA77E"
          style={{
            fontFamily: 'var(--font-label-var, "Courier New", monospace)',
            fontSize: '14px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <textPath href="#fullCircle" startOffset="0%">
            {CIRCLE_TEXT}
          </textPath>
        </text>
      </svg>
    </Link>
  )
}

function LogoWordmark() {
  const shouldReduce = useReducedMotion()
  const { scrollY } = useScroll()

  // Scroll range: 0px → 400px
  const rawScale   = useTransform(scrollY, [0, 400], [1, 1.18])
  const rawOpacity = useTransform(scrollY, [0, 320], [1, 0])
  const rawY       = useTransform(scrollY, [0, 400], [0, -50])
  const rawBlur    = useTransform(scrollY, [0, 350], [0, 14])

  // Springify scale e Y per un feel più fluido
  const scale   = useSpring(rawScale,   { stiffness: 80, damping: 20 })
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 25 })
  const y       = useSpring(rawY,       { stiffness: 80, damping: 20 })

  // blur come motionValue stringa
  const filter = useTransform(rawBlur, v => `blur(${v}px)`)

  return (
    <motion.div
      style={{
        flex: '0 0 auto',
        width: '100%',
        height: 'clamp(120px, 38vh, 380px)',
        lineHeight: 0,
        display: 'flex',
        alignItems: 'center',
        scale: shouldReduce ? 1 : scale,
        opacity: shouldReduce ? 1 : opacity,
        y: shouldReduce ? 0 : y,
        filter: shouldReduce ? undefined : filter,
        transformOrigin: 'center center',
        willChange: 'transform, opacity, filter',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <img
        src="/images/logo-hero.png"
        alt="ADVENIRE"
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </motion.div>
  )
}

export default function Hero() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      className="bg-primary grain"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <LogoWordmark />

      {/* ── CONTENT BLOCK ── */}
      <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>

        {/* NAV ROW */}
        <div style={{ borderTop: '1px solid rgba(246,239,229,0.15)' }}>
          <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
            <motion.div
              className="flex items-center justify-end gap-6 lg:gap-10 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: shouldReduce ? 0 : 0.4 }}
            >
              <nav className="hidden md:flex items-center gap-6 lg:gap-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: shouldReduce ? 0 : 0.45 + i * 0.07 }}
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
                transition={{ duration: 0.5, delay: shouldReduce ? 0 : 0.65 }}
              >
                <Link
                  href="/contatti"
                  className="inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-[0.12em] border border-background/30 text-background rounded-full px-5 py-2 hover:bg-background hover:text-primary transition-all duration-300 whitespace-nowrap"
                >
                  Contattaci <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── HERO CONTENT ── */}
        <div
          className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-8 pb-12 lg:pt-10 lg:pb-16 w-full"
          style={{ flex: '1 1 auto', display: 'flex', alignItems: 'center' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16 items-center w-full">

            <div className="flex flex-col gap-6">
              <motion.h1
                className="font-heading font-light text-background"
                style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
                initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: shouldReduce ? 0 : 0.5 }}
              >
                Esperienza al servizio<br />
                del tuo capitale.
              </motion.h1>

              <motion.p
                className="font-body font-light text-background/60 text-[14px] leading-relaxed max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: shouldReduce ? 0 : 0.75 }}
              >
                Trasformiamo il tuo investimento immobiliare in un progetto solido, sicuro e costruito per crescere nel tempo.
              </motion.p>
            </div>

            <motion.div
              className="flex items-center justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: shouldReduce ? 0 : 0.65 }}
            >
              <CircleCTA />
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}
