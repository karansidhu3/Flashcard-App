const request = require('supertest');
const app = require('../index');
const { Pool } = require('pg');


jest.mock('pg', () => {
    const mPool = {
      query: jest.fn(),
    };
    return { Pool: jest.fn(() => mPool) };
  });
  
  const pool = new Pool();
  const mockQuery = pool.query;

describe('Update Flashcards API Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a flashcard successfully', async () => {
    const flashcardId = 1;
    const updatedData = {
      question: 'Updated question',
      answer: 'Updated answer',
      is_known: true,
    };


    mockQuery.mockResolvedValueOnce({ rowCount: 1 });

    const response = await request(app)
      .put(`/api/flashcards/${flashcardId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Flashcard updated successfully');
    expect(mockQuery).toHaveBeenCalledWith(
      'UPDATE flashcards SET question = $1, answer = $2, is_known = $3 WHERE flashcard_id = $4',
      [updatedData.question, updatedData.answer, updatedData.is_known, String(flashcardId)]
    );
  });

  it('should return 404 if the flashcard is not found', async () => {
    const flashcardId = 9999;
    const updatedData = {
      question: 'Updated question',
      answer: 'Updated answer',
      is_known: false,
    };

    mockQuery.mockResolvedValueOnce({ rowCount: 0 });

    const response = await request(app)
      .put(`/api/flashcards/${flashcardId}`)
      .send(updatedData);

    expect(response.status).toBe(404);
    expect(response.text).toBe('Flashcard not found');
    expect(mockQuery).toHaveBeenCalledWith(
      'UPDATE flashcards SET question = $1, answer = $2, is_known = $3 WHERE flashcard_id = $4',
      [updatedData.question, updatedData.answer, updatedData.is_known, String(flashcardId)]
    );
  });

  it('should return 500 if there is a server error', async () => {
    const flashcardId = 1;
    const updatedData = {
      question: 'Updated question',
      answer: 'Updated answer',
      is_known: true,
    };

    mockQuery.mockRejectedValueOnce(new Error('Database error'));

    const response = await request(app)
      .put(`/api/flashcards/${flashcardId}`)
      .send(updatedData);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server error');
    expect(mockQuery).toHaveBeenCalledWith(
      'UPDATE flashcards SET question = $1, answer = $2, is_known = $3 WHERE flashcard_id = $4',
      [updatedData.question, updatedData.answer, updatedData.is_known, String(flashcardId)]
    );
  });
});
