import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

import { useAuthContext } from './context/AuthContext'
import AuthProvider from './context/AuthContext'
import LangProvider from './context/LangContext'
import { FilterProvider } from './context/FilterContext'
import { SortProvider } from './context/SortContext'
import { DeletePopupProvider } from './context/DeletePopupContext'

import AuthForm from './components/AuthForm'
import MainApp from './components/MainApp'

function App() {
  const { user } = useAuthContext()

  return (
    <Routes>
      <Route
        path="/auth"
        element={!user ? <AuthForm /> : <Navigate to="/" replace />}
      />

      <Route
        path="/"
        element={user ? <MainApp /> : <Navigate to="/auth" replace />}
      />
    </Routes>
  )
}

function composeProviders(...providers) {
  return ({ children }) => 
    providers.reduce(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    )
}

export const AllProviders = composeProviders(
  AuthProvider,
  LangProvider,
  FilterProvider,
  SortProvider,
  DeletePopupProvider
)

export default () => {
  return (
    <AllProviders>
      <App />
    </AllProviders>
  )
}
