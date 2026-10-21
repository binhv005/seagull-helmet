import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'
import { IconCart, IconClose, IconMenu } from './Icons'

export default function Header() {
  const { t, lang, setLang } = useLang()
  const { count, openCart } = useCart()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overHero, setOverHero] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      // transparent header while a dark home section (hero, works, video) is behind it
      const dark = isHome ? [...document.querySelectorAll('.cine, .works, .video-band')] : []
      setOverHero(
        dark.some((el) => {
          const { top, bottom } = el.getBoundingClientRect()
          return top < 80 && bottom > 80
        })
      )
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isHome])

  const links = [
    { to: '/', label: t.nav.home, end: true },
    { to: '/san-pham', label: t.nav.products },
    { to: '/lookbook', label: t.nav.lookbook },
    { to: '/gioi-thieu', label: t.nav.about },
    { to: '/tin-tuc', label: t.nav.news },
    { to: '/lien-he', label: t.nav.contact },
  ]

  const renderLinks = (list) =>
    list.map((l) => (
      <NavLink key={l.to} to={l.to} end={l.end} className="nav__link">
        {l.label}
      </NavLink>
    ))

  const langSwitch = (
    <div className="lang-switch" role="group" aria-label="Language">
      <button className={lang === 'vi' ? 'is-active' : ''} onClick={() => setLang('vi')}>VI</button>
      <button className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')}>EN</button>
    </div>
  )

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${overHero && !open ? 'is-transparent' : ''}`}>
      <div className="navbar">
        <div className="container navbar__inner">
          <Link to="/" className="brand" aria-label="SEAGULL HELMETS">
            <img src="/images/logo.png" alt="SEAGULL HELMETS" />
          </Link>

          <nav className="nav">{renderLinks(links)}</nav>

          <div className="navbar__actions">
            {langSwitch}
            <button type="button" className="cart-btn" onClick={openCart} aria-label={t.nav.cart}>
              <IconCart width={22} height={22} />
              {count > 0 && <span className="cart-btn__count">{count}</span>}
            </button>
            <button className="menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
              {open ? <IconClose width={24} height={24} /> : <IconMenu width={24} height={24} />}
            </button>
          </div>
        </div>

        <nav className={`nav-mobile ${open ? 'is-open' : ''}`}>
          {renderLinks(links)}
          {/* on phones the language switch moves in here to save room in the bar */}
          <div className="nav-mobile__lang">{langSwitch}</div>
        </nav>
      </div>
    </header>
  )
}
