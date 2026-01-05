# Quick Setup Guide for WT CEER Project

## First Time Setup (After Cloning)

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install automation test dependencies (optional)
cd ../automation_tests
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the `backend` directory with your credentials:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/ceer_db
JWT_SECRET=your_secret_key_min_32_characters_long
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Step 3: Start the Application

**Option A: Start Both Servers Separately**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

**Option B: Use the provided batch scripts (Windows)**

Double-click `start-backend.bat` and `start-frontend.bat`

### Step 4: Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

---

## Git Workflow

### Initial Setup (First Time Only)

```bash
# Initialize git repository
git init

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/WT-CEER.git

# Add all files
git add .

# Initial commit
git commit -m "Initial commit"

# Push to GitHub
git push -u origin main
```

### Daily Workflow

**Option 1: Manual Sync**
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

**Option 2: Auto Sync (Windows)**
Just double-click `auto-sync.bat` - it will automatically:
- Add all changes
- Commit with timestamp
- Push to GitHub

---

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running locally OR
- Use MongoDB Atlas and update MONGODB_URI in .env

### Port Already in Use
- Backend: Change PORT in backend/.env
- Frontend: Vite will automatically suggest another port

### Module Not Found
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Quick Commands

```bash
# Run backend tests
cd backend && npm test

# Run E2E tests
cd automation_tests && npx playwright test

# Build frontend for production
cd frontend && npm run build

# Check for updates
npm outdated
```

---

**Need Help?** Check the main README.md or open an issue on GitHub.
