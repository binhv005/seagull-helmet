import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'
import { IconCart } from './Icons'

export default function ProductCard({ product }) {
  const { t, pick, formatPrice } = useLang()
  const { add } = useCart()
  const url = `/san-pham/${product.id}`
  const [first] = product.variants
  const count = product.variants.length

  return (
    <article className="product-card">
      <Link to={url} className="product-card__media">
        <img src={first.image} alt={pick(product.name)} loading="lazy" />
        {product.badge && (
          <span className={`badge badge--${product.badge}`}>{product.badge === 'new' ? t.common.new : t.common.hot}</span>
        )}
        {count > 1 && (
          <span className="product-card__swatches">
            {product.variants.slice(0, 4).map((v) => (
              <img key={v.id} src={v.image} alt="" loading="lazy" />
            ))}
            <span>
              {count} {t.common.colors}
            </span>
          </span>
        )}
      </Link>
      <div className="product-card__body">
        <span className="product-card__sku">{product.sku}</span>
        <h3 className="product-card__name">
          <Link to={url}>{pick(product.name)}</Link>
        </h3>
        <p className="product-card__short">{pick(product.short)}</p>
        <div className="product-card__foot">
          <span className="price">{formatPrice(product.price)}</span>
          <button
            className="icon-btn"
            aria-label={t.common.addToCart}
            title={t.common.addToCart}
            onClick={() => add(product.id, first.id, product.sizes[1] || product.sizes[0] || '')}
          >
            <IconCart width={18} height={18} />
          </button>
        </div>
      </div>
    </article>
  )
}
