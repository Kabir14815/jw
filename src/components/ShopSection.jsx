import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { productsApi, cartApi, categoriesApi } from '../api/client.js'
import { jewelleryPlaceholder, demoProducts } from '../assets/images.js'
import Modal from './Modal.jsx'

export default function ShopSection() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [addingId, setAddingId] = useState(null)
  const [categorySlug, setCategorySlug] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [modal, setModal] = useState(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      productsApi.list(searchQuery || undefined, categorySlug || undefined),
      categoriesApi.list().catch(() => []),
    ])
      .then(([data, cats]) => {
        const list = Array.isArray(data) ? data : []
        setProducts(list.length > 0 ? list : demoProducts)
        setCategories(Array.isArray(cats) ? cats : [])
      })
      .catch(() => setProducts(demoProducts))
      .finally(() => setLoading(false))
  }, [categorySlug, searchQuery])

  const filteredProducts = useMemo(() => {
    let list = products
    const min = priceMin ? parseFloat(priceMin) : null
    const max = priceMax ? parseFloat(priceMax) : null
    if (min != null && !Number.isNaN(min)) list = list.filter((p) => Number(p.price) >= min)
    if (max != null && !Number.isNaN(max)) list = list.filter((p) => Number(p.price) <= max)
    return list
  }, [products, priceMin, priceMax])

  const handleAddToCart = (e, productId) => {
    e.preventDefault()
    e.stopPropagation()
    const isDemo = String(productId).startsWith('demo-')
    if (isDemo) {
      setModal({ title: 'Login required', message: 'Log in to add this item to your cart. Demo products are for display.', loginRequired: true })
      return
    }
    setAddingId(productId)
    cartApi.add(productId, 1)
      .then(() => { setAddingId(null); setModal({ title: 'Added to cart', message: 'This item has been added to your cart.', loginRequired: false }) })
      .catch((err) => {
        setAddingId(null)
        setModal({ title: 'Login required', message: err?.message || 'Please log in to add to cart.', loginRequired: true })
      })
  }

  return (
    <section className="shop-section" id="shop">
      <div className="container">
        <h2 className="section-heading">Shop</h2>
        <p className="section-sub">Browse our jewellery collection</p>

        <div className="shop-filters">
          <input
            type="search"
            className="shop-filters__search"
            placeholder="Search products…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search"
          />
          <select
            className="shop-filters__category"
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            aria-label="Category"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <input
            type="number"
            className="shop-filters__price"
            placeholder="Min ₹"
            min="0"
            step="1000"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            aria-label="Minimum price"
          />
          <input
            type="number"
            className="shop-filters__price"
            placeholder="Max ₹"
            min="0"
            step="1000"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            aria-label="Maximum price"
          />
        </div>

        {loading ? (
          <p className="shop-section__empty">Loading…</p>
        ) : filteredProducts.length === 0 ? (
          <p className="shop-section__empty">No products match your filters. Try adjusting or clearing.</p>
        ) : (
          <div className="shop-grid">
            {filteredProducts.map((p) => (
              <article key={p.id} className="shop-card">
                <Link to={`/shop/${p.id}`} className="shop-card__link">
                  <div className="shop-card__img-wrap">
                    <img
                      src={p.image_url || jewelleryPlaceholder}
                      alt={p.name}
                      onError={(e) => { e.target.src = jewelleryPlaceholder }}
                    />
                  </div>
                  <div className="shop-card__body">
                    <h3 className="shop-card__name">{p.name}</h3>
                    <span className="shop-card__price">₹{Number(p.price).toLocaleString()}</span>
                  </div>
                </Link>
                <div className="shop-card__actions">
                  <button
                    type="button"
                    className="shop-card__cta"
                    onClick={(e) => handleAddToCart(e, p.id)}
                    disabled={addingId === p.id}
                  >
                    {addingId === p.id ? 'Adding…' : 'Add to cart'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.title}>
        <p className="modal-message">{modal?.message}</p>
        <div className="modal-actions">
          {modal?.loginRequired ? (
            <Link to="/login" className="modal-btn modal-btn--primary" onClick={() => setModal(null)}>Log in</Link>
          ) : null}
          <button type="button" className="modal-btn" onClick={() => setModal(null)}>{modal?.loginRequired ? 'Cancel' : 'OK'}</button>
        </div>
      </Modal>
    </section>
  )
}
