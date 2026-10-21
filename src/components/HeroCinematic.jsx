import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import { IconArrow } from './Icons'

// one looping background video; the copy rotates through the slides on top of it
const slides = [
  // line2Scale shrinks a long second line
  { id: 'genuine', to: '/san-pham', line2Scale: 0.9 },
  { id: 'road', to: '/san-pham?danh-muc=full-face' },
  { id: 'style', to: '/lookbook' },
  { id: 'fit', to: '/lien-he' },
]

const SLIDE_MS = 6000

// slow drifting dust particles in brand colours
function Dust() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame
    let dots = []

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * ratio
      canvas.height = height * ratio
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      const count = Math.round((width * height) / 9000)
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.3,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -Math.random() * 0.18 - 0.03,
        phase: Math.random() * Math.PI * 2,
        warm: Math.random() < 0.35,
      }))
    }

    const draw = (time) => {
      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)
      for (const d of dots) {
        if (!still) {
          d.x += d.vx
          d.y += d.vy
          if (d.y < -4) d.y = height + 4
          if (d.x < -4) d.x = width + 4
          if (d.x > width + 4) d.x = -4
        }
        const alpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(time / 900 + d.phase))
        ctx.fillStyle = d.warm ? `rgba(230, 140, 70, ${alpha})` : `rgba(246, 236, 220, ${alpha * 0.8})`
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!still) frame = requestAnimationFrame(draw)
    }

    resize()
    frame = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="cine__dust" aria-hidden="true" />
}

export default function HeroCinematic() {
  const { t } = useLang()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef(null)
  const videoRef = useRef(null)
  const total = slides.length
  const copy = t.hero[index]
  const slide = slides[index]

  const go = (next) => setIndex((next + total) % total)

  // advance every SLIDE_MS; hovering the hero pauses it
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % total), SLIDE_MS)
    return () => clearTimeout(timer)
  }, [index, paused, total])

  // honour reduced-motion: keep the poster frame instead of playing
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.pause()
    else video.play().catch(() => {})
  }, [])

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
    touchX.current = null
  }

  return (
    <section
      className="cine"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <video
        ref={videoRef}
        className="cine__video"
        src="/video/hero-ride.mp4"
        poster="/video/hero-ride-poster.jpg"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="cine__glow" aria-hidden="true" />
      <Dust />

      {/* keyed on the slide so every element replays its entrance animation */}
      <div className="container cine__inner" key={slide.id}>
        <div className="cine__copy">
          <h1 className="cine__title">
            <span className="cine__line">
              <span className="cine-rise" style={{ '--d': '0.15s' }}>
                <span className="fire" data-text={copy.line1}>
                  <span className="fire__core">{copy.line1}</span>
                </span>
              </span>
            </span>
            <span className="cine__line">
              <span className="cine-rise" style={{ '--d': '0.32s', fontSize: slide.line2Scale ? `${slide.line2Scale}em` : undefined }}>
                <span className="fire" data-text={copy.line2}>
                  <span className="fire__core">{copy.line2}</span>
                </span>
              </span>
            </span>
          </h1>
          {copy.text && (
            <p className="cine__text cine-in" style={{ '--d': '0.55s' }}>{copy.text}</p>
          )}
          <Link to={slide.to} className="cine__cta cine-in" style={{ '--d': '0.7s' }}>
            <span>{copy.cta}</span>
            <i>
              <IconArrow width={16} height={16} />
            </i>
          </Link>
        </div>

        <div className="cine__side">
          <p className="cine__quote cine-in" style={{ '--d': '0.6s' }}>
            {copy.quote.map((q) => (
              <span key={q}>{q}</span>
            ))}
          </p>
          <p className="cine__tag cine-in" style={{ '--d': '0.75s' }}>{copy.tag}</p>
        </div>
      </div>
    </section>
  )
}
