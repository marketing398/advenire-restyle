'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const rotatingPairs = [
  {
    word: 'investimento immobiliare',
    paragraph:
      'Diamo valore al tuo capitale immobiliare con consulenze su misura, basate su esperienza, mercato e visione strategica.',
  },
  {
    word: 'progetto personale',
    paragraph:
      'Trasformiamo il tuo investimento immobiliare in un progetto solido, sicuro e costruito per crescere nel tempo.',
  },
]

const heroNavLinks = [
  { label: 'Investimenti Immobiliari', href: '/servizi/investimenti-immobiliari' },
  { label: 'Nuove Costruzioni', href: '/servizi/nuove-costruzioni' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Contatti', href: '/contatti' },
]

function LogoWordmark() {
  const shouldReduce = useReducedMotion()
  const { scrollY } = useScroll()

  const opacity = useTransform(scrollY, [0, 320], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 1.05])
  const y = useTransform(scrollY, [0, 400], [0, -30])

  return (
    <motion.div
      className="w-full"
      style={{
        lineHeight: 0,
        overflow: 'hidden',
        paddingTop: 'clamp(2rem, 5vh, 4rem)',
        paddingLeft: 'clamp(1rem, 2.5vw, 2.5rem)',
        paddingRight: 'clamp(1rem, 2.5vw, 2.5rem)',
        scale: shouldReduce ? 1 : scale,
        opacity: shouldReduce ? 1 : opacity,
        y: shouldReduce ? 0 : y,
        transformOrigin: 'center center',
        willChange: 'transform, opacity',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <Image
        src="/images/logo-hero.svg"
        alt="ADVENIRE"
        width={1500}
        height={263}
        priority
        sizes="100vw"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
        }}
      />
    </motion.div>
  )
}

export default function Hero() {
  const shouldReduce = useReducedMotion()
  const [pairIndex, setPairIndex] = useState(0)

  useEffect(() => {
    if (shouldReduce) return
    const id = setInterval(() => {
      setPairIndex((i) => (i + 1) % rotatingPairs.length)
    }, 3800)
    return () => clearInterval(id)
  }, [shouldReduce])

  const current = rotatingPairs[pairIndex]

  return (
    <section
      className="bg-primary"
      data-section-tone="dark"
      style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      <LogoWordmark />

      {/* NAV ROW — stesso padding fluido del LogoWordmark per allineamento perfetto */}
      <div
        className="w-full"
        style={{
          paddingLeft: 'clamp(1rem, 2.5vw, 2.5rem)',
          paddingRight: 'clamp(1rem, 2.5vw, 2.5rem)',
        }}
      >
        <motion.nav
          className="flex flex-col items-end gap-5 pt-6 pb-2 md:flex-row md:flex-wrap md:items-center md:justify-end md:gap-x-8 md:gap-y-2 md:py-4 lg:gap-x-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: shouldReduce ? 0 : 0.4 }}
        >
          {heroNavLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: shouldReduce ? 0 : 0.45 + i * 0.07 }}
            >
              <Link
                href={link.href}
                className={
                  link.href === '/contatti'
                    ? 'font-label text-[13px] md:text-[11px] uppercase tracking-widest text-background/80 hover:text-background border border-background/35 hover:border-background rounded-full px-5 py-2 md:px-4 md:py-1.5 transition-colors duration-300 whitespace-nowrap inline-block'
                    : 'font-label text-[13px] md:text-[11px] uppercase tracking-widest text-background/75 hover:text-background transition-colors duration-300 whitespace-nowrap'
                }
              >
                {link.label}
                {link.href === '/contatti' && <span className="ml-1.5" aria-hidden="true">&rarr;</span>}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </div>

      {/* HERO CONTENT — 3 blocchi distribuiti con space-between */}
      <div
        className="w-full"
        style={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingLeft: 'clamp(1rem, 2.5vw, 2.5rem)',
          paddingRight: 'clamp(1rem, 2.5vw, 2.5rem)',
          paddingTop: 'clamp(2rem, 5vh, 4rem)',
          paddingBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
        }}
      >
        <div className="flex flex-col gap-5 w-full">
          <motion.h1
            className="font-heading font-light italic text-background"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              opacity: { duration: 0.9, delay: shouldReduce ? 0 : 0.5 },
              y: { duration: 0.9, delay: shouldReduce ? 0 : 0.5 },
            }}
            style={{
              fontSize: 'clamp(2.2rem, 7vw, 6.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
            }}
          >
            <span className="block sm:whitespace-nowrap">Diamo forma al tuo</span>
            <span className="block sm:whitespace-nowrap relative text-accent">
              <AnimatePresence mode="wait">
                <motion.span
                  key={current.word}
                  initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduce ? 0 : -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {current.word}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <div className="mt-3 min-h-[1.75rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.paragraph}
                className="font-body font-light text-background/75 text-[13px] md:text-[14px] leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduce ? 0 : -12 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {current.paragraph}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel indicator — "01 ─── 02" sincronizzato con la rotazione */}
        <motion.div
          className="flex items-center gap-4 py-8 md:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: shouldReduce ? 0 : 0.9 }}
          aria-hidden="true"
        >
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-background/70 tabular-nums">
            {String(pairIndex + 1).padStart(2, '0')}
          </span>
          <div className="flex gap-2 w-32 md:w-40">
            {rotatingPairs.map((_, i) => (
              <motion.div
                key={i}
                className="h-px flex-1"
                animate={{
                  backgroundColor:
                    i === pairIndex
                      ? 'rgba(246, 239, 229, 0.85)'
                      : 'rgba(246, 239, 229, 0.25)',
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-background/40 tabular-nums">
            {String(rotatingPairs.length).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Scroll indicator — label SCORRI + linea verticale con dash animato */}
        <motion.div
          className="flex flex-col items-start gap-3"
          initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: shouldReduce ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <span className="font-label text-[10px] uppercase tracking-[0.32em] text-background/55">
            Scorri
          </span>
          <div className="relative h-12 w-px bg-background/20 overflow-hidden">
            <motion.div
              className="absolute left-0 w-full bg-background/85"
              style={{ height: '14px', top: 0 }}
              animate={shouldReduce ? { y: 0 } : { y: ['-100%', '340%'] }}
              transition={{
                duration: 1.9,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
                repeatDelay: 0.3,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
