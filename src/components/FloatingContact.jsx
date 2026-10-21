import { useLang } from '../i18n/LanguageContext'
import { useCart } from '../context/CartContext'
import { store } from '../data/store'
import { IconCheck, IconFacebook, IconPhone } from './Icons'

export default function FloatingContact() {
  const { t } = useLang()
  const { toast } = useCart()

  return (
    <>
      <div className="floating">
        <a className="floating__btn floating__btn--fb" href={store.facebook} target="_blank" rel="noreferrer" aria-label={t.common.messenger} title={t.common.messenger}>
          <IconFacebook width={22} height={22} />
        </a>
        <a className="floating__btn floating__btn--zalo" href={store.zalo} target="_blank" rel="noreferrer" aria-label="Zalo" title="Zalo">
          Zalo
        </a>
        <a className="floating__btn floating__btn--phone" href={`tel:${store.phoneRaw}`} aria-label={t.common.callNow} title={t.common.callNow}>
          <IconPhone width={22} height={22} />
        </a>
      </div>
      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status">
        <IconCheck width={18} height={18} /> {t.common.added}
      </div>
    </>
  )
}
