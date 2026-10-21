import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { products } from '../data/products'
import { latestNews } from '../data/news'
import ProductCard from '../components/ProductCard'
import SectionTitle from '../components/SectionTitle'
import NewsCard from '../components/NewsCard'
import HeroCinematic from '../components/HeroCinematic'
import OurWorks from '../components/OurWorks'
import CategoryShowcase from '../components/CategoryShowcase'
import { IconArrow } from '../components/Icons'


export default function Home() {
  const { t, pick } = useLang()
  const featured = products.filter((p) => p.featured).slice(0, 8)

  return (
    <>
      <HeroCinematic />

      <OurWorks />

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow="Categories" title={t.home.catTitle} sub={t.home.catSub} />
          <CategoryShowcase />
        </div>
      </section>

      <section className="video-band">
        <video
          src="/video/helmet-tech.mp4"
          poster="/video/helmet-tech-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      </section>

      <section className="section section--white">
        <div className="container">
          <SectionTitle eyebrow="Best of Seagull" title={t.home.featuredTitle} sub={t.home.featuredSub} />
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="center-row">
            <Link to="/san-pham" className="btn btn--outline">
              {t.common.viewAll} <IconArrow width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <SectionTitle eyebrow="Journal" title={t.home.newsTitle} sub={t.home.newsSub} />
          <div className="news-grid">
            {latestNews.slice(0, 3).map((n, i) => (
              <NewsCard key={n.id} item={n} variant={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
