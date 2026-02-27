import { useState } from 'react'

const TABS = ['Wedding', 'Gold', 'Diamond', 'Dailywear']

export default function WorldSection() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="world-section">
      <div className="container">
        <h2 className="section-heading">Garg World</h2>
        <p className="section-sub">A companion for every occasion</p>
        <div className="world-tabs">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={`world-tab ${i === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="world-grid">
          {TABS.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="world-card"
            >
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
