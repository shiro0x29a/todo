import { useState } from 'react'
import { useLanguage } from '../context/LangContext'

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
    <div className="language-switcher">
      <div
        className="language-current"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {currentLang.flag} {currentLang.name}
      </div>

      {isOpen && (
        <ul className="language-select">
          {languages.map(lang => (
            <li
              key={lang.code}
              className={`language-item ${
                lang.code === currentLanguage ? 'active' : ''
              }`}
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
