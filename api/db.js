const { Pool, Client } = require('pg');

const DB_NAME = 'todo';
const DB_USER = 'postgres';
const DB_PASSWORD = 'RkoDr8yrX7&';
const DB_HOST = 'localhost';
const DB_PORT = 5433;

async function createDatabaseIfNotExists() {
  const client = new Client({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'postgres',
  });

  await client.connect();

  const res = await client.query(`SELECT 1 FROM pg_database WHERE datname='${DB_NAME}'`);
  if (res.rowCount === 0) {
    console.log(`Database "${DB_NAME}" not found. Creating...`);
    await client.query(`CREATE DATABASE ${DB_NAME}`);
    console.log(`Database "${DB_NAME}" created`);
  }

  await client.end();
}

const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

async function createTables() {
  // await pool.query(`DROP TABLE IF EXISTS tasks`);
  // await pool.query(`DROP TABLE IF EXISTS users`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      filter TEXT,
      sort_by TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      user_email TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
      text TEXT NOT NULL,
      is_completed BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      edited_at TIMESTAMP
    )
  `);

  console.log('Tables created/checked');
}
async function initDb() {
  try {
    await createDatabaseIfNotExists();
    await createTables();
  } catch (err) {
    console.error('DB initialization error:', err);
    process.exit(1);
  }
}

initDb();

module.exports = { pool };
