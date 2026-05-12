import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.advenire.it'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/chi-siamo`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/servizi/investimenti-immobiliari`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/servizi/nuove-costruzioni`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/contatti`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/cookie-policy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
