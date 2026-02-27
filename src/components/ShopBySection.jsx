const CATEGORIES = [
  'Earrings',
  'Finger Rings',
  'Pendants',
  'Mangalsutra',
  'Bracelets',
  'Bangles',
  'Chains',
]

export default function ShopBySection() {
  return (
    <section className="shop-by-section">
      <div className="container">
        <h2 className="section-heading">Find Your Perfect Match</h2>
        <p className="section-sub">Shop by Categories</p>
        <div className="shop-by-grid">
          {CATEGORIES.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
              className="shop-by-item"
            >
              <span>{label}</span>
            </a>
          ))}
          <a href="#view-all" className="shop-by-item view-all">
            <span>View All</span>
          </a>
        </div>
      </div>
    </section>
  )
}
