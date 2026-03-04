import styles from '../styles/Filter.module.css'
import { useTodoContext } from '../context/TodoContext'
import { useTranslation } from '../hooks/useTranslation'
import { FilterType } from '../types'

export default function Filter() {
  const { t } = useTranslation();

  const {
    filter,
    showFilter,
    handleFilter,
    filterAll,
    filterCompleted,
    filterUncompleted
  } = useTodoContext()

  const filterNameMap = {
    all: t('todo.all'),
    completed: t('todo.only-completed'),
    uncompleted: t('todo.only-uncompleted')
  }

  const handleSelect = (type: FilterType) => {
    if (type === 'all') filterAll()
    if (type === 'completed') filterCompleted()
    if (type === 'uncompleted') filterUncompleted()
    handleFilter(undefined, false)
  }

  return (
    <div className={styles.filterWrapper}>
      <button
        type="button"
        onClick={handleFilter}
        className={styles.button}
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

