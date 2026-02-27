const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function getToken() {
  try {
    const raw = localStorage.getItem('garg_auth')
    if (!raw) return null
    const data = JSON.parse(raw)
    return data?.token ?? data?.access_token ?? null
  } catch {
    return null
  }
}

export async function api(method, path, body = null, { token = getToken() } = {}) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }
  if (body != null && method !== 'GET') opts.body = JSON.stringify(body)
  const res = await fetch(`${API_BASE}${path}`, opts)
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || JSON.stringify(err))
  }
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

export const authApi = {
  login: (email, password, role) =>
    api('POST', '/auth/login', { email, password, role }),
}

export const categoriesApi = {
  list: () => api('GET', '/categories'),
}

export const productsApi = {
  list: (q, category) => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (category) params.set('category', category)
    const query = params.toString()
    return api('GET', `/products${query ? `?${query}` : ''}`)
  },
  get: (id) => api('GET', `/products/${id}`),
  create: (data) => api('POST', '/products', data),
  update: (id, data) => api('PATCH', `/products/${id}`, data),
  delete: (id) => api('DELETE', `/products/${id}`),
}

export const cartApi = {
  list: () => api('GET', '/cart'),
  count: () => api('GET', '/cart/count'),
  add: (productId, quantity = 1) => api('POST', '/cart', { product_id: productId, quantity }),
  remove: (itemId) => api('DELETE', `/cart/${itemId}`),
}

export const ordersApi = {
  create: () => api('POST', '/orders'),
  myOrders: () => api('GET', '/orders'),
  adminOrders: () => api('GET', '/orders/admin'),
}

export const settingsApi = {
  getGoldRate: () => api('GET', '/settings/gold-rate'),
  setGoldRate: (value) => api('PUT', '/settings/gold-rate', { value: Number(value) }),
}

export { API_BASE, getToken }
