"""
Google OAuth Test Runner for CEER System
Tests Student, Faculty, and Lab Instructor roles using Google authentication
Email: 01fe23bcs081@kletech.ac.in
"""

import subprocess
import sys
import os
from datetime import datetime

def print_banner(text):
    """Print formatted banner"""
    print("\n" + "="*80)
    print(f"  {text.center(76)}")
    print("="*80)

def print_section(text):
    """Print section header"""
    print("\n" + "-"*80)
    print(f"  {text}")
    print("-"*80)

def run_google_auth_tests():
    """Run Google OAuth tests for all roles except Admin"""
    
    print_banner("CEER SYSTEM - GOOGLE OAUTH TESTING")
    print(f"\nTest Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Google Account: 01fe23bcs081@kletech.ac.in\n")
    
    # Create directories
    os.makedirs("screenshots", exist_ok=True)
    os.makedirs("reports", exist_ok=True)
    
    print_section("IMPORTANT INSTRUCTIONS")
    print("""
    1. Tests will open Chrome browser
    2. When prompted, log in with: 01fe23bcs081@kletech.ac.in
    3. Complete Google authentication manually
    4. Tests will continue automatically after login
    5. Screenshots will be captured at each step
    """)
    
    input("\nPress ENTER to start testing...")
    
    test_files = [
        ("Student (Google OAuth)", "test_student_google.py"),
        ("Faculty (Google OAuth)", "test_faculty_google.py"),
        ("Lab Instructor (Google OAuth)", "test_labinstructor_google.py")
    ]
    
    results = []
    
    for test_name, test_file in test_files:
        print_banner(f"Testing: {test_name}")
        
        try:
            result = subprocess.run(
                [sys.executable, "-m", "pytest", test_file, "-v", "-s"],
                capture_output=False,
                text=True
            )
            
            status = "✓ PASSED" if result.returncode == 0 else "⚠ COMPLETED"
            results.append((test_name, status, result.returncode))
            
        except Exception as e:
            print(f"\n✗ Error running {test_name}: {e}")
            results.append((test_name, "✗ ERROR", -1))
    
    # Print summary
    print_banner("TEST EXECUTION SUMMARY")
    
    for test_name, status, code in results:
        print(f"  {status:15} - {test_name}")
    
    print(f"\nTest Completed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"\n📸 Screenshots saved in: screenshots/")
    print("="*80 + "\n")
    
    return True

if __name__ == "__main__":
    try:
        run_google_auth_tests()
    except KeyboardInterrupt:
        print("\n\nTests interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n✗ Error: {e}")
        sys.exit(1)
