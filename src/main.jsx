import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import site from './content/site.json'
import App from './App.jsx'
import './palettes.css'
import './index.css'

// GitHub Pages answers unknown paths with 404.html (this app). Old links to the multi-page site
// (/photos.html, /about) land on the matching section; anything else lands on the home page.
const SECTIONS = ['projects', 'photos', 'about', 'contact']
const old = location.pathname.replace(/^\/|\.html$|\/$/g, '')
if (old) history.replaceState(null, '', SECTIONS.includes(old) ? `/#${old}` : '/')

document.documentElement.classList.add('js')
document.title = site.meta.title
document.querySelector('meta[name="description"]')?.setAttribute('content', site.meta.description)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

