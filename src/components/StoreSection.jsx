export default function StoreSection() {
  return (
    <section className="store-section" id="stores">
      <div className="container">
        <h2 className="store-section__title">Royalty Claims Its Throne in Punjab</h2>
        <p className="store-section__tagline">THE HOUSE OF GARG</p>
        <p className="store-section__desc">
          Showcasing “The House of Garg” from Garg Jewellers, a luxury two floor bodega in the heart of city beautiful with two sectioned floors blooming with the most gleaming jewels and the most haute couture in the city. Step in and feel the heritage of luxury and dive in the balance of tradition and modernity, that we doubt the city has seen before.
        </p>
        <div className="store-section__locations">
          <div className="store-card">
            <h3 className="store-card__name">Sector 22 – Chandigarh</h3>
            <p className="store-card__address">City Beautiful</p>
            <a href="https://www.thehouseofgarg.com" className="store-card__link" target="_blank" rel="noopener noreferrer">
              WWW.THEHOUSEOFGARG.COM
            </a>
            <a href="tel:+919876376859" className="store-card__phone">+91 98763 76859</a>
          </div>
          <div className="store-card store-card--coming">
            <span className="store-card__badge">Coming soon</span>
            <h3 className="store-card__name">Kharar, Punjab</h3>
            <p className="store-card__address">Arya College Rd, Pathran Wala Khoo, Kharar, Punjab 140301</p>
          </div>
        </div>
      </div>
    </section>
  )
}
