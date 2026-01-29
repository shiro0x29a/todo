const { pool } = require('../db')

class User {
  static async findByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [email])
    return rows[0]
  }

  static async create(email, passwordHash) {
    await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2)',
      [email, passwordHash]
    )
  }

  static async updateSettings(email, filter, sortBy) {
    await pool.query(
      'UPDATE users SET filter=$1, sort_by=$2 WHERE email=$3',
      [filter, sortBy, email]
    )
  }
}

module.exports = User
