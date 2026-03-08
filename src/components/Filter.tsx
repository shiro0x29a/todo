import { useState } from 'react'

import styles from '../styles/Filter.module.css'
import { useTranslation } from '../hooks/useTranslation'

import { FilterType } from '../types'
import { useTodoStore } from '../store/todo'

export default function Filter() {
  const { t } = useTranslation();

  const filter = useTodoStore((s) => s.filter)
  const setFilter = useTodoStore((s) => s.setFilter)

  const [showFilter, setShowFilter] = useState(false)

  const handleToggle = () => setShowFilter(!showFilter)

  const handleSelect = (type: FilterType) => {
    setFilter(type)
    setShowFilter(false)
  }

  const filterNameMap = {
    all: t('todo.all'),
    completed: t('todo.only-completed'),
    uncompleted: t('todo.only-uncompleted')
  }

  return (
    <div className={styles.filterWrapper}>
      <button
        className={styles.button}
        type="button"
        onClick={handleToggle}
      >
        {filterNameMap[filter as keyof typeof filterNameMap]} ▼
      </button>

      {showFilter && (
        <ul className={styles.filters}>
          {['all', 'completed', 'uncompleted'].map(type => (
            <li
              key={type}
              onClick={() => handleSelect(type as FilterType)}
              className={`${styles.item} ${
                filter === type ? styles.active : ''
              }`}
            >
              {filter === type && (
                <span className={styles.check}>✔</span>
              )}
              {filterNameMap[type as keyof typeof filterNameMap]}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

