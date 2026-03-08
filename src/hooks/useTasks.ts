import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { todoService } from '../services/todo'
import { Task } from '../schemas/todo'

export const todoKeys = {
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
      id: string
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
    }: {
      id: string
      text: string
    }) => todoService.editTask(id, text),

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
    mutationFn: (id: string) => todoService.deleteTask(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.all,
      })
    },
  })
}
