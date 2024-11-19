const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 6000;

// Middleware
app.use(bodyParser.json());

// API Endpoint
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the Backend!' });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});