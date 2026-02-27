import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import CustomerApp from './pages/CustomerApp.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminOrders from './pages/admin/AdminOrders.jsx'
import AdminProducts from './pages/admin/AdminProducts.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetail from './pages/ProductDetail.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>
          <Route path="/shop/:productId" element={<ProductDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/" element={<CustomerApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
