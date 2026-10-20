import site from '../content/site.json'

const { person, hero, nav } = site

// The card's top band is a strip of film perforations, drawn as filled blocks.
const PERFORATIONS = 48

export default function Hero() {
  return (
    <section id="home" className="hero" data-frame="home">
      <div className="card">
        <div className="film" aria-hidden="true">
          {Array.from({ length: PERFORATIONS }, (_, i) => <span key={i} />)}
        </div>
        <div className="card__body">
          <h1 className="hero__name">
            {person.name.split(' ').map((word) => <span key={word}>{word}</span>)}
          </h1>
          <p className="hero__sentence" data-reveal style={{ '--d': 1 }}>{hero.sentence}</p>
          <a className="button" href={nav.action.href} data-reveal style={{ '--d': 2 }}>{nav.action.label}</a>
        </div>
        <nav className="card__links" aria-label="Main">
          {nav.links.map((l) => (
            <a key={l.href} className="link" href={l.href}>{l.label}</a>
          ))}
        </nav>
      </div>
    </section>
  )
}
