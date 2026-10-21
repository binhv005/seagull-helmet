import { useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'
import { categories, getProduct, getVariant, products } from '../data/products'
import { store } from '../data/store'
import ProductCard from '../components/ProductCard'
import SectionTitle from '../components/SectionTitle'
import NotFound from './NotFound'
import { noOrphan } from '../utils/text'
import { IconCheck, IconFacebook, IconPhone } from '../components/Icons'

// colour swatches sit on a wheel left of the disc; the chosen one is turned to 180deg (due left)
const arcAngle = (i, active, n) => {
  const step = Math.min(28, 330 / n)
  const half = Math.floor(n / 2)
  const rel = ((i - active + n + half) % n) - half
  return 180 + rel * step
}

export default function ProductDetail() {
  const { id } = useParams()
  const { t, pick, formatPrice } = useLang()
  const { add, openCart } = useCart()
  const product = getProduct(id)
  const [params, setParams] = useSearchParams()

  const [size, setSize] = useState('')
  const [qty, setQty] = useState(1)
  const [error, setError] = useState(false)

  useEffect(() => {
    setSize('')
    setQty(1)
    setError(false)
  }, [id])

  // wheel over the helmet steps through the colours; at either end the page scrolls as usual
  const visualRef = useRef(null)
  const wheelRef = useRef({ step: () => false, last: 0 })
  useEffect(() => {
    const el = visualRef.current
    if (!el) return
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 4) return
      const dir = e.deltaY > 0 ? 1 : -1
      const w = wheelRef.current
      if (!w.canStep(dir)) return
      e.preventDefault()
      const now = Date.now()
      if (now - w.last < 350) return
      w.last = now
      w.step(dir)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [id])

  if (!product) return <NotFound message={t.detail.notFound} />

  const category = categories.find((c) => c.id === product.category)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  // banner for a new arrival other than this one, rotating through them by product position
  const fresh = products.filter((p) => p.badge === 'new' && p.id !== product.id)
  const spotlight = fresh[products.indexOf(product) % fresh.length]
  const needsSize = product.sizes.length > 0
  const variant = getVariant(product, params.get('mau'))
  const activeIndex = Math.max(0, product.variants.indexOf(variant))
  const [nameHead, ...nameTail] = pick(product.name).split(' ')

  const chooseVariant = (v) => setParams({ mau: v.id }, { replace: true, preventScrollReset: true })
  wheelRef.current.canStep = (dir) => {
    const next = product.variants.indexOf(variant) + dir
    return next >= 0 && next < product.variants.length
  }
  wheelRef.current.step = (dir) => chooseVariant(product.variants[product.variants.indexOf(variant) + dir])

  const handleAdd = (goToCart) => {
    if (needsSize && !size) {
      setError(true)
      return
    }
    add(product.id, variant.id, size, qty)
    if (goToCart) openCart()
  }

  return (
    <>
      <div className="container crumbs crumbs--plain">
        <Link to="/">{t.nav.home}</Link>
        <span className="crumbs__sep">/</span>
        <Link to="/san-pham">{t.nav.products}</Link>
        <span className="crumbs__sep">/</span>
        <Link to={`/san-pham?danh-muc=${category.id}`}>{pick(category.name)}</Link>
        <span className="crumbs__sep">/</span>
        <span>{noOrphan(pick(product.name))}</span>
      </div>

      <section className="section section--tight">
        <div className="container detail pd">
          {/* helmet on a disc, colours fanned out in an arc around it */}
          <div className="pd-visual" ref={visualRef}>
            <div className="pd-disc" />
            <img
              key={`${product.id}-${variant.id}`}
              className="pd-main"
              src={variant.image}
              alt={`${pick(product.name)} – ${pick(variant.color)}`}
            />
            <ul className="pd-arc" key={product.id}>
              {product.variants.map((v, i) => (
                <li key={v.id} style={{ '--a': `${arcAngle(i, activeIndex, product.variants.length)}deg`, '--i': i }}>
                  <button
                    className={`pd-swatch ${v.id === variant.id ? 'is-active' : ''}`}
                    onClick={() => chooseVariant(v)}
                    title={pick(v.color)}
                    aria-label={pick(v.color)}
                    aria-pressed={v.id === variant.id}
                  >
                    <img src={v.image} alt="" loading="lazy" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="detail__info">
            {product.badge && (
              <span className={`badge badge--inline badge--${product.badge}`}>
                {product.badge === 'new' ? t.common.new : t.common.hot}
              </span>
            )}
            <h1 className="pd-title">
              <strong>{nameHead}</strong> {nameTail.join(' ')}
            </h1>
            <p className="detail__short">{pick(product.short)}</p>
            <p className="detail__price">{formatPrice(product.price)}</p>

            <dl className="detail__meta">
              <div><dt>{t.detail.sku}</dt><dd>{product.sku}</dd></div>
              <div><dt>{t.detail.category}</dt><dd>{pick(category.name)}</dd></div>
            </dl>

            <div className="field-group">
              <div className="field-group__head">
                <span>
                  {t.detail.color}: <strong>{pick(variant.color)}</strong>
                </span>
                <span className="field-group__muted">
                  {product.variants.length} {t.common.colors}
                </span>
              </div>
            </div>

            {needsSize && (
              <div className="field-group">
                <div className="field-group__head">
                  <span>{t.detail.size}</span>
                  <Link to="/tin-tuc/cach-chon-size-mu-bao-hiem">{t.detail.sizeGuide}</Link>
                </div>
                <div className="sizes">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className={`size ${size === s ? 'is-active' : ''}`}
                      onClick={() => {
                        setSize(s)
                        setError(false)
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {error && <p className="form-error">{t.detail.chooseSize}</p>}
              </div>
            )}

            <div className="field-group">
              <span className="field-group__label">{t.detail.qty}</span>
              <div className="qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="-">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="+">+</button>
              </div>
            </div>

            <div className="detail__actions">
              <button className="btn btn--outline" onClick={() => handleAdd(false)}>{t.common.addToCart}</button>
              <button className="btn btn--primary" onClick={() => handleAdd(true)}>{t.common.buyNow}</button>
            </div>

            <div className="detail__contact">
              <a href={`tel:${store.phoneRaw}`}><IconPhone width={18} height={18} /> {store.phone}</a>
              <a href={store.facebook} target="_blank" rel="noreferrer"><IconFacebook width={18} height={18} /> {t.common.messenger}</a>
            </div>

            <ul className="perks">
              {t.detail.perks.map((p) => (
                <li key={p}><IconCheck width={16} height={16} /> {p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container pd-about">
          <div className="pd-about__intro">
            <p className="eyebrow">{t.detail.description}</p>
            <h2>{pick(product.short)}</h2>
            <p>{pick(product.desc)}</p>
            <dl className="pd-facts">
              <div><dt>{t.detail.sku}</dt><dd>{product.sku}</dd></div>
              <div><dt>{t.detail.category}</dt><dd>{pick(category.name)}</dd></div>
              {needsSize && <div><dt>Size</dt><dd>{product.sizes.join(' · ')}</dd></div>}
              <div><dt>{t.detail.color}</dt><dd>{product.variants.length} {t.common.colors}</dd></div>
            </dl>
          </div>
          <div className="pd-about__features">
            <p className="eyebrow">{t.detail.features}</p>
            <ol className="pd-features">
              {pick(product.specs).map((s, i) => (
                <li key={s}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {spotlight && (
        <section className="spotlight section--white">
          <div className="spotlight__band">
            <span className="spotlight__word" aria-hidden="true">{t.detail.spotlightWord}</span>
            <div className="container spotlight__inner">
              <div className="spotlight__text">
                <h2>{pick(spotlight.name)}</h2>
                <p>{pick(spotlight.short)}</p>
                <p className="spotlight__price">{formatPrice(spotlight.price)}</p>
                <Link to={`/san-pham/${spotlight.id}`} className="spotlight__cta">
                  {t.detail.spotlightCta}
                </Link>
              </div>
              <img className="spotlight__img" src={spotlight.variants[0].image} alt={pick(spotlight.name)} loading="lazy" />
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section section--paper">
          <div className="container">
            <SectionTitle title={t.detail.related} />
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
