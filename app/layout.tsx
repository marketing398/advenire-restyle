import type { Metadata } from 'next'
import { fonts } from '@/lib/fonts'
import '@/app/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import SmoothScroll from '@/components/ui/SmoothScroll'
import PageTransition from '@/components/ui/PageTransition'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'

const SITE_URL = 'https://www.advenire.it'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Advenire — Consulenza Patrimoniale Immobiliare',
    template: '%s | Advenire',
  },
  description:
    "Consulenza patrimoniale e immobiliare su misura. Investimenti, costruzioni consapevoli e gestione progetti chiavi in mano.",
  applicationName: 'Advenire',
  authors: [{ name: 'Advenire S.r.l.' }],
  keywords: [
    'consulenza patrimoniale',
    'investimenti immobiliari',
    'bioedilizia',
    'nuove costruzioni',
    'consulenza immobiliare',
  ],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: SITE_URL,
    siteName: 'Advenire',
    title: 'Advenire — Consulenza Patrimoniale Immobiliare',
    description:
      "Consulenza patrimoniale e immobiliare su misura. Investimenti, costruzioni consapevoli e gestione progetti chiavi in mano.",
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Advenire — Consulenza Patrimoniale Immobiliare',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advenire — Consulenza Patrimoniale Immobiliare',
    description:
      "Consulenza patrimoniale e immobiliare su misura. Investimenti, costruzioni consapevoli e gestione progetti chiavi in mano.",
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="it"
      className={`${fonts.heading.variable} ${fonts.body.variable} ${fonts.label.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Advenire',
              legalName: 'Advenire S.r.l.',
              url: SITE_URL,
              logo: `${SITE_URL}/images/icon-advenire.png`,
              description:
                'Consulenza patrimoniale e immobiliare su misura. Investimenti, costruzioni consapevoli e gestione progetti chiavi in mano.',
              email: 'info@advenire.it',
              telephone: '+39 351 626 7856',
              taxID: '02748220353',
              vatID: 'IT02748220353',
              areaServed: { '@type': 'Country', name: 'Italia' },
              address: { '@type': 'PostalAddress', addressCountry: 'IT' },
              sameAs: [],
            }),
          }}
        />
        <a
          href="#contenuto-principale"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-background focus:px-4 focus:py-2 focus:rounded-sm focus:font-label focus:text-[12px] focus:uppercase focus:tracking-[0.18em] focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
        >
          Salta al contenuto
        </a>
        <SmoothScroll>
          <ScrollProgressBar />
          <CustomCursor />
          <Navbar />
          <PageTransition>
            <div id="contenuto-principale">
              {children}
            </div>
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
