// __tests__/decks.test.js

const request = require('supertest');
const app = require('../server'); // Path to your server file
const db = require('../db'); // Your database connection

describe('Deck Sharing API', () => {
  let token;
  let userId;
  let deckId;

  // Set up before tests run
  beforeAll(async () => {
    // Create a test user and get a token
    const res = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });

    token = res.body.token;
    userId = res.body.userId;

    // Create a test deck
    const deckRes = await request(app)
      .post('/api/decks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        deck_name: 'Test Deck',
      });

    deckId = deckRes.body.deck_id;
  });

  // Clean up after tests
  afterAll(async () => {
    // Delete test data from the database
    await db.query('DELETE FROM deck_shares WHERE deck_id = $1', [deckId]);
    await db.query('DELETE FROM flashcards WHERE deck_id = $1', [deckId]);
    await db.query('DELETE FROM decks WHERE deck_id = $1', [deckId]);
    await db.query('DELETE FROM users WHERE user_id = $1', [userId]);
    db.end();
  });

  test('Share a deck with another user', async () => {
    // Create another user to share the deck with
    const res2 = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser2',
        email: 'testuser2@example.com',
        password: 'password123',
      });

    const shareUserId = res2.body.userId;

    // Share the deck with the new user
    const shareRes = await request(app)
      .post(`/api/decks/${deckId}/share`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userIds: [shareUserId],
      });

    expect(shareRes.statusCode).toBe(200);
    expect(shareRes.body.message).toBe('Deck shared successfully.');

    // Verify that the deck appears in the shared user's decks
    const loginRes = await request(app)
      .post('/api/login')
      .send({
        email: 'testuser2@example.com',
        password: 'password123',
      });

    const token2 = loginRes.body.token;

    const sharedDecksRes = await request(app)
      .get('/api/decks/shared-with-me')
      .set('Authorization', `Bearer ${token2}`);

    expect(sharedDecksRes.statusCode).toBe(200);
    expect(sharedDecksRes.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          deck_id: deckId,
          deck_name: 'Test Deck',
        }),
      ])
    );
  });

  test('Non-owner cannot share the deck', async () => {
    // Attempt to share the deck as a different user
    const res2 = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser3',
        email: 'testuser3@example.com',
        password: 'password123',
      });

    const token3 = res2.body.token;

    const shareRes = await request(app)
      .post(`/api/decks/${deckId}/share`)
      .set('Authorization', `Bearer ${token3}`)
      .send({
        userIds: [userId],
      });

    expect(shareRes.statusCode).toBe(403);
    expect(shareRes.body.message).toBe('You do not have permission to share this deck.');
  });
});
