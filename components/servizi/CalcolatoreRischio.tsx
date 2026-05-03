'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

const MIN = 50_000
const MAX = 2_000_000
const STEP = 10_000
const DEFAULT = 300_000

const PHASE_RATES = {
  valutazione: 0.03,
  progettazione: 0.04,
  cantiere: 0.04,
}

const TOTAL_LOW = 0.1
const TOTAL_HIGH = 0.15

function fmt(n: number) {
  return '€ ' + Math.round(n).toLocaleString('it-IT')
}

const phases = [
  { key: 'valutazione', titolo: 'Valutazione e acquisto', sottotitolo: 'errori di valutazione' },
  { key: 'progettazione', titolo: 'Progettazione e strategia', sottotitolo: 'scelte non ottimizzate' },
  { key: 'cantiere', titolo: 'Gestione operativa', sottotitolo: 'inefficienze di cantiere' },
] as const

export default function CalcolatoreRischio() {
  const shouldReduce = useReducedMotion()
  const [valore, setValore] = useState(DEFAULT)

  const totLow = valore * TOTAL_LOW
  const totHigh = valore * TOTAL_HIGH
  const pct = ((valore - MIN) / (MAX - MIN)) * 100

  return (
    <section className="bg-background py-20 lg:py-28 border-t border-primary/10" data-section-tone="light">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT — heading column */}
          <div className="lg:sticky lg:top-32">
            <motion.span
              className="font-label text-[12px] uppercase tracking-[0.2em] text-primary/70 block mb-8"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Il calcolatore
            </motion.span>

            <motion.div
              className="bg-primary mb-10"
              style={{ height: '2px' }}
              initial={{ width: 0 }}
              whileInView={{ width: '3rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />

            <SplitText
              el="h2"
              text="Quanto può costare sbagliare un'operazione immobiliare?"
              className="font-heading font-light italic text-primary"
              style={{
                fontSize: 'clamp(2rem, 3.6vw, 3.4rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
              }}
              delay={shouldReduce ? 0 : 0.06}
              stagger={0.04}
            />

            <motion.p
              className="font-body font-light text-primary/75 text-[14px] md:text-[15px] leading-relaxed mt-6 max-w-md"
              initial={{ opacity: 0, y: shouldReduce ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Sposta il cursore per stimare la perdita media potenziale lungo le tre fasi più
              critiche di un&apos;operazione, in assenza di una consulenza professionale.
            </motion.p>
          </div>

          {/* RIGHT — interactive widget */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
          <div className="mb-12">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/60 mb-8">
              Valore stimato dell&apos;operazione
            </p>
            <div className="relative pt-12 pb-2">
              <div
                className="absolute -translate-x-1/2"
                style={{ left: `${pct}%`, top: 0 }}
                aria-hidden="true"
              >
                <span className="font-heading font-light italic text-primary text-2xl md:text-3xl tabular-nums whitespace-nowrap">
                  € {Math.round(valore).toLocaleString('it-IT')}
                </span>
              </div>
              <input
                type="range"
                min={MIN}
                max={MAX}
                step={STEP}
                value={valore}
                onChange={(e) => setValore(parseInt(e.target.value, 10))}
                aria-label="Valore stimato dell'operazione"
                aria-valuetext={`€ ${Math.round(valore).toLocaleString('it-IT')}`}
                className="block w-full calc-slider"
              />
              <div className="flex justify-between mt-3 font-body text-[11px] text-primary/50 tabular-nums">
                <span>€ {MIN.toLocaleString('it-IT')}</span>
                <span>€ {MAX.toLocaleString('it-IT')}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {phases.map((p) => {
              const v = valore * PHASE_RATES[p.key]
              return (
                <div
                  key={p.key}
                  className="bg-card/60 border border-primary/15 px-5 py-7 text-center"
                >
                  <p className="font-label text-[10px] uppercase tracking-[0.15em] text-accent mb-3 leading-tight">
                    {p.titolo}
                  </p>
                  <p className="font-heading font-light italic text-primary text-2xl md:text-3xl tabular-nums">
                    {fmt(v)}
                  </p>
                  <p className="font-body text-[12px] text-primary/65 mt-3 leading-relaxed">
                    {p.sottotitolo}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="border border-primary/15 bg-card/60 px-7 py-7">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="min-w-0">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/60 mb-2">
                  Perdita media stimata senza advisory
                </p>
                <p className="font-body text-[12px] text-primary/65 leading-relaxed">
                  Tra il 10% e il 15% del valore dell&apos;operazione
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-body text-[14px] text-primary/70 mb-1 tabular-nums">
                  da {fmt(totLow)}
                </p>
                <p className="font-heading font-light italic text-accent text-2xl md:text-3xl tabular-nums leading-none">
                  a {fmt(totHigh)}
                </p>
              </div>
            </div>
            <div className="bg-primary/10 h-[6px] overflow-hidden rounded-sm">
              <div
                className="h-full bg-gradient-to-r from-accent/30 via-accent to-accent transition-[width] duration-200 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <p className="font-body text-[11px] text-primary/55 text-center mt-6">
            Stime basate su medie di settore. Ogni operazione è diversa.
          </p>
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        .calc-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 2px;
          background: var(--color-primary);
          opacity: 0.3;
          border-radius: 2px;
          outline: none;
        }
        .calc-slider:hover,
        .calc-slider:focus-visible {
          opacity: 0.6;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--color-primary);
          border: 2px solid var(--color-background);
          box-shadow: 0 0 0 1px var(--color-primary);
          cursor: pointer;
        }
        .calc-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--color-primary);
          border: 2px solid var(--color-background);
          box-shadow: 0 0 0 1px var(--color-primary);
          cursor: pointer;
        }
      `}</style>
    </section>
  )
}
