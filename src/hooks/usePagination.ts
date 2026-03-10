import { useMemo, useEffect } from 'react'

import { useTodoStore } from '../store/todo'

export function usePagination(items: any[], perPage = 5) {
  const currentPage = useTodoStore(s => s.currentPage)
  const setTotalPages = useTodoStore(s => s.setTotalPages)

  const totalPages = useMemo(() => Math.ceil(items.length / perPage), [items, perPage])
  
  useEffect(() => {
    setTotalPages(totalPages)
  }, [totalPages, setTotalPages])

  const itemsForPage = useMemo(() => {
    const indexOfLast = currentPage * perPage
    const indexOfFirst = indexOfLast - perPage
    return items.slice(indexOfFirst, indexOfLast)
  }, [items, currentPage, perPage])

  return {
    itemsForPage
  }
}
