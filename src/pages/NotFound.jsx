import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

export default function NotFound({ message }) {
  const { t } = useLang()
  return (
    <section className="section">
      <div className="container success">
        <p className="notfound__code">404</p>
        <h2>{t.notFound.title}</h2>
        <p>{message || t.notFound.text}</p>
        <Link to="/" className="btn btn--primary">{t.common.backHome}</Link>
      </div>
    </section>
  )
}
