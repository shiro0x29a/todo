import styles from '../styles/TaskList.module.css'
import { useTranslation } from '../hooks/useTranslation'

import { Task } from '../types'
import { useTodoStore } from '../store/todo'
import { useToggleTask, useEditTask } from '../hooks/useTasks'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const { t } = useTranslation()
  const toggleTask = useToggleTask()
  const editTask = useEditTask()
  const openDeletePopup = useTodoStore((s) => s.openDeletePopup)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
    zIndex: isDragging ? 1000 : 'auto',
  }

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
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.task} ${task.isCompleted ? styles.completed : ''} ${isDragging ? styles.dragging : ''}`}
    >
      <div className={styles.taskWrap}>
        <div
          className={styles.dragHandle}
          {...attributes}
          {...listeners}
        >
          <i className="fa-solid fa-grip-vertical"></i>
        </div>

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
