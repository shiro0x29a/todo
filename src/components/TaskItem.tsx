import styles from '../styles/TaskItem.module.css'
import { useTranslation } from '../hooks/useTranslation'

import { Task } from '../types'
import { useTodoStore } from '../store/todo'
import { useToggleTask, useEditTask } from '../hooks/useTasks'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { getTagColor } from '../utils/tagColor'
import { useState } from 'react'

interface TaskItemProps {
  task: Task
}

const MAX_TAGS = 10

export default function TaskItem({ task }: TaskItemProps) {
  const { t } = useTranslation()
  const toggleTask = useToggleTask()
  const editTask = useEditTask()
  const openDeletePopup = useTodoStore((s) => s.openDeletePopup)
  
  const [showTagInput, setShowTagInput] = useState(false)
  const [newTag, setNewTag] = useState('')

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

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault()
      const tags = task.tags || []
      if (tags.length >= MAX_TAGS) return
      
      editTask.mutate({
        id: task.id,
        text: task.text,
        tags: [...tags, newTag.trim()],
      })
      setNewTag('')
      setShowTagInput(false)
    } else if (e.key === 'Escape') {
      setShowTagInput(false)
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const tags = (task.tags || []).filter(tag => tag !== tagToRemove)
    editTask.mutate({
      id: task.id,
      text: task.text,
      tags,
    })
  }

  const formatDate = (timestamp: number | string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const tags = task.tags || []

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

      <div className={styles.tags}>
        {tags.map((tag) => (
          <span
            key={tag}
            className={styles.tag}
            style={{ backgroundColor: getTagColor(tag) }}
          >
            <span className={styles.tagName}>{tag}</span>
            <button
              className={styles.tagRemove}
              onClick={() => handleRemoveTag(tag)}
              aria-label="Удалить тег"
            >
              ×
            </button>
          </span>
        ))}

        {tags.length < MAX_TAGS ? (
          showTagInput ? (
            <input
              type="text"
              className={styles.tagInput}
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
              onBlur={() => {
                setShowTagInput(false)
                setNewTag('')
              }}
              autoFocus
              placeholder={t('todo.addTag')}
            />
          ) : (
            <button
              className={styles.addTagBtn}
              onClick={() => setShowTagInput(true)}
              title={t('todo.addTag')}
            >
              +
            </button>
          )
        ) : null}
      </div>

      {tags.length >= MAX_TAGS && (
        <span className={styles.maxTags}>Максимум 10 тегов</span>
      )}

      <div className={styles.timeStamp}>
        {task.editedAt
          ? `${t('todo.editedAt')}: ${formatDate(task.editedAt)}`
          : `${t('todo.createdAt')}: ${formatDate(task.createdAt)}`}
      </div>
    </div>
  )
}
