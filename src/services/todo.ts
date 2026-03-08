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

  async toggleTask(id: string, isCompleted: boolean): Promise<Task> {
    const data = await api.put(`/tasks/${id}`, {
      isCompleted
    })

    return TaskSchema.parse(data)
  },

  async editTask(id: string, text: string): Promise<Task> {
    const data = await api.put(`/tasks/${id}`, { text })
    return TaskSchema.parse(data)
  },

  async deleteTask(id: string) {
    return api.delete(`/tasks/${id}`)
  }
}
