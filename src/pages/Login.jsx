import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useDocumentHead } from '../utils/useDocumentHead.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  useDocumentHead({ title: 'Log in', description: 'Log in to your Garg Jewellers account.', path: '/login' })
  const [searchParams] = useSearchParams()
  const returnTo = searchParams.get('returnTo') || searchParams.get('redirect')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }
    const role = returnTo === 'admin' ? 'admin' : 'customer'
    const result = await login(email.trim(), password, role)
    if (result?.ok) {
      if (result.role === 'admin' || returnTo === 'admin') {
        navigate('/admin', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    } else {
      setError('Invalid email or password.')
    }
  }

  return (
    <div className="login-page">
      <Link to="/" className="login-close" aria-label="Close / Go back">
        ×
      </Link>
      <div className="login-card">
        <h1 className="login-title">The House of Garg</h1>
        <p className="login-sub">Sign in to continue</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label">
            Email
            <input
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
          <label className="login-label">
            Password
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button type="submit" className="login-submit">Sign in</button>
        </form>
        <p className="login-hint">Use your email and password to sign in.</p>
      </div>
    </div>
  )
}
