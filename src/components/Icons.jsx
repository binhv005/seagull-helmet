const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const IconCart = (p) => (
  <svg {...base} {...p}><path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2" /><circle cx="9.5" cy="20" r="1.2" /><circle cx="17.5" cy="20" r="1.2" /></svg>
)
export const IconPhone = (p) => (
  <svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
)
export const IconPin = (p) => (
  <svg {...base} {...p}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
)
export const IconClock = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
)
export const IconUser = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
)
export const IconMenu = (p) => (
  <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)
export const IconClose = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
)
export const IconArrow = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const IconChevron = ({ dir = 'right', ...p }) => (
  <svg {...base} {...p} style={{ transform: dir === 'left' ? 'rotate(180deg)' : undefined }}><path d="M9 6l6 6-6 6" /></svg>
)
export const IconShield = (p) => (
  <svg {...base} {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
)
export const IconBadge = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="9" r="6" /><path d="M8.5 14L7 21l5-3 5 3-1.5-7" /></svg>
)
export const IconSwap = (p) => (
  <svg {...base} {...p}><path d="M4 8h13l-3-3M20 16H7l3 3" /></svg>
)
export const IconChat = (p) => (
  <svg {...base} {...p}><path d="M4 5h16v11H9l-5 4z" /><path d="M8 10h8M8 13h5" /></svg>
)
export const IconTrash = (p) => (
  <svg {...base} {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></svg>
)
export const IconSearch = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
)
export const IconFacebook = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5H16.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21z" /></svg>
)
export const IconInstagram = (p) => (
  <svg {...base} {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" /></svg>
)
export const IconTiktok = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M16.5 3c.3 2.2 1.6 3.6 3.8 3.8v3a7 7 0 0 1-3.8-1.2v6.1A5.7 5.7 0 1 1 10.8 9v3.1a2.7 2.7 0 1 0 2.7 2.7V3z" /></svg>
)
export const IconZalo = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...p}><rect x="2" y="3" width="20" height="18" rx="5" fill="currentColor" /><text x="12" y="15.2" textAnchor="middle" fontSize="7.2" fontWeight="700" fontFamily="Arial, sans-serif" fill="var(--zalo-ink, #3b2f23)">Zalo</text></svg>
)
export const IconCheck = (p) => (
  <svg {...base} {...p}><path d="M5 12l5 5 9-10" /></svg>
)
export const IconEye = (p) => (
  <svg {...base} {...p}><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
)
export const IconGrid = (p) => (
  <svg {...base} {...p}><rect x="4" y="4" width="6.5" height="6.5" rx="1" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" /></svg>
)
export const IconList = (p) => (
  <svg {...base} {...p}><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r="1" /><circle cx="4.5" cy="12" r="1" /><circle cx="4.5" cy="18" r="1" /></svg>
)
export const IconFilter = (p) => (
  <svg {...base} {...p}><path d="M4 6h16M7 12h10M10 18h4" /></svg>
)
export const IconMail = (p) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5 12 13l8.5-6.5" /></svg>
)
export const IconSend = (p) => (
  <svg {...base} {...p}><path d="M21 3 10 14M21 3l-7 18-4-7-7-4z" /></svg>
)
export const IconTruck = (p) => (
  <svg {...base} {...p}><path d="M2 6h11v10H2zM13 9h4l4 4v3h-8" /><circle cx="6" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg>
)
export const IconLoop = (p) => (
  <svg {...base} {...p}><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4" /></svg>
)
