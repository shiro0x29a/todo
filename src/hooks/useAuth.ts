import { useState } from 'react'

import { api } from './api'
import { User, AuthMode } from '../types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [authMode, setAuthMode] = useState<AuthMode>('login')

  async function me() {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const data = await api.get('/me')
      setUser(data)
      console.log(user)
    } catch {
      localStorage.removeItem('token')
      setUser(null)
    }
  }

  async function handleRegister(e) {
    e.preventDefault()
    try {
      await api.post('/register', { email, password })
      alert('Registration successful! Please log in.')
      setAuthMode('login')
    } catch (err) {
      console.error(err)
      alert(`Registration failed: ${err.message}`)
    }
  }

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const res = await api.post('/login', { email, password })
      console.log(res)
      localStorage.setItem('token', res.token)
      setUser({ email: res.email })
    } catch (err) {
      console.error(err)
      alert(`Login failed: ${err.message}`)
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setUser(null)
  }

  return {
    me,
    user,
    email,
    setEmail,
    password,
    setPassword,
    authMode,
    setAuthMode,
    handleRegister,
    handleLogin,
    handleLogout
  }
}
