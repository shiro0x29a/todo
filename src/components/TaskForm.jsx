import PropTypes from 'prop-types'

function TaskForm({
  taskText,
  setTaskText,
  handleSubmit,
  SortOptions,
  Filter
}) {
  return (
    <form
      id="taskForm"
      noValidate
      onSubmit={e => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <input
        id="taskInput"
        value={taskText}
        onChange={e => setTaskText(e.target.value)}
        placeholder="Enter task description..."
      />

      <div className="buttons-row">
        <button type="submit" id="createTask">
          Add task
        </button>

        {SortOptions}

        {Filter}
      </div>
    </form>
  )
}

TaskForm.propTypes = {
  taskText: PropTypes.string.isRequired,
  setTaskText: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  SortOptions: PropTypes.node.isRequired,
  Filter: PropTypes.node.isRequired
}

export default TaskForm
