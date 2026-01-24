import { useState } from 'react'
import './App.css'

import { useTasks } from './hooks/useTasks'
import { useFilters } from './hooks/useFilters'
import { useSortTasks } from './hooks/useSortTasks'
import { usePagination } from './hooks/usePagination'
import { useDeletePopup } from './hooks/useDeletePopup'

import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Pagination from './components/Pagination'
import SortOptions from './components/SortOptions'
import DeletePopup from './components/DeletePopup'

function App() {
  // tasks
  const {
    taskText,
    setTaskText,
    tasks,
    handleSubmit,
    taskToggle,
    handleEdit,
    handleDelete
  } = useTasks()

  // filters
  const {
    filter,
    showFilter,
    handleFilter,
    filterAll,
    filterCompleted,
    filterUncompleted
  } = useFilters()

  // sort
  const [sortBy, setSortBy] = useState('created-desc')

  // filter + sort
  const filteredTasks = useSortTasks(tasks, filter, sortBy)

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 5
  const {
    getTasksForPage,
    totalPages
  } = usePagination(filteredTasks, currentPage, setCurrentPage, tasksPerPage)

  // delete popup
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

      <SortOptions
        sortBy={sortBy}
        setSortBy={setSortBy}
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

export default App
