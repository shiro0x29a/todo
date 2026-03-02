import { useTheme } from '../context/ThemeContext'
import styles from '../styles/ThemeSwitcher.module.css'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const themeIcons = {
    system: '💻',
    light: '☀',
    dark: '🌙'
  }

  return (
    <div className={styles.themeSwitcher} onClick={toggleTheme}>
      <div className={styles.themeCurrent}>
        {themeIcons[theme]}
      </div>
    </div>
  )
}
