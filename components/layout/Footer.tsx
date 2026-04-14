'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const navLinks = [
  { label: 'Investimenti Immobiliari', href: '/cosa-facciamo' },
  { label: 'Nuove Costruzioni', href: '/cosa-facciamo#costruzioni' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Contatti', href: '/contatti' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
]

export default function Footer() {
  const shouldReduce = useReducedMotion()

  return (
    <footer className="bg-primary grain">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16 lg:py-24">

        {/* Main grid: icona | nav | contatto */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-12 md:gap-8 pb-16 border-b border-background/10">

          {/* Col 1 — Icona A */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/icon-a.webp"
              alt="Advenire"
              width={220}
              height={220}
              sizes="(max-width: 768px) 100px, 200px"
              style={{ width: 'clamp(100px, 14vw, 200px)', height: 'auto', objectFit: 'contain', filter: 'invert(1)', opacity: 0.9 }}
            />
          </motion.div>

          {/* Col 2 — Navigazione in heading font */}
          <motion.nav
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.75, delay: shouldReduce ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-heading font-light italic text-background hover:text-background/60 transition-colors duration-300"
                style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.6rem)', letterSpacing: '-0.015em', lineHeight: 1.2 }}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>

          {/* Col 3 — Contatto */}
          <motion.div
            className="flex flex-col gap-1 md:pt-1"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.75, delay: shouldReduce ? 0 : 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-body font-light text-[12px] text-background/65 leading-loose">Advenire S.r.l.</p>
            <p className="font-body font-light text-[12px] text-background/65 leading-loose">Italia</p>
            <a
              href="mailto:info@advenire.it"
              className="font-body font-light text-[12px] text-background/65 hover:text-background transition-colors duration-300 mt-2"
            >
              info@advenire.it
            </a>
          </motion.div>
        </div>

        {/* Note legale */}
        <motion.div
          className="py-8 border-b border-background/10 max-w-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.7, delay: shouldReduce ? 0 : 0.2 }}
        >
          <p className="font-body font-light text-[11px] text-background/50 leading-relaxed">
            Le informazioni contenute in questo sito web sono a scopo informativo e non costituiscono
            consulenza finanziaria, legale o fiscale. Le performance passate non garantiscono risultati futuri.
            Tutti gli investimenti comportano rischi, inclusa la possibile perdita del capitale investito.
          </p>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-label text-[10px] text-background/45">© Copyright 2026 Advenire — Sito web di Frappé</p>
          <nav className="flex gap-6">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-label text-[10px] text-background/45 hover:text-background transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  )
}
