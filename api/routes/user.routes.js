const router = require('express').Router()
const ctrl = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth')

router.get('/me', authMiddleware, ctrl.getMe)
router.put('/me/settings', authMiddleware, ctrl.updateSettings)

module.exports = router
