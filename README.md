# CEER Department Resource Management System

A comprehensive digital platform designed to streamline operations for the **Centre for Engineering Education Research (CEER)**. This full-stack web application digitizes departmental workflows, enabling seamless interaction between students, faculty, lab in-charges, and administrators.

## 🎯 Usage & Goal

The primary goal of this system is to replace manual paper-based processes with an efficient, transparent, and digital solution. It facilitates:
- **Resource Management:** Tracking lab materials, equipment availability, and consumption.
- **Academic Workflows:** Simplifying team formation, project approvals, and Bill of Materials (BOM) submissions.
- **Sustainability Tracking:** Monitoring carbon footprint and energy usage for student projects.

## 🚀 Tech Stack

### Frontend
- **Framework:** [React 18](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Premium, responsive design with Glassmorphism effects)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State/API:** Context API, Axios

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (with Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens) & Google OAuth 2.0
- **File Storage:** Cloudinary (for image management)
- **Email:** Nodemailer (for notifications)

### DevOps & Tools
- **Testing:** Jest, Playwright
- **Monitoring:** Prometheus & Grafana (System health & metrics)

---

## ✨ Key Features by Role

### Student
- **Dashboard:** Personalized view of active projects, teams, and requests.
- **BOM Management:** Create and submit Bill of Materials for approval.
- **Resource Tracking:** Monitor generic energy consumption and carbon footprint of projects.
- **Team Formation:** Invite peers and form project teams digitally.
- **Equipment Requests:** Check availability and request lab machinery.

### Faculty
- **Digital Approvals:** Review and approve/reject Student BOMs and Team requests.
- **Team Oversight:** View detailed information about student teams under their mentorship.
- **Profile Management:** Secure login and profile updates.

### Lab In-Charge
- **Inventory Control:** Manage stock levels for consumables and materials.
- **Request Processing:** Validate and issue approved materials to students.
- **Equipment Management:** Oversee machine availability and maintenance status.

### Admin
- **Centralized Dashboard:** Real-time analytics on system usage, users, and resources.
- **User Management:** Bulk registration and role management for all users.
- **System Configuration:** Manage department assets, events, and master data.

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local installation or MongoDB Atlas account)
- **Git** (for version control)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/WT-CEER.git
cd WT-CEER
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `backend` directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
```

#### Start Backend Server
```bash
npm run dev
```
Server will start on `http://localhost:8000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../frontend
npm install
```

#### Start Frontend Development Server
```bash
npm run dev
```
Application will run on `http://localhost:5173`

### 4. Access the Application
Open your browser and navigate to:
- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:8000`

---

## 📁 Project Structure

```
WT-CEER/
├── backend/                    # Express API Server
│   ├── config/                 # Database & External Service Configs
│   ├── controllers/            # Route Logic (Admin, Auth, BOM, etc.)
│   ├── models/                 # Mongoose Schemas (User, Team, Material, etc.)
│   ├── routes/                 # API Routes
│   ├── middleware/             # Auth & Error middlewares
│   ├── tests/                  # Backend tests
│   ├── server.js               # Entry point
│   └── package.json
│
├── frontend/                   # React Client
│   ├── public/                 # Static assets
│   │   └── images/             # Image files
│   ├── src/
│   │   ├── components/         # Reusable UI Components
│   │   ├── pages/              # Full Page Views (Dashboard, Login, etc.)
│   │   ├── context/            # Global State (AuthContext)
│   │   ├── App.jsx             # Main App Component
│   │   └── main.jsx            # Entry point
│   └── package.json
│
├── automation_tests/           # Playwright E2E tests
├── .gitignore                  # Git ignore rules
├── README.md                   # This file
└── TESTING_REPORT.html         # Test documentation
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### End-to-End Tests
```bash
cd automation_tests
npm install
npx playwright test
```

---

## 🔐 Authentication

The system supports two authentication methods:
1. **Email/Password:** Traditional login with JWT tokens
2. **Google OAuth 2.0:** Single Sign-On for KLE Tech email addresses

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login

### Students
- `GET /api/students/dashboard` - Get student dashboard data
- `POST /api/students/bom` - Create BOM request
- `GET /api/students/teams` - Get student teams

### Faculty
- `GET /api/faculty/dashboard` - Get faculty dashboard
- `PUT /api/faculty/approve-bom/:id` - Approve/reject BOM

### Admin
- `GET /api/admin/dashboard` - Admin analytics
- `POST /api/admin/users/bulk` - Bulk user registration
- `GET /api/admin/materials` - Manage materials

---

## 🎨 Features

- ✅ **Dark Professional Theme** - Modern, sleek UI with dark mode
- ✅ **Responsive Design** - Works on all devices
- ✅ **Real-time Updates** - Live data synchronization
- ✅ **Secure Authentication** - JWT & OAuth 2.0
- ✅ **Role-based Access Control** - Different views for different roles
- ✅ **File Upload** - Cloudinary integration
- ✅ **Email Notifications** - Automated email alerts
- ✅ **Analytics Dashboard** - Comprehensive metrics and charts

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is developed for **KLE Technological University** - Centre for Engineering Education Research (CEER).

---

## 👥 Authors

- **Adavirao** - *Full Stack Development*

---

## 🙏 Acknowledgments

- KLE Technological University
- CEER Department Faculty
- All contributors and testers

---

## 📞 Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for CEER Department, KLE Tech**