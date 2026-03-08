import styles from '../styles/TaskList.module.css'
import { useTranslation } from '../hooks/useTranslation'
// import { useTodoContext } from '../context/TodoContext'

import { Task } from '../types'
import { useTodoStore } from '../store/todo'
import {
  useTasksQuery,
  useToggleTask,
  useEditTask,
} from '../hooks/useTasks'
import { useSortTasks } from '../hooks/useSortTasks'
import { usePagination } from '../hooks/usePagination'

export default function TaskList({
}) {
  const { t } = useTranslation();

  const { data: tasks = [] } = useTasksQuery()

  const toggleTask = useToggleTask()
  const editTask = useEditTask()

  const openDeletePopup = useTodoStore((s) => s.openDeletePopup)

  const handleToggle = (task: Task) => {
    toggleTask.mutate({
      id: task.id,
      isCompleted: !task.isCompleted,
    })
  }

  const handleEdit = (task: Task) => {
    const text = prompt("Enter new description", task.text)
    if (!text?.trim()) return

    editTask.mutate({
      id: task.id,
      text,
    })
  }

  const filter = useTodoStore((s) => s.filter)
  const sortBy = useTodoStore((s) => s.sortBy)
  const filteredTasks = useSortTasks(tasks, filter, sortBy)

  const tasksPerPage = 5
  const { itemsForPage: tasksForPage } = usePagination(
    filteredTasks,
    tasksPerPage
  )

  return (
    <div className={styles.taskList}>
      {tasksForPage.length ? (
        tasksForPage.map((task: Task) => (
          <div
            key={task.id}
            className={`${styles.task} ${
              task.isCompleted ? styles.completed : ''
            }`}
          >
            <div className={styles.taskWrap}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleToggle(task)}
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
                  onClick={() => handleEdit(task)}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
              </div>
            </div>

            <div className={styles.timeStamp}>
              {task.edited
                ? `${t('todo.edited')}: ${task.edited}`
                : `${t('todo.created')}: ${task.created}`}
            </div>
          </div>
        ))
      ) : (
        <div className={styles.empty}>{t('todo.emptyList')}</div>
      )}
    </div>
  )
}


