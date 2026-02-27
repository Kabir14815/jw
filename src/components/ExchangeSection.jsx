const FEATURES = [
  'Garg Exchange',
  'The Purity Guarantee',
  'Complete Transparency and Trust',
  'Lifetime Maintenance',
]

export default function ExchangeSection() {
  return (
    <section className="exchange-section">
      <div className="container">
        <h2 className="section-heading">Exchange Program</h2>
        <p className="exchange-tagline">Trusted by families across India</p>
        <p className="exchange-desc">
          Trust us to be part of your precious moments and to deliver jewellery that you'll cherish forever.
        </p>
        <div className="exchange-features">
          {FEATURES.map((label) => (
            <div key={label} className="exchange-item">
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
