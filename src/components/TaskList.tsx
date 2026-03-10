import { useEffect } from 'react'

import styles from '../styles/TaskList.module.css'
import { useTranslation } from '../hooks/useTranslation'

import TaskItem from './TaskItem'
import { useAuthStore } from '../store/auth'
import { useTodoStore } from '../store/todo'

import { useTasksQuery, useReorderTask } from '../hooks/useTasks'
import { useSortTasks } from '../hooks/useSortTasks'
import { usePagination } from '../hooks/usePagination'
import { saveSettings } from '../hooks/SaveSettings'
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export default function TaskList() {
  const user = useAuthStore((s) => s.user)

  const { t } = useTranslation()
  const { data: tasks = [] } = useTasksQuery()

  const filter = useTodoStore((s) => s.filter)
  const sortBy = useTodoStore((s) => s.sortBy)
  const filteredTasks = useSortTasks(tasks, filter, sortBy)

  const tasksPerPage = 5
  const { itemsForPage: tasksForPage } = usePagination(filteredTasks, tasksPerPage)

  const setSortBy = useTodoStore((s) => s.setSortBy)
  const setFilter = useTodoStore((s) => s.setFilter)
  const reorderTask = useReorderTask()

  useEffect(() => {
    if (!user) return
    if (user.filter) setFilter(user.filter)
    if (user.sortBy) setSortBy(user.sortBy)
  }, [user?.filter, user?.sortBy])

  useEffect(() => {
    saveSettings(filter, sortBy)
  }, [filter, sortBy])

  const handleDragStart = (_event: DragStartEvent) => {
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = tasksForPage.findIndex((t) => t.id === Number(active.id))
    const newIndex = tasksForPage.findIndex((t) => t.id === Number(over.id))

    if (oldIndex === -1 || newIndex === -1) {
      return
    }

    const movedTask = tasksForPage[oldIndex]
    const targetTask = tasksForPage[newIndex]
    
    reorderTask.mutate({
      id: movedTask.id,
      order: targetTask.order,
    })
  }

  const sortedByOrder = [...tasksForPage].sort((a, b) => (b.order || 0) - (a.order || 0))

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={sortedByOrder.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className={styles.taskList}>
          {sortedByOrder.length ? (
            sortedByOrder.map((task) => <TaskItem key={task.id} task={task} />)
          ) : (
            <div className={styles.empty}>{t('todo.emptyList')}</div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  )
}
