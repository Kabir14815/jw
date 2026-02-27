import { useState, useEffect } from 'react'
import { ordersApi } from '../../api/client.js'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ordersApi.adminOrders()
      .then((r) => setOrders(Array.isArray(r) ? r : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard__title">Orders</h1>
      {loading ? <p>Loading…</p> : (
        <div className="admin-orders">
          {orders.length === 0 ? (
            <p className="admin-dashboard__welcome">No orders yet.</p>
          ) : (
            orders.map((o) => (
              <div key={o.id} className="admin-order-card">
                <div className="admin-order-card__head">
                  <span>Order #{o.id}</span>
                  <span>{o.status}</span>
                  <span>₹{Number(o.total).toLocaleString()}</span>
                  <span>{o.created_at ? new Date(o.created_at).toLocaleString() : ''}</span>
                </div>
                <ul className="admin-order-card__items">
                  {(o.items || []).map((i) => (
                    <li key={i.id}>{i.product?.name ?? 'Product'} × {i.quantity} — ₹{Number(i.price).toLocaleString()}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
