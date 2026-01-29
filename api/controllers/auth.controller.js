const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const SECRET_KEY = 'supersecretkey'

exports.register = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' })

  const existing = await User.findByEmail(email)
  if (existing) return res.status(400).json({ message: 'User already exists' })

  const passwordHash = await bcrypt.hash(password, 10)
  await User.create(email, passwordHash)
  res.json({ message: 'User registered successfully' })
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findByEmail(email)
  if (!user) return res.status(400).json({ message: 'User not found' })

  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) return res.status(400).json({ message: 'Invalid password' })

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' })
  res.json({ token, email })
}
