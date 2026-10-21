import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import SocialLinks from './SocialLinks'

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

        <div>
          <h4>{t.footer.support}</h4>
          <ul>
            <li><Link to="/tin-tuc/cach-chon-size-mu-bao-hiem">{t.footer.supportLinks[0]}</Link></li>
            {t.footer.supportLinks.slice(1).map((l) => (
              <li key={l}><Link to="/lien-he">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">© {new Date().getFullYear()} {t.footer.rights}</div>
      </div>
    </footer>
  )
}
