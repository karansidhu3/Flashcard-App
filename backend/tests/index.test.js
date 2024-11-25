const request = require('supertest');
const app = require('../index'); // Import the Express app
const db = require('../config/db'); // Import the updated db module

beforeAll(async () => {
  // Connect to the database
  await db.connect();
});

afterAll(async () => {
  // Disconnect from the database after all tests
  await db.disconnect();
});

afterEach(async () => {
  // Clean up the database after each test (if necessary)
  await db.query(`DELETE FROM users WHERE email = 'testuser@mail.com';`);
});

describe('Backend API Tests', () => {
  // Test if a new user can sign up successfully
  it('POST /signup - should create a new user successfully', async () => {
    const response = await request(app).post('/signup').send({
      username: 'testuser',
      email: 'testuser@mail.com',
      password: 'testpassword',
    });
    expect(response.statusCode).toBe(201);
    expect(response.text).toBe('User created successfully');
  });

  // Test if signup fails when fields are missing
  it('POST /signup - should fail if fields are missing', async () => {
    const response = await request(app).post('/signup').send({
      username: '',
      email: 'testuser@mail.com',
      password: 'testpassword',
    });
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Username, email, and password are required');
  });

  // Test if signup fails when the email format is invalid
  it('POST /signup - should fail if the email format is invalid', async () => {
    const response = await request(app).post('/signup').send({
      username: 'testuser',
      email: 'invalid-email',
      password: 'testpassword',
    });
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Invalid email format');
  });

  // Test if database errors are handled gracefully
  it('POST /signup - should handle database errors gracefully', async () => {
    jest.spyOn(db, 'query').mockRejectedValue(new Error('Database Error'));

    const response = await request(app).post('/signup').send({
      username: 'testuser',
      email: 'testuser@mail.com',
      password: 'testpassword',
    });

    expect(response.statusCode).toBe(500);
    expect(response.text).toBe('Error occurred while signing up');

    db.query.mockRestore(); // Restore the original db.query function
  });
});
