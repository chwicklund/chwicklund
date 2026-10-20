import site from '../content/site.json'
import { Frame } from './Stage.jsx'

const { projects } = site

// The names are the index: the active one (scrolled to, hovered or focused) is in full ink and on the stage.
export default function Projects({ active, onHover }) {
  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="section-title" data-reveal>{projects.heading}</h2>
      <p className="lead projects__intro" data-reveal style={{ '--d': 1 }}>{projects.intro}</p>

      <ul className="names" onPointerLeave={(e) => e.pointerType === 'mouse' && onHover(null)}>
        {projects.items.map((p) => {
          const key = `project-${p.id}`
          return (
            <li
              key={p.id}
              id={p.id}
              className={`names__item${active === key ? ' is-active' : ''}`}
              data-frame={key}
              onPointerEnter={(e) => e.pointerType === 'mouse' && onHover(key)}
              onFocus={() => onHover(key)}
              onBlur={() => onHover(null)}
            >
              <div className={`project__inline frame--${p.stage.kind}`} data-reveal>
                <Frame frame={p.stage} sizes="100vw" />
              </div>
              <div className="names__row" data-reveal>
                <h3 className="names__name">{p.name}</h3>
                <p className="names__what">{p.disciplines}, {p.year}</p>
              </div>
              <div className="names__detail" data-reveal style={{ '--d': 1 }}>
                <p className="names__role">{p.role}</p>
                <p>{p.description}</p>
                <p className="names__stack">{p.stack}</p>
                {p.url && (
                  <p>
                    <a className="link link--strong" href={p.url}>
                      {projects.linkLabel} {p.url.replace(/^https?:\/\//, '')}
                    </a>
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
