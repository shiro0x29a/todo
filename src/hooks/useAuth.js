import { useState, useEffect } from 'react'

import { api } from './api'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authMode, setAuthMode] = useState('login') // 'login' или 'register'

  // async function me() {
  //   try {
  //     const res = await api.get('/me')
  //     // setUser(res)
  //     return res.data
  //   } catch(err) {
  //     console.error(err)
  //     alert('Error connecting to server')
  //   }
  // }
  async function me() {
    try {
      const token = localStorage.getItem('token')
      if (!token) return null
      const res = await api.get('/me', { headers: { Authorization: `Bearer ${token}` } })
      setUser(res.data)
      console.log(user)
    } catch {
      localStorage.removeItem('token')
      setUser(null)
    }
  }

  // Логика регистрации
  async function handleRegister(e) {
    e.preventDefault()
    try {
      const res = await api.post('/register', { email, password })
      // const res = await api.post('/register', {
      //   body: JSON.stringify({ email, password })
      // })
      // const res = await fetch(`${apiUrl}/register`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })
      // const data = await res.data
      // if (res.ok) {
      alert('Registration successful! Please log in.')
      setAuthMode('login')
      // } else {
      //   alert(data.message || 'Registration failed')
      // }
    } catch (err) {
      console.error(err)
      alert(`Registration failed: ${err.message}`)
    }
  }

  // Логика логина
  async function handleLogin(e) {
    e.preventDefault()
    try {
      const res = await api.post('/login', { email, password })
      // const res = await api.post('/login', {
      //   body: JSON.stringify({ email, password })
      // })
      // const res = await fetch(`${apiUrl}/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })
      // const data = await res.data
      
      console.log(res.status)
      console.log(res)
      // if (res.ok) {
      localStorage.setItem('token', res.token)
      setUser({ email: res.email })
        // localStorage.setItem('token', data.token)
        // setUser({ email: data.email })
      // } else {
      //   alert(res.message || 'Login failed')
      //   // alert(data.message || 'Login failed')
      // }
    } catch (err) {
      console.error(err)
      alert(`Login failed: ${err.message}`)
    }
  }

  // Логика логаута
  function handleLogout() {
    localStorage.removeItem('token')
    setUser(null)
  }

  // Проверка токена при монтировании
  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     // Можно сделать запрос на /me, пока временно
  //     setUser({ email: 'User' })
  //   }
  // }, [])

  // useEffect(() => {
  // const checkAuth = async () => {
  //   console.log(2)
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     try {
  //       const res = await me();
  //       console.log(res)
  //       setUser(res)
  //     } catch (err) {
  //       console.log(err)
  //       localStorage.removeItem('token');
  //       setUser(null)
  //     }
  //   // } else {
  //   //   pass
  //   //   // setLoading(false);
  //   }
  // };
  //
  //   checkAuth();
  // }, [me]);


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
