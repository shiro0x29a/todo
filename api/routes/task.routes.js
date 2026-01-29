const router = require('express').Router()
const ctrl = require('../controllers/task.controller')
const authMiddleware = require('../middleware/auth')

router.get('/tasks', authMiddleware, ctrl.getTasks)
router.post('/tasks', authMiddleware, ctrl.createTask)
router.put('/tasks/:id', authMiddleware, ctrl.updateTask)
router.delete('/tasks/:id', authMiddleware, ctrl.deleteTask)

module.exports = router
