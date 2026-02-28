import { useTheme } from '../context/ThemeContext'
import styles from '../styles/ThemeSwitcher.module.css'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={styles.themeSwitcher} onClick={toggleTheme}>
      <div className={styles.themeCurrent}>
        {theme === 'dark' ? '🌙' : '☀'}
      </div>
    </div>
  )
}
