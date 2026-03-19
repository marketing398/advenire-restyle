import type { Metadata } from 'next'
import { fonts } from '@/lib/fonts'
import '@/app/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import SmoothScroll from '@/components/ui/SmoothScroll'
import PageTransition from '@/components/ui/PageTransition'

export const metadata: Metadata = {
  title: {
    default: 'Advenire Private Wealth',
    template: '%s | Advenire',
  },
  description: 'Ricchezza adattiva. Eredità duratura.',
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
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
