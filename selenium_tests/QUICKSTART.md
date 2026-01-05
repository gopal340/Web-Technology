# 🚀 Quick Start - Google OAuth Testing

## ✅ Ready to Run!

### Test Files Created:
1. ✅ `test_student_google.py` - Student with Google OAuth
2. ✅ `test_faculty_google.py` - Faculty with Google OAuth  
3. ✅ `test_labinstructor_google.py` - Lab Instructor with Google OAuth
4. ✅ `run_google_tests.py` - Main test runner

### Google Account:
**Email**: `01fe23bcs081@kletech.ac.in`

---

## 🎯 How to Run

### Step 1: Open Terminal
```bash
cd "c:\Users\adavi\OneDrive\Desktop\WT CEER\selenium_tests"
```

### Step 2: Run Tests
```bash
python run_google_tests.py
```

### Step 3: Follow Instructions
1. Press ENTER when prompted
2. Browser will open automatically
3. **Manually log in** with `01fe23bcs081@kletech.ac.in` when Google login appears
4. Tests will continue automatically after login
5. Screenshots will be captured at each step

---

## 📸 What Gets Captured

### Automatic Screenshots:
- ✅ Login page
- ✅ Google Sign-In button
- ✅ Google authentication page
- ✅ After manual login
- ✅ Dashboard views
- ✅ All graphs and analytics
- ✅ Feature pages (BOM, Teams, Inventory, etc.)

### Location:
`selenium_tests/screenshots/`

---

## 🎬 Expected Flow

```
1. Test starts → Opens Chrome
2. Navigates to login page
3. Clicks "Sign in with Google"
4. ⚠ YOU MANUALLY LOG IN with 01fe23bcs081@kletech.ac.in
5. Test continues automatically
6. Captures all screenshots
7. Tests next role
8. Repeat for all 3 roles
```

---

## 📊 Terminal Output

You'll see output like this:

```
================================================================================
                  CEER SYSTEM - GOOGLE OAUTH TESTING
================================================================================

Test Started: 2026-01-06 00:15:00
Google Account: 01fe23bcs081@kletech.ac.in

--------------------------------------------------------------------------------
  IMPORTANT INSTRUCTIONS
--------------------------------------------------------------------------------

    1. Tests will open Chrome browser
    2. When prompted, log in with: 01fe23bcs081@kletech.ac.in
    3. Complete Google authentication manually
    4. Tests will continue automatically after login
    5. Screenshots will be captured at each step

Press ENTER to start testing...

================================================================================
                      Testing: Student (Google OAuth)
================================================================================

  STUDENT - GOOGLE OAUTH LOGIN TEST
================================================================================

✓ Screenshot saved: selenium_tests/screenshots/student_01_login_page_20260106_001500.png
✓ Clicked Google Sign-In button
✓ Screenshot saved: selenium_tests/screenshots/student_02_google_button_found_20260106_001502.png

⚠ MANUAL ACTION REQUIRED:
  Please log in with: 01fe23bcs081@kletech.ac.in
  Waiting 30 seconds for manual login...

✓ Screenshot saved: selenium_tests/screenshots/student_05_student_dashboard_20260106_001535.png
✓ Student Google login successful

=== Testing Student Dashboard ===
✓ Screenshot saved: selenium_tests/screenshots/student_06_dashboard_overview_20260106_001537.png
✓ Student dashboard captured

... (continues for Faculty and Lab Instructor)

================================================================================
                        TEST EXECUTION SUMMARY
================================================================================

  ✓ PASSED        - Student (Google OAuth)
  ✓ PASSED        - Faculty (Google OAuth)
  ✓ PASSED        - Lab Instructor (Google OAuth)

Test Completed: 2026-01-06 00:20:00

📸 Screenshots saved in: selenium_tests/screenshots/
================================================================================
```

---

## 📋 Capture Terminal Output

### For Documentation:
1. **Before running**: Take screenshot of terminal
2. **During tests**: Capture the output showing all steps
3. **After completion**: Screenshot of the summary

### Windows (PowerShell):
```powershell
# Run and save output to file
python run_google_tests.py | Tee-Object -FilePath test_output.txt
```

---

## ✅ Success Criteria

Tests are successful when you see:
- ✅ All screenshots saved
- ✅ "✓ PASSED" or "⚠ COMPLETED" for each role
- ✅ Dashboard screenshots captured
- ✅ No critical errors

---

## 🎯 What to Submit

1. **Terminal screenshots** showing:
   - Test execution
   - All "✓" checkmarks
   - Summary at the end

2. **Screenshot folder** containing:
   - All captured screenshots
   - Organized by role (student_, faculty_, labinstructor_)

3. **Test output file** (optional):
   - `test_output.txt` with complete log

---

**Ready to run!** Just execute:
```bash
python run_google_tests.py
```

🚀 **Good luck with your testing!**
