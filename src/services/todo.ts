import { api } from "./api"
import { TasksSchema, TaskSchema, Task } from "../schemas/todo"

export const todoService = {
  async getTasks(): Promise<Task[]> {
    const data = await api.get("/tasks")
    // console.log(data)
    return TasksSchema.parse(data)
  },

  async createTask(text: string): Promise<Task> {
    const data = await api.post("/tasks", { text })
    return TaskSchema.parse(data)
  },

  async toggleTask(id: number, isCompleted: boolean): Promise<Task> {
    const data = await api.put(`/tasks/${id}`, {
      isCompleted
    })

    return TaskSchema.parse(data)
  },

  async editTask(id: number, text: string): Promise<Task> {
    const data = await api.put(`/tasks/${id}`, { text })
    return TaskSchema.parse(data)
  },

  async reorderTask(id: number, order: number): Promise<Task> {
    const data = await api.put(`/tasks/${id}/reorder`, { order })
    return TaskSchema.parse(data)
  },

  async deleteTask(id: number) {
    return api.delete(`/tasks/${id}`)
  }
}
