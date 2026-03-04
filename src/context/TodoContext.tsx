import { createContext, useContext, useState, useEffect } from 'react'
import { PropsWithChildren } from 'react';

import { useAuthContext } from '../context/AuthContext'

import { useTasks } from '../hooks/useTasks'
import { useFilters } from '../hooks/useFilters'
import { saveSettings } from '../hooks/SaveSettings'
import { useSortTasks } from '../hooks/useSortTasks'
import { usePagination } from '../hooks/usePagination'
import { useDeletePopup } from '../hooks/useDeletePopup'

import { Task, SortType, ITodoContext } from '../types'

const TodoContext = createContext<ITodoContext | null>(null)

export const useTodoContext = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodoContext must be used within TodoProvider')
  }
  return context
}

export function TodoProvider({ children }: PropsWithChildren) {
  const { user } = useAuthContext()

  const {
    taskText,
    setTaskText,
    tasks,
    handleSubmit,
    taskToggle,
    handleEdit,
    handleDelete
  } = useTasks()

  const {
    filter,
    showFilter,
    handleFilter,
    setFilter,
    filterAll,
    filterCompleted,
    filterUncompleted
  } = useFilters()

  const [sortBy, setSortBy] = useState<SortType>('created-desc')

  useEffect(() => {
    if (!user) return
    if (user.filter) setFilter(user.filter)
    if (user.sortBy) setSortBy(user.sortBy)
  }, [user?.filter, user?.sortBy])

  useEffect(() => {
    saveSettings(filter, sortBy)
  }, [filter, sortBy])

  const filteredTasks = useSortTasks(tasks, filter, sortBy)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const tasksPerPage = 5

  const { getTasksForPage, totalPages } =
    usePagination(filteredTasks, currentPage, setCurrentPage, tasksPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  const [selectedTask, setSelectedTask] = useState<Task['id'] | null>(null)
  const [showPopup, setShowPopup] = useState<boolean>(false)

  const {
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete
  } = useDeletePopup({
    selectedTask,
    setSelectedTask,
    showPopup,
    setShowPopup,
    handleDelete
  })

  const value: ITodoContext = {
    taskText,
    setTaskText,
    handleSubmit,

    filter,
    showFilter,
    handleFilter,
    filterAll,
    filterCompleted,
    filterUncompleted,

    sortBy,
    setSortBy,

    tasks: getTasksForPage,
    taskToggle,
    handleEdit,
    handleDeleteClick,

    currentPage,
    totalPages,
    setCurrentPage,

    showPopup,
    handleConfirmDelete,
    handleCancelDelete,
  }
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}


