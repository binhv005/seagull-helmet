import { store } from '../data/store'
import { IconFacebook, IconInstagram, IconTiktok, IconZalo } from './Icons'

const items = [
  { key: 'facebook', label: 'Facebook', Icon: IconFacebook },
  { key: 'zalo', label: 'Zalo', Icon: IconZalo },
  { key: 'instagram', label: 'Instagram', Icon: IconInstagram },
  { key: 'tiktok', label: 'TikTok', Icon: IconTiktok },
]

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`socials ${className}`}>
      {items
        .filter((i) => store[i.key])
        .map(({ key, label, Icon }) => (
          <a key={key} className="social" href={store[key]} target="_blank" rel="noreferrer" aria-label={label} title={label}>
            <Icon />
          </a>
        ))}
    </div>
  )
}
