import { useMemo } from 'react'

import { Task } from '../schemas/todo'
import { FilterType, SortType } from '../types'

export function useSortTasks(tasks: Task[], filter: FilterType, sortBy: SortType) {
  return useMemo(() => {
    const filtered = tasks.filter(task => {
      if (filter === 'completed') return task.isCompleted
      if (filter === 'uncompleted') return !task.isCompleted
      return true
    })

    // Если у задач есть order, сортируем по нему (больше order = выше в списке)
    const hasOrder = filtered.some(t => t.order !== undefined && t.order !== null)
    
    if (hasOrder) {
      return [...filtered].sort((a, b) => (b.order || 0) - (a.order || 0))
    }

    return [...filtered].sort((a, b) => {
      let dateA: Date, dateB: Date

      if (sortBy.includes('created')) {
        dateA = new Date(a.createdAt)
        dateB = new Date(b.createdAt)
      } else {
        dateA = a.editedAt ? new Date(a.editedAt) : new Date(a.createdAt)
        dateB = b.editedAt ? new Date(b.editedAt) : new Date(b.createdAt)
      }

      return sortBy.endsWith('asc')
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    })
  }, [tasks, filter, sortBy])
}
