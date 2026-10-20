import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const SITE_URL = 'https://chwicklund.com'

// Writes the title, description and link-preview tags into index.html from site.json,
// so crawlers and link previews (which don't run JavaScript) see the same words as the page.
function siteMeta() {
  const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      const { meta, person } = JSON.parse(readFileSync('src/content/site.json', 'utf8'))
      const title = escape(meta.title)
      const description = escape(meta.description)
      return html
        .replace('<title>Charles Wicklund</title>', `<title>${title}</title>`)
        .replace('<meta name="description" content="">', [
          `<meta name="description" content="${description}">`,
          `<meta name="author" content="${escape(person.name)}">`,
          `<link rel="canonical" href="${SITE_URL}/">`,
          `<meta property="og:type" content="website">`,
          `<meta property="og:url" content="${SITE_URL}/">`,
          `<meta property="og:title" content="${title}">`,
          `<meta property="og:description" content="${description}">`,
          `<meta property="og:image" content="${SITE_URL}/og.jpg">`,
          `<meta property="og:image:width" content="1200">`,
          `<meta property="og:image:height" content="630">`,
          `<meta name="twitter:card" content="summary_large_image">`,
        ].join('\n    '))
    },
  }
}

// Served from the root of chwicklund.com (see public/CNAME), so base stays '/'.
export default defineConfig({
  plugins: [react(), siteMeta()],
  base: '/',
})
