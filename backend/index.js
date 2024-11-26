const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new Pool({
  user: 'user',
  host: 'db',
  database: 'mydb',
  password: 'password',
  port: 5432,
});

// Routes
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the Backend!' });
});

//post for login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = 'SELECT user_id, password_hash FROM users WHERE username = $1';
    const result = await db.query(query, [username]);

    if (result.rows.length === 0) {
      return res.status(401).send('Invalid email or password');
    }

    const { user_id, password_hash } = result.rows[0];
    const isMatch = password === password_hash;

    if (isMatch) {
      res.status(200).json({ success: true, userId: user_id });
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Signup Request Received:");
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password);

  try {
    if (!username || !email || !password) {
      console.warn("Validation error: Missing fields");
      return res.status(400).send('All fields are required.');
    }

    const query = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id';
    const result = await db.query(query, [username, email, password]); // Storing password directly (not recommended for production)

    console.log("User successfully created:", result.rows[0]);
    res.status(201).json({ success: true, userId: result.rows[0].user_id });
  } catch (error) {
    console.error("Error in /signup:", error);

    if (error.code === '23505') {
      return res.status(400).send('Email already exists.');
    }

    res.status(500).send('Internal Server Error');
  }
});

module.exports = app; // Export the app for testing
