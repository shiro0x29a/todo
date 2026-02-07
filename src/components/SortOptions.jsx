import { useState } from 'react'

import styles from '../styles/SortOptions.module.css'
import { useSortContext } from '../context/SortContext'
import { useTranslation } from '../hooks/useTranslation'

export default function SortOptions() {
  const { t } = useTranslation();

  const { sortBy, setSortBy } = useSortContext()
  const [showSort, setShowSort] = useState(false)

  const handleToggle = () => setShowSort(!showSort)

  const handleSelect = (type) => {
    setSortBy(type)
    setShowSort(false)
  }

  const sortNameMap = {
    'created-desc': t('todo.newest'),
    'created-asc': t('todo.oldest'),
    'edited-desc': t('todo.recently-edited'),
    'edited-asc': t('todo.least-recently-edited'),
  }

  return (
    <div className={styles.sortWrapper}>
      <button className={styles.button} type="button" onClick={handleToggle}>
        {sortNameMap[sortBy]}▼
      </button>

      {showSort && (
        <ul className={styles.sortDropdown}>
          {Object.entries(sortNameMap).map(([key, label]) => (
            <li
              key={key}
              onClick={() => handleSelect(key)}
              className={`${styles.sortBy} ${
                sortBy === key ? styles.active : ''
              }`}
            >
              {sortBy === key && <span className={styles.check}>✔</span>}
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
