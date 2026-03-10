import { z } from "zod"

export const SortTypeSchema = z.enum([
  'created-desc',
  'created-asc',
  'edited-desc',
  'edited-asc'
])
export type SortType = z.infer<typeof SortTypeSchema>

export const FilterTypeSchema = z.enum([
  'all',
  'completed',
  'uncompleted'
])
export type FilterType = z.infer<typeof FilterTypeSchema>

export const TaskSchema = z.object({
  id: z.number(),
  text: z.string(),
  isCompleted: z.boolean(),
  createdAt: z.string(),
  editedAt: z.string().nullable(),
  order: z.number()
})

export const TasksSchema = z.array(TaskSchema)

export type Task = z.infer<typeof TaskSchema>
