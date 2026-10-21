import { Link, useParams } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { getNews, news } from '../data/news'
import NewsCard from '../components/NewsCard'
import SectionTitle from '../components/SectionTitle'
import HelmetArt from '../components/HelmetArt'
import NotFound from './NotFound'
import { IconChevron } from '../components/Icons'

export default function NewsDetail() {
  const { id } = useParams()
  const { t, pick, formatDate } = useLang()
  const item = getNews(id)

  if (!item) return <NotFound message={t.news.notFound} />

  const more = news.filter((n) => n.id !== id).slice(0, 3)

  return (
    <>
      <section className="article-hero">
        <div className="container article-hero__inner">
          <span className="news-card__tag news-card__tag--static">{pick(item.tag)}</span>
          <h1>{pick(item.title)}</h1>
          <time dateTime={item.date}>{formatDate(item.date)}</time>
        </div>
        <HelmetArt helmets={item.helmets} className="article-hero__art" eager />
      </section>

      <section className="section section--white">
        <article className="container article">
          <p className="article__lead">{pick(item.excerpt)}</p>
          {pick(item.body).map((p) => (
            <p key={p}>{p}</p>
          ))}
          <Link to="/tin-tuc" className="link-arrow">
            <IconChevron dir="left" width={16} height={16} /> {t.news.back}
          </Link>
        </article>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionTitle title={t.news.more} />
          <div className="news-grid">
            {more.map((n, i) => (
              <NewsCard key={n.id} item={n} variant={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
