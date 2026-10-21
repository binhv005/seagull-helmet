import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import NewsImage from './NewsImage'
import { noOrphan } from '../utils/text'
import { IconArrow } from './Icons'

// three square "breaking news" post layouts; pass variant 0–2 (or a list index) to mix them
export default function NewsCard({ item, variant = 0 }) {
  const { t, lang, pick, formatDate } = useLang()
  const date = new Date(item.date)
  const day = String(date.getDate()).padStart(2, '0')
  const month = lang === 'vi' ? `${t.news.month} ${date.getMonth() + 1}` : date.toLocaleString('en-GB', { month: 'short' })
  const short = `${day}.${String(date.getMonth() + 1).padStart(2, '0')}`
  const weekday = date.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-GB', { weekday: 'long' })
  const title = noOrphan(pick(item.title))
  const url = `/tin-tuc/${item.id}`
  const kind = variant % 3

  const brand = (
    <span className="news-card__brand">
      <img src="/images/favicon.png" alt="" />
      {t.news.channel}
    </span>
  )

  // photo on top, dark diagonal panel rising from the bottom
  if (kind === 1) {
    return (
      <article className="news-card news-card--stream">
        <Link to={url} className="news-card__link">
          <div className="news-card__shot">
            <NewsImage item={item} alt={title} />
          </div>
          <span className="news-card__tab">{brand}</span>
          <div className="news-card__wedge">
            <span className="news-card__ribbon news-card__ribbon--stack">
              <b>{t.news.label}</b>
              <i>
                SEAGULL | {short}
              </i>
            </span>
            <h3 className="news-card__title">{title}</h3>
            <time dateTime={item.date} className="news-card__weekday">
              {weekday},<br />
              {formatDate(item.date)}
            </time>
          </div>
        </Link>
      </article>
    )
  }

  // headline panel on the left, photo on a slant to the right
  if (kind === 2) {
    return (
      <article className="news-card news-card--live">
        <Link to={url} className="news-card__link">
          <div className="news-card__photo">
            <NewsImage item={item} alt={title} />
          </div>
          <div className="news-card__copy">
            {brand}
            <span className="news-card__pill">
              <b>{t.common.new}</b>
              <span>{short}</span>
            </span>
            <h3 className="news-card__title">{title}</h3>
          </div>
          <span className="news-card__stream">
            <i aria-hidden="true">▶</i>
            <b>{pick(item.tag)}</b>
          </span>
          <div className="news-card__bottom">
            <span>
              <small>{t.news.follow}:</small>
              Facebook · Zalo
            </span>
            <span>
              <small>{t.news.moreInfo}:</small>
              <em>
                {t.common.readMore} <IconArrow width={13} height={13} />
              </em>
            </span>
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className="news-card">
      <Link to={url} className="news-card__link">
        <div className="news-card__top">
          {brand}
          <span className="news-card__pill">
            <b>{t.news.label}</b>
            <span>{short}</span>
          </span>
        </div>

        <h3 className="news-card__title">{title}</h3>

        <div className="news-card__media">
          <div className="news-card__frame">
            <NewsImage item={item} alt={title} />
          </div>
        </div>

        <div className="news-card__foot">
          <time className="news-card__day" dateTime={item.date}>
            <strong>{day}</strong>
            <small>{month}</small>
          </time>
          <span className="news-card__ribbon">
            <b>{pick(item.tag)}</b>
            <i>{t.nav.news}</i>
          </span>
          <span className="news-card__more">
            <small>{t.news.moreInfo}:</small>
            <span>
              {t.common.readMore} <IconArrow width={14} height={14} />
            </span>
          </span>
        </div>
      </Link>
    </article>
  )
}
