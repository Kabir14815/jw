import { useState, useEffect } from 'react'
import { productsApi, categoriesApi, settingsApi } from '../../api/client.js'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [goldRate, setGoldRate] = useState('')
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({
    name: '', slug: '', description: '', price: '', image_url: '', category_id: '', in_stock: 1,
    gold_weight_grams: '', making_charges: '',
  })

  const load = () => {
    setLoading(true)
    Promise.all([productsApi.list(), categoriesApi.list(), settingsApi.getGoldRate()])
      .then(([prods, cats, settings]) => {
        setProducts(prods || [])
        setCategories(cats || [])
        setGoldRate(String(settings?.value ?? ''))
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => load(), [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(t)
  }, [toast])

  const handleSaveGoldRate = (e) => {
    e.preventDefault()
    const val = parseFloat(goldRate)
    if (Number.isNaN(val) || val < 0) {
      setToast({ message: 'Enter a valid gold rate (₹ per gram).', type: 'error' })
      return
    }
    settingsApi.setGoldRate(val)
      .then((res) => { setGoldRate(String(res.value)); load(); setToast({ message: 'Gold rate saved.', type: 'success' }) })
      .catch((err) => setToast({ message: err?.message || 'Failed to save gold rate', type: 'error' }))
  }

  const computedPrice = (() => {
    const w = parseFloat(form.gold_weight_grams)
    const r = parseFloat(goldRate)
    const m = parseFloat(form.making_charges) || 0
    if (Number.isNaN(w) || w <= 0 || Number.isNaN(r) || r < 0) return null
    return (w * r + m).toFixed(2)
  })()

  const emptyForm = () => ({
    name: '', slug: '', description: '', price: '', image_url: '', category_id: '', in_stock: 1,
    gold_weight_grams: '', making_charges: '',
  })

  const handleCreate = (e) => {
    e.preventDefault()
    const hasWeight = form.gold_weight_grams && parseFloat(form.gold_weight_grams) > 0
    const payload = {
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'),
      description: form.description || null,
      price: hasWeight ? 0 : (parseFloat(form.price) || 0),
      image_url: form.image_url || null,
      category_id: form.category_id || null,
      in_stock: parseInt(form.in_stock, 10) || 1,
      gold_weight_grams: form.gold_weight_grams ? parseFloat(form.gold_weight_grams) : null,
      making_charges: form.making_charges ? parseFloat(form.making_charges) : null,
    }
    productsApi.create(payload)
      .then(() => { setForm(emptyForm()); load(); setToast({ message: 'Product added.', type: 'success' }) })
      .catch((err) => setToast({ message: err?.message || 'Failed', type: 'error' }))
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    if (!editing) return
    const payload = {}
    if (form.name) payload.name = form.name
    if (form.slug) payload.slug = form.slug
    if (form.description !== undefined) payload.description = form.description
    if (form.price !== '') payload.price = parseFloat(form.price)
    if (form.image_url !== undefined) payload.image_url = form.image_url
    if (form.category_id !== undefined) payload.category_id = form.category_id || null
    if (form.in_stock !== undefined) payload.in_stock = parseInt(form.in_stock, 10)
    if (form.gold_weight_grams !== undefined && form.gold_weight_grams !== '') payload.gold_weight_grams = parseFloat(form.gold_weight_grams)
    else if (form.gold_weight_grams === '') payload.gold_weight_grams = null
    if (form.making_charges !== undefined && form.making_charges !== '') payload.making_charges = parseFloat(form.making_charges)
    else if (form.making_charges === '') payload.making_charges = null
    productsApi.update(editing.id, payload)
      .then(() => { setEditing(null); setForm(emptyForm()); load(); setToast({ message: 'Product updated.', type: 'success' }) })
      .catch((err) => setToast({ message: err?.message || 'Failed', type: 'error' }))
  }

  const handleDelete = (id) => {
    if (!confirm('Delete this product?')) return
    productsApi.delete(id)
      .then(() => { load(); setToast({ message: 'Product deleted.', type: 'success' }) })
      .catch((err) => setToast({ message: err?.message || 'Failed', type: 'error' }))
  }

  const startEdit = (p) => {
    setEditing(p)
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description || '',
      price: p.gold_weight_grams ? '' : String(p.price),
      image_url: p.image_url || '',
      category_id: p.category_id ? String(p.category_id) : '',
      in_stock: p.in_stock,
      gold_weight_grams: p.gold_weight_grams != null ? String(p.gold_weight_grams) : '',
      making_charges: p.making_charges != null ? String(p.making_charges) : '',
    })
  }

  return (
    <div className="admin-dashboard">
      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`} role="status">
          {toast.message}
          <button type="button" className="admin-toast__dismiss" onClick={() => setToast(null)} aria-label="Dismiss">×</button>
        </div>
      )}
      <h1 className="admin-dashboard__title">Products</h1>

      <section className="admin-gold-rate">
        <h2 className="admin-gold-rate__title">Gold rate (₹ per gram)</h2>
        <p className="admin-gold-rate__hint">Set the current gold rate. All products with a gold weight will have their price updated automatically.</p>
        <form onSubmit={handleSaveGoldRate} className="admin-gold-rate__form">
          <input
            type="number"
            step="0.01"
            min="0"
            value={goldRate}
            onChange={(e) => setGoldRate(e.target.value)}
            placeholder="e.g. 6500"
            className="admin-gold-rate__input"
            aria-label="Gold rate per gram"
          />
          <button type="submit" className="admin-gold-rate__btn">Save gold rate</button>
        </form>
      </section>

      <form onSubmit={editing ? handleUpdate : handleCreate} className="admin-form">
        <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Name" required />
        <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} placeholder="Slug" />
        <input value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="Price (fixed, or leave 0 if using weight)" type="number" step="0.01" />
        <input value={form.gold_weight_grams} onChange={(e) => setForm((f) => ({ ...f, gold_weight_grams: e.target.value }))} placeholder="Gold weight (g)" type="number" step="0.01" min="0" title="If set, price = weight × gold rate + making" />
        <input value={form.making_charges} onChange={(e) => setForm((f) => ({ ...f, making_charges: e.target.value }))} placeholder="Making charges (₹)" type="number" step="0.01" min="0" />
        {computedPrice != null && <span className="admin-form__computed">Computed price: ₹{Number(computedPrice).toLocaleString()}</span>}
        <input value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} placeholder="Image URL" />
        <select value={form.category_id} onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value }))}>
          <option value="">No category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button type="submit">{editing ? 'Update' : 'Add'} product</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm(emptyForm()) }}>Cancel</button>}
      </form>
      {loading ? <p>Loading…</p> : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Weight / Making</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>₹{Number(p.price).toLocaleString()}</td>
                <td>
                  {p.gold_weight_grams != null ? `${p.gold_weight_grams} g` : '—'}
                  {p.making_charges != null && p.making_charges > 0 ? ` + ₹${Number(p.making_charges).toLocaleString()} making` : ''}
                </td>
                <td>{categories.find((c) => c.id === p.category_id)?.name ?? '—'}</td>
                <td>
                  <button type="button" onClick={() => startEdit(p)}>Edit</button>
                  <button type="button" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
