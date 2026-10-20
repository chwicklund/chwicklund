import site from '../content/site.json'
import { photo } from '../lib/img.js'

const { about } = site

// Wraps the first occurrence of `phrase` in a marker highlight.
function marked(text, phrase) {
  const at = phrase ? text.indexOf(phrase) : -1
  if (at < 0) return text
  return (
    <>
      {text.slice(0, at)}
      <mark>{phrase}</mark>
      {text.slice(at + phrase.length)}
    </>
  )
}

export default function About() {
  return (
    <section id="about" className="about" data-frame="about" aria-labelledby="about-heading">
      <div className="letter">
        <h2 id="about-heading" className="section-title" data-reveal>{about.heading}</h2>
        <img className="letter__portrait" {...photo(about.portrait, '44px')} width="44" height="44" alt={about.portraitAlt} data-reveal style={{ '--d': 1 }} />
        {about.paragraphs.map((p, i) => (
          <p key={i} data-reveal style={{ '--d': i + 2 }}>{marked(p, about.markedPhrase)}</p>
        ))}
        <p className="letter__signoff" data-reveal>{about.signoff}</p>
        <p className="letter__role" data-reveal style={{ '--d': 1 }}>{about.role}</p>
      </div>
    </section>
  )
}
