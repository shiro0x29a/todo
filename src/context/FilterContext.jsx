import { createContext, useContext, useState } from 'react'

const FilterContext = createContext(null)

export function useFilterContext() {
  const context = useContext(FilterContext)
  return context
}

export function FilterProvider({ children }) {
  const [filter, setFilter] = useState('all')
  const [showFilter, setShowFilter] = useState(false)

  const handleFilter = (value) => {
    if (typeof value === 'boolean') {
      setShowFilter(value)
    } else {
      setShowFilter(prev => !prev)
    }
  }

  const filterAll = () => setFilter('all')
  const filterCompleted = () => setFilter('completed')
  const filterUncompleted = () => setFilter('uncompleted')

  return (
    <FilterContext.Provider
      value={{
        filter,
        showFilter,
        handleFilter,
        setFilter,
        filterAll,
        filterCompleted,
        filterUncompleted
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
