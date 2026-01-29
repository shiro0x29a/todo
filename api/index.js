const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = 3001
const SECRET_KEY = 'supersecretkey'

app.use(cors())
app.use(bodyParser.json())

const users = []  // { email, passwordHash }
const tasks = {}  // { email: [ { id, text, isCompleted, created, edited } ] }

app.post('/register', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' })

  const existing = users.find(u => u.email === email)
  if (existing) return res.status(400).json({ message: 'User already exists' })

  const passwordHash = await bcrypt.hash(password, 10)
  users.push({ email, passwordHash })
  tasks[email] = []
  res.json({ message: 'User registered successfully' })
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user) return res.status(400).json({ message: 'User not found' })

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) return res.status(400).json({ message: 'Invalid password' })

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' })
  res.json({ token, email })
})

app.get('/me', authMiddleware, (req, res) => {
  const user = users.find(u => u.email === req.user.email)
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json({ email: user.email, filter: user.filter, sortBy: user.sortBy })
})

app.put('/me/settings', authMiddleware, (req, res) => {
  const { filter, sortBy } = req.body
  const user = users.find(u => u.email === req.user.email)
  if (!user) return res.status(404).json({ message: 'User not found' })
  if (filter) user.filter = filter
  if (sortBy) user.sortBy = sortBy
  res.json({ message: 'Settings updated', filter: user.filter, sortBy: user.sortBy })
})

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']
  if (!authHeader) return res.status(401).json({ message: 'No token provided' })

  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Invalid token' })

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

app.get('/tasks', authMiddleware, (req, res) => {
  const userTasks = tasks[req.user.email] || []
  res.json(userTasks)
})

app.post('/tasks', authMiddleware, (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ message: 'Task text required' })

  const newTask = {
    id: Date.now(),
    text,
    isCompleted: false,
    created: new Date(),
    edited: null
  }

  tasks[req.user.email].push(newTask)
  res.json(newTask)
})

app.put('/tasks/:id', authMiddleware, (req, res) => {
  const { id } = req.params
  const { text, isCompleted } = req.body
  const userTasks = tasks[req.user.email]
  const task = userTasks.find(t => t.id === +id)
  if (!task) return res.status(404).json({ message: 'Task not found' })

  if (text !== undefined) task.text = text
  if (isCompleted !== undefined) task.isCompleted = isCompleted
  task.edited = new Date()
  res.json(task)
})

app.delete('/tasks/:id', authMiddleware, (req, res) => {
  const { id } = req.params
  let userTasks = tasks[req.user.email]
  const index = userTasks.findIndex(t => t.id === +id)
  if (index === -1) return res.status(404).json({ message: 'Task not found' })

  const removed = userTasks.splice(index, 1)
  res.json(removed[0])
})

app.listen(PORT, () => console.log(`Server running on :${PORT}`))
