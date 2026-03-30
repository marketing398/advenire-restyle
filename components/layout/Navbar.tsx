'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Cosa facciamo', href: '/cosa-facciamo' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Contattaci', href: '/contatti' },
]

// ─── Nav link con underline attivo/hover ───────────────────────────────────
function NavLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false)
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className="relative font-label text-[11px] uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors duration-300 pb-0.5 whitespace-nowrap"
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

// ─── CTA pill ─────────────────────────────────────────────────────────────
function CtaPill() {
  return (
    <Link
      href="/contatti"
      className="hidden md:inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-[0.12em] bg-accent text-primary rounded-full px-5 py-2 hover:opacity-85 transition-opacity duration-200 whitespace-nowrap"
      style={{ cursor: 'pointer' }}
    >
      Contattaci <span aria-hidden="true">→</span>
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
    const onScroll = () => {
      const y = window.scrollY

      // Su homepage: la navbar appare quando si raggiunge la QuoteSection (sfondo crema)
      let threshold: number
      if (isHomepage) {
        const quoteEl = document.getElementById('quote-section')
        threshold = quoteEl ? quoteEl.offsetTop - 64 : window.innerHeight
      } else {
        threshold = 60
      }

      const isScrolled = y > threshold
      setScrolled(isScrolled)
      setHidden(isScrolled ? false : (y > lastY.current && y > 80))
      const docH = document.documentElement.scrollHeight - window.innerHeight
      if (docH > 0) setScrollProgress((y / docH) * 100)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHomepage])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isVisible = !isHomepage || scrolled

  return (
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
          className="absolute bottom-0 left-0 h-px bg-accent"
          style={{ width: `${scrollProgress}%`, transition: 'width 0.08s linear' }}
        />
      )}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex items-center justify-between py-4">

          <Link href="/" style={{ cursor: 'pointer', lineHeight: 0 }}>
            <Image
              src="/images/logo-dark.png"
              alt="Advenire"
              height={500}
              width={1920}
              className="object-contain"
              style={{ height: '15px', width: 'auto' }}
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
            <CtaPill />
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
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

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-x-0 top-[calc(19px+2rem)] bottom-0 bg-background flex flex-col items-start justify-center gap-8 px-8 z-40"
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
                  className="font-heading font-light text-4xl text-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + navLinks.length * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/contatti"
                className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.15em] bg-accent text-primary rounded-full px-7 py-3 hover:opacity-85 transition-opacity duration-200"
                style={{ cursor: 'pointer' }}
              >
                Contattaci <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
