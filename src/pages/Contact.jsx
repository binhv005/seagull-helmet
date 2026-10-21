import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { store } from '../data/store'
import { categories } from '../data/products'
import { IconBadge, IconChat, IconLoop, IconMail, IconPhone, IconSend, IconShield, IconTruck, IconUser } from '../components/Icons'

const P = '/images/products/'
// helmets lined up in the empty right side of the header card
const CARD_HELMETS = [`${P}tw-786-flying-tigers/cream.webp`, `${P}tw-500tx-fc-mexican-butcher/matte-iron.webp`, `${P}tw-863/ivory.webp`, `${P}tw-786-city/basil-green.webp`]

// scrolling word strip; the list is doubled so the loop is seamless
function Ticker({ words, dark = false }) {
  const items = [...words, ...words]
  return (
    <div className={`ct-ticker ${dark ? 'ct-ticker--dark' : ''}`} aria-hidden="true">
      <div className="ct-ticker__track">
        {items.map((w, i) => (
          <span key={i}>
            {w} <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Contact() {
  const { t, pick } = useLang()
  const c = t.contact
  const [sent, setSent] = useState(false)

  // No backend yet: connect to an email/form service before going live.
  const onSubmit = (e) => {
    e.preventDefault()
    e.target.reset()
    setSent(true)
  }

  return (
    <div className="ct">
      {/* light half: giant title, details and the form */}
      <section className="ct-top">
        {/* header: a cream folder card on a brown block with a stepped bottom edge */}
        <div className="ct-head">
          <div className="container">
            <p className="ct-head__note ct-head__note--top">{c.headNoteTop}</p>
            <div className="ct-card">
              <div className="ct-card__brand">
                <span className="ct-card__script">
                  Seagull<sup>™</sup>
                </span>
              </div>
              <h1 className="ct-card__title">{c.title}</h1>
              <div className="ct-card__helmets" aria-hidden="true">
                {CARD_HELMETS.map((src) => (
                  <img key={src} src={src} alt="" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <Ticker words={c.ticker} />

        <div className="container ct-grid">
          <aside className="ct-poster">
            <div className="ct-poster__frame">
              <svg className="ct-poster__art" viewBox="0 0 300 420" preserveAspectRatio="none" aria-hidden="true">
                {/* dark diagonal panel */}
                <path d="M196 0H300V420H128Z" fill="#3b2416" />
                {/* back wave */}
                <path className="ct-wave ct-wave--back" d="M0 300C40 270 70 300 104 282C140 262 150 230 190 238C226 246 236 214 268 206C286 202 300 214 300 214V420H0Z" fill="#b08d6c" />
                {/* splash drops on the dark panel */}
                <g className="ct-drops" fill="#8f7259">
                  <path d="M246 118C262 104 280 116 270 132C262 146 238 140 246 118Z" />
                  <path d="M270 158c10-6 20 2 14 10-6 8-18 4-14-10Z" />
                  <circle cx="232" cy="180" r="6" />
                  <path d="M206 92c8-10 22-6 18 6-4 10-20 8-18-6Z" />
                </g>
                {/* splash on the light side */}
                <g fill="#8f7259">
                  <path d="M0 206c14-12 30-6 30 6 0 14-18 18-30 10Z" />
                  <circle cx="22" cy="244" r="5" />
                </g>
                {/* front wave */}
                <path className="ct-wave ct-wave--front" d="M0 338C30 310 62 330 92 316C122 302 118 274 150 270C178 266 182 300 208 306C236 312 250 286 276 290C292 292 300 306 300 306V420H0Z" fill="#6f5442" />
                <path d="M0 372C34 356 70 376 104 364C140 352 160 330 196 338C230 346 252 372 300 360V420H0Z" fill="#4e3a2c" />
                {/* line down to the seagull */}
                <path d="M164 0C160 20 170 34 162 52" stroke="#3b2416" strokeWidth="1.6" fill="none" />
              </svg>
              <img className="ct-poster__gull" src="/images/favicon.png" alt="" aria-hidden="true" />
            </div>
            {/* the helmet leaps out of the frame */}
            <img className="ct-poster__helmet" src="/images/products/tw-500tx-fc-mexican-butcher/matte-iron.webp" alt="" aria-hidden="true" />
            <p className="ct-poster__info">
              {store.address}
              <br />
              <a href={`tel:${store.phoneRaw}`}>{store.phone}</a> · {pick(store.hours)}
            </p>
          </aside>

          <form className="ct-form" onSubmit={onSubmit}>
            <span className="ct-form__tape" aria-hidden="true" />
            <img className="ct-form__helmet" src="/images/products/tw-777p/ivory.webp" alt="" aria-hidden="true" />
            <p className="ct-form__eyebrow">{c.formEyebrow}</p>
            <h2>{c.formHeading}</h2>
            <p className="ct-form__sub">{c.formSub}</p>

            <label className="ct-field">
              <IconUser width={18} height={18} />
              <input name="name" required placeholder={`${c.name} *`} aria-label={c.name} />
            </label>
            <label className="ct-field">
              <IconPhone width={18} height={18} />
              <input name="phone" type="tel" required placeholder={`${c.phoneField} *`} aria-label={c.phoneField} />
            </label>
            <label className="ct-field">
              <IconMail width={18} height={18} />
              <input name="email" type="email" placeholder={c.email} aria-label={c.email} />
            </label>
            <label className="ct-field ct-field--select">
              <IconLoop width={18} height={18} />
              <select name="topic" required defaultValue="" aria-label={c.topic}>
                <option value="" disabled>
                  {c.topic} *
                </option>
                {categories.map((x) => (
                  <option key={x.id} value={x.id}>
                    {pick(x.name)}
                  </option>
                ))}
                {c.topics.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label className="ct-field ct-field--area">
              <IconChat width={18} height={18} />
              <textarea name="message" rows={5} required placeholder={`${c.message} *`} aria-label={c.message} />
            </label>

            {sent && <p className="ct-sent">{c.sent}</p>}
            <button type="submit">
              <IconSend width={18} height={18} /> {c.sendRequest}
            </button>

            <ul className="ct-perks">
              <li>
                <IconShield width={26} height={26} />
                {c.perks[0]}
              </li>
              <li>
                <IconTruck width={26} height={26} />
                {c.perks[1]}
              </li>
              <li>
                <IconBadge width={26} height={26} />
                {c.perks[2]}
              </li>
            </ul>
          </form>

          <p className="ct-coords" aria-hidden="true">
            / 10.8013
            <br />
            // 106.6553
          </p>
        </div>
      </section>

      {/* dark half: ticker and map */}
      <section className="ct-bottom">
        <Ticker words={c.ticker} dark />
        <iframe className="ct-map" title="SEAGULL HELMETS map" src={store.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </section>
    </div>
  )
}
