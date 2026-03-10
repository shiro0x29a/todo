import styles from '../styles/TaskList.module.css'
import { useTranslation } from '../hooks/useTranslation'

import { Task } from '../types'
import { useTodoStore } from '../store/todo'
import { useToggleTask, useEditTask } from '../hooks/useTasks'

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const { t } = useTranslation()
  const toggleTask = useToggleTask()
  const editTask = useEditTask()
  const openDeletePopup = useTodoStore((s) => s.openDeletePopup)

  const handleToggle = () => {
    toggleTask.mutate({
      id: task.id,
      isCompleted: !task.isCompleted,
    })
  }

  const handleEdit = () => {
    const text = prompt("Enter new description", task.text)
    if (!text?.trim()) return

    editTask.mutate({
      id: task.id,
      text,
    })
  }

  return (
    <div className={`${styles.task} ${task.isCompleted ? styles.completed : ''}`}>
      <div className={styles.taskWrap}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={task.isCompleted}
          onChange={handleToggle}
        />

        <div className={styles.taskText}>{task.text}</div>

        <div className={styles.taskMenu}>
          <button
            className={`${styles.btn} ${styles.delete}`}
            onClick={() => openDeletePopup(task.id)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>

          <button
            className={`${styles.btn} ${styles.edit}`}
            onClick={handleEdit}
          >
            <i className="fa-solid fa-pen"></i>
          </button>
        </div>
      </div>

      <div className={styles.timeStamp}>
        {task.editedAt
          ? `${t('todo.editedAt')}: ${task.editedAt}`
          : `${t('todo.createdAt')}: ${task.createdAt}`}
      </div>
    </div>
  )
}
