import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { collections } from '../data/collections'

const STEP_MS = 2000
const L = '/images/lifestyle/'

// collection covers plus a few studio shots
const WORKS = [
  ...collections.map((c) => ({ id: c.id, src: c.cover, title: c.name, label: c.line, to: `/lookbook#${c.id}` })),
  { id: 'full-face', src: `${L}mood-full-face.jpg`, title: 'Matte Black Racer', label: 'Full Face', to: '/san-pham?danh-muc=full-face' },
  { id: 'three-quarter', src: `${L}mood-three-quarter.jpg`, title: 'Vintage Pinstripe', label: '3/4', to: '/san-pham?danh-muc=three-quarter' },
  { id: 'open-face', src: `${L}mood-open-face.jpg`, title: 'Open Face Stripe', label: 'Open Face', to: '/san-pham?danh-muc=open-face' },
  { id: 'flame', src: `${L}mood-large-size.jpg`, title: 'Red Flame', label: 'Large Size', to: '/san-pham' },
]

// coverflow: the active card faces front, neighbours step back and turn away
export default function OurWorks() {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = WORKS.length
  const half = Math.floor(n / 2)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setTimeout(() => setActive((i) => (i + 1) % n), STEP_MS)
    return () => clearTimeout(timer)
  }, [active, paused, n])

  return (
    <section className="works" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container works__head">
        <p>{t.home.worksText}</p>
        <h2>{t.home.worksTitle}</h2>
      </div>

      <div className="works__stage" aria-roledescription="carousel">
        {WORKS.map((w, i) => {
          const offset = ((i - active + n + half) % n) - half
          const depth = Math.abs(offset)
          return (
            <Link
              key={w.id}
              to={w.to}
              className={`works__card ${offset === 0 ? 'is-active' : ''}`}
              style={{ '--o': offset, '--d': depth, zIndex: 10 - depth }}
              aria-hidden={depth > 2}
              tabIndex={depth > 2 ? -1 : 0}
              onClick={(e) => {
                // a side card first slides to the centre; the centre card follows its link
                if (offset !== 0) {
                  e.preventDefault()
                  setActive(i)
                }
              }}
            >
              <img src={w.src} alt={w.title} loading="lazy" />
              {offset === 0 && <span className="works__chip">{w.label}</span>}
              <span className="works__title">{w.title}</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
