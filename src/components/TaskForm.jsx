import PropTypes from 'prop-types'

import styles from '../styles/TaskForm.module.css'

function TaskForm({
  taskText,
  setTaskText,
  handleSubmit,
  SortOptions,
  Filter
}) {
  return (
    <form
      className={styles.taskForm}
      noValidate
      onSubmit={e => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <input
        className={styles.taskInput}
        value={taskText}
        onChange={e => setTaskText(e.target.value)}
        placeholder="Enter task description..."
      />

      <div className={styles.buttonsRow}>
        <button type="submit" className={styles.createTask}>
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
