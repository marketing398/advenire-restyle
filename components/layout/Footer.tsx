'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Cosa facciamo', href: '/cosa-facciamo' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Contattaci', href: '/contatti' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
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
    <footer className="bg-primary grain">
      {/* Logo bar */}
      <motion.div
        className="max-w-[1440px] mx-auto px-6 lg:px-16 py-14 border-b border-background/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/images/logo-light.png"
          alt="Advenire"
          width={1920}
          height={500}
          className="object-contain"
          style={{ height: '20px', width: 'auto' }}
        />
      </motion.div>

      {/* Main content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-8 pb-14 border-b border-background/10">

          {/* Col 1 — tagline */}
          <motion.div
            custom={0}
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-5%' }}
          >
            <p
              className="font-heading font-light text-background leading-snug mb-6"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', letterSpacing: '-0.01em' }}
            >
              Esperienza al servizio<br />del tuo capitale.
            </p>
            <a
              href="mailto:info@advenire.it"
              className="font-body font-light text-[12px] text-background/50 hover:text-background transition-colors duration-300"
            >
              info@advenire.it
            </a>
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
            <span className="font-label text-[9px] uppercase tracking-[0.25em] text-background/40 mb-2">
              Navigazione
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body font-light text-[13px] text-background/60 hover:text-background transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>

          {/* Col 3 — Italia */}
          <motion.div
            className="flex flex-col gap-1"
            custom={2}
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-5%' }}
          >
            <span className="font-label text-[9px] uppercase tracking-[0.25em] text-background/40 mb-2">
              Italia
            </span>
            <p className="font-body font-light text-[12px] text-background/50 leading-loose">
              Advenire S.r.l.
            </p>
            <p className="font-body font-light text-[12px] text-background/50 leading-loose">
              Italia
            </p>
            <a
              href="mailto:info@advenire.it"
              className="font-body font-light text-[12px] text-background/50 hover:text-background transition-colors duration-300 mt-1"
            >
              info@advenire.it
            </a>
          </motion.div>
        </div>

        {/* Legal note */}
        <motion.div
          className="py-8 border-b border-background/10 max-w-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="font-body font-light text-[11px] text-background/40 leading-relaxed">
            Le informazioni contenute in questo sito web sono a scopo informativo e non costituiscono
            consulenza finanziaria, legale o fiscale. Le performance passate non garantiscono risultati futuri.
            Tutti gli investimenti comportano rischi, inclusa la possibile perdita del capitale investito.
          </p>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-label text-[10px] text-background/35">© Copyright 2026 Advenire — Sito web di Frappé</p>
          <nav className="flex gap-6">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-label text-[10px] text-background/35 hover:text-background transition-colors duration-300"
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
