import HelmetArt from './HelmetArt'

// an article's photo, or its product cut-outs when it has none
export default function NewsImage({ item, alt = '', eager = false }) {
  if (item.cover) {
    return <img className="news-img" src={item.cover} alt={alt} loading={eager ? 'eager' : 'lazy'} />
  }
  return (
    <div className="news-img news-img--art">
      <HelmetArt helmets={item.helmets} eager={eager} />
    </div>
  )
}
