import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import { useAuthContext } from './context/AuthContext'
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

export default App
