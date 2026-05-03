'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SplitText from '@/components/ui/SplitText'

const linee = [
  {
    label: 'Linea A',
    titolo: 'Hai già trovato un’operazione',
    descrizione:
      'Hai individuato qualcosa che ti sembra interessante. Il problema è che per sapere se lo è davvero devi saper leggere i numeri, valutare i rischi urbanistici, stimare i costi di intervento — anche quelli nascosti che nessuno valuta mai — e costruire uno scenario di uscita realistico. E poi, se decidi di procedere, devi saper gestire ogni fase senza perdere margine lungo la strada.',
    nostroRuolo:
      'Analizziamo l’operazione nel dettaglio e ti affianchiamo nelle fasi critiche — dalla trattativa alla vendita. Quanto vuoi delegare lo decidi tu.',
    compenso: 'Fee fissa all’avvio + percentuale sul valore di vendita al rogito.',
  },
  {
    label: 'Linea B',
    titolo: 'Non vuoi cercare, vuoi solo investire',
    descrizione:
      'Non hai tempo o voglia di fare scouting. Non vuoi passare mesi a valutare immobili per trovarne uno che vale davvero. Vuoi mettere il capitale su un’operazione già analizzata e strutturata.',
    nostroRuolo:
      'Identifichiamo noi le operazioni, le analizziamo, le strutturiamo finanziariamente e te le portiamo sul tavolo. Tu valuti e decidi.',
    compenso: 'Fee di accesso all’operazione + percentuale sul valore di vendita al rogito.',
  },
]

export default function DueLinee() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-background py-20 lg:py-32 border-t border-primary/10" data-section-tone="light">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">

        <motion.span
          className="font-label text-[12px] uppercase tracking-[0.2em] text-primary/70 block mb-8"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Il servizio
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
          text="Due modi di lavorare con noi."
          className="font-heading font-light italic text-primary max-w-3xl"
          style={{
            fontSize: 'clamp(2.1rem, 4.2vw, 4rem)',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
          }}
          delay={shouldReduce ? 0 : 0.06}
          stagger={0.04}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-14 lg:mt-20">
          {linee.map((l, i) => (
            <motion.div
              key={l.label}
              className={`pt-10 pb-10 border-t border-primary/15 ${
                i === 0 ? 'lg:pr-12 lg:border-r lg:border-primary/15' : 'lg:pl-12'
              }`}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{
                duration: 0.85,
                delay: shouldReduce ? 0 : i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-accent block mb-5">
                {l.label}
              </span>
              <h3
                className="font-heading font-light italic text-primary mb-6"
                style={{
                  fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                  lineHeight: '1.2',
                  letterSpacing: '-0.015em',
                }}
              >
                {l.titolo}
              </h3>
              <p className="font-body font-light text-primary/75 text-[14px] md:text-[15px] leading-relaxed mb-5 max-w-[58ch]">
                {l.descrizione}
              </p>
              <p className="font-body text-primary text-[14px] md:text-[15px] leading-relaxed mb-8 max-w-[58ch]">
                {l.nostroRuolo}
              </p>
              <div className="border-t border-primary/15 pt-6">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/60 mb-2">
                  Compenso
                </p>
                <p className="font-body text-primary/80 text-[13.5px] leading-relaxed">
                  {l.compenso}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
