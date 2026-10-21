import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { latestNews } from '../data/news'
import { products } from '../data/products'
import { store } from '../data/store'
import NewsImage from '../components/NewsImage'
import NewsCard from '../components/NewsCard'
import HelmetArt from '../components/HelmetArt'
import { IconArrow, IconClock, IconFacebook, IconPhone, IconPin, IconUser, IconZalo } from '../components/Icons'

const url = (item) => `/tin-tuc/${item.id}`
const promo = products.find((p) => p.id === 'tw-786-flying-tigers')

function Meta({ item, light = false }) {
  const { t, formatDate } = useLang()
  return (
    <p className={`nx-meta ${light ? 'nx-meta--light' : ''}`}>
      <span><IconUser width={13} height={13} /> {t.news.author}</span>
      <span><IconClock width={13} height={13} /> <time dateTime={item.date}>{formatDate(item.date)}</time></span>
    </p>
  )
}

function Tag({ item }) {
  const { pick } = useLang()
  return <span className="nx-tag">{pick(item.tag)}</span>
}

export default function News() {
  const { t, pick, formatPrice } = useLang()
  const [tab, setTab] = useState('all')

  const featured = latestNews.find((n) => n.featured) || latestNews[0]
  const rest = latestNews.filter((n) => n !== featured)
  const side = rest.slice(0, 3)
  const top = rest.slice(3, 7)

  // one tab per tag, keyed by its English name
  const tabs = [...new Map(latestNews.map((n) => [n.tag.en, n.tag])).entries()]
  const filtered = tab === 'all' ? latestNews : latestNews.filter((n) => n.tag.en === tab)
  const [lead, ...list] = filtered

  const socials = [
    { key: 'facebook', href: store.facebook, Icon: IconFacebook, value: 'Facebook' },
    { key: 'zalo', href: store.zalo, Icon: IconZalo, value: 'Zalo' },
    { key: 'phone', href: `tel:${store.phoneRaw}`, Icon: IconPhone, value: store.phone },
    { key: 'map', href: store.mapLink, Icon: IconPin, value: 'Google Maps' },
  ]

  return (
    <section className="section news-page">
      <div className="container">
        <h1 className="sr-only">{t.news.title}</h1>

        {/* featured story with the three latest beside it */}
        <div className="nx-hero">
          <Link to={url(featured)} className="nx-feature">
            <NewsImage item={featured} alt={pick(featured.title)} eager />
            <div className="nx-feature__body">
              <Tag item={featured} />
              <h2>{pick(featured.title)}</h2>
              <p>{pick(featured.excerpt)}</p>
              <Meta item={featured} light />
            </div>
          </Link>

          <div className="nx-side">
            {side.map((n) => (
              <Link key={n.id} to={url(n)} className="nx-side__item">
                <div className="nx-thumb"><NewsImage item={n} alt={pick(n.title)} /></div>
                <div>
                  <Tag item={n} />
                  <h3>{pick(n.title)}</h3>
                  <Meta item={n} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* product promo strip */}
        {promo && (
          <Link to={`/san-pham/${promo.id}`} className="nx-promo">
            <HelmetArt helmets={promo.variants.slice(0, 3).map((v) => v.image)} className="nx-promo__art" />
            <div className="nx-promo__name">
              <p className="nx-promo__eyebrow">{t.news.promoEyebrow}</p>
              <strong>{pick(promo.name)}</strong>
              <span>{pick(promo.short)}</span>
            </div>
            <div className="nx-promo__price">
              <small>{t.news.priceFrom}</small>
              <strong>{formatPrice(promo.price)}</strong>
            </div>
            <span className="nx-promo__btn">{t.common.buyNow}</span>
          </Link>
        )}

        <div className="nx-head">
          <h2>{t.news.topStories}</h2>
          <a href="#moi-nhat" className="nx-head__link">
            {t.common.viewAll} <IconArrow width={14} height={14} />
          </a>
        </div>
        <div className="nx-top">
          {top.map((n) => (
            <Link key={n.id} to={url(n)} className="nx-card">
              <div className="nx-card__img"><NewsImage item={n} alt={pick(n.title)} /></div>
              <Tag item={n} />
              <h3>{pick(n.title)}</h3>
              <Meta item={n} />
            </Link>
          ))}
        </div>

        {/* what's new: tabs, a lead story, a numbered list and social links */}
        <div className="nx-new" id="moi-nhat">
          <div className="nx-new__main">
            <div className="nx-head">
              <h2>{t.news.latest}</h2>
              <div className="nx-tabs" role="tablist">
                <button type="button" role="tab" aria-selected={tab === 'all'} className={tab === 'all' ? 'is-active' : ''} onClick={() => setTab('all')}>
                  {t.news.all}
                </button>
                {tabs.map(([key, label]) => (
                  <button key={key} type="button" role="tab" aria-selected={tab === key} className={tab === key ? 'is-active' : ''} onClick={() => setTab(key)}>
                    {pick(label)}
                  </button>
                ))}
              </div>
            </div>

            <div className="nx-new__grid">
              {lead && (
                <Link to={url(lead)} className="nx-lead">
                  <NewsImage item={lead} alt={pick(lead.title)} />
                  <div className="nx-lead__body">
                    <Tag item={lead} />
                    <h3>{pick(lead.title)}</h3>
                    <Meta item={lead} light />
                  </div>
                </Link>
              )}
              <ol className="nx-list">
                {list.slice(0, 4).map((n, i) => (
                  <li key={n.id}>
                    <Link to={url(n)}>
                      <span className="nx-list__num">{i + 1}</span>
                      <div className="nx-thumb"><NewsImage item={n} alt={pick(n.title)} /></div>
                      <div>
                        <h3>{pick(n.title)}</h3>
                        <Meta item={n} />
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="nx-connect">
            <h2 className="nx-connect__title">{t.news.connect}</h2>
            {socials.map(({ key, href, Icon, value }) => (
              <a
                key={key}
                href={href}
                target={key === 'phone' ? undefined : '_blank'}
                rel="noreferrer"
                className={`nx-social nx-social--${key}`}
              >
                <span className="nx-social__icon"><Icon width={18} height={18} /></span>
                <span>
                  <strong>{value}</strong>
                  <small>{t.news.social[key]}</small>
                </span>
              </a>
            ))}
          </aside>
        </div>

        {/* every article as a "breaking news" card, cycling through the three layouts */}
        <div className="nx-head nx-all">
          <h2>{t.news.allPosts}</h2>
        </div>
        <div className="news-grid">
          {latestNews.map((n, i) => (
            <NewsCard key={n.id} item={n} variant={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
