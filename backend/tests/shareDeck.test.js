const request = require('supertest');
const app = require('../index'); // Path to your Express app

describe('API Endpoints', () => {


    test('POST /api/share-deck-with-user - Missing parameters', async () => {
        const response = await request(app)
            .post('/api/share-deck-with-user')
            .send({ deck_id: 1 });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Deck ID and username are required');
    });

    test('POST /api/make-deck-public - Missing deck_id', async () => {
        const response = await request(app)
            .post('/api/make-deck-public')
            .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Deck ID is required');
    });
});
