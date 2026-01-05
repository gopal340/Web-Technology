"""
Main Test Runner for CEER Department Resource Management System
Runs all Selenium tests for different user roles
"""

import subprocess
import sys
import os
from datetime import datetime

def print_header(text):
    """Print formatted header"""
    print("\n" + "="*80)
    print(f"  {text}")
    print("="*80 + "\n")

def run_tests():
    """Run all test suites"""
    
    print_header("CEER SYSTEM - COMPREHENSIVE SELENIUM TESTING")
    print(f"Test Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    
    # Create necessary directories
    os.makedirs("selenium_tests/screenshots", exist_ok=True)
    os.makedirs("selenium_tests/reports", exist_ok=True)
    
    test_files = [
        ("Student Tests", "selenium_tests/test_student.py"),
        ("Faculty Tests", "selenium_tests/test_faculty.py"),
        ("Admin Tests", "selenium_tests/test_admin.py"),
        ("Lab Instructor Tests", "selenium_tests/test_labinstructor.py")
    ]
    
    results = []
    
    for test_name, test_file in test_files:
        print_header(f"Running {test_name}")
        
        try:
            # Run pytest with verbose output and HTML report
            result = subprocess.run(
                [
                    sys.executable, "-m", "pytest",
                    test_file,
                    "-v",
                    "--tb=short",
                    f"--html=selenium_tests/reports/{test_name.lower().replace(' ', '_')}_report.html",
                    "--self-contained-html"
                ],
                capture_output=False,
                text=True
            )
            
            status = "✓ PASSED" if result.returncode == 0 else "✗ FAILED"
            results.append((test_name, status, result.returncode))
            
        except Exception as e:
            print(f"Error running {test_name}: {e}")
            results.append((test_name, "✗ ERROR", -1))
    
    # Print summary
    print_header("TEST EXECUTION SUMMARY")
    
    for test_name, status, code in results:
        print(f"{status:12} - {test_name}")
    
    print(f"\nTest Completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"\nScreenshots saved in: selenium_tests/screenshots/")
    print(f"HTML reports saved in: selenium_tests/reports/")
    print("\n" + "="*80 + "\n")
    
    # Return overall status
    return all(code == 0 for _, _, code in results)

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
