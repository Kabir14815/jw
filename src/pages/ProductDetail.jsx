import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDocumentHead } from '../utils/useDocumentHead.js'
import MainNav from '../components/MainNav.jsx'
import MainFooter from '../components/MainFooter.jsx'
import Modal from '../components/Modal.jsx'
import { productsApi, cartApi } from '../api/client.js'
import { jewelleryPlaceholder, demoProducts } from '../assets/images.js'

const DEMO_DESCRIPTION = 'Crafted with precision at The House of Garg. This piece is part of our showcase collection. Log in to add to cart and complete your purchase.'

export default function ProductDetail() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [modal, setModal] = useState(null) // { title, message, loginRequired }

  useDocumentHead({
    title: product ? product.name : (productId ? 'Product' : ''),
    description: product
      ? (product.description
          ? `${product.name} — ${String(product.description).slice(0, 140)}…`
          : `${product.name} — Fine gold and diamond jewellery at The House of Garg, Chandigarh.`)
      : 'Fine gold and diamond jewellery at The House of Garg, Chandigarh.',
    path: productId ? `/shop/${productId}` : '/shop',
    image: product?.image_url?.startsWith('http') ? product.image_url : undefined,
  })

  useEffect(() => {
    if (!productId) {
      setLoading(false)
      return
    }
    const isDemo = String(productId).startsWith('demo-')
    if (isDemo) {
      const found = demoProducts.find((p) => p.id === productId)
      setProduct(found ? { ...found, description: DEMO_DESCRIPTION } : null)
      setLoading(false)
      return
    }
    setLoading(true)
    productsApi
      .get(productId)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [productId])

  const handleAddToCart = (e) => {
    e.preventDefault()
    const isDemo = String(productId).startsWith('demo-')
    if (isDemo) {
      setModal({
        title: 'Login required',
        message: 'Log in to add this item to your cart. Demo products are for display—create an account or sign in to purchase.',
        loginRequired: true,
      })
      return
    }
    setAdding(true)
    cartApi
      .add(productId, quantity)
      .then(() => {
        setAdding(false)
        setModal({ title: 'Added to cart', message: 'This item has been added to your cart.', loginRequired: false })
      })
      .catch((err) => {
        setAdding(false)
        setModal({
          title: 'Login required',
          message: err?.message || 'Please log in to add to cart.',
          loginRequired: true,
        })
      })
  }

  if (loading) {
    return (
      <>
        <MainNav />
        <main className="product-detail">
          <div className="container">
            <p className="shop-section__empty">Loading…</p>
          </div>
        </main>
        <MainFooter />
      </>
    )
  }

  if (!product) {
    return (
      <>
        <MainNav />
        <main className="product-detail">
          <div className="container">
            <p className="shop-section__empty">Product not found.</p>
            <Link to="/shop" className="product-detail__back">Back to shop</Link>
          </div>
        </main>
        <MainFooter />
      </>
    )
  }

  const imageUrl = product.image_url || jewelleryPlaceholder
  const isDemo = String(productId).startsWith('demo-')

  return (
    <>
      <MainNav />
      <main className="product-detail">
        <div className="container">
          <nav className="product-detail__breadcrumb" aria-label="Breadcrumb">
            <Link to="/shop">Shop</Link>
            <span className="product-detail__breadcrumb-sep" aria-hidden>/</span>
            <span className="product-detail__breadcrumb-current">{product.name}</span>
          </nav>
          <div className="product-detail__layout">
            <div className="product-detail__media">
              <img
                src={imageUrl}
                alt={product.name}
                onError={(e) => { e.target.src = jewelleryPlaceholder }}
              />
            </div>
            <div className="product-detail__info">
              <h1 className="product-detail__title">{product.name}</h1>
              <p className="product-detail__price">₹{Number(product.price).toLocaleString()}</p>
              {(product.description || isDemo) && (
                <div className="product-detail__description">
                  <h3>Details</h3>
                  <p>{product.description || DEMO_DESCRIPTION}</p>
                </div>
              )}
              <p className="product-detail__assurance">Authenticity assured · Free delivery on orders above ₹50,000</p>
              {!isDemo && (
                <div className="product-detail__quantity">
                  <label htmlFor="product-qty">Quantity</label>
                  <input
                    id="product-qty"
                    type="number"
                    min={1}
                    max={99}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(99, parseInt(e.target.value, 10) || 1)))}
                    className="product-detail__qty-input"
                  />
                </div>
              )}
              <button
                type="button"
                className="product-detail__cta"
                onClick={handleAddToCart}
                disabled={adding}
              >
                {adding ? 'Adding…' : 'Add to cart'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <MainFooter />

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.title}
      >
        <p className="modal-message">{modal?.message}</p>
        <div className="modal-actions">
          {modal?.loginRequired ? (
            <Link to="/login" className="modal-btn modal-btn--primary" onClick={() => setModal(null)}>
              Log in
            </Link>
          ) : null}
          <button type="button" className="modal-btn" onClick={() => setModal(null)}>
            {modal?.loginRequired ? 'Cancel' : 'OK'}
          </button>
        </div>
      </Modal>
    </>
  )
}
