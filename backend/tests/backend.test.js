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
