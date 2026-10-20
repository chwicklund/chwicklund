import { useRef } from 'react'
import site from '../content/site.json'
import { photo, isPortrait } from '../lib/img.js'

const { photos } = site

// Portraits stand alone as tall modules; landscapes alternate between a stacked pair and a wide frame.
function toModules(items) {
  const modules = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const next = items[i + 1]
    if (isPortrait(item.file)) modules.push({ kind: 'tall', items: [item] })
    else if (next && !isPortrait(next.file) && modules.at(-1)?.kind !== 'pair') {
      modules.push({ kind: 'pair', items: [item, next] })
      i++
    } else modules.push({ kind: 'wide', items: [item] })
  }
  return modules
}

const modules = toModules(photos.items)

// Lets a mouse drag the row sideways; touch and trackpads scroll it natively.
function useDragScroll() {
  const ref = useRef(null)
  const drag = useRef(null)
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    drag.current = { x: e.clientX, left: ref.current.scrollLeft }
    ref.current.classList.add('is-dragging')
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    ref.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x)
  }
  const end = () => {
    drag.current = null
    ref.current?.classList.remove('is-dragging')
  }
  return { ref, onPointerDown, onPointerMove, onPointerUp: end, onPointerLeave: end }
}

export default function Photos() {
  const drag = useDragScroll()
  return (
    <section id="photos" className="photos" aria-labelledby="photos-heading">
      <div className="photos__head">
        <h2 id="photos-heading" className="section-title" data-reveal>{photos.heading}</h2>
        <p className="photos__count" data-reveal style={{ '--d': 1 }}>
          {photos.items.length} {photos.countLabel}
        </p>
      </div>
      <p className="photos__intro" data-reveal style={{ '--d': 2 }}>{photos.intro}</p>

      <div className="photos__row" tabIndex={0} role="region" aria-label={photos.regionLabel} {...drag}>
        {modules.map((m, i) => (
          <div key={i} className={`module module--${m.kind}`} data-reveal-photo>
            {m.items.map((item) => (
              <div key={item.file} className="shutter">
                <img {...photo(item.file, m.kind === 'wide' ? '80vw' : '45vw')} alt={item.alt} loading="lazy" draggable="false" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
