/**
 * Converts all PNG images in public/images/ to optimized WebP.
 * - Services images: max 1200px wide, quality 80
 * - Logos: max 800px wide, quality 80
 * - Icons: max 400px wide, quality 80
 * Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp'

// Allow very large input images
sharp.cache(false)
sharp.simd(true)
import { readdir, stat } from 'fs/promises'
import { join, basename, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = join(__dirname, '..', 'public', 'images')

const QUALITY = 80

// Max width rules based on filename/path
function getMaxWidth(filePath) {
  const name = basename(filePath).toLowerCase()
  if (name.startsWith('icon-')) return 400
  if (name.startsWith('logo')) return 800
  if (filePath.includes('services')) return 1200
  return 1200
}

async function findPngs(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const results = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...await findPngs(full))
    } else if (extname(entry.name).toLowerCase() === '.png') {
      results.push(full)
    }
  }
  return results
}

async function convert(pngPath) {
  const maxW = getMaxWidth(pngPath)
  const webpPath = pngPath.replace(/\.png$/i, '.webp')
  const name = basename(pngPath)

  const beforeStat = await stat(pngPath)
  const beforeKB = (beforeStat.size / 1024).toFixed(0)

  await sharp(pngPath, { limitInputPixels: false })
    .resize({ width: maxW, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(webpPath)

  const afterStat = await stat(webpPath)
  const afterKB = (afterStat.size / 1024).toFixed(0)
  const savings = (100 - (afterStat.size / beforeStat.size) * 100).toFixed(1)

  console.log(`${name}: ${beforeKB}KB -> ${afterKB}KB (${savings}% smaller)`)
}

const pngs = await findPngs(IMAGES_DIR)
console.log(`Found ${pngs.length} PNG files\n`)

for (const png of pngs) {
  await convert(png)
}

console.log('\nDone! All images converted to WebP.')
