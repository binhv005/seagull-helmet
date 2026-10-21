import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'
import { categories, products } from '../data/products'
import { IconCart, IconChevron, IconClose, IconEye, IconFilter, IconGrid, IconList, IconSearch } from '../components/Icons'
import { noOrphan } from '../utils/text'
import PromoBanner from '../components/PromoBanner'

const PER_PAGE = 9
const PRICE_STEP = 50000
const PRICE_MIN = 0
const PRICE_MAX = Math.ceil(Math.max(...products.map((p) => p.price)) / PRICE_STEP) * PRICE_STEP
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].filter((s) => products.some((p) => p.sizes.includes(s)))

// colour families, matched against the start of each variant's Vietnamese colour name
const FAMILIES = [
  ['black', '#1f1b18', /^đen/],
  ['white', '#f3ead8', /^(trắng|kem|macchiato)/],
  ['silver', '#a8a6a2', /^(bạc|xám|xi măng|sắt|khói)/],
  ['blue', '#2f4f86', /^(xanh (đêm|thiên|ngọc|pastel|bạc|nhũ|sọc)|lửa xanh)/],
  ['green', '#7d8f5c', /^xanh (lá|rêu|húng|quân)/],
  ['red', '#a93a2c', /^(đỏ|hồng đậu|lửa bạc|italia)/],
  ['pink', '#e3a6b8', /^(hồng|tím)/],
  ['yellow', '#d9b13b', /^vàng/],
  ['brown', '#8a6a52', /^(nâu|trà sữa)/],
]

const familyOf = (variant) => {
  const name = variant.color.vi.toLowerCase().replace(/^(gấu|mèo|khủng long|sky guardians|ultimate) – /, '')
  return FAMILIES.find(([, , re]) => re.test(name))?.[0]
}

const toggle = (list, value) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

function FilterGroup({ title, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div className={`shop-filter ${open ? 'is-open' : ''}`}>
      <button type="button" className="shop-filter__head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>{title}</span>
        <i aria-hidden="true">{open ? '−' : '+'}</i>
      </button>
      {open && <div className="shop-filter__body">{children}</div>}
    </div>
  )
}

function ShopCard({ product, colors, view }) {
  const { t, pick, formatPrice } = useLang()
  const { add } = useCart()
  // with a colour filter on, show the first matching colourway
  const variant = (colors.length && product.variants.find((v) => colors.includes(familyOf(v)))) || product.variants[0]
  const url = `/san-pham/${product.id}?mau=${variant.id}`
  const count = product.variants.length

  return (
    <article className={`shop-card ${view === 'list' ? 'shop-card--row' : ''}`}>
      <Link to={url} className="shop-card__img">
        <img key={variant.id} src={variant.image} alt={pick(product.name)} loading="lazy" />
      </Link>
      <div className="shop-card__body">
        <h3 className="shop-card__name">
          <Link to={url}>{pick(product.name)}</Link>
        </h3>
        <p className="shop-card__tags">
          {product.badge && <span className={`shop-badge shop-badge--${product.badge}`}>{product.badge === 'new' ? t.common.new : t.common.hot}</span>}
          <span className="shop-card__dots" aria-hidden="true">
            {product.variants.slice(0, 5).map((v) => (
              <i key={v.id} style={{ background: FAMILIES.find(([key]) => key === familyOf(v))?.[1] || 'var(--line)' }} />
            ))}
          </span>
          <span className="shop-card__count">
            {count} {t.common.colors}
          </span>
        </p>
        {view === 'list' && <p className="shop-card__short">{pick(product.short)}</p>}
        <p className="shop-card__price">{formatPrice(product.price)}</p>
        <div className="shop-card__actions">
          <button type="button" onClick={() => add(product.id, variant.id, product.sizes[1] || product.sizes[0] || '')}>
            <IconCart width={17} height={17} /> {t.common.addToCart}
          </button>
          <Link to={url}>
            <IconEye width={17} height={17} /> {t.products.details}
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function Products() {
  const { t, pick, formatPrice } = useLang()
  const [params, setParams] = useSearchParams()
  const cats = (params.get('danh-muc') || '').split(',').filter((c) => categories.some((x) => x.id === c))

  const [query, setQuery] = useState('')
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [price, setPrice] = useState([PRICE_MIN, PRICE_MAX])
  const [sort, setSort] = useState('default')
  const [view, setView] = useState('grid')
  const [page, setPage] = useState(1)
  const [panel, setPanel] = useState(false)

  const setCats = (next) => setParams(next.length ? { 'danh-muc': next.join(',') } : {}, { preventScrollReset: true })

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    let result = products.filter(
      (p) =>
        (!cats.length || cats.includes(p.category)) &&
        (!sizes.length || p.sizes.some((s) => sizes.includes(s))) &&
        (!colors.length || p.variants.some((v) => colors.includes(familyOf(v)))) &&
        p.price >= price[0] &&
        p.price <= price[1] &&
        (!q || [p.name.vi, p.name.en, p.sku, ...p.variants.flatMap((v) => [v.color.vi, v.color.en])].join(' ').toLowerCase().includes(q)),
    )
    if (sort === 'new') result = [...result].sort((a, b) => (b.badge === 'new') - (a.badge === 'new'))
    if (sort === 'asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'desc') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'name') result = [...result].sort((a, b) => pick(a.name).localeCompare(pick(b.name)))
    return result
    // cats is rebuilt each render, so key the memo on its string form
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cats.join(), sizes, colors, price, query, sort, pick])

  // back to page one whenever the result set changes
  useEffect(() => setPage(1), [list])

  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const shown = list.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const goTo = (n) => {
    setPage(n)
    document.querySelector('.shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const filtered = cats.length || sizes.length || colors.length || price[0] > PRICE_MIN || price[1] < PRICE_MAX || query
  const clearAll = () => {
    setCats([])
    setSizes([])
    setColors([])
    setPrice([PRICE_MIN, PRICE_MAX])
    setQuery('')
  }

  const single = cats.length === 1 ? categories.find((c) => c.id === cats[0]) : null
  const pct = (v) => ((v - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100

  return (
    <>
      <section className="section shop">
        <div className="container">
          <h1 className="sr-only">{single ? pick(single.name) : t.products.title}</h1>

          {/* top bar: breadcrumbs, sort, view toggle */}
          <div className="shop-bar">
            <nav className="shop-bar__crumbs" aria-label="breadcrumb">
              <Link to="/">{t.nav.home}</Link>
              <IconChevron width={12} height={12} />
              {single ? (
                <button type="button" onClick={() => setCats([])}>
                  {t.nav.products}
                </button>
              ) : (
                <span>{t.nav.products}</span>
              )}
              {single && (
                <>
                  <IconChevron width={12} height={12} />
                  <span>{noOrphan(pick(single.name))}</span>
                </>
              )}
              <span className="shop-bar__count">
                ({list.length} {t.products.count})
              </span>
            </nav>
            <button type="button" className="shop-bar__filter" onClick={() => setPanel(true)}>
              <IconFilter width={16} height={16} /> {t.products.filter}
            </button>
            <label className="shop-bar__sort">
              <span>{t.products.sort}:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="default">{t.products.sortDefault}</option>
                <option value="new">{t.products.sortNew}</option>
                <option value="asc">{t.products.sortAsc}</option>
                <option value="desc">{t.products.sortDesc}</option>
                <option value="name">{t.products.sortName}</option>
              </select>
            </label>
            <div className="shop-bar__views">
              <button type="button" className={view === 'grid' ? 'is-active' : ''} onClick={() => setView('grid')} aria-label={t.products.grid} title={t.products.grid}>
                <IconGrid width={18} height={18} />
              </button>
              <button type="button" className={view === 'list' ? 'is-active' : ''} onClick={() => setView('list')} aria-label={t.products.list} title={t.products.list}>
                <IconList width={18} height={18} />
              </button>
            </div>
          </div>

          <div className="shop-layout">
            <aside className={`shop-side ${panel ? 'is-open' : ''}`}>
              <div className="shop-panel">
                <div className="shop-panel__head">
                  <strong>{t.products.filter}</strong>
                  <button type="button" onClick={() => setPanel(false)} aria-label="close">
                    <IconClose width={20} height={20} />
                  </button>
                </div>

                <label className="shop-search">
                  <IconSearch width={16} height={16} />
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.products.search} />
                </label>

                <FilterGroup title={t.products.category}>
                  <ul className="shop-checks">
                    {categories.map((c) => {
                      const n = products.filter((p) => p.category === c.id).length
                      return (
                        <li key={c.id}>
                          <label>
                            <input type="checkbox" checked={cats.includes(c.id)} onChange={() => setCats(toggle(cats, c.id))} />
                            <span>{pick(c.name)}</span>
                            <small>{n}</small>
                          </label>
                        </li>
                      )
                    })}
                  </ul>
                </FilterGroup>

                <FilterGroup title={t.products.size}>
                  <ul className="shop-checks shop-checks--cols">
                    {SIZES.map((s) => (
                      <li key={s}>
                        <label>
                          <input type="checkbox" checked={sizes.includes(s)} onChange={() => setSizes(toggle(sizes, s))} />
                          <span>{s}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </FilterGroup>

                <FilterGroup title={t.products.price}>
                  <div className="shop-range" style={{ '--lo': `${pct(price[0])}%`, '--hi': `${pct(price[1])}%` }}>
                    <input
                      type="range"
                      min={PRICE_MIN}
                      max={PRICE_MAX}
                      step={PRICE_STEP}
                      value={price[0]}
                      onChange={(e) => setPrice([Math.min(Number(e.target.value), price[1] - PRICE_STEP), price[1]])}
                      aria-label={`${t.products.price} min`}
                    />
                    <input
                      type="range"
                      min={PRICE_MIN}
                      max={PRICE_MAX}
                      step={PRICE_STEP}
                      value={price[1]}
                      onChange={(e) => setPrice([price[0], Math.max(Number(e.target.value), price[0] + PRICE_STEP)])}
                      aria-label={`${t.products.price} max`}
                    />
                  </div>
                  <p className="shop-range__values">
                    <span>{formatPrice(price[0])}</span>
                    <span>{formatPrice(price[1])}</span>
                  </p>
                </FilterGroup>

                <FilterGroup title={t.products.color}>
                  <ul className="shop-colors">
                    {FAMILIES.map(([key, hex]) => (
                      <li key={key}>
                        <label>
                          <input type="checkbox" checked={colors.includes(key)} onChange={() => setColors(toggle(colors, key))} />
                          <i style={{ background: hex }} />
                          <span>{t.products.colors[key]}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </FilterGroup>

                {filtered && (
                  <button type="button" className="shop-clear" onClick={clearAll}>
                    {t.products.clear}
                  </button>
                )}
              </div>

              <Link to="/lookbook" className="shop-promo">
                <img src="/images/lifestyle/ride-your-style.jpg" alt="" loading="lazy" />
                <span>
                  <strong>{t.products.promoTitle}</strong>
                  <em>{t.products.promoCta} →</em>
                </span>
              </Link>
            </aside>
            {panel && <button type="button" className="shop-scrim" onClick={() => setPanel(false)} aria-label="close" />}

            <div className="shop-main">
              {shown.length ? (
                <div className={`shop-grid ${view === 'list' ? 'shop-grid--list' : ''}`}>
                  {shown.map((p) => (
                    <ShopCard key={p.id} product={p} colors={colors} view={view} />
                  ))}
                </div>
              ) : (
                <p className="empty">{t.products.empty}</p>
              )}

              {pages > 1 && (
                <nav className="shop-pages" aria-label="pagination">
                  <button type="button" onClick={() => goTo(page - 1)} disabled={page === 1} aria-label={t.products.prev}>
                    <IconChevron dir="left" width={14} height={14} />
                  </button>
                  {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                    <button key={n} type="button" className={n === page ? 'is-active' : ''} onClick={() => goTo(n)} aria-current={n === page ? 'page' : undefined}>
                      {n}
                    </button>
                  ))}
                  <button type="button" onClick={() => goTo(page + 1)} disabled={page === pages} aria-label={t.products.next}>
                    <IconChevron width={14} height={14} />
                  </button>
                </nav>
              )}
            </div>
          </div>
        </div>
      </section>

      <PromoBanner />
    </>
  )
}
