import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { categories, products } from '../data/products'
import { IconArrow, IconChevron } from './Icons'

const ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

// per-category numbers shown on the cards
const stats = categories.map((c) => {
  const items = products.filter((p) => p.category === c.id)
  const sizes = ORDER.filter((s) => items.some((p) => p.sizes.includes(s)))
  return {
    ...c,
    count: items.length,
    colors: items.reduce((n, p) => n + p.variants.length, 0),
    from: Math.min(...items.map((p) => p.price)),
    sizes,
  }
})

// a row of cards; the active one grows, turns orange and shows its details
export default function CategoryShowcase() {
  const { t, pick, formatPrice } = useLang()
  const [active, setActive] = useState(1)
  const c = t.home.cat

  // hover intent: only switch once the pointer rests on a card, so sweeping across
  // the row doesn't make cards resize under the cursor
  const timer = useRef(0)
  const hover = (i) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setActive(i), 120)
  }
  const cancel = () => clearTimeout(timer.current)
  useEffect(() => cancel, [])

  return (
    <div className="cat-show">
      <div className="cat-show__row">
        {stats.map((s, i) => {
          const on = i === active
          const url = `/san-pham?danh-muc=${s.id}`
          return (
            <article
              key={s.id}
              className={`cat-show__card ${on ? 'is-active' : ''}`}
              onMouseEnter={() => hover(i)}
              onMouseLeave={cancel}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <img src={s.image} alt="" loading="lazy" />
              <h3>
                <Link to={url}>{pick(s.name)}</Link>
              </h3>

              <div className="cat-show__body">
                <dl className="cat-show__details" aria-hidden={!on}>
                  {s.sizes.length > 0 && (
                    <div>
                      <dt>{c.size}</dt>
                      <dd className="cat-show__sizes">
                        {s.sizes.map((z) => (
                          <span key={z}>{z}</span>
                        ))}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt>{c.models}</dt>
                    <dd>
                      {s.count} · {s.colors} {t.common.colors}
                    </dd>
                  </div>
                  <div>
                    <dt>{c.from}</dt>
                    <dd>
                      <strong>{formatPrice(s.from)}</strong>
                    </dd>
                  </div>
                  <Link to={url} className="cat-show__cta" tabIndex={on ? 0 : -1}>
                    {t.common.viewAll} <IconArrow width={15} height={15} />
                  </Link>
                </dl>
                <dl className="cat-show__mini" aria-hidden={on}>
                  <div>
                    <dt>{c.models}</dt>
                    <dd>{s.count}</dd>
                  </div>
                  <div>
                    <dt>{c.colors}</dt>
                    <dd>{s.colors}</dd>
                  </div>
                  <div>
                    <dt>{c.from}</dt>
                    <dd>{formatPrice(s.from)}</dd>
                  </div>
                </dl>
              </div>
            </article>
          )
        })}
      </div>
      <button type="button" className="cat-show__next" onClick={() => setActive((a) => (a + 1) % stats.length)} aria-label={t.lookbook.next}>
        <IconChevron width={22} height={22} />
      </button>
    </div>
  )
}
