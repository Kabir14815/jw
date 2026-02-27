import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authApi } from '../api/client.js'

const STORAGE_KEY = 'garg_auth'

const AuthContext = createContext(null)

function loadStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser)

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const login = useCallback(async (email, password, role = 'customer') => {
    if (!email?.trim()) return { ok: false }
    try {
      const data = await authApi.login(email.trim(), password, role)
      const userData = {
        token: data.access_token,
        email: data.email,
        role: data.role,
        user_id: data.user_id,
      }
      setUser(userData)
      return { ok: true, role: data.role }
    } catch (err) {
      if (import.meta.env.DEV) console.error('Login failed:', err)
      return { ok: false }
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value = {
    user,
    token: user?.token ?? null,
    isAuthenticated: !!user?.token,
    isAdmin: user?.role === 'admin',
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
