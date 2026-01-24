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
  return (
    <form id="taskForm" noValidate>
      <input
        id="taskInput"
        value={taskText}
        onChange={e => setTaskText(e.target.value)}
        placeholder="Enter task description..."
      />

      <button id="createTask" onClick={handleSubmit}>
        Add task
      </button>

      <button id="filter" onClick={handleFilter}>
        All
      </button>

      {showFilter && (
        <div id="filters">
          <ul>
            <li
              onClick={filterAll}
              className={`filter-all ${filter === 'all' ? 'active' : ''}`}
            >
              All
            </li>
            <li
              onClick={filterCompleted}
              className={`filter-completed ${filter === 'completed' ? 'active' : ''}`}
            >
              Only completed
            </li>
            <li
              onClick={filterUncompleted}
              className={`filter-uncompleted ${filter === 'uncompleted' ? 'active' : ''}`}
            >
              Only uncompleted
            </li>
          </ul>
        </div>
      )}
    </form>
  )
}

export default TaskForm
