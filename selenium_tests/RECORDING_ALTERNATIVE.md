# 🎥 Manual Testing with Screen Recording

## ⚠️ Installation Issue Resolved

The Python screen recorder requires C++ build tools which aren't installed. Instead, use **Windows built-in screen recorder**!

---

## 🎯 Use Windows Game Bar (Built-in, No Installation!)

### Step 1: Enable Game Bar
1. Press `Windows + G`
2. If prompted, check "Yes, this is a game"
3. Game Bar overlay will appear

### Step 2: Start Recording
1. Click the **Record button** (circle icon) OR press `Windows + Alt + R`
2. A small recording indicator appears in top-right corner
3. Recording starts! 🔴

### Step 3: Perform Your Testing
- Open browser: `http://localhost:5173/login`
- Log in with Google: `01fe23bcs081@kletech.ac.in`
- Navigate through all features
- Click on all navigation items
- Scroll to see graphs
- Visit all pages

### Step 4: Stop Recording
1. Press `Windows + Alt + R` again OR
2. Click the stop button in the recording indicator
3. Video automatically saved!

### Step 5: Find Your Recording
- Videos saved in: `C:\Users\adavi\Videos\Captures\`
- File format: `.mp4`
- Rename files to:
  - `student_manual_test.mp4`
  - `faculty_manual_test.mp4`
  - `labinstructor_manual_test.mp4`

---

## 📋 Alternative: OBS Studio (Free, Professional)

### Install OBS Studio:
1. Download from: https://obsproject.com/
2. Install (takes 2 minutes)
3. Open OBS Studio

### Setup:
1. Click **"+"** under Sources
2. Select **"Display Capture"**
3. Click **OK** → **OK**
4. Click **"Start Recording"**
5. Perform your testing
6. Click **"Stop Recording"**
7. Videos saved in: `C:\Users\adavi\Videos\`

---

## 🎬 What to Record for Each Role

### 📹 Student Role (5-10 minutes)
```
1. Navigate to http://localhost:5173/login
2. Click "Sign in with Google"
3. Log in with 01fe23bcs081@kletech.ac.in
4. Wait for dashboard to load
5. Scroll down to view all graphs
6. Click on "BOM" or "Materials" link
7. Explore BOM page
8. Click on "Embodied Energy" link
9. Explore Energy page
10. Click on "Carbon Footprint" link
11. Explore Carbon page
12. Return to dashboard
13. Logout
```

### 📹 Faculty Role (5-10 minutes)
```
1. Navigate to http://localhost:5173/login
2. Click "Sign in with Google"
3. Log in with 01fe23bcs081@kletech.ac.in
4. Wait for dashboard to load
5. Scroll down to view all graphs
6. Click on "Teams" link
7. Explore Teams page
8. Click on "Approvals" or "Requests" link
9. Explore Approvals page
10. Check for notifications
11. Return to dashboard
12. Logout
```

### 📹 Lab Instructor Role (5-10 minutes)
```
1. Navigate to http://localhost:5173/login
2. Click "Sign in with Google"
3. Log in with 01fe23bcs081@kletech.ac.in
4. Wait for dashboard to load
5. Scroll down to view all graphs
6. Click on "Inventory" link
7. Explore Inventory page
8. Click on "Equipment" link
9. Explore Equipment page
10. Click on "Requests" link
11. Explore Requests page
12. Return to dashboard
13. Logout
```

---

## 📁 Organize Your Recordings

Create folder: `C:\Users\adavi\OneDrive\Desktop\WT CEER\selenium_tests\recordings\`

Move and rename your recordings:
- `student_manual_test.mp4`
- `faculty_manual_test.mp4`
- `labinstructor_manual_test.mp4`

---

## 🚀 Quick Start with Windows Game Bar

```
1. Press Windows + G
2. Click Record button (or Windows + Alt + R)
3. Open browser and test Student role
4. Press Windows + Alt + R to stop
5. Rename video to "student_manual_test.mp4"
6. Repeat for Faculty and Lab Instructor
```

---

## 💡 Tips for Better Recordings

- **Go slow** - Give pages time to load
- **Pause briefly** - Between clicks (1-2 seconds)
- **Show everything** - Click all navigation items
- **Scroll slowly** - So I can see all graphs
- **Speak out loud** (optional) - Describe what you're doing

---

## 🤖 After Recording

Once you have all 3 recordings:

1. **Share the videos** OR
2. **Tell me what you found**:
   - What navigation links exist?
   - What buttons are available?
   - What features work?
   - What graphs are displayed?

3. **I'll create automated tests** that:
   - Follow your exact workflow
   - Click the same buttons
   - Navigate the same way
   - Capture screenshots automatically

---

## ✅ Simplest Method

**Just use Windows Game Bar:**

```
Windows + Alt + R  →  Start Recording
(do your testing)
Windows + Alt + R  →  Stop Recording
```

**That's it!** 🎉

---

**Ready to record? Press `Windows + G` to start!** 🎥
