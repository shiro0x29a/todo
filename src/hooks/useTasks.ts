import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { todoService } from '../services/todo'
import { Task } from '../schemas/todo'

const todoKeys = {
  all: ['tasks'] as const,
  detail: (id: Task['id']) => ['tasks', id] as const,
}

export function useTasksQuery() {
  return useQuery({
    queryKey: todoKeys.all,
    queryFn: todoService.getTasks,
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (text: string) => todoService.createTask(text),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.all,
      })
    },
  })
}

export function useToggleTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      isCompleted,
    }: {
      id: number
      isCompleted: boolean
    }) => todoService.toggleTask(id, isCompleted),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.all,
      })
    },
  })
}

export function useEditTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      text,
      tags,
    }: {
      id: number
      text: string
      tags?: string[]
    }) => todoService.editTask(id, text, tags),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.all,
      })
    },
  })
}

export function useReorderTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      order,
    }: {
      id: number
      order: number
    }) => todoService.reorderTask(id, order),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.all,
      })
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => todoService.deleteTask(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.all,
      })
    },
  })
}
