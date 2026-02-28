import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

export default function AdminLayout() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login?returnTo=admin', { replace: true })
  }

  if (!isAdmin && user) {
    navigate('/', { replace: true })
    return null
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <Link to="/admin">The House of Garg</Link>
          <span className="admin-sidebar__badge">Admin</span>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin" className="admin-nav__link" end>Dashboard</NavLink>
          <NavLink to="/admin/orders" className="admin-nav__link">Orders</NavLink>
          <NavLink to="/admin/products" className="admin-nav__link">Products</NavLink>
          <NavLink to="/admin/banners" className="admin-nav__link">Banners</NavLink>
          <Link to="/shop" className="admin-nav__link">View shop</Link>
          <Link to="/" className="admin-nav__link">View store</Link>
        </nav>
        <div className="admin-sidebar__footer">
          <span className="admin-user">{user?.email}</span>
          <button type="button" className="admin-logout" onClick={handleLogout}>Log out</button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
