import { useState } from 'react'
import { curated, jewelleryPlaceholder } from '../assets/images'

const CARDS = [
  { label: 'Women Jewellery', href: '#women' },
  { label: 'Men Jewellery', href: '#men' },
  { label: 'Kids Jewellery', href: '#kids' },
  { label: 'Bridal Collection', href: '#bridal' },
  { label: 'Gifting', href: '#gifting' },
  { label: 'Gold Classics', href: '#gold' },
]

export default function CuratedSection() {
  return (
    <section className="curated-section">
      <div className="container">
        <h2 className="section-heading">Curated For You</h2>
        <p className="section-sub">Shop By Gender</p>
        <div className="curated-grid">
          {CARDS.map(({ label, href }, i) => (
            <ImageCard key={label} href={href} label={label} src={curated[i]} fallback={jewelleryPlaceholder} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ImageCard({ href, label, src, fallback }) {
  const [imgSrc, setImgSrc] = useState(src)
  return (
    <a href={href} className="curated-card">
      <div className="curated-img">
        <img src={imgSrc} alt="" onError={() => setImgSrc(fallback)} />
      </div>
      <span>{label}</span>
    </a>
  )
}
