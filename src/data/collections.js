// Campaigns shown on the home page and the lookbook.
// gallery items: { src, kind: 'photo' | 'cutout' }
const L = '/images/lifestyle/'
const P = '/images/products/'

export const collections = [
  {
    id: 'ride-with-legend',
    forWho: { vi: 'Dành cho người mê lịch sử hàng không, thích vẻ hoài cổ và muốn chiếc mũ 3/4 có câu chuyện riêng.', en: 'For lovers of aviation history and vintage style who want a 3/4 helmet with a story.' },
    product: 'tw-786-flying-tigers',
    cover: `${L}flying-tigers-wide.jpg`,
    name: 'Ride with Legend',
    line: 'TW-786 Flying Tigers',
    tagline: { vi: 'Tri ân huyền thoại, tự do bay cao', en: 'Honouring a legend, riding free' },
    story: {
      vi: 'Hổ có cánh, ngôi sao cổ điển và những vết sơn nứt như dấu thời gian – bộ sưu tập tái hiện tinh thần của phi đội Flying Tigers trên dáng mũ 3/4 thanh lịch.',
      en: 'Winged tigers, classic stars and crackle paint like the marks of time – the collection revives the Flying Tigers spirit on an elegant 3/4 shell.',
    },
    gallery: [
      { src: `${L}flying-tigers-table.jpg`, kind: 'photo' },
      { src: `${P}tw-786-flying-tigers/sky-guardians.webp`, kind: 'cutout' },
      { src: `${L}mood-three-quarter.jpg`, kind: 'photo' },
    ],
  },
  {
    id: 'wild-and-free',
    forWho: { vi: 'Dành cho dân chopper, café racer và những ai muốn nổi bật trên mọi cung đường.', en: 'For chopper and café racer riders who want to stand out on every road.' },
    product: 'tw-500tx-fc-mexican-butcher',
    cover: `${L}mexican-butcher-wide.jpg`,
    name: 'Wild & Free',
    line: 'TW-500TX-FC Mexican Butcher',
    tagline: { vi: 'Linh hồn Mexico x văn hoá đường phố Mỹ', en: 'Mexican soul x American street culture' },
    story: {
      vi: 'Sinh ra trong garage giữa mùi dầu máy và cờ lê, Mexican Butcher là chiếc fullface vẽ tay dành cho những ai sống đúng chất chopper.',
      en: 'Born in a garage among engine oil and wrenches, the Mexican Butcher is a hand-drawn full face for riders who live the chopper life.',
    },
    gallery: [
      { src: `${P}tw-500tx-fc-mexican-butcher/matte-iron.webp`, kind: 'cutout' },
      { src: `${L}mood-full-face.jpg`, kind: 'photo' },
      { src: `${P}tw-500tx-f/gold.webp`, kind: 'cutout' },
    ],
  },
  {
    id: 'ride-your-style',
    forWho: { vi: 'Dành cho Gen Z, Millennials đi phố mỗi ngày, thích phong cách gọn nhẹ và tinh tế.', en: 'For Gen Z and Millennials riding the city every day who like a light, refined look.' },
    product: 'tw-786-city',
    cover: `${L}ride-your-style.jpg`,
    name: 'Ride Your Style',
    line: 'City Collection',
    tagline: { vi: 'Mỗi ngày là một chuyến đi', en: 'Every day is a ride' },
    story: {
      vi: 'Một chiếc mũ 3/4 màu kem, chiếc kính bong bóng và con phố quen thuộc – phong cách không cần ồn ào, chỉ cần đúng là bạn.',
      en: 'A cream 3/4 helmet, a bubble visor and your favourite street – style that needs no noise, just you.',
    },
    gallery: [
      { src: `${L}mood-open-face.jpg`, kind: 'photo' },
      { src: `${P}tw-786-wind-rider/vanilla.webp`, kind: 'cutout' },
      { src: `${L}mood-large-size.jpg`, kind: 'photo' },
    ],
  },
  {
    id: 'workshop-classics',
    forWho: { vi: 'Dành cho người trân trọng đồ thủ công, thích những món đồ càng dùng càng đẹp.', en: 'For riders who value handcraft and things that get better with age.' },
    product: 'tw-786-artisan-stripe',
    cover: `${L}workshop-wide.jpg`,
    name: 'Workshop Classics',
    line: 'TW-786 Artisan',
    tagline: { vi: 'Thủ công tỉ mỉ, đẹp theo năm tháng', en: 'Hand-finished, better with age' },
    story: {
      vi: 'Chỉ vàng đồng kẻ tay, viền da khâu tay và huy hiệu SEAGULL mạ vàng – những chi tiết nhỏ làm nên một chiếc mũ đáng giữ lâu dài.',
      en: 'Hand-painted gold pinstripes, hand-stitched leather trim and a gold SEAGULL badge – small details that make a helmet worth keeping.',
    },
    gallery: [
      { src: `${P}tw-786-artisan-stripe/milk-tea.webp`, kind: 'cutout' },
      { src: `${P}tw-786-artisan/ultimate-matte-black.webp`, kind: 'cutout' },
      { src: `${P}tw-777p/ivory.webp`, kind: 'cutout' },
    ],
  },
]
