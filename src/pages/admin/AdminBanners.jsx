import { useState, useEffect } from 'react'
import { bannersApi } from '../../api/client.js'

export default function AdminBanners() {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [toast, setToast] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    image_url: '',
    brand_label: 'G',
    brand_name: '',
    presents: 'THE HOUSE OF GARG',
    collection_name: '',
    cta: 'SHOP NOW',
    cta_href: '/shop',
    sort_order: 0,
  })

  const load = () => {
    setLoading(true)
    bannersApi.list()
      .then((data) => setBanners(data || []))
      .catch(() => setBanners([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => load(), [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(t)
  }, [toast])

  const emptyForm = () => ({
    image_url: '',
    brand_label: 'G',
    brand_name: '',
    presents: 'THE HOUSE OF GARG',
    collection_name: '',
    cta: 'SHOP NOW',
    cta_href: '/shop',
    sort_order: banners.length,
  })

  const handleCreate = (e) => {
    e.preventDefault()
    if (!form.image_url?.trim()) {
      setToast({ message: 'Image URL is required.', type: 'error' })
      return
    }
    const payload = {
      ...form,
      brand_label: form.brand_label || 'G',
      sort_order: parseInt(form.sort_order, 10) || 0,
    }
    bannersApi.create(payload)
      .then(() => {
        setForm(emptyForm())
        setShowForm(false)
        load()
        setToast({ message: 'Banner added.', type: 'success' })
      })
      .catch((err) => setToast({ message: err?.message || 'Failed', type: 'error' }))
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    if (!editing) return
    const payload = {}
    if (form.image_url !== undefined) payload.image_url = form.image_url
    if (form.brand_label !== undefined) payload.brand_label = form.brand_label
    if (form.brand_name !== undefined) payload.brand_name = form.brand_name
    if (form.presents !== undefined) payload.presents = form.presents
    if (form.collection_name !== undefined) payload.collection_name = form.collection_name
    if (form.cta !== undefined) payload.cta = form.cta
    if (form.cta_href !== undefined) payload.cta_href = form.cta_href
    if (form.sort_order !== undefined) payload.sort_order = parseInt(form.sort_order, 10)
    bannersApi.update(editing.id, payload)
      .then(() => {
        setEditing(null)
        setForm(emptyForm())
        load()
        setToast({ message: 'Banner updated.', type: 'success' })
      })
      .catch((err) => setToast({ message: err?.message || 'Failed', type: 'error' }))
  }

  const handleDelete = (id) => {
    if (!confirm('Delete this banner?')) return
    bannersApi.delete(id)
      .then(() => {
        load()
        setToast({ message: 'Banner deleted.', type: 'success' })
      })
      .catch((err) => setToast({ message: err?.message || 'Failed', type: 'error' }))
  }

  const startEdit = (b) => {
    setEditing(b)
    setShowForm(false)
    setForm({
      image_url: b.image_url || '',
      brand_label: b.brand_label || 'G',
      brand_name: b.brand_name || '',
      presents: b.presents || '',
      collection_name: b.collection_name || '',
      cta: b.cta || 'SHOP NOW',
      cta_href: b.cta_href || '/shop',
      sort_order: b.sort_order ?? 0,
    })
  }

  const cancelEdit = () => {
    setEditing(null)
    setForm(emptyForm())
  }

  const imageUrl = (url) => {
    if (!url) return ''
    if (url.startsWith('http')) return url
    const base = typeof window !== 'undefined' ? window.location.origin : ''
    return base + (url.startsWith('/') ? url : '/' + url)
  }

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Banners</h1>
      <p className="admin-page__sub">Manage hero carousel banners on the landing page.</p>

      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`} role="alert">
          {toast.message}
        </div>
      )}

      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          <div className="admin-section">
            <div className="admin-section__head">
              <h2>Hero Banners ({banners.length})</h2>
              <button
                type="button"
                className="admin-btn admin-btn--primary"
                onClick={() => { setShowForm(!showForm); setEditing(null); setForm(emptyForm()); }}
              >
                {showForm ? 'Cancel' : 'Add banner'}
              </button>
            </div>

            {(showForm || editing) && (
              <form
                className="admin-form admin-form--banner"
                onSubmit={editing ? handleUpdate : handleCreate}
              >
                <div className="admin-form__row">
                  <label>Image URL *</label>
                  <input
                    type="url"
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    placeholder="https://... or /banners/xxx.png"
                  />
                </div>
                <div className="admin-form__grid">
                  <div className="admin-form__row">
                    <label>Brand label</label>
                    <input
                      type="text"
                      value={form.brand_label}
                      onChange={(e) => setForm({ ...form, brand_label: e.target.value })}
                      placeholder="G"
                    />
                  </div>
                  <div className="admin-form__row">
                    <label>Brand name</label>
                    <input
                      type="text"
                      value={form.brand_name}
                      onChange={(e) => setForm({ ...form, brand_name: e.target.value })}
                      placeholder="TRADITIONAL GOLD"
                    />
                  </div>
                </div>
                <div className="admin-form__row">
                  <label>Presents</label>
                  <input
                    type="text"
                    value={form.presents}
                    onChange={(e) => setForm({ ...form, presents: e.target.value })}
                    placeholder="THE HOUSE OF GARG"
                  />
                </div>
                <div className="admin-form__row">
                  <label>Collection / subtitle</label>
                  <input
                    type="text"
                    value={form.collection_name}
                    onChange={(e) => setForm({ ...form, collection_name: e.target.value })}
                    placeholder="Swipe to unveil incredible inspiration"
                  />
                </div>
                <div className="admin-form__grid">
                  <div className="admin-form__row">
                    <label>CTA text</label>
                    <input
                      type="text"
                      value={form.cta}
                      onChange={(e) => setForm({ ...form, cta: e.target.value })}
                      placeholder="SHOP NOW"
                    />
                  </div>
                  <div className="admin-form__row">
                    <label>CTA link</label>
                    <input
                      type="text"
                      value={form.cta_href}
                      onChange={(e) => setForm({ ...form, cta_href: e.target.value })}
                      placeholder="/shop"
                    />
                  </div>
                </div>
                <div className="admin-form__row">
                  <label>Sort order</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
                    min={0}
                  />
                </div>
                <div className="admin-form__actions">
                  <button type="submit" className="admin-btn admin-btn--primary">
                    {editing ? 'Update' : 'Add'} banner
                  </button>
                  {editing && (
                    <button type="button" className="admin-btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}

            <div className="admin-banners-grid">
              {banners.map((b) => (
                <div key={b.id} className="admin-banner-card">
                  <div
                    className="admin-banner-card__img"
                    style={{ backgroundImage: b.image_url ? `url(${imageUrl(b.image_url)})` : undefined }}
                  />
                  <div className="admin-banner-card__body">
                    <strong>{b.brand_name || '(no title)'}</strong>
                    <p>{b.collection_name || b.presents || '—'}</p>
                    <div className="admin-banner-card__actions">
                      <button type="button" className="admin-btn admin-btn--sm" onClick={() => startEdit(b)}>
                        Edit
                      </button>
                      <button type="button" className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => handleDelete(b.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
