import { useState } from 'react'

export function useFilters() {
  const [filter, setFilter] = useState('all')
  const [showFilter, setShowFilter] = useState(false)

  function handleFilter(e) {
    e.preventDefault()
    setShowFilter(!showFilter)
  }

  function filterAll() {
    setFilter('all')
  }

  function filterCompleted() {
    setFilter('completed')
  }

  function filterUncompleted() {
    setFilter('uncompleted')
  }

  return {
    filter,
    showFilter,
    handleFilter,
    filterAll,
    filterCompleted,
    filterUncompleted
  }
}
