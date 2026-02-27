const U = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&fit=crop`

const TILES = [
  { label: '₹24,999', amount: 24999, image: U('1617038260897-8c0a013a7f8e', 600), href: '#collections' },
  { label: '₹49,999', amount: 49999, image: U('1573408301185-9146fe634ad0', 600), href: '#collections' },
  { label: '₹74,999', amount: 74999, image: U('1599643478518-a784e5dc4c8f', 600), href: '#collections' },
  { label: '₹99,999', amount: 99999, image: U('1605100804763-247f67b3557e', 600), href: '#collections' },
]

export default function ShopForUnderSection() {
  return (
    <section className="shop-for-under">
      <div className="shop-for-under__grid">
        {TILES.map(({ label, image, href }) => (
          <a key={label} href={href} className="shop-for-under__tile">
            <div className="shop-for-under__bg" style={{ backgroundImage: `url(${image})` }} />
            <span className="shop-for-under__heading">Shop for under</span>
            <span className="shop-for-under__price">{label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
