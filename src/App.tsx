import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import './App.css'

import { useAuthStore } from './store/auth'
import { useMe } from './hooks/useAuth'

import ReactQueryProvider from './context/QueryContext'
import ThemeProvider from './context/ThemeContext'
import LangProvider from './context/LangContext'

import Auth from './pages/Auth'
import Todo from './pages/Todo'

function App() {
  const { user, setUser } = useAuthStore()
  const { data, isLoading } = useMe()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) setUser(data)
  }, [data, setUser])

  useEffect(() => {
    if (isLoading) return
    if (user) navigate('/', { replace: true })
    else navigate('/auth', { replace: true })
  }, [user, isLoading, navigate])

  if (isLoading) return <div></div>

  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  )
}

function composeProviders(
  ...providers: (({ children }: { children: React.ReactNode }) => React.ReactNode)[]
) {
  return ({ children }: { children: React.ReactNode }) =>
    providers.reduce(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    )
}

const AllProviders = composeProviders(
  ReactQueryProvider,
  ThemeProvider,
  LangProvider,
)

export default () => {
  return (
    <AllProviders>
      <App />
    </AllProviders>
  )
}
