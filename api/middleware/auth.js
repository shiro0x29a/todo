const jwt = require('jsonwebtoken')
const SECRET_KEY = 'supersecretkey'

module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']
  if (!authHeader) return res.status(401).json({ message: 'No token provided' })

  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Invalid token' })

  try {
    req.user = jwt.verify(token, SECRET_KEY)
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
