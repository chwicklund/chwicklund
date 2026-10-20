import site from '../content/site.json'

const { contact, person } = site

function mailto(note) {
  const q = new URLSearchParams({ subject: contact.subject, body: note })
  return `mailto:${person.email}?${q.toString().replace(/\+/g, '%20')}`
}

export default function Contact() {
  const onSubmit = (e) => {
    e.preventDefault()
    const note = new FormData(e.currentTarget).get('body')
    location.href = mailto(String(note ?? ''))
  }

  return (
    <section id="contact" className="contact" data-frame="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="contact__prompt" data-reveal>
        <span className="contact__muted">{contact.promptMuted}</span>{' '}
        <span>{contact.promptInk}</span>
      </h2>

      {/* Without script the form still opens the mail app through the mailto action. */}
      <form className="contact__form" action={`mailto:${person.email}`} method="get" onSubmit={onSubmit} data-reveal style={{ '--d': 1 }}>
        <label className="visually-hidden" htmlFor="note">{contact.fieldLabel}</label>
        <input id="note" name="body" type="text" placeholder={contact.placeholder} autoComplete="off" required />
        <input type="hidden" name="subject" value={contact.subject} />
        <button type="submit" className="contact__send" aria-label={contact.submitLabel}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </button>
      </form>
      <p className="contact__after" data-reveal style={{ '--d': 2 }}>{contact.after}</p>

      <dl className="contact__rows" data-reveal style={{ '--d': 3 }}>
        {contact.rows.map((r) => (
          <div key={r.label}>
            <dt>{r.label}</dt>
            <dd>{r.href ? <a className="link" href={r.href}>{r.value}</a> : r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
