import { z } from "zod"

export const TaskSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCompleted: z.boolean(),
  createdAt: z.string()
})

export const TasksSchema = z.array(TaskSchema)

export type Task = z.infer<typeof TaskSchema>
