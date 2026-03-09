import { useEffect } from 'react'

import styles from '../styles/TaskList.module.css'
import { useTranslation } from '../hooks/useTranslation'

import TaskItem from './TaskItem'
import { useAuthStore } from '../store/auth'
import { useTodoStore } from '../store/todo'

import { useTasksQuery } from '../hooks/useTasks'
import { useSortTasks } from '../hooks/useSortTasks'
import { usePagination } from '../hooks/usePagination'
import { saveSettings } from '../hooks/SaveSettings'

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

  useEffect(() => {
    if (!user) return
    if (user.filter) setFilter(user.filter)
    if (user.sortBy) setSortBy(user.sortBy)
  }, [user?.filter, user?.sortBy])

  useEffect(() => {
    saveSettings(filter, sortBy)
  }, [filter, sortBy])

  return (
    <div className={styles.taskList}>
      {tasksForPage.length ? (
        tasksForPage.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <div className={styles.empty}>{t('todo.emptyList')}</div>
      )}
    </div>
  )
}
