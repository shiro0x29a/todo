import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'

import { useAuth } from './hooks/useAuth'
import AuthForm from './components/AuthForm'
import MainApp from './components/MainApp'

function App() {
  const {
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
  } = useAuth()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      await me()
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading) return null

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          !user ? (
            <AuthForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              authMode={authMode}
              setAuthMode={setAuthMode}
              handleLogin={handleLogin}
              handleRegister={handleRegister}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/"
        element={
          user ? (
            <MainApp user={user} handleLogout={handleLogout} />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
    </Routes>
  )
}

export default App
