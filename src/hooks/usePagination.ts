import { useMemo } from 'react'

import { useTodoStore } from '../store/todo'

export function usePagination(items: any[], perPage = 5) {
  const currentPage = useTodoStore(s => s.currentPage)
  const setCurrentPage = useTodoStore(s => s.setCurrentPage)
  const setTotalPages = useTodoStore(s => s.setTotalPages)

  const totalPages = Math.ceil(items.length / perPage)
  setTotalPages(totalPages)

  const itemsForPage = useMemo(() => {
    const indexOfLast = currentPage * perPage
    const indexOfFirst = indexOfLast - perPage
    return items.slice(indexOfFirst, indexOfLast)
  }, [items, currentPage, perPage])

  return {
    itemsForPage
  }
}
