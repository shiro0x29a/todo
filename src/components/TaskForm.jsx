import PropTypes from 'prop-types'

import styles from '../styles/TaskForm.module.css'
import { useTranslation } from '../hooks/useTranslation'

function TaskForm({
  taskText,
  setTaskText,
  handleSubmit,
  SortOptions,
  Filter
}) {
  const { t } = useTranslation();

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
        placeholder={t('todo.placeholder')}
      />

      <div className={styles.buttonsRow}>
        <button type="submit" className={styles.createTask}>
          {t('todo.addTask')}
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
