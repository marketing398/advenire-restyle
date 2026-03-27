'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Cosa facciamo', href: '/cosa-facciamo' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Le nostre prospettive', href: '/le-nostre-prospettive' },
  { label: 'Contattaci', href: '/contatti' },
]

const legalLinks = [
  { label: 'Riservatezza', href: '/privacy' },
  { label: 'Divulgazioni', href: '/divulgazioni' },
  { label: 'Modulo CRS', href: '/modulo-crs' },
]

const colVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      {/* Logo bar */}
      <motion.div
        className="max-w-[1440px] mx-auto px-6 lg:px-16 py-14 border-b border-border"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/images/logo-dark.png"
          alt="Advenire"
          width={1920}
          height={500}
          className="object-contain"
          style={{ height: '20px', width: 'auto' }}
        />
      </motion.div>

      {/* Main content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 md:gap-8 pb-14 border-b border-border">

          {/* Col 1 — tagline + disclaimer */}
          <motion.div
            custom={0}
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-5%' }}
          >
            <p
              className="font-heading font-light text-foreground leading-snug mb-6"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', letterSpacing: '-0.01em' }}
            >
              Ricchezza adattiva.<br />Eredità duratura.
            </p>
            <p className="font-body font-light text-[11px] text-muted/70 leading-relaxed max-w-xs">
              Advenire Private Wealth, LLC è un consulente per gli investimenti registrato presso la
              Securities and Exchange Commission degli Stati Uniti.
            </p>
          </motion.div>

          {/* Col 2 — Navigation */}
          <motion.nav
            className="flex flex-col gap-3"
            custom={1}
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-5%' }}
          >
            <span className="font-label text-[9px] uppercase tracking-[0.25em] text-muted mb-2">
              Navigazione
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body font-light text-[13px] text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>

          {/* Col 3 — LA office */}
          <motion.div
            className="flex flex-col gap-1"
            custom={2}
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-5%' }}
          >
            <span className="font-label text-[9px] uppercase tracking-[0.25em] text-muted mb-2">
              Los Angeles
            </span>
            <p className="font-body font-light text-[12px] text-muted leading-loose">
              10877 Wilshire Blvd Suite 1406
            </p>
            <p className="font-body font-light text-[12px] text-muted leading-loose">
              Los Angeles, CA 90024
            </p>
            <a
              href="tel:+14245004601"
              className="font-body font-light text-[12px] text-muted hover:text-primary transition-colors duration-300 mt-1"
            >
              (424) 500-4601
            </a>
          </motion.div>

          {/* Col 4 — NY office */}
          <motion.div
            className="flex flex-col gap-1"
            custom={3}
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-5%' }}
          >
            <span className="font-label text-[9px] uppercase tracking-[0.25em] text-muted mb-2">
              New York
            </span>
            <p className="font-body font-light text-[12px] text-muted leading-loose">
              150 East 52nd St Suite 27002
            </p>
            <p className="font-body font-light text-[12px] text-muted leading-loose">
              New York, NY 10022
            </p>
            <a
              href="tel:+16468095056"
              className="font-body font-light text-[12px] text-muted hover:text-primary transition-colors duration-300 mt-1"
            >
              (646) 809-5056
            </a>
            <a
              href="mailto:info@advenire.com"
              className="font-body font-light text-[12px] text-muted hover:text-primary transition-colors duration-300 mt-3"
            >
              info@advenire.com
            </a>
          </motion.div>
        </div>

        {/* Legal disclaimer */}
        <motion.div
          className="py-8 border-b border-border space-y-2 max-w-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="font-body font-light text-[11px] text-muted/60 leading-relaxed">
            La registrazione come consulente per gli investimenti non implica un determinato livello
            di competenza o formazione. Le informazioni contenute in questo sito web sono solo a
            scopo informativo e non costituiscono una consulenza finanziaria, legale o fiscale.
          </p>
          <p className="font-body font-light text-[11px] text-muted/60 leading-relaxed">
            Fidelity Investments® è una società indipendente, non affiliata ad Advenire Private Wealth.
            Le prestazioni passate non sono una garanzia di risultati futuri. Tutti gli investimenti
            comportano rischi, inclusa la possibile perdita del capitale investito.
          </p>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-label text-[10px] text-muted/50">© Copyright 2026 Advenire</p>
          <nav className="flex gap-6">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-label text-[10px] text-muted/50 hover:text-primary transition-colors duration-300"
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
