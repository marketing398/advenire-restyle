'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

function FormField({
  label,
  children,
  delay = 0,
}: {
  label: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <label className="font-label text-[9px] uppercase tracking-widest text-muted block mb-2">
        {label}
      </label>
      {children}
    </motion.div>
  )
}

export default function ContattiForm() {
  const [submitted, setSubmitted] = useState(false)
  const shouldReduce = useReducedMotion()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="bg-background py-20 lg:py-28 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <motion.span
            className="font-label text-[10px] uppercase tracking-[0.25em] text-muted block mb-6"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Parliamo
          </motion.span>
          <motion.h2
            className="font-heading font-light text-foreground mb-6"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
              lineHeight: '1.06',
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            Il primo passo verso una gestione patrimoniale consapevole.
          </motion.h2>
          <motion.p
            className="font-body font-light text-[14px] text-muted leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Raccontaci la tua situazione e i tuoi obiettivi. Ti risponderemo entro 24 ore lavorative.
          </motion.p>
        </div>

        <div className="border-t border-border pt-12 max-w-3xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-lg py-16"
            >
              <p
                className="font-heading font-light text-foreground mb-3"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', letterSpacing: '-0.01em' }}
              >
                Messaggio inviato.
              </p>
              <p className="font-body font-light text-[13px] text-muted">
                Ti risponderemo entro 24 ore lavorative.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            >
              {/* Left col */}
              <div className="space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label="Nome" delay={0}>
                    <input
                      type="text"
                      required
                      className="w-full border-b border-border bg-transparent py-3 font-body text-[14px] text-foreground placeholder:text-muted/40 focus:outline-none focus:border-primary transition-colors duration-300"
                      placeholder="Il tuo nome"
                    />
                  </FormField>
                  <FormField label="Cognome" delay={0.05}>
                    <input
                      type="text"
                      required
                      className="w-full border-b border-border bg-transparent py-3 font-body text-[14px] text-foreground placeholder:text-muted/40 focus:outline-none focus:border-primary transition-colors duration-300"
                      placeholder="Il tuo cognome"
                    />
                  </FormField>
                </div>

                <FormField label="Email" delay={0.1}>
                  <input
                    type="email"
                    required
                    className="w-full border-b border-border bg-transparent py-3 font-body text-[14px] text-foreground placeholder:text-muted/40 focus:outline-none focus:border-primary transition-colors duration-300"
                    placeholder="nome@esempio.com"
                  />
                </FormField>

                <FormField label="Telefono" delay={0.15}>
                  <input
                    type="tel"
                    className="w-full border-b border-border bg-transparent py-3 font-body text-[14px] text-foreground placeholder:text-muted/40 focus:outline-none focus:border-primary transition-colors duration-300"
                    placeholder="+1 (xxx) xxx-xxxx"
                  />
                </FormField>
              </div>

              {/* Right col */}
              <div className="flex flex-col gap-7">
                <FormField label="Come possiamo aiutarti?" delay={0.08}>
                  <textarea
                    rows={6}
                    required
                    className="w-full border-b border-border bg-transparent py-3 font-body text-[14px] text-foreground placeholder:text-muted/40 focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                    placeholder="Descrivici la tua situazione e i tuoi obiettivi..."
                  />
                </FormField>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                >
                  <SubmitButton />
                </motion.div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function SubmitButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      type="submit"
      className="relative inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.15em] bg-primary text-background rounded-full px-8 py-3.5 overflow-hidden"
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.span
        className="absolute inset-0 bg-primary-light rounded-full"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className="relative z-10">Invia il messaggio</span>
      <motion.span
        className="relative z-10 inline-block"
        animate={{ x: hovered ? 3 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        →
      </motion.span>
    </button>
  )
}
