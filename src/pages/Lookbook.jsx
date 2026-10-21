import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { collections } from '../data/collections'
import { getProduct } from '../data/products'
import { latestNews } from '../data/news'
import NewsImage from '../components/NewsImage'
import { noOrphan } from '../utils/text'
import { IconArrow, IconBadge } from '../components/Icons'

// magazine-style lookbook: circle hero with brush script, a mosaic of collections,
// one featured helmet and the latest blog posts
export default function Lookbook() {
  const { t, pick, formatPrice } = useLang()
  const { hash } = useLocation()
  const [index, setIndex] = useState(0)
  const [shade, setShade] = useState(0)
  const l = t.lookbook

  // a home page link with #collection-id opens that collection
  useEffect(() => {
    const at = collections.findIndex((c) => `#${c.id}` === hash)
    if (at >= 0) setIndex(at)
  }, [hash])

  // new collection starts on its first colourway
  useEffect(() => setShade(0), [index])

  const c = collections[index]
  const product = getProduct(c.product)
  const variant = product.variants[shade] || product.variants[0]
  // the other collections fill the mosaic around this one
  const others = [1, 2, 3].map((k) => collections[(index + k) % collections.length])
  const photo = c.gallery.find((g) => g.kind === 'photo')?.src || c.cover

  return (
    <div className="lbx" id={c.id}>
      <h1 className="sr-only">{l.title}</h1>

      {/* circle hero with brush script across it */}
      <section className="lbx-hero">
        <div className="container lbx-hero__inner" key={c.id}>
          <div className="lbx-circle">
            <img src={c.cover} alt={c.name} />
            <p className="lbx-circle__bold">{noOrphan(c.line)}</p>
            <Link to={`/san-pham/${product.id}`} className="lbx-circle__play">
              {l.watch}
            </Link>
          </div>
          <p className="lbx-script" aria-hidden="true">
            {c.name}
          </p>
        </div>
        <nav className="container lbx-tabs" aria-label={l.title}>
          {collections.map((x, i) => (
            <button key={x.id} type="button" className={i === index ? 'is-active' : ''} onClick={() => setIndex(i)} aria-pressed={i === index}>
              {x.name}
            </button>
          ))}
        </nav>
      </section>

      {/* selected content mosaic */}
      <section className="lbx-section lbx-section--cream">
        <p className="lbx-label">{l.selected}</p>
        <div className="container lbx-mosaic">
          <button type="button" className="lbx-tile lbx-tile--framed" onClick={() => setIndex(collections.indexOf(others[0]))}>
            <img src={others[0].cover} alt="" loading="lazy" />
            <span>
              <strong>{others[0].name}</strong>
              <small>{noOrphan(others[0].line)}</small>
            </span>
          </button>
          <Link to={`/san-pham/${product.id}`} className="lbx-tile lbx-tile--solid">
            <strong>{product.sku}</strong>
            <small>{noOrphan(pick(product.short))}</small>
            <em>{l.view} →</em>
          </Link>
          <div className="lbx-tile lbx-tile--big">
            <img src={photo} alt="" loading="lazy" />
            <span>
              <strong>{noOrphan(pick(c.tagline))}</strong>
            </span>
          </div>
          <button type="button" className="lbx-tile lbx-tile--tall" onClick={() => setIndex(collections.indexOf(others[1]))}>
            <img src={others[1].cover} alt="" loading="lazy" />
            <span>
              <small>{noOrphan(others[1].line)}</small>
              <strong>{others[1].name}</strong>
            </span>
          </button>
        </div>
      </section>

      {/* featured helmet */}
      <section className="lbx-section lbx-feature">
        <div className="container lbx-feature__inner">
          <div className="lbx-feature__name">
            <strong>{pick(product.name)}</strong>
            <small>{noOrphan(c.name)}</small>
          </div>
          <div className="lbx-feature__art">
            <img key={variant.id} src={variant.image} alt={`${pick(product.name)} – ${pick(variant.color)}`} />
            <div className="lbx-dots">
              {product.variants.slice(0, 6).map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  className={i === shade ? 'is-active' : ''}
                  onClick={() => setShade(i)}
                  aria-label={pick(v.color)}
                  aria-pressed={i === shade}
                />
              ))}
            </div>
          </div>
          <div className="lbx-feature__deal">
            <strong>{formatPrice(product.price)}</strong>
            <small>{t.detail.perks[1]}</small>
            <Link to={`/san-pham/${product.id}?mau=${variant.id}`}>{t.common.buyNow}</Link>
            <span className="lbx-feature__badge" aria-hidden="true">
              <IconBadge width={22} height={22} />
            </span>
          </div>
        </div>
      </section>

      {/* on the blog now, in warm off-white */}
      <section className="lbx-section lbx-section--blog">
        <p className="lbx-label">{l.blog}</p>
        <div className="container lbx-blog">
          {latestNews.slice(0, 3).map((n) => (
            <article key={n.id} className="lbx-post">
              <Link to={`/tin-tuc/${n.id}`} className="lbx-post__img">
                <NewsImage item={n} alt={pick(n.title)} />
              </Link>
              <h3>{pick(n.title)}</h3>
              <p>{pick(n.excerpt)}</p>
              <Link to={`/tin-tuc/${n.id}`} className="lbx-post__more">
                {t.common.readMore}
              </Link>
            </article>
          ))}
        </div>
        <div className="container lbx-bar">
          <span>
            <Link to="/">{t.nav.home}</Link> / {l.title} / {noOrphan(c.name)}
          </span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {l.top} <IconArrow width={12} height={12} style={{ rotate: '-90deg' }} />
          </button>
        </div>
      </section>
    </div>
  )
}
