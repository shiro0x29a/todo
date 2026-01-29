const User = require('../models/User')

exports.getMe = async (req, res) => {
  const user = await User.findByEmail(req.user.email)
  if (!user) return res.status(404).json({ message: 'User not found' })

  res.json({
    email: user.email,
    filter: user.filter,
    sortBy: user.sort_by
  })
}

exports.updateSettings = async (req, res) => {
  const { filter, sortBy } = req.body
  await User.updateSettings(req.user.email, filter, sortBy)
  res.json({ message: 'Settings updated', filter, sortBy })
}
