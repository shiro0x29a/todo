import { useState } from 'react'

export function usePagination(items, currentPage, setCurrentPage, perPage = 5) {
  // const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastTask = currentPage * perPage
  const indexOfFirstTask = indexOfLastTask - perPage
  const getTasksForPage = items.slice(indexOfFirstTask, indexOfLastTask)

  const totalPages = Math.ceil(items.length / perPage)

  return {
    // currentPage,
    // setCurrentPage,
    getTasksForPage,
    totalPages
  }
}
