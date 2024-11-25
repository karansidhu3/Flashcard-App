require('dotenv').config(); // Load environment variables

const { Pool } = require('pg');

const db = new Pool({
  user: process.env.DB_USER || 'test_user',
  host: process.env.DB_HOST || 'localhost', // default to localhost for testing
  database: process.env.DB_NAME || 'testdb',
  password: process.env.DB_PASSWORD || 'test_password',
  port: process.env.DB_PORT || 5433, // Use test database port if not provided
});

async function connect() {
  try {
    console.log('Connecting to the database...');
    await db.query('SELECT 1');
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Failed to connect to the database', err);
    throw err;
  }
}

async function disconnect() {
  try {
    console.log('Closing the database connection...');
    await db.end();
    console.log('Database connection closed successfully');
  } catch (err) {
    console.error('Error while closing the database connection', err);
    throw err;
  }
}

module.exports = {
  query: (text, params) => db.query(text, params),
  connect,
  disconnect,
};
