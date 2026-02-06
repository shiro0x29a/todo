import PropTypes from 'prop-types'

import styles from '../styles/Filter.module.css'

export default function Filter({
  filter,
  showFilter,
  handleFilter,
  filterAll,
  filterCompleted,
  filterUncompleted
}) {
  const filterNameMap = {
    all: 'All',
    completed: 'Only completed',
    uncompleted: 'Only uncompleted'
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

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  showFilter: PropTypes.bool.isRequired,
  handleFilter: PropTypes.func.isRequired,
  filterAll: PropTypes.func.isRequired,
  filterCompleted: PropTypes.func.isRequired,
  filterUncompleted: PropTypes.func.isRequired,
}
