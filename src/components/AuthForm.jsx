import React from 'react'

function AuthForm({
  user,
  email,
  setEmail,
  password,
  setPassword,
  authMode,
  setAuthMode,
  handleLogin,
  handleRegister
}) {
  if (user) return null

  return (
    <div className="authForm">
      <h2>{authMode === 'login' ? 'Login' : 'Register'}</h2>

      <form onSubmit={authMode === 'login' ? handleLogin : handleRegister}>
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

export default AuthForm
