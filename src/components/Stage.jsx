import site from '../content/site.json'
import { photo } from '../lib/img.js'

// The fixed half of a split block. Every frame is rendered once and the active one fades in.
export function Frame({ frame, sizes = '47vw', eager = false }) {
  switch (frame.kind) {
    case 'photo':
      return (
        <img
          className="frame__photo"
          {...photo(frame.photo, sizes)}
          alt={frame.alt ?? ''}
          style={frame.position ? { objectPosition: frame.position } : undefined}
          loading={eager ? 'eager' : 'lazy'}
          draggable="false"
        />
      )
    case 'shot':
      return (
        <figure className="frame__object">
          <img src={frame.src} width={frame.width} height={frame.height} alt={frame.alt} loading="lazy" />
        </figure>
      )
    case 'code':
      return (
        <div className="frame__object" data-ui>
          <pre className="frame__code"><code>{frame.code}</code></pre>
        </div>
      )
    case 'self':
      return (
        <div className="frame__object" data-ui>
          <pre className="frame__code"><code>{`"hero": ${JSON.stringify({ sentence: site.hero.sentence, photo: site.hero.photo }, null, 2)}`}</code></pre>
        </div>
      )
    case 'table':
      return (
        <div className="frame__object" data-ui>
          <table className="frame__table">
            <tbody>
              {frame.rows.map(([k, v]) => (
                <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    default:
      return null
  }
}

export default function Stage({ frames, active }) {
  const current = frames.find((f) => f.key === active) ?? frames[0]
  return (
    <div className="stage">
      {frames.map((f, i) => (
        <div
          key={f.key + (f.photo ?? '')}
          className={`frame frame--${f.kind}${f.key === current.key ? ' is-active' : ''}`}
          aria-hidden={f.key === current.key ? undefined : true}
        >
          <Frame frame={f} eager={i === 0} />
        </div>
      ))}
    </div>
  )
}
