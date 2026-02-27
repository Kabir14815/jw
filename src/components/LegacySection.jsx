import { useState } from 'react'
import { legacyImage, placeholderImage } from '../assets/images.js'

export default function LegacySection() {
  const [imgSrc, setImgSrc] = useState(legacyImage)
  return (
    <section className="legacy-section">
      <div className="legacy-section__inner">
        <div className="legacy-section__content">
          <h2 className="legacy-section__title">The Legacy of Garg Jewellers</h2>
          <p className="legacy-section__text">
            The House of Garg has been synonymous with trust, craftsmanship, and timeless design. From our roots in Punjab to our presence in the heart of Chandigarh, we have upheld a promise of quality and authenticity in every piece. Our jewellery brings together traditional artistry and contemporary elegance, creating pieces that celebrate life’s most precious moments. Discover the heritage that has made Garg Jewellers a name families have trusted for generations.
          </p>
          <a href="#stores" className="legacy-section__cta">View more</a>
        </div>
        <div className="legacy-section__image-wrap">
          <img src={imgSrc} alt="" className="legacy-section__image" onError={() => setImgSrc(placeholderImage(800, 500, 'garg-legacy'))} />
        </div>
      </div>
    </section>
  )
}
