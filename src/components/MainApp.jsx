import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useTasks } from '../hooks/useTasks'
import { useFilters } from '../hooks/useFilters'
import { saveSettings } from '../hooks/SaveSettings'
import { useSortTasks } from '../hooks/useSortTasks'
import { usePagination } from '../hooks/usePagination'
import { useDeletePopup } from '../hooks/useDeletePopup'

import TaskForm from './TaskForm'
import TaskList from './TaskList'
import Pagination from './Pagination'
import SortOptions from './SortOptions'
import DeletePopup from './DeletePopup'

MainApp.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    filter: PropTypes.string,
    sortBy: PropTypes.string,
  }).isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default function MainApp({ user, handleLogout }) {
  const {
    taskText,
    setTaskText,
    tasks,
    handleSubmit,
    taskToggle,
    handleEdit,
    handleDelete
  } = useTasks(user)

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
    if (!user) return
    if (user.filter) setFilter(user.filter)
    if (user.sortBy) setSortBy(user.sortBy)
  }, [user])

  useEffect(() => {
    saveSettings(user, filter, sortBy)
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
        showFilter={showFilter}
        handleFilter={handleFilter}
        filter={filter}
        filterAll={filterAll}
        filterCompleted={filterCompleted}
        filterUncompleted={filterUncompleted}
      />

      <SortOptions sortBy={sortBy} setSortBy={setSortBy} />

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
