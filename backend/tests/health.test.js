const request = require('supertest');
jest.mock('../config/database', () => jest.fn());
const app = require('../server');
const mongoose = require('mongoose');

describe('API Health Check', () => {
    afterAll(async () => {
        // Close the DB connection after tests
        await mongoose.connection.close();
    });

    it('GET /api/health should return 200 and success message', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Server is running');
    });

    it('GET /non-existent-route should return 404', async () => {
        const res = await request(app).get('/api/non-existent-route');
        expect(res.statusCode).toEqual(404);
        expect(res.body.success).toBe(false);
    });
});
