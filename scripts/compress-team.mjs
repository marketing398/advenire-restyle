import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

const dir = 'public/images/team'
const files = readdirSync(dir).filter(f => f.endsWith('.png'))

for (const f of files) {
  const src = join(dir, f)
  const dest = src.replace(/\.png$/, '.webp')
  const before = statSync(src).size
  await sharp(src)
    .resize(900, 900, { fit: 'cover' })
    .webp({ quality: 82, effort: 6 })
    .toFile(dest)
  const after = statSync(dest).size
  console.log(`${f}: ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB (${((1-after/before)*100).toFixed(0)}% ↓)`)
}
