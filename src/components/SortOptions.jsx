import PropTypes from 'prop-types'
import { useState } from 'react'

import styles from '../styles/SortOptions.module.css'

export default function SortOptions({ sortBy, setSortBy }) {
  const [showSort, setShowSort] = useState(false)

  const handleToggle = () => setShowSort(!showSort)

  const handleSelect = (type) => {
    setSortBy(type)
    setShowSort(false)
  }

  const sortNameMap = {
    'created-desc': 'Newest',
    'created-asc': 'Oldest',
    'edited-desc': 'Recently Edited',
    'edited-asc': 'Least Recently Edited',
  }

  return (
    <div className={styles.sortWrapper}>
      <button className={styles.button} type="button" onClick={handleToggle}>
        {sortNameMap[sortBy]} ▼
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

SortOptions.propTypes = {
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
}
