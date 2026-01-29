const Task = require('../models/Task')

exports.getTasks = async (req, res) => {
  const tasks = await Task.getAll(req.user.email)
  res.json(tasks)
}

exports.createTask = async (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ message: 'Task text required' })
  const task = await Task.create(req.user.email, text)
  res.json(task)
}

exports.updateTask = async (req, res) => {
  const { id } = req.params
  const { text, isCompleted } = req.body
  const task = await Task.update(req.user.email, id, text, isCompleted)
  if (!task) return res.status(404).json({ message: 'Task not found' })
  res.json(task)
}

exports.deleteTask = async (req, res) => {
  const { id } = req.params
  const task = await Task.delete(req.user.email, id)
  if (!task) return res.status(404).json({ message: 'Task not found' })
  res.json(task)
}
