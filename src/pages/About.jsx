import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'
import { products, getProduct } from '../data/products'
import { store } from '../data/store'
import SocialLinks from '../components/SocialLinks'
import { IconArrow, IconBadge, IconCart, IconCheck, IconChevron, IconPin, IconShield, IconUser } from '../components/Icons'

const L = '/images/lifestyle/'

// best sellers and new arrivals for the carousel
const PICKS = products.filter((p) => p.badge)
const TOP = getProduct('tw-786-city')
const SPEC_ICONS = [IconShield, IconBadge, IconCheck]
// photo strip along the bottom of the hero
const HERO_STRIP = [
  `${L}workshop-wide.jpg`,
  `${L}mood-open-face.jpg`,
  `${L}ride-your-style.jpg`,
  `${L}flying-tigers-table.jpg`,
  `${L}mood-three-quarter.jpg`,
  `${L}mood-full-face.jpg`,
  `${L}mexican-butcher-wide.jpg`,
  `${L}mood-large-size.jpg`,
]
const VALUE_PHOTOS = [`${L}mood-three-quarter.jpg`, `${L}mood-full-face.jpg`, `${L}mood-open-face.jpg`]

// organic paint splash in brand orange
function Splash({ className = '' }) {
  return (
    <svg className={`splash ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <path d="M96 18c18 4 22 26 40 24s30-18 40-2-8 30 2 46 22 20 14 38-30 10-38 26-2 34-22 38-26-18-44-16-30 22-44 8 4-30-8-44-34-16-28-36 30-14 34-32-6-36 12-46 28 12 42 10z" />
      <circle cx="176" cy="22" r="7" />
      <circle cx="18" cy="168" r="9" />
      <circle cx="190" cy="150" r="4" />
      <circle cx="30" cy="30" r="4" />
    </svg>
  )
}

export default function About() {
  const { t, pick, formatPrice } = useLang()
  const { add } = useCart()
  const a = t.about
  const [start, setStart] = useState(0)
  const visible = [0, 1, 2].map((i) => PICKS[(start + i) % PICKS.length])
  const shift = (d) => setStart((s) => (s + d + PICKS.length) % PICKS.length)

  return (
    <>
      <h1 className="sr-only">{a.title}</h1>

      {/* hero: WE ( text ) ARE over a strip of photos */}
      <section className="ab-hero">
        <div className="container ab-hero__inner">
          <span className="ab-hero__corner ab-hero__corner--tl">Since Seagull</span>
          <span className="ab-hero__corner ab-hero__corner--tr">Tân Sơn Nhất</span>
          <span className="ab-hero__corner ab-hero__corner--bl">Classic</span>
          <span className="ab-hero__corner ab-hero__corner--br">Ride free</span>
          <h2 className="ab-we">
            <span>{a.heroLeft}(</span>
            <p>{a.heroText}</p>
            <span>){a.heroRight}</span>
          </h2>
        </div>
        <div className="ab-strip-row">
          {HERO_STRIP.map((src, i) => (
            <figure key={src} className="ab-strip-row__item" style={{ '--h': `${[64, 52, 80, 58, 70, 54, 84, 60][i]}%`, '--i': i }}>
              <figcaption>{String(i + 1).padStart(3, '0')}</figcaption>
              <img src={src} alt="" loading={i < 4 ? 'eager' : 'lazy'} />
            </figure>
          ))}
        </div>
      </section>

      {/* a new way to ride: product carousel */}
      <section className="ab-ride">
        <div className="container">
          <h2 className="ab-split">
            {a.rideLight} <strong>{a.rideBold}</strong>
            <small>{a.rideEyebrow}</small>
          </h2>
          <div className="ab-carousel">
            <button type="button" className="ab-carousel__nav" onClick={() => shift(-1)} aria-label={t.lookbook.prev}>
              <IconChevron dir="left" width={26} height={26} />
            </button>
            <div className="ab-carousel__track">
              {visible.map((p) => (
                <article key={p.id} className="ab-pick">
                  <img src={p.variants[0].image} alt={pick(p.name)} loading="lazy" />
                  <h3>
                    <strong>{p.sku}</strong> {pick(p.name).replace(p.sku, '').trim()}
                  </h3>
                  <p>{pick(p.short)}</p>
                  <Link to={`/san-pham/${p.id}`}>{a.moreInfo}</Link>
                </article>
              ))}
            </div>
            <button type="button" className="ab-carousel__nav" onClick={() => shift(1)} aria-label={t.lookbook.next}>
              <IconChevron width={26} height={26} />
            </button>
          </div>
        </div>
      </section>

      {/* brand story on an orange-tinted rider photo */}
      <section className="ab-story">
        <div className="ab-story__photo">
          <img src={`${L}ride-your-style.jpg`} alt="" loading="lazy" />
        </div>
        <Splash className="ab-story__splash" />
        <div className="container ab-story__inner">
          <div className="ab-story__text">
            <h2 className="ab-split ab-split--light">
              <strong>SEAGULL</strong> Helmets
              <small>{a.storyRole}</small>
            </h2>
            <p className="ab-story__lead">{a.heading}</p>
            <p>{a.p1}</p>
            <p>{a.p2}</p>
            <p>{a.p3}</p>
            <div className="ab-story__share">
              <span>{a.share}</span>
              <SocialLinks />
            </div>
          </div>
        </div>
      </section>

      {/* best seller with key specs and store numbers */}
      {TOP && (
        <section className="ab-top">
          <img className="ab-top__ghost" src={`${L}mood-three-quarter.jpg`} alt="" loading="lazy" />
          <div className="container ab-top__inner">
            <h2 className="ab-split ab-top__title">
              <strong>{TOP.sku}</strong> {pick(TOP.name).replace(TOP.sku, '').trim()}
              <small>{a.topEyebrow}</small>
            </h2>
            <div className="ab-top__art">
              <img src={TOP.variants[0].image} alt={pick(TOP.name)} loading="lazy" />
              <span className="ab-top__price">
                <Splash />
                <b>{formatPrice(TOP.price)}</b>
              </span>
            </div>
            <div className="ab-top__specs">
              <ul>
                {pick(TOP.specs)
                  .slice(0, 3)
                  .map((s, i) => {
                    const Icon = SPEC_ICONS[i]
                    return (
                      <li key={s}>
                        <Icon width={26} height={26} />
                        {s}
                      </li>
                    )
                  })}
              </ul>
              <button type="button" className="ab-top__cart" onClick={() => add(TOP.id, TOP.variants[0].id, TOP.sizes[1] || TOP.sizes[0] || '')}>
                <IconCart width={16} height={16} /> {t.common.addToCart}
              </button>
            </div>
            <ul className="ab-top__stats">
              {a.stats.map((s) => (
                <li key={s.label}>
                  <strong>{s.num}</strong>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* values as photo strips, then the store card */}
      <section className="ab-team">
        <div className="ab-team__strips">
          {a.values.map((v, i) => (
            <div key={v.title} className="ab-strip">
              <img src={VALUE_PHOTOS[i]} alt="" loading="lazy" />
              <div>
                <span>0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            </div>
          ))}
          <h2 className="ab-split ab-split--light ab-team__title">
            <strong>{a.valuesBold}</strong> {a.valuesLight}
            <small>{a.valuesTitle}</small>
          </h2>
        </div>
        <div className="ab-visit">
          <img src={`${L}flying-tigers-wide.jpg`} alt="" loading="lazy" />
          <Splash className="ab-visit__splash" />
          <div className="ab-visit__card">
            <h3>{a.visitTitle}</h3>
            <p>{a.visitText}</p>
            <p className="ab-visit__row">
              <IconUser width={16} height={16} /> {store.contactPerson} · {store.phone}
            </p>
            <p className="ab-visit__row">
              <IconPin width={16} height={16} /> {store.address}
            </p>
            <Link to="/lien-he" className="ab-visit__btn">
              {t.nav.contact} <IconArrow width={16} height={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
