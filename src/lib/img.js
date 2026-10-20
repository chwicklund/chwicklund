import manifest from '../content/images.json'

// Props for an <img> of one of the photographs in photos/, built by `npm run images`.
// Each size is capped at the original's width, so small originals list fewer candidates.
export function photo(name, sizes = '100vw') {
  const meta = manifest.images[name]
  if (!meta) throw new Error(`Unknown photo "${name}". Add it to photos/ and run npm run images.`)
  const seen = new Set()
  const candidates = manifest.widths
    .map((w) => ({ w, actual: Math.min(w, meta.width) }))
    .filter(({ actual }) => !seen.has(actual) && seen.add(actual))
  return {
    src: `/img/${name}-${candidates[Math.min(1, candidates.length - 1)].w}.webp`,
    srcSet: candidates.map(({ w, actual }) => `/img/${name}-${w}.webp ${actual}w`).join(', '),
    sizes,
    width: meta.width,
    height: meta.height,
  }
}

export function isPortrait(name) {
  const meta = manifest.images[name]
  return meta.height > meta.width
}
