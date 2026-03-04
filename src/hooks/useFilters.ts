import { useState } from 'react'
import { MouseEvent } from 'react'
import { FilterType } from '../types'

export function useFilters() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [showFilter, setShowFilter] = useState<boolean>(false)

  function handleFilter(e?: MouseEvent<HTMLButtonElement>, value?: boolean | string) {
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
