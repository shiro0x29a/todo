import { useState } from 'react'

export function useFilters() {
  const [filter, setFilter] = useState('all')
  const [showFilter, setShowFilter] = useState(false)

  function handleFilter(e, value) {
    if (e) e.preventDefault()
    if (typeof value === 'boolean') setShowFilter(value)
    else setShowFilter(prev => !prev)
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
    setFilter,
    filterAll,
    filterCompleted,
    filterUncompleted
  }
}
