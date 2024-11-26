const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg'); // PostgreSQL client
const app = express();
const PORT = 6000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // For parsing application/json

// Database Configuration for connecting to the database
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

app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('Username, email, and password are required');
  }

  try {
    const query = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)';
    await db.query(query, [username, email, password]); // Store the user's data in the database
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).send('Error occurred while signing up');
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
