import { useState, useEffect } from 'react'

export function useTasks() {
  const [taskText, setTaskText] = useState('')
  const [tasks, setTodo] = useState([])

  useEffect(() => {
    const newTodo = JSON.parse(localStorage.getItem('tasks'))
    if (newTodo) setTodo(newTodo)
  }, [])

  useEffect(() => {
    localStorage.tasks = JSON.stringify(tasks)
  }, [tasks])

  function getFormattedTimestamp() {
    const now = new Date()
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
  }

  function handleSubmit(e) {
    if (!taskText) return
    e.preventDefault()

    const task = {
      id: tasks.length + 1,
      isCompleted: '',
      text: taskText,
      created: getFormattedTimestamp(),
      edited: ''
    }

    setTodo(prev => [task, ...prev])
    setTaskText('')
  }

  function taskToggle(id) {
    const newTodo = tasks.map(t =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    )
    setTodo(newTodo)
  }

  function handleEdit(task) {
    const newText = prompt('Enter new description', task.text.trim())
    if (newText !== null) {
      const newTodo = tasks.map(t =>
        t.id === task.id
          ? { ...t, text: newText, created: '', edited: getFormattedTimestamp() }
          : t
      )
      setTodo(newTodo)
    }
  }

  function handleDelete(id) {
    setTodo(tasks.filter(task => task.id !== id))
  }

  return {
    taskText,
    setTaskText,
    tasks,
    setTodo,
    handleSubmit,
    taskToggle,
    handleEdit,
    handleDelete
  }
}
