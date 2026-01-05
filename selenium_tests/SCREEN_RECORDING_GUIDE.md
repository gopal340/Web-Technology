# 🎥 Screen Recording for Automated Test Creation

## 🎯 Purpose
Record your manual testing sessions so I can create automated Selenium tests that exactly match your workflow!

---

## 📦 Installation

```bash
# Navigate to selenium_tests directory
cd "c:\Users\adavi\OneDrive\Desktop\WT CEER\selenium_tests"

# Install required packages
pip install opencv-python pyautogui numpy
```

---

## 🚀 How to Use

### Step 1: Start the Screen Recorder

```bash
python screen_recorder.py
```

### Step 2: Choose What to Record

You'll see a menu:
```
Select role to record:
1. Student
2. Faculty
3. Lab Instructor
4. Record All (one by one)
5. Exit

Enter choice (1-5):
```

### Step 3: Follow Instructions

For example, if you choose "1. Student":

```
================================================================================
  RECORDING: STUDENT ROLE TESTING
================================================================================

Instructions:
1. This will start recording your screen
2. Open browser and navigate to http://localhost:5173/login
3. Log in with Google using: 01fe23bcs081@kletech.ac.in
4. Navigate through Student dashboard and features
5. Press Ctrl+C in this terminal when done

Press ENTER to start recording Student role...
```

### Step 4: Perform Your Manual Testing

1. **Press ENTER** - Recording starts 🔴
2. **Open browser** - Go to http://localhost:5173/login
3. **Log in** - Use Google OAuth with 01fe23bcs081@kletech.ac.in
4. **Navigate** - Click through all features:
   - Dashboard
   - BOM requests
   - Embodied Energy
   - Carbon Footprinting
   - Any graphs or charts
5. **Press Ctrl+C** - When you're done

### Step 5: Recording Saved!

```
================================================================================
  Recording Stopped
================================================================================
✅ Recording saved: recordings/student_manual_test.avi
================================================================================
```

---

## 📁 Output

All recordings are saved in: `selenium_tests/recordings/`

Files created:
- `student_manual_test.avi` - Student role recording
- `faculty_manual_test.avi` - Faculty role recording
- `labinstructor_manual_test.avi` - Lab Instructor role recording

---

## 🎬 What to Do in Each Recording

### Student Role Recording:
1. Login with Google
2. View dashboard
3. Scroll to see all graphs
4. Click on BOM/Materials
5. Click on Embodied Energy
6. Click on Carbon Footprinting
7. Navigate back to dashboard
8. Logout

### Faculty Role Recording:
1. Login with Google
2. View dashboard
3. Scroll to see all graphs
4. Click on Teams
5. Click on Approvals/Requests
6. Check notifications
7. Navigate through all features
8. Logout

### Lab Instructor Role Recording:
1. Login with Google
2. View dashboard
3. Scroll to see all graphs
4. Click on Inventory
5. Click on Equipment
6. Click on Requests
7. Navigate through all features
8. Logout

---

## 🤖 What Happens Next

After you finish recording:

1. **I'll watch the recordings**
2. **I'll note**:
   - What buttons you clicked
   - What links you used
   - What features you accessed
   - What graphs appeared
3. **I'll create automated Selenium tests** that:
   - Follow your exact workflow
   - Click the same buttons
   - Navigate the same way
   - Capture the same screenshots
4. **You'll get**:
   - Fully automated test suite
   - No manual testing needed
   - Comprehensive test reports

---

## 💡 Tips

- **Go slow** - Don't rush through the features
- **Be thorough** - Visit all pages and features
- **Pause briefly** - Give each page time to load
- **Show everything** - Click on all navigation items
- **Take your time** - The recording captures everything

---

## 🎯 Quick Start

```bash
# 1. Install dependencies
pip install opencv-python pyautogui numpy

# 2. Run recorder
python screen_recorder.py

# 3. Choose "4" to record all roles

# 4. Follow on-screen instructions for each role

# 5. Done! Recordings saved in recordings/ folder
```

---

## 📊 Example Workflow

```
You: python screen_recorder.py
     → Choose "1. Student"
     → Press ENTER
     → [Recording starts] 🔴
     → Open browser
     → Login with Google
     → Navigate through features
     → Press Ctrl+C when done
     → [Recording saved] ✅

Me:  → Watch your recording
     → Create automated tests
     → Tests follow your exact steps
     → You get automated test suite! 🚀
```

---

**Ready to start?** Run:
```bash
python screen_recorder.py
```

🎥 **Happy recording!**
