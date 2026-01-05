# 📋 Manual Testing Checklist - Google OAuth

## 🎯 Test Account
**Email**: `01fe23bcs081@kletech.ac.in`

---

## ✅ STUDENT ROLE - Manual Testing

### Step 1: Login
- [ ] Navigate to: `http://localhost:5173/login`
- [ ] Click "Sign in with Google"
- [ ] Log in with: `01fe23bcs081@kletech.ac.in`
- [ ] Verify redirect to Student Dashboard

### Step 2: Dashboard
- [ ] Take screenshot of dashboard homepage
- [ ] Scroll down to view all graphs
- [ ] Take screenshot of graphs section

### Step 3: BOM (Bill of Materials)
- [ ] Click on BOM/Materials link in navigation
- [ ] Take screenshot of BOM page
- [ ] Try to create a new BOM request (if available)
- [ ] Take screenshot of BOM form/list

### Step 4: Embodied Energy
- [ ] Click on Embodied Energy link
- [ ] Take screenshot of Energy calculation page
- [ ] Note any graphs or calculations shown

### Step 5: Carbon Footprinting
- [ ] Click on Carbon Footprint link
- [ ] Take screenshot of Carbon page
- [ ] Note any graphs or data displayed

### Screenshots to Capture:
1. `student_01_login_page.png`
2. `student_02_after_google_login.png`
3. `student_03_dashboard.png`
4. `student_04_dashboard_graphs.png`
5. `student_05_bom_page.png`
6. `student_06_energy_page.png`
7. `student_07_carbon_page.png`

---

## ✅ FACULTY ROLE - Manual Testing

### Step 1: Login
- [ ] Log out from Student account
- [ ] Navigate to: `http://localhost:5173/login`
- [ ] Click "Sign in with Google"
- [ ] Log in with: `01fe23bcs081@kletech.ac.in`
- [ ] Verify redirect to Faculty Dashboard

### Step 2: Dashboard
- [ ] Take screenshot of faculty dashboard
- [ ] Scroll to view all graphs and analytics
- [ ] Take screenshot of graphs section

### Step 3: Teams
- [ ] Click on Teams link in navigation
- [ ] Take screenshot of Teams page
- [ ] Try to create a new team (if available)
- [ ] Take screenshot of team creation form/list

### Step 4: Approvals/Requests
- [ ] Click on Approvals/Requests link
- [ ] Take screenshot of pending requests
- [ ] Note any BOM requests to approve
- [ ] Take screenshot of approval interface

### Step 5: Messages/Notifications
- [ ] Check for any notifications or messages
- [ ] Take screenshot of notifications section

### Screenshots to Capture:
1. `faculty_01_login_page.png`
2. `faculty_02_after_google_login.png`
3. `faculty_03_dashboard.png`
4. `faculty_04_dashboard_graphs.png`
5. `faculty_05_teams_page.png`
6. `faculty_06_approvals_page.png`
7. `faculty_07_notifications.png`

---

## ✅ LAB INSTRUCTOR ROLE - Manual Testing

### Step 1: Login
- [ ] Log out from Faculty account
- [ ] Navigate to: `http://localhost:5173/login`
- [ ] Click "Sign in with Google"
- [ ] Log in with: `01fe23bcs081@kletech.ac.in`
- [ ] Verify redirect to Lab Instructor Dashboard

### Step 2: Dashboard
- [ ] Take screenshot of lab instructor dashboard
- [ ] Scroll to view all graphs
- [ ] Take screenshot of graphs section

### Step 3: Inventory Management
- [ ] Click on Inventory/Stock link
- [ ] Take screenshot of inventory page
- [ ] Note available materials and quantities
- [ ] Take screenshot of inventory list

### Step 4: Equipment Management
- [ ] Click on Equipment/Machines link
- [ ] Take screenshot of equipment page
- [ ] Note equipment status and availability

### Step 5: Request Processing
- [ ] Click on Requests/Pending link
- [ ] Take screenshot of material requests
- [ ] Note any pending requests to process

### Screenshots to Capture:
1. `labinstructor_01_login_page.png`
2. `labinstructor_02_after_google_login.png`
3. `labinstructor_03_dashboard.png`
4. `labinstructor_04_dashboard_graphs.png`
5. `labinstructor_05_inventory_page.png`
6. `labinstructor_06_equipment_page.png`
7. `labinstructor_07_requests_page.png`

---

## 📝 Notes Section

### Student Role Notes:
```
Navigation links found:
- 
- 
- 

Features available:
- 
- 

Graphs displayed:
- 
- 
```

### Faculty Role Notes:
```
Navigation links found:
- 
- 
- 

Features available:
- 
- 

Graphs displayed:
- 
- 
```

### Lab Instructor Role Notes:
```
Navigation links found:
- 
- 
- 

Features available:
- 
- 

Graphs displayed:
- 
- 
```

---

## 🎯 After Manual Testing

Once you complete the manual testing and take all screenshots:

1. **Share your notes** about:
   - What navigation links you found
   - What features are available
   - What graphs are displayed
   - Any specific selectors or button texts

2. **I will then**:
   - Update the Selenium tests with exact selectors
   - Automate the entire flow
   - Create tests that match your exact workflow
   - Generate comprehensive test reports

---

## 💡 Tips

- Use **Windows Snipping Tool** (Win + Shift + S) for screenshots
- Save screenshots in: `c:\Users\adavi\OneDrive\Desktop\WT CEER\selenium_tests\manual_screenshots\`
- Note down exact button texts and link names
- Take extra screenshots of any interesting features

---

**Start with Student role first, then let me know what you find!** 🚀
