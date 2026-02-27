const ITEMS = ['Quality Craftsmanship', 'Ethically Sourced', '100% Transparency']

export default function AssuranceSection() {
  return (
    <section className="assurance-section">
      <div className="container">
        <h2 className="section-heading">Garg Assurance</h2>
        <p className="assurance-tagline">Crafted by experts, cherished by you</p>
        <div className="assurance-grid">
          {ITEMS.map((label) => (
            <div key={label} className="assurance-item">
              <div className="assurance-icon" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
