const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg'); // PostgreSQL client
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 6000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

const db = new Pool({
  user: 'user',               
  host: 'db',                 
  database: 'mydb',           
  password: 'password',       
  port: 5432,                 
});

// API Endpoint
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the Backend!' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query the database for the user with the provided email
    const query = 'SELECT user_id, password_hash FROM users WHERE username = $1';
    const result = await db.query(query, [username]);

    if (result.rows.length === 0) {
      // If no user is found, send a 401 Unauthorized response
      return res.status(401).send('Invalid email or password');
    }

    const { user_id, password_hash } = result.rows[0];

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, password_hash);

    if (isMatch) {
      // If passwords match, authentication is successful
      res.status(200).json({ success: true, userId: user_id });
    } else {
      // If passwords don't match, send a 401 Unauthorized response
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Start the Server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});