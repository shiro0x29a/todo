const { pool } = require('../db');

class Task {
  static mapRow(row) {
    return {
      id: row.id,
      text: row.text,
      isCompleted: row.is_completed,
      created: row.created_at,
      edited: row.edited_at
    };
  }

  static async getAll(email) {
    const { rows } = await pool.query(
      `SELECT id, text, is_completed, created_at, edited_at
       FROM tasks
       WHERE user_email=$1
       ORDER BY created_at DESC`,
      [email]
    );
    return rows.map(this.mapRow);
  }

  static async create(email, text) {
    const { rows } = await pool.query(
      `INSERT INTO tasks (user_email, text, is_completed, created_at, edited_at)
       VALUES ($1, $2, false, NOW(), NULL)
       RETURNING id, text, is_completed, created_at, edited_at`,
      [email, text]
    );
    return this.mapRow(rows[0]);
  }

  static async update(email, id, text, isCompleted) {
    let query, params;

    if (text !== undefined && text !== null) {
      query = `
        UPDATE tasks
        SET text = $1,
            is_completed = COALESCE($2, is_completed),
            edited_at = NOW()
        WHERE id=$3 AND user_email=$4
        RETURNING id, text, is_completed, created_at, edited_at
      `;
      params = [text, isCompleted, id, email];
    } else {
      query = `
        UPDATE tasks
        SET is_completed = COALESCE($1, is_completed)
        WHERE id=$2 AND user_email=$3
        RETURNING id, text, is_completed, created_at, edited_at
      `;
      params = [isCompleted, id, email];
    }

    const { rows } = await pool.query(query, params);
    if (!rows[0]) return null;
    return this.mapRow(rows[0]);
  }

  static async delete(email, id) {
    const { rows } = await pool.query(
      `DELETE FROM tasks
       WHERE id=$1 AND user_email=$2
       RETURNING id, text, is_completed, created_at, edited_at`,
      [id, email]
    );
    if (!rows[0]) return null;
    return this.mapRow(rows[0]);
  }
}

module.exports = Task;
