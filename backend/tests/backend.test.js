const request = require('supertest');
const app = require('../index'); // Import your app instance
const { Pool } = require('pg');

// Mock the 'pg' module
jest.mock('pg', () => {
  const mClient = {
    query: jest.fn(), // Mock query method
  };
  return { Pool: jest.fn(() => mClient) }; // Mock the Pool constructor
});

describe('Backend API Login Tests', () => {
  it('should fail login with invalid credentials', async () => {
    const mClient = new Pool();
    mClient.query.mockResolvedValueOnce({ rows: [] }); // Simulate no user found

    const response = await request(app)
      .post('/api/login')
      .send({ username: 'nonexistent', password: 'wrongpassword' });

    expect(response.status).toBe(401); // Unauthorized
    expect(response.text).toBe('Invalid email or password'); // Error message check
  });

  it('should succeed with valid credentials', async () => {
    const mClient = new Pool();
    mClient.query.mockResolvedValueOnce({
      rows: [{ user_id: 1, password_hash: 'testing', username: 'testuser'}],
    });

    const response = await request(app)
      .post('/api/login')
      .send({ username: 'testuser', password: 'testing' });

    expect(response.status).toBe(200); // Success
    expect(response.body.success).toBe(true);
  });
});

describe('Signup API Tests', () => {
  it('should create a new user with valid data', async () => {
    const mClient = new Pool();
    mClient.query.mockResolvedValueOnce(); // Simulate successful user creation

    const response = await request(app)
      .post('/api/signup')
      .send({ username: 'newuser', email: 'newuser@example.com', password: 'securepassword' });

    expect(response.status).toBe(201); // Created
    expect(response.text).toBe('User created successfully'); // Success message check
  });

  it('should return 400 for missing fields', async () => {
    const response = await request(app)
      .post('/api/signup')
      .send({ username: 'incompleteuser', email: 'missingpassword@example.com' });

    expect(response.status).toBe(400); // Bad Request
    expect(response.text).toBe('Username, email, and password are required'); // Validation error
  });

  it('should handle database errors gracefully', async () => {
    const mClient = new Pool();
    mClient.query.mockRejectedValueOnce(new Error('Database Error')); // Simulate DB error

    const response = await request(app)
      .post('/api/signup')
      .send({ username: 'erroruser', email: 'error@example.com', password: 'securepassword' });

    expect(response.status).toBe(500); // Internal Server Error
    expect(response.text).toBe('Error occurred while signing up'); // Error message check
  });
});

describe('Load Users Decks API Tests', () => {
  it('should return decks for a valid user_id', async () => {
    const mClient = new Pool();
    mClient.query.mockResolvedValueOnce({
      rows: [
        { deck_id: 1, deck_name: 'Math', user_id: 123 },
        { deck_id: 2, deck_name: 'Science', user_id: 123 },
      ],
    });

    const response = await request(app)
      .post('/api/get-decks') // Assuming the endpoint is /api/get-decks
      .send({ user_id: 123 });

    expect(response.status).toBe(200); // Success
    expect(response.body).toEqual([
      { deck_id: 1, deck_name: 'Math', user_id: 123 },
      { deck_id: 2, deck_name: 'Science', user_id: 123 },
    ]); // Check if the response matches expected output
  });

  it('should return 404 if no decks are found', async () => {
    const mClient = new Pool();
    mClient.query.mockResolvedValueOnce({ rows: [] }); // No decks found

    const response = await request(app)
      .post('/api/get-decks')
      .send({ user_id: 456 });

    expect(response.status).toBe(404); // Not Found
    expect(response.text).toBe('No decks found for the user'); // Proper error message
  });

  it('should return 400 for missing user_id', async () => {
    const response = await request(app)
      .post('/api/get-decks')
      .send({}); // No user_id provided

    expect(response.status).toBe(400); // Bad Request
    expect(response.text).toBe('User ID is required'); // Validation error
  });

  it('should handle database errors gracefully', async () => {
    const mClient = new Pool();
    mClient.query.mockRejectedValueOnce(new Error('Database Error')); // Simulate DB error

    const response = await request(app)
      .post('/api/get-decks')
      .send({ user_id: 123 });

    expect(response.status).toBe(500); // Internal Server Error
    expect(response.text).toBe('Error occurred while retrieving decks'); // Proper error message
  });
});

//Tests for creating a deck
describe('Create Deck API Tests', () => {
  it('should create a new deck with valid data', async () => {
    const mClient = new Pool();
    mClient.query.mockResolvedValueOnce({
      rows: [{ deck_id: 1 }], // Simulate successful deck creation with returned deck_id
    });
  
    const response = await request(app)
      .post('/api/create-deck')
      .send({ user_id: 123, deck_name: 'New Deck' });
  
    expect(response.status).toBe(201); // Created
    expect(response.body).toEqual({
      message: 'Deck created successfully',
      deck_id: 1,
    }); // Check JSON response structure
  });

  it('should return 400 for missing fields', async () => {
    const response = await request(app)
      .post('/api/create-deck')
      .send({ deck_name: 'Incomplete Deck' }); // Missing user_id

    expect(response.status).toBe(400); // Bad Request
    expect(response.text).toBe('User ID and deck name are required'); // Validation error message
  });

  it('should handle database errors gracefully', async () => {
    const mClient = new Pool();
    mClient.query.mockRejectedValueOnce(new Error('Database Error')); // Simulate DB error

    const response = await request(app)
      .post('/api/create-deck')
      .send({ user_id: 123, deck_name: 'Error Deck' });

    expect(response.status).toBe(500); // Internal Server Error
    expect(response.text).toBe('Error occurred while creating deck'); // Proper error message
  });
});

//Tests for delete deck
describe('Delete Deck API Tests', () => {
  it('should delete the deck with a valid deck_id', async () => {
    const mClient = new Pool();
    mClient.query.mockResolvedValueOnce({ rowCount: 1 }); // Simulate successful deletion

    const response = await request(app)
      .post('/api/delete-deck')
      .send({ deck_id: 123 });

    expect(response.status).toBe(200); // Success status
    expect(response.body).toEqual({ message: 'Deck deleted successfully' }); // Proper success message
  });

  it('should return 404 if the deck does not exist', async () => {
    const mClient = new Pool();
    mClient.query.mockResolvedValueOnce({ rowCount: 0 }); // Simulate no rows affected (deck not found)

    const response = await request(app)
      .post('/api/delete-deck')
      .send({ deck_id: 999 });

    expect(response.status).toBe(404); // Not Found status
    expect(response.body).toEqual({ error: 'Deck not found' }); // Proper error message
  });

  it('should return 400 for missing or invalid deck_id', async () => {
    const response = await request(app)
      .post('/api/delete-deck')
      .send({}); // No deck_id provided

    expect(response.status).toBe(400); // Bad Request status
    expect(response.body).toEqual({ error: 'deck_id is required' }); // Validation error message
  });
});


//tests for getting the contents of a sepcific selected deck
describe('Get Deck API Tests', () => {
  it('should return the deck details for a valid deck_id', async () => {
    const mClient = new Pool();
    mClient.query.mockResolvedValueOnce({
      rows: [
        { deck_id: 1, deck_name: 'Java Basics', description: 'Flashcards for Java concepts', user_id: 123 },
      ],
    });

    const response = await request(app)
      .post('/api/get-deck')
      .send({ deck_id: 1 });

    expect(response.status).toBe(200); // Success
    expect(response.body).toEqual({
      deck_id: 1,
      deck_name: 'Java Basics',
      description: 'Flashcards for Java concepts',
      user_id: 123,
    }); // Exact deck data
  });

  it('should return 404 if the deck is not found', async () => {
    const mClient = new Pool();
    mClient.query.mockResolvedValueOnce({ rows: [] }); // No deck found

    const response = await request(app)
      .post('/api/get-deck')
      .send({ deck_id: 999 });

    expect(response.status).toBe(404); // Not Found
    expect(response.body).toEqual({ error: 'Deck not found' }); // Proper error message
  });

  it('should return 400 for missing deck_id', async () => {
    const response = await request(app)
      .post('/api/get-deck')
      .send({}); // No deck_id provided

    expect(response.status).toBe(400); // Bad Request
    expect(response.body).toEqual({ error: 'deck_id is required' }); // Validation error
  });

  it('should handle database errors gracefully', async () => {
    const mClient = new Pool();
    mClient.query.mockRejectedValueOnce(new Error('Database Error')); // Simulate DB error

    const response = await request(app)
      .post('/api/get-deck')
      .send({ deck_id: 1 });

    expect(response.status).toBe(500); // Internal Server Error
    expect(response.body).toEqual({ error: 'An error occurred while retrieving the deck' }); // Proper error message
  });
});

