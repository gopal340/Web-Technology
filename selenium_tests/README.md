# Selenium Test Suite for CEER System

Comprehensive end-to-end testing using Selenium WebDriver for all user roles.

## Test Coverage

### 1. Student Tests (`test_student.py`)
- ✅ Student login authentication
- ✅ BOM (Bill of Materials) request creation
- ✅ Embodied Energy calculation
- ✅ Carbon Footprinting functionality
- ✅ Dashboard graphs and analytics

### 2. Faculty Tests (`test_faculty.py`)
- ✅ Faculty login authentication
- ✅ Team creation functionality
- ✅ BOM request approval workflow
- ✅ Approved request messages
- ✅ Dashboard home page
- ✅ Faculty analytics graphs

### 3. Admin Tests (`test_admin.py`)
- ✅ Admin login authentication
- ✅ Dashboard analytics overview
- ✅ User management interface
- ✅ Materials/Inventory management
- ✅ System reports and statistics
- ✅ Multiple dashboard graphs

### 4. Lab Instructor Tests (`test_labinstructor.py`)
- ✅ Lab Instructor login authentication
- ✅ Inventory management
- ✅ Equipment management
- ✅ Material request processing
- ✅ Dashboard graphs and analytics

## Prerequisites

- Python 3.8 or higher
- Google Chrome browser
- Backend server running on `http://localhost:8000`
- Frontend server running on `http://localhost:5173`

## Installation

```bash
# Navigate to selenium_tests directory
cd selenium_tests

# Install dependencies
pip install -r requirements.txt
```

## Running Tests

### Run All Tests
```bash
python run_all_tests.py
```

### Run Individual Test Suites
```bash
# Student tests
pytest test_student.py -v

# Faculty tests
pytest test_faculty.py -v

# Admin tests
pytest test_admin.py -v

# Lab Instructor tests
pytest test_labinstructor.py -v
```

### Generate HTML Reports
```bash
pytest test_student.py -v --html=reports/student_report.html --self-contained-html
```

## Test Credentials

### Student
- Email: `student@kletech.ac.in`
- Password: `student123`

### Faculty
- Email: `faculty@kletech.ac.in`
- Password: `faculty123`

### Admin
- Email: `admin@kletech.ac.in`
- Password: `admin123`

### Lab Instructor
- Email: `labinstructor@kletech.ac.in`
- Password: `lab123`

## Output

### Screenshots
All test screenshots are saved in: `selenium_tests/screenshots/`
- Organized by user role (student_, faculty_, admin_, labinstructor_)
- Timestamped for easy identification
- Captures key interactions and page states

### HTML Reports
Test reports are generated in: `selenium_tests/reports/`
- Detailed test execution results
- Pass/Fail status for each test
- Execution time and error details

## Test Structure

```
selenium_tests/
├── test_student.py          # Student role tests
├── test_faculty.py          # Faculty role tests
├── test_admin.py            # Admin role tests
├── test_labinstructor.py    # Lab Instructor tests
├── run_all_tests.py         # Main test runner
├── requirements.txt         # Python dependencies
├── screenshots/             # Test screenshots
└── reports/                 # HTML test reports
```

## Features

- **Automated Screenshots**: Captures screenshots at each test step
- **Comprehensive Coverage**: Tests all major functionalities
- **HTML Reports**: Beautiful, detailed test reports
- **Role-Based Testing**: Separate test suites for each user role
- **Graph Validation**: Captures dashboard analytics and graphs
- **Error Handling**: Graceful handling of missing elements

## Troubleshooting

### ChromeDriver Issues
The tests automatically download the correct ChromeDriver version using `webdriver-manager`.

### Element Not Found
If tests fail due to missing elements, ensure:
1. Backend server is running
2. Frontend server is running
3. Test credentials are correct
4. Page load times are sufficient

### Screenshot Issues
If screenshots aren't saving:
1. Check write permissions for `screenshots/` directory
2. Ensure sufficient disk space

## CI/CD Integration

These tests can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run Selenium Tests
  run: |
    cd selenium_tests
    pip install -r requirements.txt
    python run_all_tests.py
```

## Notes

- Tests run in headful mode (browser visible) by default
- Each test class uses a fresh browser instance
- Screenshots include timestamps for uniqueness
- Tests are designed to be independent and can run in any order

---

**Last Updated**: January 2026
**Test Framework**: Selenium WebDriver + Pytest
**Browser**: Google Chrome (latest)
