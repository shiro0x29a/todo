const { pool } = require('../db');

class Task {
  static mapRow(row) {
    return {
      id: row.id,
      text: row.text,
      isCompleted: row.is_completed,
      createdAt: row.created_at,
      editedAt: row.edited_at,
      order: row.order,
      tags: row.tags || []
    };
  }

  static async getAll(email) {
    const { rows } = await pool.query(
      `SELECT id, text, is_completed, created_at, edited_at, "order", tags
       FROM tasks
       WHERE user_email=$1
       ORDER BY "order" DESC`,
      [email]
    );
    return rows.map(this.mapRow);
  }

  static async create(email, text, tags = []) {
    const { rows: maxOrder } = await pool.query(
      `SELECT COALESCE(MAX("order"), 0) as max_order FROM tasks WHERE user_email=$1`,
      [email]
    );
    const newOrder = (maxOrder[0].max_order || 0) + 1;

    const { rows } = await pool.query(
      `INSERT INTO tasks (user_email, text, is_completed, created_at, edited_at, "order", tags)
       VALUES ($1, $2, false, NOW(), NULL, $3, $4)
       RETURNING id, text, is_completed, created_at, edited_at, "order", tags`,
      [email, text, newOrder, tags]
    );
    return this.mapRow(rows[0]);
  }

  static async update(email, id, text, isCompleted, tags) {
    let query, params;

    if (text !== undefined && text !== null) {
      query = `
        UPDATE tasks
        SET text = $1,
            is_completed = COALESCE($2, is_completed),
            edited_at = NOW(),
            tags = COALESCE($3, tags)
        WHERE id=$4 AND user_email=$5
        RETURNING id, text, is_completed, created_at, edited_at, "order", tags
      `;
      params = [text, isCompleted, tags, id, email];
    } else if (tags !== undefined) {
      query = `
        UPDATE tasks
        SET tags = $1,
            edited_at = NOW()
        WHERE id=$2 AND user_email=$3
        RETURNING id, text, is_completed, created_at, edited_at, "order", tags
      `;
      params = [tags, id, email];
    } else {
      query = `
        UPDATE tasks
        SET is_completed = COALESCE($1, is_completed)
        WHERE id=$2 AND user_email=$3
        RETURNING id, text, is_completed, created_at, edited_at, "order", tags
      `;
      params = [isCompleted, id, email];
    }

    const { rows } = await pool.query(query, params);
    if (!rows[0]) return null;
    return this.mapRow(rows[0]);
  }

  static async reorder(email, id, newOrder) {
    const { rows: task } = await pool.query(
      `SELECT * FROM tasks WHERE id=$1 AND user_email=$2`,
      [id, email]
    );
    
    if (!task[0]) return null;

    const oldOrder = task[0].order;
    
    if (oldOrder === newOrder) {
      return this.mapRow(task[0]);
    }

    if (newOrder > oldOrder) {
      await pool.query(
        `UPDATE tasks SET "order" = "order" - 1 
         WHERE user_email=$1 AND "order" > $2 AND "order" <= $3`,
        [email, oldOrder, newOrder]
      );
    } else {
      await pool.query(
        `UPDATE tasks SET "order" = "order" + 1 
         WHERE user_email=$1 AND "order" >= $2 AND "order" < $3`,
        [email, newOrder, oldOrder]
      );
    }

    await pool.query(
      `UPDATE tasks SET "order" = $1, edited_at = NOW()
       WHERE id=$2 AND user_email=$3`,
      [newOrder, id, email]
    );

    const { rows: updatedTask } = await pool.query(
      `SELECT id, text, is_completed, created_at, edited_at, "order"
       FROM tasks WHERE id=$1 AND user_email=$2`,
      [id, email]
    );

    return this.mapRow(updatedTask[0]);
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
