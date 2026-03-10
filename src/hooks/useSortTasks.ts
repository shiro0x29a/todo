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

    return [...filtered].sort((a, b) => {
      let dateA: Date, dateB: Date

      if (sortBy.includes('created')) {
        dateA = new Date(a.created)
        dateB = new Date(b.created)
      } else {
        dateA = a.edited ? new Date(a.edited) : new Date(a.created)
        dateB = b.edited ? new Date(b.edited) : new Date(b.created)
      }

      return sortBy.endsWith('asc')
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    })
  }, [tasks, filter, sortBy])
}
