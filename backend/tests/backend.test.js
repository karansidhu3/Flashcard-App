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

describe('Backend API Tests', () => {

  //Test for sending invalid login credentals 
  it('should fail login with invalid credentials', async () => {
    const mClient = new Pool();
    mClient.query.mockResolvedValueOnce({ rows: [] }); // Simulate no user found

    const response = await request(app)
      .post('/api/login')
      .send({ username: 'nonexistent', password: 'wrongpassword' });

    expect(response.status).toBe(401); // Unauthorized
    expect(response.text).toBe('Invalid email or password'); // Error message check
  });

  //test for sending valid login credentals 
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
