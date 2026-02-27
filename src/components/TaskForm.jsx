import PropTypes from 'prop-types'

import styles from '../styles/TaskForm.module.css'
import { useTranslation } from '../hooks/useTranslation'
import { useTodoContext } from '../context/TodoContext'

function TaskForm({
  SortOptions,
  Filter
}) {
  const { t } = useTranslation();
  const {
    taskText,
    setTaskText,
    handleSubmit,
  } = useTodoContext()

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
  SortOptions: PropTypes.node.isRequired,
  Filter: PropTypes.node.isRequired
}

export default TaskForm
