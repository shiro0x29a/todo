import { useMemo, useEffect } from 'react'

import { api } from './api'

export function useSortTasks(user, tasks, filter, sortBy) {
  const saveSettings = async () => {
    if (!user) return
    try {
      await api.put(
        '/me/settings',
        { filter, sortBy },
      )
    } catch (err) {
      console.error('Error saving settings:', err)
    }
  }

  useEffect(() => {
    saveSettings()
  }, [filter, sortBy])

  return useMemo(() => {
    const filtered = tasks.filter(task => {
      if (filter === 'completed') return task.isCompleted
      if (filter === 'uncompleted') return !task.isCompleted
      return true
    })

    return [...filtered].sort((a, b) => {
      let dateA, dateB

      if (sortBy.includes('created')) {
        dateA = new Date(a.created)
        dateB = new Date(b.created)
      } else {
        dateA = a.edited ? new Date(a.edited) : new Date(a.created)
        dateB = b.edited ? new Date(b.edited) : new Date(b.created)
      }

      return sortBy.endsWith('asc')
        ? dateA - dateB
        : dateB - dateA
    })
  }, [tasks, filter, sortBy])
}
