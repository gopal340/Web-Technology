const request = require('supertest');
const fs = require('fs');
const path = require('path');
jest.mock('../config/database', () => jest.fn());

// Mock Controllers for Admin/Student routes to avoid DB calls
jest.mock('../controllers/adminController', () => ({
    getDashboardData: (req, res) => res.status(200).json({ success: true, data: 'mock_admin_data' }),
    // Mock other used methods if any, but dashboard is enough
    loginAdmin: jest.fn(),
    createAdmin: jest.fn(),
    registerBulkStudents: jest.fn(),
    registerBulkFaculty: jest.fn(),
    changePassword: jest.fn(),
    getMaterialStats: jest.fn(),
    getImpactStats: jest.fn()
}));

jest.mock('../controllers/energyController', () => ({
    getEnergyAnalysis: (req, res) => res.status(200).json({ success: true, data: 'mock_energy_data' })
}));

// Mock Middleware: authMiddleware.js (Admin/Student)
jest.mock('../middleware/authMiddleware', () => ({
    protect: (req, res, next) => { req.user = { id: 'mock_id', role: 'mock_role' }; next(); },
    authorize: (role) => (req, res, next) => next()
}));

// Mock Middleware: auth.js (Faculty/Lab)
jest.mock('../middleware/auth', () => ({
    auth: (req, res, next) => { req.user = { id: 'mock_id' }; next(); },
    facultyOnly: (req, res, next) => next(),
    labInchargeOnly: (req, res, next) => next()
}));

const app = require('../server');
const mongoose = require('mongoose');

const REQUEST_COUNT = 50;
const MAX_LATENCY_MS = 200;

describe('Multi-Role Performance Testing', () => {

    afterAll(async () => {
        await mongoose.connection.close();
    });

    const scenarios = [
        { role: 'Student', endpoint: '/api/energy/analysis' }, // Using Energy Analysis as Proxy for Student Dash
        { role: 'Faculty', endpoint: '/api/faculty/dashboard' },
        { role: 'Lab Incharge', endpoint: '/api/lab/dashboard' },
        { role: 'Admin', endpoint: '/api/admin/dashboard' }
    ];

    const results = {};

    // Generate tests dynamically
    scenarios.forEach(({ role, endpoint }) => {
        it(`${role}: Should handle ${REQUEST_COUNT} requests to ${endpoint}`, async () => {
            const latencies = [];
            for (let i = 0; i < REQUEST_COUNT; i++) {
                const start = Date.now();
                const res = await request(app).get(endpoint);
                const end = Date.now();
                latencies.push(end - start);

                // Basic assertion to ensure route works
                if (res.statusCode !== 200) {
                    console.error(`Failed request for ${role} on ${endpoint}: Status ${res.statusCode}`);
                }
                expect(res.statusCode).toBe(200);
            }
            results[role] = latencies;
        });
    });

    it('Should generate combined performance HTML report', () => {
        const reportPath = path.join(__dirname, '..', 'role_performance_report.html');

        let htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Role-Based Performance Report</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f8f9fa; }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { text-align: center; color: #2c3e50; margin-bottom: 30px; }
        .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .card h2 { margin-top: 0; color: #34495e; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        .stats { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 0.9em; }
        .stat-item { text-align: center; }
        .stat-val { font-weight: bold; font-size: 1.1em; color: #2980b9; }
        canvas { max-width: 100%; height: 250px !important; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Performance Analysis by Role</h1>
        <div class="grid">
`;

        scenarios.forEach(({ role }) => {
            const latencies = results[role];
            if (!latencies) return; // Skip if test failed

            const avg = (latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(2);
            const min = Math.min(...latencies);
            const max = Math.max(...latencies);

            htmlContent += `
            <div class="card">
                <h2>${role} Performance</h2>
                <div class="stats">
                    <div class="stat-item"><div class="stat-val">${min}ms</div>Min</div>
                    <div class="stat-item"><div class="stat-val">${avg}ms</div>Avg</div>
                    <div class="stat-item"><div class="stat-val">${max}ms</div>Max</div>
                </div>
                <canvas id="chart-${role.replace(/\s+/g, '')}"></canvas>
            </div>`;
        });

        htmlContent += `
        </div>
    </div>
    <script>
`;

        // Generate Script for Charts
        scenarios.forEach(({ role }) => {
            const latencies = results[role];
            if (!latencies) return;
            const chartId = `chart-${role.replace(/\s+/g, '')}`;

            htmlContent += `
        new Chart(document.getElementById('${chartId}'), {
            type: 'line',
            data: {
                labels: ${JSON.stringify(latencies.map((_, i) => i + 1))},
                datasets: [{
                    label: 'Latency (ms)',
                    data: ${JSON.stringify(latencies)},
                    borderColor: '${getColorForRole(role)}',
                    backgroundColor: '${getColorForRole(role)}22',
                    fill: true,
                    tension: 0.3,
                    pointRadius: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { 
                    y: { beginAtZero: true, title: { display: true, text: 'ms' } }
                }
            }
        });
`;
        });

        htmlContent += `
    </script>
</body>
</html>`;

        fs.writeFileSync(reportPath, htmlContent);
        console.log(`✅ Multi-Role Report generated at: ${reportPath}`);
    });
});

function getColorForRole(role) {
    const colors = {
        'Student': '#3498db',     // Blue
        'Faculty': '#e67e22',     // Orange
        'Lab Incharge': '#9b59b6', // Purple
        'Admin': '#e74c3c'        // Red
    };
    return colors[role] || '#34495e';
}
