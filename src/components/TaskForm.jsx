import PropTypes from 'prop-types'

function TaskForm({
  taskText,
  setTaskText,
  handleSubmit,
  showFilter,
  handleFilter,
  filter,
  filterAll,
  filterCompleted,
  filterUncompleted
}) {
  const filterNameMap = {
    all: 'All',
    completed: 'Only completed',
    uncompleted: 'Only uncompleted'
  }

  const handleSelect = (key) => {
    if (key === 'all') filterAll()
    if (key === 'completed') filterCompleted()
    if (key === 'uncompleted') filterUncompleted()

    if (showFilter) handleFilter(false)
  }

  return (
    <form
      id="taskForm"
      noValidate
      onSubmit={e => { e.preventDefault(); handleSubmit() }}
      style={{ position: 'relative' }}
    >
      <input
        id="taskInput"
        value={taskText}
        onChange={e => setTaskText(e.target.value)}
        placeholder="Enter task description..."
      />

      <button type="submit" id="createTask">
        Add task
      </button>

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
    </form>
  )
}

TaskForm.propTypes = {
  taskText: PropTypes.string.isRequired,
  setTaskText: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  showFilter: PropTypes.bool.isRequired,
  handleFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  filterAll: PropTypes.func.isRequired,
  filterCompleted: PropTypes.func.isRequired,
  filterUncompleted: PropTypes.func.isRequired
}

export default TaskForm
