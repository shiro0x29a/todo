import styles from '../styles/Header.module.css'
import { useTranslation } from '../hooks/useTranslation'
import { useAuthContext } from '../context/AuthContext'
import LangSwitcher from './LangSwitcher'

export default function Header() {
  const { t } = useTranslation();
  const { user, handleLogout } = useAuthContext()

  return (
    <div className={styles.header}>
      <span>{user.email}</span>
      <div className={styles.headerRight}>
        <LangSwitcher />
        <button onClick={handleLogout}>{t('logout')}</button>
      </div>
    </div>
  )
}
