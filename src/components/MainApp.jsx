import { useState, useEffect } from 'react'

import { useAuthContext } from '../context/AuthContext'
import { useFilterContext } from '../context/FilterContext'
import { useSortContext } from '../context/SortContext'

import { useTasks } from '../hooks/useTasks'
// import { useFilters } from '../hooks/useFilters'
import { saveSettings } from '../hooks/SaveSettings'
import { useSortTasks } from '../hooks/useSortTasks'
import { usePagination } from '../hooks/usePagination'
// import { useDeletePopup } from '../hooks/useDeletePopup'
import { useDeletePopupContext } from '../context/DeletePopupContext'

import LangSwitcher from './LangSwitcher'
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
    setFilter
  } = useFilterContext()

  const { sortBy, setSortBy } = useSortContext()

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

  const {
    selectedTask,
    setSelectedTask,
    handleDeleteClick,
    setShowPopup
  } = useDeletePopupContext()

  function handleConfirmDelete() {
    handleDelete(selectedTask)
    setSelectedTask(null)
    setShowPopup(false)
  }


  return (
    <>
      <div className="header-bar">
        <span>{user.email}</span>
        <div className="header-right">
          <LangSwitcher />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <TaskForm
        taskText={taskText}
        setTaskText={setTaskText}
        handleSubmit={handleSubmit}
        SortOptions={
          <SortOptions
          />
        }
        Filter={
          <Filter
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

        <DeletePopup
          handleConfirmDelete={handleConfirmDelete}
        />
    </>
  )
}
