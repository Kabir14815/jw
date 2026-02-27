import { categoryTiles } from '../assets/images'

const TILES = [
  'Festive',
  'Jhumkas',
  'Gold Chains',
  'Silver Idols',
  'Gifting Jewellery',
  'Necklace',
  'Gold Coins',
]

export default function CategoryTiles() {
  return (
    <section className="category-tiles">
      <div className="container">
        <div className="tile-grid">
          {TILES.map((label, i) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
              className="tile"
            >
              <img
                src={categoryTiles[i]}
                alt=""
                className="tile-img"
              />
              <span className="tile-label">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
