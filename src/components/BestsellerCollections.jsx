import { useState } from 'react'
import { bestsellerItems, jewelleryPlaceholder } from '../assets/images'

export default function BestsellerCollections() {
  return (
    <section className="bestseller-collections">
      <h2 className="bestseller-title">Bestseller Collections</h2>
      <div className="bestseller-grid">
        {bestsellerItems.map(({ label, image }, i) => (
          <BestsellerItem key={label} label={label} image={image} fallback={jewelleryPlaceholder} />
        ))}
      </div>
      <div className="bestseller-divider">
        <svg className="bestseller-divider-line" viewBox="0 0 320 2" preserveAspectRatio="none" aria-hidden>
          <line x1="0" y1="1" x2="320" y2="1" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="bestseller-symbol" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M8 12c0-2 1.5-4 4-4s4 2 4 4-1.5 4-4 4-4-2-4-4z" />
            <path d="M16 12c0 2-1.5 4-4 4s-4-2-4-4 1.5-4 4-4 4 2 4 4z" />
          </svg>
        </span>
      </div>
    </section>
  )
}

function BestsellerItem({ label, image, fallback }) {
  const [src, setSrc] = useState(image)
  return (
    <a href={`#${label.toLowerCase().replace(/\s+/g, '-')}`} className="bestseller-item">
      <div className="bestseller-circle">
        <img src={src} alt="" onError={() => setSrc(fallback)} />
      </div>
      <span className="bestseller-label">{label}</span>
    </a>
  )
}
