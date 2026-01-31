import PropTypes from 'prop-types'
import { useState } from 'react'

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
    <div className="sort-wrapper">
      <button type="button" id="sortButton" onClick={handleToggle}>
        {sortNameMap[sortBy]} ▼
      </button>

      {showSort && (
        <ul id="sortDropdown">
          {Object.entries(sortNameMap).map(([key, label]) => (
            <li
              key={key}
              onClick={() => handleSelect(key)}
              className={sortBy === key ? 'active' : ''}
            >
              {sortBy === key && <span className="check">✔</span>}
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
