export default function SectionTitle({ eyebrow, title, sub, align = 'center' }) {
  return (
    <div className={`section-title section-title--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      <span className="ornament" aria-hidden="true">
        <i />◆<i />
      </span>
      {sub && <p className="section-title__sub">{sub}</p>}
    </div>
  )
}
