import { createContext, useContext, useState } from 'react'

const SortContext = createContext(null)

export const useSortContext = () => {
  const context = useContext(SortContext)
  return context
}

export const SortProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState('created-desc')

  return (
    <SortContext.Provider value={{ sortBy, setSortBy }}>
      {children}
    </SortContext.Provider>
  )
}
