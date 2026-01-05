const request = require('supertest');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const Faculty = require('../models/Faculty');
const LabIncharge = require('../models/LabIncharge');

// MUST MOCK DATABASE BEFORE IMPORTING SERVER
jest.mock('../config/database', () => jest.fn());

const app = require('../server');
const mongoose = require('mongoose');

// Mock dependencies
jest.mock('google-auth-library');
jest.mock('../models/User');
jest.mock('../models/Faculty');
jest.mock('../models/LabIncharge');

// Suppress console logs during tests
beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(console, 'error').mockImplementation(() => { });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Authentication Unit Tests', () => {

    // UPDATED: Using specific user email as requested
    const mockGooglePayload = {
        sub: '123456789',
        email: '01fe23bcs081@kletech.ac.in',
        name: 'Test Student',
        picture: 'http://test.com/pic.jpg'
    };

    beforeEach(() => {
        jest.clearAllMocks();

        // Mock Google Verify
        OAuth2Client.prototype.verifyIdToken = jest.fn().mockResolvedValue({
            getPayload: () => mockGooglePayload
        });
    });

    // --------------------------------------------------------------------------
    // STUDENT LOGIN TESTS
    // --------------------------------------------------------------------------
    describe('Student Google Login', () => {
        it('should authenticate a registered student successfully', async () => {
            // Mock 1: User.findOne returns a user
            User.findOne.mockResolvedValue({
                _id: 'student_id_123',
                email: '01fe23bcs081@kletech.ac.in',
                name: 'Test Student',
                role: 'student',
                isActive: true
            });

            // Mock 2: User.findByIdAndUpdate returns an object with chained .select()
            const mockUpdatedUser = {
                _id: 'student_id_123', email: '01fe23bcs081@kletech.ac.in', role: 'student', isActive: true, lastLogin: new Date()
            };

            const mockQuery = {
                select: jest.fn().mockResolvedValue(mockUpdatedUser)
            };

            User.findByIdAndUpdate.mockReturnValue(mockQuery);

            const res = await request(app)
                .post('/api/student/auth/google')
                .send({ idToken: 'valid_google_token' });

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.token).toBeDefined();
            // Verify expected email
            expect(res.body.data.user.email).toBe('01fe23bcs081@kletech.ac.in');
        });

        it('should return 404 for unregistered student', async () => {
            User.findOne.mockResolvedValue(null);
            const res = await request(app)
                .post('/api/student/auth/google')
                .send({ idToken: 'valid_token' });
            expect(res.statusCode).toEqual(404);
        });
    });

    // --------------------------------------------------------------------------
    // FACULTY LOGIN TESTS
    // --------------------------------------------------------------------------
    describe('Faculty Google Login', () => {
        it('should login approved faculty', async () => {
            Faculty.findOne.mockResolvedValue({
                _id: 'fac_123',
                email: '01fe23bcs081@kletech.ac.in', // Using same email for simplicity if user validates across roles, or we can keep generic.
                // Actually, let's keep it generic or reuse if the user implies "this account" plays all roles.
                // But USN implies student. I'll just use it to be safe as "an account".
                role: 'faculty',
                isApproved: true,
                googleId: '123456789',
                save: jest.fn(),
                mustChangePassword: false
            });

            const res = await request(app)
                .post('/api/faculty/auth/google-login')
                .send({ credential: 'valid_google_token' });

            expect(res.statusCode).toEqual(200);
            expect(res.body.token).toBeDefined();
        });
    });

    // --------------------------------------------------------------------------
    // LAB INCHARGE LOGIN TESTS
    // --------------------------------------------------------------------------
    describe('Lab Incharge Google Login', () => {
        it('should login active lab incharge', async () => {
            LabIncharge.findOne.mockResolvedValue({
                _id: 'lab_123',
                email: '01fe23bcs081@kletech.ac.in',
                role: 'labIncharge',
                isActive: true,
            });

            const mockUpdatedLab = {
                _id: 'lab_123',
                email: '01fe23bcs081@kletech.ac.in',
                role: 'labIncharge',
                isActive: true
            };

            const mockQuery = {
                select: jest.fn().mockResolvedValue(mockUpdatedLab)
            };

            LabIncharge.findByIdAndUpdate.mockReturnValue(mockQuery);

            const res = await request(app)
                .post('/api/lab/auth/google')
                .send({ idToken: 'valid_token' });

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
        });
    });
});
