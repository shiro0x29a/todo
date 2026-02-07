import styles from '../styles/Filter.module.css'
import { FilterProvider, useFilterContext } from '../context/FilterContext'
import { useTranslation } from '../hooks/useTranslation'

function Filter() {
  const { t } = useTranslation();

  const {
    filter,
    showFilter,
    handleFilter,
    filterAll,
    filterCompleted,
    filterUncompleted
  } = useFilterContext()

  const filterNameMap = {
    all: t('todo.all'),
    completed: t('todo.only-completed'),
    uncompleted: t('todo.only-uncompleted')
  }

  const handleSelect = (type) => {
    if (type === 'all') filterAll()
    if (type === 'completed') filterCompleted()
    if (type === 'uncompleted') filterUncompleted()
    handleFilter(false)
  }

  return (
    <div className={styles.filterWrapper}>
      <button
        type="button"
        onClick={handleFilter}
        className={styles.button}
      >
        {filterNameMap[filter]} ▼
      </button>

      {showFilter && (
        <ul className={styles.filters}>
          {['all', 'completed', 'uncompleted'].map(type => (
            <li
              key={type}
              onClick={() => handleSelect(type)}
              className={`${styles.item} ${
                filter === type ? styles.active : ''
              }`}
            >
              {filter === type && (
                <span className={styles.check}>✔</span>
              )}
              {filterNameMap[type]}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Filter
