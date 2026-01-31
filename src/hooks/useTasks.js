import { useState, useEffect } from 'react'

import { api } from './api'

export function useTasks(user) {
  const [taskText, setTaskText] = useState('')
  const [tasks, setTodo] = useState([])

  useEffect(() => {
    if (!user) {
      setTodo([])
      return
    }

    loadTasks()
  }, [user])

  async function loadTasks() {
    try {
      const data = await api.get('/tasks')
      setTodo(data)
    } catch (err) {
      console.log(err)
      alert(err.message || 'Error loading tasks')
    }
  }

  async function handleSubmit(e) {
    // e.preventDefault()
    if (!taskText.trim()) return

    try {
      const task = await api.post('/tasks', { text: taskText })
      setTodo(prev => [task, ...prev])
      setTaskText('')
    } catch (err) {
      alert(err.message || 'Error creating task')
    }
  }

  async function taskToggle(id) {
    const task = tasks.find(t => t.id === id)
    if (!task) return

    try {
      const updated = await api.put(`/tasks/${id}`, {
        isCompleted: !task.isCompleted
      })

      setTodo(prev =>
        prev.map(t => (t.id === id ? updated : t))
      )
    } catch (err) {
      alert(err.message || 'Error updating task')
    }
  }

  async function handleEdit(task) {
    const newText = prompt('Enter new description', task.text)
    if (!newText?.trim()) return

    try {
      const updated = await api.put(`/tasks/${task.id}`, {
        text: newText
      })

      setTodo(prev =>
        prev.map(t => (t.id === task.id ? updated : t))
      )
    } catch (err) {
      alert(err.message || 'Error updating task')
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/tasks/${id}`)
      setTodo(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      alert(err.message || 'Error deleting task')
    }
  }

  return {
    taskText,
    setTaskText,
    tasks,
    handleSubmit,
    taskToggle,
    handleEdit,
    handleDelete
  }
}
