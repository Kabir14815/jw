import { useState } from 'react'
import { collections, jewelleryPlaceholder } from '../assets/images'

const COLLECTIONS = [
  'Soulmate Diamond Pair',
  'String It',
  'Kids Jewellery',
  'Gold',
  'Dailywear',
  'Festive Edit',
  'Gifting',
  'Heritage Coins',
]

export default function CollectionsSection() {
  return (
    <section className="collections-section">
      <div className="container">
        <h2 className="section-heading">Garg Collections</h2>
        <p className="section-sub">Explore our newly launched collection</p>
        <div className="collections-grid">
          {COLLECTIONS.map((name, i) => (
            <CollectionCard key={name} name={name} src={collections[i]} fallback={jewelleryPlaceholder} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CollectionCard({ name, src, fallback }) {
  const [imgSrc, setImgSrc] = useState(src)
  return (
    <a href={`#${name.toLowerCase().replace(/\s+/g, '-')}`} className="collection-card">
      <div className="collection-img">
        <img src={imgSrc} alt="" onError={() => setImgSrc(fallback)} />
      </div>
      <span className="collection-name">{name}</span>
    </a>
  )
}
