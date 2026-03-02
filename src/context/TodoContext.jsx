import { createContext, useContext, useState, useEffect } from 'react'

import { useAuthContext } from '../context/AuthContext'

import { useTasks } from '../hooks/useTasks'
import { useFilters } from '../hooks/useFilters'
import { saveSettings } from '../hooks/SaveSettings'
import { useSortTasks } from '../hooks/useSortTasks'
import { usePagination } from '../hooks/usePagination'
import { useDeletePopup } from '../hooks/useDeletePopup'

const TodoContext = createContext()

export const useTodoContext = () => useContext(TodoContext)

export function TodoProvider({ children }) {
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

  const [sortBy, setSortBy] = useState('created-desc')

  useEffect(() => {
    if (user.filter) setFilter(user.filter)
    if (user.sortBy) setSortBy(user.sortBy)
  }, [user.filter, user.sortBy])

  useEffect(() => {
    saveSettings(filter, sortBy)
  }, [filter, sortBy])

  const filteredTasks = useSortTasks(tasks, filter, sortBy)

  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 5

  const { getTasksForPage, totalPages } =
    usePagination(filteredTasks, currentPage, setCurrentPage, tasksPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  const [selectedTask, setSelectedTask] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

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

  const value = {
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


