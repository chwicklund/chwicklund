import { useEffect, useRef, useState } from 'react'
import site from './content/site.json'
import Stage from './components/Stage.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Photos from './components/Photos.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import useActiveFrame from './lib/useActiveFrame.js'

const { hero, projects, stages } = site

// Matches the stacked phone layout in index.css: there the stages don't stay on screen, so they hold their opening frame.
const STACKED = '(max-width: 900px), (max-height: 520px) and (orientation: landscape)'
function useStacked() {
  const [stacked, setStacked] = useState(() => matchMedia(STACKED).matches)
  useEffect(() => {
    const mq = matchMedia(STACKED)
    const onChange = () => setStacked(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return stacked
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    document.querySelectorAll('[data-reveal], [data-reveal-photo]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  const workRef = useRef(null)
  const lettersRef = useRef(null)
  const scrolledTo = useActiveFrame(workRef, 'home')
  const [hovered, setHovered] = useState(null)
  const stacked = useStacked()
  const workActive = stacked ? 'home' : hovered ?? scrolledTo
  const lettersScrolledTo = useActiveFrame(lettersRef, 'about')
  const lettersActive = stacked ? 'about' : lettersScrolledTo
  useReveal()

  // A link straight to a section (#about) scrolls there once the page has rendered.
  useEffect(() => {
    const target = location.hash && document.getElementById(location.hash.slice(1))
    if (target) target.scrollIntoView({ behavior: 'instant' })
  }, [])

  const workFrames = [
    { key: 'home', kind: 'photo', photo: hero.photo, alt: hero.photoAlt },
    ...projects.items.map((p) => ({ key: `project-${p.id}`, ...p.stage })),
  ]
  const letterFrames = [
    { key: 'about', kind: 'photo', ...stages.about },
    { key: 'contact', kind: 'photo', ...stages.contact },
  ]

  return (
    <>
      <a className="skip" href="#projects">Skip to projects</a>
      <div className="split split--work" ref={workRef}>
        <main className="split__col">
          <Hero />
          <Projects active={workActive} onHover={setHovered} />
        </main>
        <div className="split__stage">
          <Stage frames={workFrames} active={workActive} />
        </div>
      </div>

      <div className="split split--letters" ref={lettersRef}>
        <div className="split__stage">
          <Stage frames={letterFrames} active={lettersActive} />
        </div>
        <div className="split__col">
          <About />
          <Contact />
        </div>
      </div>

      {/* Not in the navigation: the photographs are for whoever scrolls this far. */}
      <Photos />

      <Footer />
    </>
  )
}
