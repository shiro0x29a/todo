import { useState } from 'react'

import styles from '../styles/SortOptions.module.css'
import { useTranslation } from '../hooks/useTranslation'

import { SortType } from '../types'
import { useTodoStore } from '../store/todo'

export default function SortOptions() {
  const { t } = useTranslation();

  const sortBy = useTodoStore((s) => s.sortBy)
  const setSortBy = useTodoStore((s) => s.setSortBy)

  const [showSort, setShowSort] = useState(false)

  const handleToggle = () => setShowSort(!showSort)

  const handleSelect = (type: SortType) => {
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
              onClick={() => handleSelect(key as SortType)}
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
