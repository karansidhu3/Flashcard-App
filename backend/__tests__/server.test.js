const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
    it('should return a success message on GET /', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('backend connected to SQL db');
    });
});