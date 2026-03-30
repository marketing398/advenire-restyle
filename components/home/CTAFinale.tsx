'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CTAFinale() {
  return (
    <section className="bg-primary grain py-20 lg:py-28 relative overflow-hidden">
      {/* Diagonal pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diag" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="20" stroke="#F6EFE5" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diag)" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 text-center relative">
        <motion.h2
          className="font-heading font-light italic text-background mx-auto max-w-2xl"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Pronto a dare forma al tuo progetto?
        </motion.h2>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/contatti"
            className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.15em] bg-accent text-primary rounded-full px-8 py-3 hover:opacity-85 transition-opacity duration-200"
          >
            Contattaci <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
