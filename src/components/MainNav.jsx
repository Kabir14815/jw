import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { cartApi } from '../api/client.js'

const NAV_ITEMS = [
  { label: 'Shop', path: '/shop', icon: 'shop' },
  { label: 'All Jewellery', path: '/shop', icon: 'necklace' },
  { label: 'Gold', path: '/shop?category=gold', icon: 'gold' },
  { label: 'Diamond', path: '/shop?category=diamond', icon: 'diamond' },
  { label: 'Earrings', path: '/shop?category=earrings', icon: 'earrings' },
  { label: 'Rings', path: '/shop?category=rings', icon: 'ring' },
  { label: 'Daily Wear', path: '/shop?category=daily-wear', icon: 'dailywear' },
  { label: 'Collections', path: '/shop?category=collections', icon: 'collections' },
  { label: 'Wedding', path: '/shop?category=wedding', icon: 'wedding' },
  { label: 'Gifting', path: '/shop?category=gifting', icon: 'gift' },
  { label: 'More', path: '/shop', icon: 'more' },
]

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}
function IconImageSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  )
}
function IconMic() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  )
}
function IconDiamond() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
    </svg>
  )
}
function IconStore() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
function IconHeart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function IconBag() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
function IconChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

const stroke = 'currentColor'
const strokeW = 1.5

const CATEGORY_ICONS = {
  shop: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  necklace: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW}>
      <path d="M12 4v2M12 18v2M9 6a3 3 0 0 1 6 0v8a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V6z" />
      <circle cx="12" cy="14" r="1.5" />
    </svg>
  ),
  gold: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW}>
      <rect x="5" y="8" width="14" height="4" rx="0.5" />
      <rect x="6" y="12" width="12" height="4" rx="0.5" />
      <rect x="7" y="16" width="10" height="4" rx="0.5" />
    </svg>
  ),
  diamond: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW}>
      <path d="M12 2 2 10l10 12 10-12L12 2z" />
    </svg>
  ),
  earrings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW}>
      <circle cx="8" cy="11" r="2.5" />
      <circle cx="16" cy="11" r="2.5" />
      <path d="M8 13.5v3M16 13.5v3" />
    </svg>
  ),
  ring: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW}>
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="3.5" strokeDasharray="2 2" />
    </svg>
  ),
  dailywear: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW}>
      <ellipse cx="10" cy="12" rx="5" ry="4" />
      <ellipse cx="14" cy="12" rx="5" ry="4" />
    </svg>
  ),
  collections: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW}>
      <rect x="4" y="4" width="16" height="5" rx="0.5" />
      <rect x="5" y="10" width="14" height="5" rx="0.5" />
      <rect x="6" y="16" width="12" height="5" rx="0.5" />
    </svg>
  ),
  wedding: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW}>
      <circle cx="9" cy="12" r="4" />
      <circle cx="15" cy="12" r="4" />
    </svg>
  ),
  gift: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW}>
      <rect x="3" y="8" width="18" height="12" rx="1" />
      <path d="M12 8v12M3 12h18" />
      <path d="M12 8c0-2 1.5-3 3-3s2 1 2 2H12zM12 8c0-2-1.5-3-3-3S7 5 7 6h5z" />
    </svg>
  ),
  more: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeW}>
      <path d="M12 4v16M6 10h12" />
    </svg>
  ),
}

export default function MainNav() {
  const [logoError, setLogoError] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const [cartCount, setCartCount] = useState(0)
  useEffect(() => {
    if (!isAuthenticated) {
      setCartCount(0)
      return
    }
    cartApi.count().then((r) => setCartCount(r?.count ?? 0)).catch(() => setCartCount(0))
  }, [isAuthenticated])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`main-nav navbar-two-tier ${menuOpen ? 'menu-open' : ''}`} aria-label="Main navigation">
      <div className="nav-inner">
        {/* Row 1: Logo | Search | Actions + Hamburger (mobile) */}
        <div className="nav-row nav-row-1">
          <Link to="/" className="logo-block" onClick={closeMenu}>
            {!logoError && (
              <img
                src="/assets/logo.png"
                alt=""
                className="logo-img"
                onError={() => setLogoError(true)}
              />
            )}
            <div className={`logo-brand ${logoError ? 'show' : ''}`}>
              <span className="logo-symbol">G</span>
              <span className="logo-name">THE HOUSE OF GARG</span>
            </div>
          </Link>
          <form className="nav-search-wrap" onSubmit={(e) => e.preventDefault()}>
            <IconSearch />
            <input
              type="search"
              className="nav-search"
              placeholder="Search for diamond jewellery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
            <button type="button" className="nav-search-btn" aria-label="Image search">
              <IconImageSearch />
            </button>
            <button type="button" className="nav-search-btn" aria-label="Voice search">
              <IconMic />
            </button>
          </form>
          <div className="nav-actions">
            <button
              type="button"
              className="nav-toggle"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
              <span className="nav-toggle-bar" />
            </button>
            <Link to="/shop" className="nav-action nav-action-shop" aria-label="Shop" onClick={closeMenu}>
              <IconStore />
            </Link>
            <Link to="/shop?category=diamond" className="nav-action nav-action-dt" aria-label="Diamond" onClick={closeMenu}>
              <IconDiamond />
            </Link>
            <a href="#stores" className="nav-action nav-action-dt" aria-label="Find a store" onClick={closeMenu}>
              <IconStore />
            </a>
            <a href="#wishlist" className="nav-action nav-action-dt" aria-label="Wishlist" onClick={closeMenu}>
              <IconHeart />
            </a>
            <Link to="/login" className="nav-action nav-action-dt" aria-label="Account" onClick={closeMenu}>
              <IconUser />
            </Link>
            <Link to="/shop" className="nav-action nav-cart" aria-label="Cart" onClick={closeMenu}>
              <IconBag />
              <span className="cart-count">{cartCount}</span>
            </Link>
          </div>
        </div>
        {/* Row 2: Category links (desktop) / dropdown (mobile) */}
        <div className="nav-row nav-row-2">
          <ul className="nav-links">
            {NAV_ITEMS.map(({ label, path, icon }) => {
              const IconComponent = CATEGORY_ICONS[icon]
              return (
                <li key={label}>
                  <Link to={path} onClick={closeMenu}>
                    {IconComponent && IconComponent()}
                    <span>{label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
