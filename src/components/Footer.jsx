import site from '../content/site.json'
import { photo } from '../lib/img.js'

const { footer, person } = site

export default function Footer() {
  return (
    <footer className="footer">
      <div className="film film--thin" aria-hidden="true">
        {Array.from({ length: 40 }, (_, i) => <span key={i} />)}
      </div>
      <div className="footer__photo">
        <img {...photo(footer.photo, '50vw')} alt={footer.photoAlt} loading="lazy" style={{ '--focus': footer.photoFocus }} />
      </div>
      <div className="footer__menu">
        <p className="footer__wordmark">{person.wordmark}</p>
        <ul className="menu">
          {footer.menu.map((m, i) => (
            <li key={m.href} data-reveal style={{ '--d': i }}><a href={m.href}>{m.label}</a></li>
          ))}
        </ul>
        <div className="footer__blocks">
          {footer.blocks.map((b) => (
            <div key={b.heading}>
              <h3>{b.heading}</h3>
              {b.lines.map((l) => (
                <p key={l.text}><a className="link" href={l.href}>{l.text}</a></p>
              ))}
            </div>
          ))}
        </div>
        <p className="footer__legal">{footer.legal}</p>
      </div>
    </footer>
  )
}
