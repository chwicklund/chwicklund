// Turns the full-resolution originals in photos/ into web-sized copies in public/img/.
// Run with `npm run images` after adding or replacing a photo in photos/.
import sharp from 'sharp'
import { readdir, mkdir, writeFile, readFile, unlink } from 'node:fs/promises'
import { join, parse } from 'node:path'

const SRC = 'photos'
const OUT = 'public/img'
const WIDTHS = [800, 1600, 2400]

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f))
const meta = {}

for (const file of files) {
  const { name } = parse(file)
  const image = sharp(join(SRC, file)).rotate()
  const { width, height } = await image.metadata()
  meta[name] = { width, height }
  for (const w of WIDTHS) {
    await image.clone().resize({ width: Math.min(w, width) }).webp({ quality: 78 }).toFile(join(OUT, `${name}-${w}.webp`))
  }
  console.log(`${file} → ${WIDTHS.length} sizes`)
}

// Web copies whose original has been removed from photos/ are deleted, so they stop shipping.
const SIZED = /^(.+)-\d+\.webp$/
for (const f of await readdir(OUT)) {
  const m = f.match(SIZED)
  if (m && !(m[1] in meta)) { await unlink(join(OUT, f)); console.log(`removed ${f}`) }
}

// Sizes the site reads for width/height attributes. Generated: do not edit by hand.
await writeFile('src/content/images.json', JSON.stringify({ widths: WIDTHS, images: meta }, null, 2) + '\n')
console.log(`Wrote src/content/images.json (${files.length} images)`)

// The link-preview image (og:image) is a 1200×630 crop of the hero photograph.
const { hero } = JSON.parse(await readFile('src/content/site.json', 'utf8'))
const heroFile = files.find((f) => parse(f).name === hero.photo)
// OG_FOCUS is how far down the photograph (0 top, 1 bottom) the crop centres: the skyline in fr33dom.
const OG_FOCUS = 0.6
const scaled = await sharp(join(SRC, heroFile)).rotate().resize({ width: 1200 }).toBuffer()
const { height } = await sharp(scaled).metadata()
const top = Math.round(Math.min(height - 630, Math.max(0, height * OG_FOCUS - 315)))
await sharp(scaled).extract({ left: 0, top, width: 1200, height: Math.min(630, height) }).jpeg({ quality: 82, mozjpeg: true }).toFile('public/og.jpg')
console.log(`Wrote public/og.jpg from ${heroFile}`)
