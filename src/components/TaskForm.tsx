import { ReactNode } from 'react'

import styles from '../styles/TaskForm.module.css'
import { useTranslation } from '../hooks/useTranslation'

import { useTodoStore } from '../store/todo'
import { useCreateTask } from '../hooks/useTasks'

interface TaskFormProps {
  SortOptions: ReactNode
  Filter: ReactNode
}

function TaskForm({
  SortOptions,
  Filter
}: TaskFormProps) {
  const { t } = useTranslation();

  const taskText = useTodoStore((s) => s.taskText)
  const setTaskText = useTodoStore((s) => s.setTaskText)

  const createTask = useCreateTask()

  const handleSubmit = () => {
    if (!taskText.trim()) return

    createTask.mutate(taskText)
    setTaskText('')
  }

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

export default TaskForm
