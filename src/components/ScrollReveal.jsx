import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// [selector, effect]: each block animates in the first time it scrolls into view.
// State lives in data attributes because React rewrites className on re-render.
// Siblings matched by the same selector are staggered. Effects are defined in index.css
// and use translate/scale/rotate/clip-path, so they never fight a block's own transform.
const RULES = [
  // shared
  ['.section-title', 'blur'],
  ['.footer-grid > *', 'up'],

  // home
  ['.works__head p', 'left'],
  ['.works__head h2', 'wipe'],
  ['.works__stage', 'zoom'],
  ['.collection-card', 'tilt'],
  ['.cat-show__card', 'up'],
  ['.video-band', 'wipe'],
  ['.product-card', 'up'],

  // products
  ['.shop-bar', 'down'],
  ['.shop-panel', 'left'],
  ['.shop-promo', 'wipe'],
  ['.shop-card', 'up'],

  // product detail
  ['.detail__info', 'right'],
  ['.pd-about__intro', 'left'],
  ['.pd-features li', 'flip'],
  ['.spotlight__text', 'left'],
  ['.spotlight', 'wipe'],

  // news
  ['.nx-feature', 'left'],
  ['.nx-side__item', 'right'],
  ['.nx-promo', 'wipe'],
  ['.nx-card', 'up'],
  ['.nx-lead', 'zoom'],
  ['.nx-list li', 'right'],
  ['.nx-social', 'right'],
  ['.news-card', 'tilt'],
  ['.article', 'blur'],

  // lookbook
  ['.lbx-label', 'blur'],
  ['.lbx-tile', 'zoom'],
  ['.lbx-feature__name', 'left'],
  ['.lbx-feature__deal', 'right'],
  ['.lbx-post', 'up'],

  // about
  ['.ab-ride .ab-split', 'blur'],
  ['.ab-story__text', 'right'],
  ['.ab-story__photo', 'wipe'],
  ['.ab-top__title', 'down'],
  ['.ab-top__art', 'zoom'],
  ['.ab-top__specs li', 'right'],
  ['.ab-top__stats li', 'left'],
  ['.ab-strip', 'up'],
  ['.ab-visit__card', 'left'],

  // contact & cart
  ['.ct-poster', 'left'],
  ['.ct-form', 'right'],
  ['.map', 'wipe'],
]

const STAGGER_MS = 90
const MAX_STAGGER = 6

export default function ScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.dataset.revealed = ''
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )

    // tag new matches (pages, tabs and pagination add nodes later)
    const scan = () => {
      for (const [selector, effect] of RULES) {
        const seen = new Map()
        for (const el of document.querySelectorAll(selector)) {
          if ('revealed' in el.dataset) continue
          // first match wins; blocks left hidden by a previous page (e.g. the footer) are re-observed
          if (!el.dataset.reveal) {
            const n = seen.get(el.parentElement) ?? 0
            seen.set(el.parentElement, n + 1)
            el.dataset.reveal = effect
            el.style.setProperty('--reveal-delay', `${Math.min(n, MAX_STAGGER) * STAGGER_MS}ms`)
          }
          io.observe(el)
        }
      }
    }

    scan()
    let queued = 0
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(queued)
      queued = requestAnimationFrame(scan)
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
      cancelAnimationFrame(queued)
    }
  }, [pathname])

  return null
}
