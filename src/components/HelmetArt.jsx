// Product cut-outs arranged as a small still life: the middle helmet sits in front.
export default function HelmetArt({ helmets, className = '', eager = false }) {
  const middle = Math.floor(helmets.length / 2)
  return (
    <div className={`helmet-art helmet-art--${helmets.length} ${className}`} aria-hidden="true">
      {helmets.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          className={i === middle ? 'is-front' : ''}
        />
      ))}
    </div>
  )
}
