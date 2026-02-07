import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'

import { useAuth } from '../hooks/useAuth'

export const AuthContext = createContext(null)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  return context
}

export default function AuthProvider({ children }) {
  const auth = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      await auth.me()
      setLoading(false)
    }
    fetchUser()
  }, [])

  if (loading) return null

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}
