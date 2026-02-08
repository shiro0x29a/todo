import { useState } from 'react'
import { useLanguage } from '../context/LangContext'
import styles from '../styles/LangSwitcher.module.css'

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'en', flag: '🇺🇸' },
    { code: 'ru', name: 'ру', flag: '🇷🇺' }
  ]

  const currentLang =
    languages.find(lang => lang.code === currentLanguage) || languages[0]

  return (
    <div className={styles.languageSwitcher}>
      <div
        className={styles.languageCurrent}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {currentLang.flag} {currentLang.name}
      </div>

      {isOpen && (
        <ul className={styles.languageSelect}>
          {languages.map(lang => (
            <li
              key={lang.code}
              className={
                lang.code === currentLanguage
                  ? `${styles.languageItem} ${styles.active}`
                  : styles.languageItem
              }
              onClick={() => {
                changeLanguage(lang.code)
                setIsOpen(false)
              }}
            >
              {lang.flag} {lang.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LanguageSwitcher
