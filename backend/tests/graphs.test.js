const request = require('supertest');
jest.mock('../config/database', () => jest.fn());

// Mock Controllers directly to avoid DB dependency issues in Route tests
jest.mock('../controllers/adminController', () => ({
    getDashboardData: (req, res) => res.status(200).json({ success: true, data: 'mock_dashboard' }),
    getMaterialStats: (req, res) => res.status(200).json({ success: true, data: 'mock_material' }),
    getImpactStats: (req, res) => res.status(200).json({ success: true, data: 'mock_impact' }),
    loginAdmin: (req, res) => res.status(200).json({ token: 'admin_token' }),
    createAdmin: (req, res) => res.status(201).json({ success: true }),
    registerBulkStudents: (req, res) => res.status(200).json({ success: true }),
    registerBulkFaculty: (req, res) => res.status(200).json({ success: true }),
    changePassword: (req, res) => res.status(200).json({ success: true })
}));

jest.mock('../controllers/energyController', () => ({
    getEnergyAnalysis: (req, res) => res.status(200).json({ success: true, data: 'mock_energy' })
}));

// Mock Auth Middleware to allow access
jest.mock('../middleware/authMiddleware', () => ({
    protect: (req, res, next) => {
        req.user = { id: 'mock_admin', role: 'admin' };
        next();
    },
    authorize: (...roles) => (req, res, next) => {
        next();
    }
}));

const app = require('../server');
const mongoose = require('mongoose');

describe('Graph Data & Stats Endpoints (Route Tests)', () => {

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('Admin Dashboard Stats', () => {
        it('GET /api/admin/material-stats should return stats', async () => {
            const res = await request(app).get('/api/admin/material-stats');
            expect(res.statusCode).toEqual(200);
            expect(res.body.data).toBe('mock_material');
        });
    });

    describe('Energy Analysis', () => {
        it('GET /api/energy/analysis should return analysis', async () => {
            const res = await request(app).get('/api/energy/analysis');
            expect(res.statusCode).toEqual(200);
            expect(res.body.data).toBe('mock_energy');
        });
    });
});
