'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Investimenti Immobiliari', href: '/servizi/investimenti-immobiliari' },
  { label: 'Nuove Costruzioni', href: '/servizi/nuove-costruzioni' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Contatti', href: '/contatti' },
]

// ─── Nav link con underline attivo/hover ───────────────────────────────────
function NavLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false)
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className="relative font-label text-[11px] uppercase tracking-[0.18em] text-foreground/80 hover:text-foreground transition-colors duration-300 pb-0.5 whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-foreground w-full"
        initial={{ scaleX: isActive ? 1 : 0 }}
        animate={{ scaleX: hovered || isActive ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
      />
    </Link>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const lastY = useRef(0)
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Cache valori che non cambiano scrolling (offset section + doc height).
    // Re-letti solo su resize, non a ogni scroll → niente reflow per frame.
    let cachedThreshold = isHomepage ? window.innerHeight : 60
    let cachedDocH = document.documentElement.scrollHeight - window.innerHeight

    const recompute = () => {
      if (isHomepage) {
        const el = document.getElementById('servizi-section')
        cachedThreshold = el ? el.offsetTop - 64 : window.innerHeight
      } else {
        cachedThreshold = 60
      }
      cachedDocH = document.documentElement.scrollHeight - window.innerHeight
    }
    recompute()

    let rafId: number | null = null
    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const y = window.scrollY
        const isScrolled = y > cachedThreshold
        setScrolled(isScrolled)
        setHidden(isScrolled ? false : (y > lastY.current && y > 80))
        if (cachedDocH > 0) setScrollProgress((y / cachedDocH) * 100)
        lastY.current = y
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', recompute, { passive: true })
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', recompute)
    }
  }, [isHomepage])

  useEffect(() => {
    // Chiudi il menu mobile alla navigazione tra rotte (pattern legittimo:
    // sync UI state con cambio URL via App Router, non c'e' alternativa
    // event-driven dato che usePathname() e' la fonte di verita').
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false)
  }, [pathname])

  const isVisible = !isHomepage || scrolled

  return (
    <>
    <header
      className="fixed top-0 left-0 w-full z-50 bg-background/96 backdrop-blur-sm border-b border-border"
      style={{
        transform: hidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
      }}
    >
      {scrolled && (
        <div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-accent via-accent/60 to-transparent"
          style={{ width: `${scrollProgress}%`, transition: 'width 0.08s linear' }}
        />
      )}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between py-4">

          <Link
            href="/"
            aria-label="Advenire"
            className="block leading-none"
            style={{ cursor: 'pointer' }}
          >
            <Image
              src="/images/icon-advenire.png"
              alt="Advenire"
              width={144}
              height={144}
              sizes="40px"
              priority
              className="h-10 w-10 object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col gap-[5px] p-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={menuOpen}
            style={{ cursor: 'pointer' }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-[1px] bg-foreground origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-[1px] bg-foreground origin-left"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-[1px] bg-foreground origin-center"
            />
          </button>
        </div>
      </div>
    </header>

      {/* Mobile overlay — fuori dall'header per evitare il bug di position:fixed con ancestor transformato */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-background flex flex-col items-start justify-center gap-8 px-8 z-40"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  className="font-heading font-light text-4xl text-foreground hover:text-primary transition-colors duration-300 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
