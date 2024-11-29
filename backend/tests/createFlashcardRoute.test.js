const request = require('supertest');
const { Pool } = require('pg');
const app = require('../index'); // Import your app instance

jest.mock('pg', () => {
    const mClient = {
      query: jest.fn(),
      release: jest.fn(),
    };
    const mPool = {
      connect: jest.fn(() => mClient),
      end: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  describe('POST /api/deck/:deck_id/create-flashcard', () => {
    let pool;
    let client;
  
    beforeEach(() => {
      pool = new Pool();
      client = pool.connect();
  
      jest.clearAllMocks();
    });
  
    afterAll(() => {
      // Clean up the pool after all tests
      pool.end();
    });
  
    test('should create a new flashcard with valid data', async () => {
      client.query
        .mockResolvedValueOnce() // BEGIN
        .mockResolvedValueOnce({ rows: [{}] }) // deckCheck query
        .mockResolvedValueOnce({
          rows: [
            {
              deck_id: 1,
              flashcard_id: 1,
              question: 'What is the capital of France?',
              answer: 'Paris',
            },
          ],
        }) // insertQuery
        .mockResolvedValueOnce(); // COMMIT
  
      const response = await request(app)
        .post('/api/deck/1/create-flashcard')
        .send({
          question: 'What is the capital of France?',
          answer: 'Paris',
        });
  
      // Assertions for the response
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('Flashcard created successfully.');
      expect(response.body.flashcard).toHaveProperty('flashcard_id', 1);
      expect(response.body.flashcard.question).toBe('What is the capital of France?');
      expect(response.body.flashcard.answer).toBe('Paris');
  
      // Verify database queries were executed in the correct order
      expect(client.query).toHaveBeenCalledTimes(4); // BEGIN, deckCheck, insertQuery, COMMIT
      expect(client.query).toHaveBeenNthCalledWith(1, 'BEGIN');
      expect(client.query).toHaveBeenNthCalledWith(
        2,
        'SELECT 1 FROM decks WHERE deck_id = $1',
        [1]
      );
      expect(client.query).toHaveBeenNthCalledWith(
        3,
        expect.stringContaining('INSERT INTO flashcards'),
        [1, 'What is the capital of France?', 'Paris']
      );
      expect(client.query).toHaveBeenNthCalledWith(4, 'COMMIT');
    });
  
    test('should return 400 if question or answer is missing', async () => {
      const response = await request(app)
        .post('/api/deck/1/create-flashcard')
        .send({
          question: 'What is the capital of France?',
          // Missing answer
        });
  
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Question and answer are required.');
    });
  
    test('should return 500 if deck does not exist', async () => {
      client.query
        .mockResolvedValueOnce() // BEGIN
        .mockResolvedValueOnce({ rows: [] }) // deckCheck returns no rows
        .mockResolvedValueOnce(); // ROLLBACK
  
      const response = await request(app)
        .post('/api/deck/9999/create-flashcard')
        .send({
          question: 'What is the capital of France?',
          answer: 'Paris',
        });
  
      expect(response.statusCode).toBe(500);
      expect(response.body.message).toBe('An error occurred while creating the flashcard.');
      expect(response.body.error).toBe('Deck with ID 9999 does not exist.');
  
      // Ensure the queries were called in the correct order
      expect(client.query).toHaveBeenCalledTimes(3); // BEGIN, deckCheck, ROLLBACK
      expect(client.query).toHaveBeenNthCalledWith(1, 'BEGIN');
      expect(client.query).toHaveBeenNthCalledWith(
        2,
        'SELECT 1 FROM decks WHERE deck_id = $1',
        [9999]
      );
      expect(client.query).toHaveBeenNthCalledWith(3, 'ROLLBACK');
    });
  });
  