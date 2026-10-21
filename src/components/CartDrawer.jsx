import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'
import { IconCart, IconCheck, IconChevron, IconClose, IconTrash } from './Icons'

// cart as a panel sliding in from the right: items first, then the order form
export default function CartDrawer() {
  const { t, pick, formatPrice } = useLang()
  const { items, update, remove, clear, subtotal, count, isOpen, openCart, closeCart } = useCart()
  const { pathname, state } = useLocation()
  const [step, setStep] = useState('cart')
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' })
  const [error, setError] = useState(false)

  // close when the page changes, unless the navigation asked for the cart
  useEffect(() => {
    if (state?.openCart) openCart()
    else closeCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, state])

  // Esc closes; the page behind doesn't scroll while open
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  // a finished order resets once the panel is closed
  useEffect(() => {
    if (!isOpen && step === 'done') setStep('cart')
  }, [isOpen, step])

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  // No backend yet: the order is only confirmed on screen. Connect this to an
  // API, Google Form or email service before going live.
  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError(true)
      return
    }
    setError(false)
    clear()
    setForm({ name: '', phone: '', address: '', note: '' })
    setStep('done')
  }

  const c = t.cart
  const showForm = step === 'checkout' && items.length > 0

  return (
    <div className={`drawer ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
      <button type="button" className="drawer__scrim" onClick={closeCart} aria-label={c.close} tabIndex={-1} />
      <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label={c.title}>
        <header className="drawer__head">
          {showForm ? (
            <button type="button" className="drawer__back" onClick={() => setStep('cart')}>
              <IconChevron dir="left" width={16} height={16} /> {c.back}
            </button>
          ) : (
            <h2>
              {c.title}
              {count > 0 && step !== 'done' && <span>{count}</span>}
            </h2>
          )}
          <button type="button" className="drawer__close" onClick={closeCart} aria-label={c.close}>
            <IconClose width={22} height={22} />
          </button>
        </header>

        {step === 'done' ? (
          <div className="drawer__state">
            <span className="success__icon">
              <IconCheck width={32} height={32} />
            </span>
            <h3>{c.successTitle}</h3>
            <p>{c.successText}</p>
            <Link to="/san-pham" className="btn btn--primary" onClick={closeCart}>
              {c.continue}
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div className="drawer__state">
            <span className="drawer__empty-icon">
              <IconCart width={34} height={34} />
            </span>
            <p>{c.empty}</p>
            <Link to="/san-pham" className="btn btn--primary" onClick={closeCart}>
              {c.continue}
            </Link>
          </div>
        ) : showForm ? (
          <form className="drawer__body drawer__form" onSubmit={onSubmit} noValidate>
            <h3>{c.checkout}</h3>
            <input name="name" value={form.name} onChange={onChange} placeholder={`${c.name} *`} />
            <input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder={`${c.phone} *`} />
            <input name="address" value={form.address} onChange={onChange} placeholder={`${c.address} *`} />
            <textarea name="note" rows={3} value={form.note} onChange={onChange} placeholder={c.note} />
            {error && <p className="form-error">{c.required}</p>}
            <div className="drawer__total">
              <span>{c.grandTotal}</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <button type="submit" className="btn btn--primary btn--block">
              {c.submit}
            </button>
          </form>
        ) : (
          <>
            <ul className="drawer__body drawer__items">
              {items.map((line) => {
                const { id, size, qty, product, variantData } = line
                const url = `/san-pham/${id}?mau=${variantData.id}`
                return (
                  <li key={line.key} className="drawer__item">
                    <Link to={url} onClick={closeCart} className="drawer__thumb">
                      <img src={variantData.image} alt="" />
                    </Link>
                    <div className="drawer__info">
                      <Link to={url} onClick={closeCart} className="drawer__name">
                        {pick(product.name)}
                      </Link>
                      <span className="drawer__meta">
                        {pick(variantData.color)}
                        {size && ` · Size ${size}`}
                      </span>
                      <div className="drawer__row">
                        <div className="qty qty--sm">
                          <button type="button" onClick={() => update(line, qty - 1)} aria-label="-">
                            −
                          </button>
                          <span>{qty}</span>
                          <button type="button" onClick={() => update(line, qty + 1)} aria-label="+">
                            +
                          </button>
                        </div>
                        <strong>{formatPrice(product.price * qty)}</strong>
                      </div>
                    </div>
                    <button type="button" className="drawer__remove" onClick={() => remove(line)} aria-label={c.remove}>
                      <IconTrash width={17} height={17} />
                    </button>
                  </li>
                )
              })}
            </ul>
            <footer className="drawer__foot">
              <div className="summary-row">
                <span>{c.subtotal}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>{c.shipping}</span>
                <span>{c.shippingNote}</span>
              </div>
              <div className="drawer__total">
                <span>{c.grandTotal}</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <button type="button" className="btn btn--primary btn--block" onClick={() => setStep('checkout')}>
                {c.toCheckout}
              </button>
              <button type="button" className="drawer__keep" onClick={closeCart}>
                {c.continue}
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
