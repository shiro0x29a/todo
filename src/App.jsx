import { useState, useEffect } from 'react'
import './App.css'

import { useAuth } from './hooks/useAuth'
import { useTasks } from './hooks/useTasks'
import { useFilters } from './hooks/useFilters'
import { useSortTasks } from './hooks/useSortTasks'
import { usePagination } from './hooks/usePagination'
import { useDeletePopup } from './hooks/useDeletePopup'

import AuthForm from './components/AuthForm'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Pagination from './components/Pagination'
import SortOptions from './components/SortOptions'
import DeletePopup from './components/DeletePopup'

function App() {
  // auth
  const {
    me,
    user,
    email,
    setEmail,
    password,
    setPassword,
    authMode,
    setAuthMode,
    handleRegister,
    handleLogin,
    handleLogout
  } = useAuth()

  useEffect(() => {
    me()
  }, [])

  // tasks
  const {
    taskText,
    setTaskText,
    tasks,
    handleSubmit,
    taskToggle,
    handleEdit,
    handleDelete
  } = useTasks(user)

  // filters
  const {
    filter,
    showFilter,
    handleFilter,
    setFilter,
    filterAll,
    filterCompleted,
    filterUncompleted
  } = useFilters()

  // sort
  const [sortBy, setSortBy] = useState('created-desc') 

  useEffect(() => {
    if (!user) return

    if (user.filter) {
      setFilter(user.filter)
    }

    if (user.sortBy) {
      setSortBy(user.sortBy)
    }
  }, [user])

  // filter + sort
  const filteredTasks = useSortTasks(user, tasks, filter, sortBy)

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
      {!user && (
        <AuthForm
          user={user}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          authMode={authMode}
          setAuthMode={setAuthMode}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
        />
      )}

      {user && (
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
      )}
    </>
  )
}

export default App
