import { useState, useEffect } from 'react'

import { useAuthContext } from '../context/AuthContext'

import { useTasks } from '../hooks/useTasks'
import { useFilters } from '../hooks/useFilters'
import { saveSettings } from '../hooks/SaveSettings'
import { useSortTasks } from '../hooks/useSortTasks'
import { usePagination } from '../hooks/usePagination'
import { useDeletePopup } from '../hooks/useDeletePopup'

import TaskForm from './TaskForm'
import Filter from './Filter'
import SortOptions from './SortOptions'
import TaskList from './TaskList'
import Pagination from './Pagination'
import DeletePopup from './DeletePopup'

export default function MainApp() {
  const { user, handleLogout } = useAuthContext()

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
  }, [user])

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

  return (
    <>
      <div className="header-bar">
        <span>{user.email}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <TaskForm
        taskText={taskText}
        setTaskText={setTaskText}
        handleSubmit={handleSubmit}
        SortOptions={
          <SortOptions
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        }
        Filter={
          <Filter
            filter={filter}
            showFilter={showFilter}
            handleFilter={handleFilter}
            filterAll={filterAll}
            filterCompleted={filterCompleted}
            filterUncompleted={filterUncompleted}
          />
        }
      />

      <TaskList
        tasks={getTasksForPage}
        taskToggle={taskToggle}
        handleEdit={handleEdit}
        handleDeleteClick={handleDeleteClick}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {showPopup && (
        <DeletePopup
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  )
}
