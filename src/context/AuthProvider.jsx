import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { useAuth } from '../hooks/useAuth'

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
