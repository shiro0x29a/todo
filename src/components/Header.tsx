import { useNavigate } from 'react-router-dom'

import styles from '../styles/Header.module.css'
import { useTranslation } from '../hooks/useTranslation'
import ThemeSwitcher from './ThemeSwitcher'
import LangSwitcher from './LangSwitcher'
import { useAuthStore } from '../store/auth'

export default function Header() {
  const { t } = useTranslation();

  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  // const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    // navigate('/auth', { replace: true })
  }

  return (
    <div className={styles.header}>
      <span>{user?.email}</span>
      <div className={styles.headerRight}>
        <ThemeSwitcher />
        <LangSwitcher />
        <button onClick={handleLogout}>{t('logout')}</button>
      </div>
    </div>
  )
}
