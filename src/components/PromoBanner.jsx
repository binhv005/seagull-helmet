import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { getProduct } from '../data/products'
import { store } from '../data/store'
import { IconPhone } from './Icons'

const PRODUCT = 'tw-500tx-f'

// wide showroom banner: logo on light, helmet in the middle, diagonal brand panel with script
export default function PromoBanner() {
  const { t } = useLang()
  const b = t.products.banner
  const product = getProduct(PRODUCT)
  if (!product) return null
  const shot = product.variants.find((v) => v.id === 'red') || product.variants[0]

  return (
    <section className="promo-banner">
      <Link to={`/san-pham/${product.id}?mau=${shot.id}`} className="pb">
        <span className="pb__stripes" aria-hidden="true" />
        <span className="pb__panel" aria-hidden="true" />

        <div className="pb__brand">
          <img src="/images/logo.png" alt="SEAGULL HELMETS" />
          <small>{b.store}</small>
        </div>

        <a className="pb__phone" href={`tel:${store.phoneRaw}`} onClick={(e) => e.stopPropagation()}>
          <IconPhone width={18} height={18} /> {store.phone}
        </a>

        <img className="pb__helmet" src={shot.image} alt={product.sku} />

        <p className="pb__model">
          <small>{b.kind}</small>
          <strong>
            TW-50<em>0</em>
          </strong>
        </p>

        <p className="pb__script">
          <small>{b.eyebrow}</small>
          <span>{b.line1}</span>
          <span>{b.line2}</span>
        </p>
      </Link>
    </section>
  )
}
