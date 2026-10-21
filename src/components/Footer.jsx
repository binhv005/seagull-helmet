import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import SocialLinks from './SocialLinks'
import { store } from '../data/store'
import { IconPin } from './Icons'
import { noOrphan } from '../utils/text'

export default function Footer() {
  const { t } = useLang()
  const { pathname } = useLocation()
  // the about and contact pages end in a dark band
  const onDark = pathname === '/gioi-thieu' || pathname === '/lien-he'

  return (
    <footer className={`site-footer ${onDark ? 'site-footer--on-dark' : ''}`}>
      <div className="footer-banner" aria-hidden="true" />
      <img className="footer-watermark" src="/images/logo.png" alt="" aria-hidden="true" loading="lazy" />

      <div className="container footer-grid">
        <div>
          <img className="footer-logo" src="/images/logo.png" alt="SEAGULL HELMETS" />
          <p className="footer-about">{t.footer.about}</p>
          <SocialLinks />
        </div>

        <div>
          <h4>{t.footer.links}</h4>
          <ul>
            <li><Link to="/">{t.nav.home}</Link></li>
            <li><Link to="/san-pham">{t.nav.products}</Link></li>
            <li><Link to="/lookbook">{t.nav.lookbook}</Link></li>
            <li><Link to="/gioi-thieu">{t.nav.about}</Link></li>
            <li><Link to="/tin-tuc">{t.nav.news}</Link></li>
            <li><Link to="/lien-he">{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div className="footer-map">
          <h4>{t.footer.findUs}</h4>
          <iframe title="SEAGULL HELMETS map" src={store.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <a href={store.mapLink} target="_blank" rel="noreferrer">
            <IconPin width={16} height={16} /> {noOrphan(store.address)}
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">© {new Date().getFullYear()} {t.footer.rights}</div>
      </div>
    </footer>
  )
}
