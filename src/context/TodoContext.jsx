import { createContext, useContext, useState, useEffect } from 'react'

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

  const value = {
    taskText,
    setTaskText,
    handleSubmit,

    tasks: getTasksForPage,
    taskToggle,
    handleEdit,
    handleDeleteClick,

    currentPage,
    totalPages,
    setCurrentPage,

    handleConfirmDelete,

    // // params: {
    // filter,
    // setFilter,
    // sortBy,
    // setSortBy,
    // currentPage,
    // setCurrentPage,
    // totalPages
    // // },
    // modal: {
    //   config: deleteModal,
    //   open: (id) => setDeleteModal({ isOpen: true, todoId: id }),
    //   close: () => setDeleteModal({ isOpen: false, todoId: null })
    // },
    // actions: {
    //   handleSubmit,
    //   // addTodo: (text) => setTodos(p => [...p, { id: Date.now(), text, completed: false }]),
    //   taskToggle,
    //   handleEdit,
    //   // toggleTodo: (id) => setTodos(p => p.map(t => t.id === id ? { ...t, completed: !t.completed } : t)),
    //   confirmDelete: () => {
    //     setTodos(p => p.filter(t => t.id !== deleteModal.todoId));
    //     setDeleteModal({ isOpen: false, todoId: null });
    //   }
    // }
  }
  // const value = {
  //   todos: paginatedTodos,
  //   params: { filter, setFilter, sortBy, setSortBy, page, setPage, totalPages },
  //   modal: {
  //     config: deleteModal,
  //     open: (id) => setDeleteModal({ isOpen: true, todoId: id }),
  //     close: () => setDeleteModal({ isOpen: false, todoId: null })
  //   },
  //   actions: {
  //     addTodo: (text) => setTodos(p => [...p, { id: Date.now(), text, completed: false }]),
  //     toggleTodo: (id) => setTodos(p => p.map(t => t.id === id ? { ...t, completed: !t.completed } : t)),
  //     confirmDelete: () => {
  //       setTodos(p => p.filter(t => t.id !== deleteModal.todoId));
  //       setDeleteModal({ isOpen: false, todoId: null });
  //     }
  //   }
  // };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}


