'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const heroNavLinks = [
  { label: 'Cosa facciamo', href: '/cosa-facciamo' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Le nostre prospettive', href: '/le-nostre-prospettive' },
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
      style={{
        width: '100%',
        lineHeight: 0,
        overflow: 'hidden',
        padding: 'clamp(2rem, 5vh, 4rem) clamp(1.5rem, 4vw, 4rem) 0',
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
      <img
        src="/images/logo-hero.svg"
        alt="ADVENIRE"
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
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section
      className="bg-primary"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      <LogoWordmark />

      {/* NAV ROW */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
        <motion.div
          className="flex items-center justify-between gap-6 lg:gap-10 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: shouldReduce ? 0 : 0.4 }}
        >
          {/* Compact A mark */}
          <Link
            href="/"
            aria-label="Advenire — Home"
            className="font-heading font-light italic text-background text-[22px] leading-none tracking-tight select-none"
          >
            A.
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
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
                      ? 'font-label text-[11px] uppercase tracking-widest text-background/70 hover:text-background border border-background/50 hover:border-background rounded-full px-4 py-1.5 transition-colors duration-300 whitespace-nowrap'
                      : 'font-label text-[11px] uppercase tracking-widest text-background/70 hover:text-background transition-colors duration-300 whitespace-nowrap'
                  }
                >
                  {link.label}
                  {link.href === '/contatti' && <span className="ml-1.5" aria-hidden="true">&rarr;</span>}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={menuOpen}
            className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8 p-1"
          >
            <span
              className="block h-[1.5px] bg-background transition-all duration-300"
              style={{
                width: '22px',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block h-[1.5px] bg-background transition-all duration-300"
              style={{
                width: '16px',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-[1.5px] bg-background transition-all duration-300"
              style={{
                width: '22px',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </motion.div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              key="mobile-nav"
              className="md:hidden flex flex-col gap-4 pb-4 pt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {heroNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-label text-[12px] uppercase tracking-widest text-background/80 hover:text-background transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* HERO CONTENT — bottom of viewport */}
      <div
        className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full"
        style={{
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: 'clamp(3rem, 6vh, 7rem)',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 lg:gap-10 items-end w-full">

          {/* Left — heading + subtext */}
          <div className="flex flex-col gap-5">
            <motion.h1
              className="font-heading font-light italic"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
              animate={{
                opacity: 1,
                y: 0,
                backgroundPosition: shouldReduce ? '0% 50%' : ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                opacity: { duration: 0.9, delay: shouldReduce ? 0 : 0.5 },
                y: { duration: 0.9, delay: shouldReduce ? 0 : 0.5 },
                backgroundPosition: { duration: 8, repeat: Infinity, ease: 'linear', delay: 1.5 },
              }}
              style={{
                fontSize: 'clamp(2.2rem, 7vw, 6.5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                backgroundImage:
                  'linear-gradient(90deg, #F6EFE5 0%, #F6EFE5 40%, #FDA77E 50%, #F6EFE5 60%, #F6EFE5 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              <span className="block sm:whitespace-nowrap">Esperienza al servizio</span>
              <span className="block sm:whitespace-nowrap">del tuo capitale.</span>
            </motion.h1>

            <motion.p
              className="font-body font-light text-background/55 text-[12px] md:text-[13px] leading-relaxed max-w-lg mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: shouldReduce ? 0 : 0.75 }}
            >
              Trasformiamo il tuo investimento immobiliare in un progetto solido, sicuro e costruito per crescere nel tempo.
            </motion.p>
          </div>

          {/* Right — illustration */}
          <motion.div
            className="hidden lg:block self-end"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: shouldReduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/services/3.webp"
              alt=""
              width={600}
              height={450}
              sizes="(max-width: 1024px) 0px, 240px"
              aria-hidden="true"
              style={{
                width: '100%',
                maxWidth: '260px',
                height: 'auto',
                marginLeft: 'auto',
                display: 'block',
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
