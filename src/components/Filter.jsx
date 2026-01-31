import PropTypes from 'prop-types'

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
    <div className="filter-wrapper">
      <button
        type="button"
        id="filter"
        onClick={handleFilter}
      >
        {filterNameMap[filter]} ▼
      </button>

      {showFilter && (
        <ul
          id="filters"
        >
          <li
            onClick={() => handleSelect('all')}
            className={`filter-all ${filter === 'all' ? 'active' : ''}`}
          >
            {filter === 'all' && <span className="check">✔</span>}All
          </li>
          <li
            onClick={() => handleSelect('completed')}
            className={`filter-completed ${filter === 'completed' ? 'active' : ''}`}
          >
            {filter === 'completed' && <span className="check">✔</span>}Only completed
          </li>
          <li
            onClick={() => handleSelect('uncompleted')}
            className={`filter-uncompleted ${filter === 'uncompleted' ? 'active' : ''}`}
          >
            {filter === 'uncompleted' && <span className="check">✔</span>}Only uncompleted
          </li>
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
