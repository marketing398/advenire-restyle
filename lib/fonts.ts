import { Cormorant_Garamond, Inter, Space_Mono } from 'next/font/google'

export const heading = Cormorant_Garamond({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading-var',
})

export const body = Inter({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body-var',
})

export const label = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-label-var',
})

export const fonts = { heading, body, label }
