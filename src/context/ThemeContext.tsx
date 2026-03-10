import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react'

interface ThemeContextType {
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'system'
  })

  const [systemTheme, setSystemTheme] = useState(getSystemTheme())

  const currentTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    if (theme !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    const order = ['system', 'light', 'dark']
    setTheme(prev => order[(order.indexOf(prev) + 1) % order.length])
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

