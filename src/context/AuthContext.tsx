import { createContext, useContext, useState, useEffect } from 'react'
import { PropsWithChildren } from 'react';

import { useAuth } from '../hooks/useAuth'
import { IAuthContext } from '../types'

export const AuthContext = createContext<IAuthContext | null>(null)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}

export default function AuthProvider({ children }: PropsWithChildren) {
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
