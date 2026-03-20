'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProfilerModal from './ProfilerModal'

export default function ProfilerTrigger() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <section style={{ backgroundColor: 'var(--color-foreground)' }}>
        <div
          className="max-w-[1440px] mx-auto px-6 lg:px-16"
          style={{
            paddingTop: '5rem',
            paddingBottom: '5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'flex-start',
          }}
        >
          <motion.p
            className="font-label"
            style={{ fontSize: '10px', letterSpacing: '0.25em', color: 'rgba(245,240,232,0.35)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            PREVENTIVO EDILIZIO
          </motion.p>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '4rem',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
          }}>
            <motion.h2
              className="font-heading font-light"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                color: 'var(--color-background)',
                maxWidth: '600px',
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Ottieni una stima del tuo progetto edilizio.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p className="font-body" style={{ fontSize: '14px', color: 'rgba(245,240,232,0.5)', lineHeight: 1.6, maxWidth: '320px' }}>
                  5 domande. Stima personalizzata. Contatto dal nostro team entro 24 ore.
                </p>
                <button
                  onClick={() => setIsOpen(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1.75rem',
                    background: 'var(--color-accent)',
                    color: 'var(--color-foreground)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-label-var, monospace)',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    transition: 'opacity 0.2s',
                    alignSelf: 'flex-start',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Avvia il preventivo <span aria-hidden="true">→</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ProfilerModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
