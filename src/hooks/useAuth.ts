import { useState } from 'react'
import { FormEvent } from 'react'

import { api } from '../services/api'
import {
  UserBase,
  User,
  UserRegister,
  UserLogin,
  LoginResponse,
  AuthMode
} from '../types'

export function useAuth() {
  const [user, setUser] = useState<UserBase | User | null>(null)
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

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      await api.post<UserRegister>('/register', { email, password })
      alert('Registration successful! Please log in.')
      setAuthMode('login')
    } catch (err: any) {
      console.error(err)
      alert(`Registration failed: ${err.message}`)
    }
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const res = await api.post<UserLogin, LoginResponse>('/login', { email, password })
      console.log(res)
      localStorage.setItem('token', res.token)
      setUser({ email: res.email })
      // me()
    } catch (err: any) {
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
