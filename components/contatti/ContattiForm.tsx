'use client'

import { useState } from 'react'
import Link from 'next/link'
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
    <motion.label
      className="block"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="font-label text-[10px] uppercase tracking-[0.18em] text-primary/65 block mb-2">
        {label}
      </span>
      {children}
    </motion.label>
  )
}

export default function ContattiForm() {
  const [submitted, setSubmitted] = useState(false)
  const shouldReduce = useReducedMotion()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const nome = (data.get('nome') as string)?.trim() ?? ''
    const cognome = (data.get('cognome') as string)?.trim() ?? ''
    const email = (data.get('email') as string)?.trim() ?? ''
    const telefono = (data.get('telefono') as string)?.trim() ?? ''
    const messaggio = (data.get('messaggio') as string)?.trim() ?? ''

    const fullName = [nome, cognome].filter(Boolean).join(' ') || 'Nuovo contatto'
    const subject = `Richiesta di contatto — ${fullName}`
    const bodyLines = [
      `Nome: ${nome}`,
      `Cognome: ${cognome}`,
      `Email: ${email}`,
      telefono ? `Telefono: ${telefono}` : null,
      '',
      'Messaggio:',
      messaggio,
      '',
      '—',
      'Inviato da advenire.it',
    ].filter((l): l is string => l !== null)

    const mailto = `mailto:info@advenire.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`
    window.location.href = mailto
    setSubmitted(true)
  }

  return (
    <section className="bg-background py-20 lg:py-28 border-t border-border" data-section-tone="light">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <motion.span
            className="font-label text-[12px] uppercase tracking-[0.2em] text-primary/70 block mb-8"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Parliamo
          </motion.span>
          <motion.h2
            className="font-heading font-light italic text-primary mb-6"
            style={{
              fontSize: 'clamp(2.1rem, 4.2vw, 4rem)',
              lineHeight: '1.1',
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
            className="font-body font-light text-[14px] text-foreground/75 leading-relaxed max-w-[60ch] text-left md:text-justify md:hyphens-none md:[text-justify:inter-word]"
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
                className="font-heading font-light italic text-foreground mb-4"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', letterSpacing: '-0.01em' }}
              >
                Apertura della tua app email&hellip;
              </p>
              <p className="font-body font-light text-[14px] text-foreground/75 leading-relaxed mb-6 max-w-md">
                Abbiamo precompilato un messaggio per <span className="text-foreground">info@advenire.it</span>. Premi <strong>Invia</strong> dalla tua app per completare. Se non si apre, scrivici manualmente.
              </p>
              <a
                href="mailto:info@advenire.it"
                className="inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.15em] border border-foreground/40 text-foreground rounded-full px-6 py-3 hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                Apri info@advenire.it <span aria-hidden="true">&rarr;</span>
              </a>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left col */}
                <div className="space-y-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField label="Nome" delay={0}>
                      <input
                        type="text"
                        name="nome"
                        autoComplete="given-name"
                        required
                        aria-required="true"
                        className="w-full border-b border-border bg-transparent py-3 font-body text-[14px] text-foreground placeholder:text-muted/60 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus:border-primary transition-colors duration-300"
                        placeholder="Il tuo nome"
                      />
                    </FormField>
                    <FormField label="Cognome" delay={0.05}>
                      <input
                        type="text"
                        name="cognome"
                        autoComplete="family-name"
                        required
                        aria-required="true"
                        className="w-full border-b border-border bg-transparent py-3 font-body text-[14px] text-foreground placeholder:text-muted/60 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus:border-primary transition-colors duration-300"
                        placeholder="Il tuo cognome"
                      />
                    </FormField>
                  </div>

                  <FormField label="Email" delay={0.1}>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      aria-required="true"
                      className="w-full border-b border-border bg-transparent py-3 font-body text-[14px] text-foreground placeholder:text-muted/60 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus:border-primary transition-colors duration-300"
                      placeholder="nome@esempio.com"
                    />
                  </FormField>

                  <FormField label="Telefono" delay={0.15}>
                    <input
                      type="tel"
                      name="telefono"
                      autoComplete="tel"
                      className="w-full border-b border-border bg-transparent py-3 font-body text-[14px] text-foreground placeholder:text-muted/60 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus:border-primary transition-colors duration-300"
                      placeholder="+39 ___ ___ ____"
                    />
                  </FormField>
                </div>

                {/* Right col */}
                <div className="flex flex-col gap-7">
                  <FormField label="Come possiamo aiutarti?" delay={0.08}>
                    <textarea
                      name="messaggio"
                      rows={3}
                      required
                      aria-required="true"
                      className="w-full border-b border-border bg-transparent py-3 font-body text-[14px] text-foreground placeholder:text-muted/60 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent focus:border-primary transition-colors duration-300 resize-none"
                      placeholder="Descrivici la tua situazione e i tuoi obiettivi..."
                    />
                  </FormField>
                </div>
              </div>

              <motion.div
                className="mt-12 pt-10 border-t border-border flex flex-col gap-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <label className="flex items-start gap-3 cursor-pointer max-w-2xl group">
                  <input
                    type="checkbox"
                    name="privacy"
                    required
                    aria-required="true"
                    className="mt-1 w-4 h-4 rounded-sm border border-foreground/40 accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent shrink-0"
                  />
                  <span className="font-body font-light text-[12.5px] md:text-[13px] text-foreground/75 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    Ho letto e compreso l&apos;
                    <Link href="/privacy" className="underline underline-offset-4 decoration-accent hover:text-primary">informativa privacy</Link>
                    {' '}e autorizzo Advenire S.r.l. al trattamento dei miei dati personali per riscontrare la mia richiesta. *
                  </span>
                </label>

                <p className="font-body font-light text-[11px] text-foreground/55 max-w-2xl">
                  I campi contrassegnati con * sono obbligatori. Risponderemo entro 24 ore lavorative all&apos;indirizzo email indicato.
                </p>

                <SubmitButton />
              </motion.div>
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
      className="relative inline-flex items-center gap-2 font-label text-[11px] uppercase tracking-[0.15em] bg-primary text-background rounded-full px-8 py-3.5 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
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
      <span className="relative z-10">Apri nella mia app mail</span>
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
