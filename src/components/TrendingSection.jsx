import { useState } from 'react'
import { trending, jewelleryPlaceholder } from '../assets/images'

const TRENDING = [
  { label: 'Auspicious Occasion', href: '#auspicious' },
  { label: 'Gifting Jewellery', href: '#gifting' },
  { label: 'Drops of Radiance', href: '#radiance' },
  { label: 'Necklace Favourites', href: '#necklace' },
  { label: 'Gold Chains', href: '#chains' },
  { label: 'Earrings Edit', href: '#earrings' },
]

export default function TrendingSection() {
  return (
    <section className="trending-section">
      <div className="container">
        <h2 className="section-heading">Trending Now</h2>
        <p className="section-sub">Jewellery pieces everyone's eyeing right now</p>
        <div className="trending-grid">
          {TRENDING.map(({ label, href }, i) => (
            <ImageCard key={label} href={href} label={label} src={trending[i]} fallback={jewelleryPlaceholder} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ImageCard({ href, label, src, fallback }) {
  const [imgSrc, setImgSrc] = useState(src)
  return (
    <a href={href} className="trending-card">
      <div className="trending-img">
        <img src={imgSrc} alt="" onError={() => setImgSrc(fallback)} />
      </div>
      <span>{label}</span>
    </a>
  )
}
