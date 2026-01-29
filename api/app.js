const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const taskRoutes = require('./routes/task.routes')

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

app.use(authRoutes)
app.use(userRoutes)
app.use(taskRoutes)

module.exports = app
