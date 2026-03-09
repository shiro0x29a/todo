import { useState, FormEvent } from 'react'

import styles from '../styles/AuthForm.module.css'
import { useLogin, useRegister } from '../hooks/useAuth'

export default function Auth() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = useLogin()
  const register = useRegister()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (authMode === 'login') await login.mutateAsync({ email, password })
      else await register.mutateAsync({ email, password })
    } catch (err: any) {
      alert(err.message || 'Something went wrong')
    }
  }

  return (
    <div className={styles.authForm}>
      <h2>{authMode === 'login' ? 'Login' : 'Register'}</h2>

      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">{authMode === 'login' ? 'Login' : 'Register'}</button>
      </form>

      <p>
        {authMode === 'login' ? 'No account?' : 'Already have an account?'}{' '}
        <span
          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
          onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        >
          {authMode === 'login' ? 'Register' : 'Login'}
        </span>
      </p>
    </div>
  )
}

