import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { productsApi, ordersApi } from '../../api/client.js'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [productCount, setProductCount] = useState(0)
  const [orderCount, setOrderCount] = useState(0)

  useEffect(() => {
    productsApi.list().then((r) => setProductCount(Array.isArray(r) ? r.length : 0)).catch(() => setProductCount(0))
    ordersApi.adminOrders().then((r) => setOrderCount(Array.isArray(r) ? r.length : 0)).catch(() => setOrderCount(0))
  }, [])

  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard__title">Dashboard</h1>
      <p className="admin-dashboard__welcome">Welcome, {user?.email}</p>
      <div className="admin-dashboard__cards">
        <Link to="/admin/orders" className="admin-card admin-card--link">
          <h3>Orders</h3>
          <p className="admin-card__value">{orderCount}</p>
          <p className="admin-card__label">View all orders</p>
        </Link>
        <Link to="/admin/products" className="admin-card admin-card--link">
          <h3>Products</h3>
          <p className="admin-card__value">{productCount}</p>
          <p className="admin-card__label">Manage catalog</p>
        </Link>
        <div className="admin-card">
          <h3>Customers</h3>
          <p className="admin-card__value">—</p>
          <p className="admin-card__label">Accounts</p>
        </div>
      </div>
    </div>
  )
}
