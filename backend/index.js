const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Database setup
const db = new Pool({
  user: 'user',
  host: 'db',
  database: 'mydb',
  password: 'password',
  port: 5432,
});

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the Backend!' });
});

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

app.post('/api/deck/:deck_id/create-flashcard', async (req, res) => {
  const { deck_id } = req.params; // Extract deck_id from URL
  const { question, answer } = req.body; // Extract question and answer from the request body

  // Parse and validate deck_id
  const deckIdInt = parseInt(deck_id, 10);
  if (isNaN(deckIdInt)) {
    return res.status(400).json({ message: 'Deck ID must be a valid number.' });
  }

  // Validate inputs: Ensure question and answer are present
  if (!question || !answer) {
    return res.status(400).json({ message: 'Question and answer are required.' });
  }

  try {
    // Begin a transaction to safely insert the flashcard
    const client = await db.connect();
    try {
      // Start transaction
      await client.query('BEGIN');

      // Verify that the deck exists
      const deckCheck = await client.query('SELECT 1 FROM decks WHERE deck_id = $1', [deckIdInt]);
      if (deckCheck.rows.length === 0) {
        throw new Error(`Deck with ID ${deckIdInt} does not exist.`);
      }

      // Insert the new flashcard into the table, letting the database handle flashcard_id
      const insertQuery = `
        INSERT INTO flashcards (deck_id, question, answer)
        VALUES ($1, $2, $3)
        RETURNING deck_id, flashcard_id, question, answer;
      `;
      const insertValues = [deckIdInt, question, answer];
      const insertResult = await client.query(insertQuery, insertValues);

      // Commit the transaction
      await client.query('COMMIT');

      // Respond with the newly created flashcard data containing only the specified attributes
      res.status(201).json({
        message: 'Flashcard created successfully.',
        flashcard: insertResult.rows[0],
      });
    } catch (err) {
      // Rollback the transaction in case of any errors
      await client.query('ROLLBACK');
      console.error('Error inserting flashcard:', err);
      res.status(500).json({
        message: 'An error occurred while creating the flashcard.',
        error: err.message, // Include the error message for debugging
      });
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({
      message: 'Database connection error.',
      error: err.message, // Include the error message for debugging
    });
  }
});

app.post('/api/get-decks', async (req, res) => {
  try {
    const { user_id } = req.body;

    // Validate input
    if (!user_id) {
      return res.status(400).send('User ID is required');
    }

    // Query the database for the user's decks
    const result = await db.query('SELECT * FROM decks WHERE user_id = $1', [user_id]);

    if (result.rows.length === 0) {
      return res.status(404).send('No decks found for the user');
    }

    // Return the decks
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error retrieving decks:', err);
    res.status(500).send('Error occurred while retrieving decks');
  }
});

// post to create a new deck
app.post('/api/create-deck', async (req, res) => {
  const { user_id, deck_name, description } = req.body;

  // Validate input
  if (!user_id || !deck_name) {
    return res.status(400).send('User ID and deck name are required');
  }

  try {
    // Insert the new deck into the database, including the description
    const query = 'INSERT INTO decks (user_id, deck_name, description) VALUES ($1, $2, $3) RETURNING deck_id';
    const result = await db.query(query, [user_id, deck_name, description]);
    
    res.status(201).json({ message: 'Deck created successfully', deck_id: result.rows[0].deck_id });
    
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).send('Error occurred while creating deck');
  }
});

module.exports = app; // Export the app for testing
