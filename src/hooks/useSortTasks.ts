import { useMemo } from 'react'

import { Task } from '../schemas/todo'
import { FilterType, SortType } from '../types'

export function useSortTasks(tasks: Task[], filter: FilterType, sortBy: SortType, tagFilter: string[] = [], searchQuery: string = '') {
  return useMemo(() => {
    let filtered = tasks.filter(task => {
      if (filter === 'completed') return task.isCompleted
      if (filter === 'uncompleted') return !task.isCompleted
      return true
    })

    // Фильтр по тегам (AND логика - задача должна содержать все выбранные теги)
    if (tagFilter.length > 0) {
      filtered = filtered.filter(task => {
        const taskTags = task.tags || []
        return tagFilter.every(tag => taskTags.includes(tag))
      })
    }

    // Поиск по тексту задачи
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      
      // Разбиваем запрос на части: #теги и обычный текст
      const tagQueries = query.match(/#\w+/g)?.map(t => t.slice(1)) || []
      const textQuery = query.replace(/#\w+/g, '').trim()
      
      filtered = filtered.filter(task => {
        const textMatch = !textQuery || task.text.toLowerCase().includes(textQuery)
        const taskTags = (task.tags || []).map(t => t.toLowerCase())
        const tagMatch = tagQueries.length === 0 || tagQueries.every(tag => 
          taskTags.some(taskTag => taskTag.includes(tag))
        )
        return textMatch && tagMatch
      })
    }

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
  }, [tasks, filter, sortBy, tagFilter, searchQuery])
}
