import { z } from "zod"

export const TaskSchema = z.object({
  id: z.number(),
  text: z.string(),
  isCompleted: z.boolean(),
  created: z.string(),
  edited: z.string().nullable()
})

export const TasksSchema = z.array(TaskSchema)

export type Task = z.infer<typeof TaskSchema>
