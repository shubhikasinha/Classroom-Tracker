# Classroom Tracker

A comprehensive classroom management system built with SQL, Express.js, React, and Node.js (SERN stack). This platform allows educational institutions to seamlessly track student attendance, manage assignments, and handle grading workflows in one premium interface.

## Core Features

1. **Role-Based Hubs**
   - Secure Student and Teacher authentication
   - Dedicated dashboard hubs with seamless tabbed navigation

2. **Attendance Management**
   - **Teachers:** Mark attendance by class, subject, date, and hours. View past attendance records.
   - **Students:** Track personal attendance by subject. View detailed records, hours present, and attendance percentages with dynamic status indicators.

3. **Assignment & Grading System**
   - **Teachers:** Create assignments with due dates, descriptions, and maximum marks. Track submission status and grade student files with personalized feedback.
   - **Students:** View active and past assignments. Upload files for submission. Review grades and teacher feedback securely.

4. **Premium UI/UX**
   - Modern, formal white-dominant theme with subtle primary accents
   - fully responsive split-screen authentication flow
   - Data visualizations and formal tabular layouts for academic data

## Setup Instructions

### Database Setup

1. Create a MySQL database named `attendance_db`
2. Run the SQL script in `backend/db.sql` to create the foundational tables and sample data.
3. Run the SQL provided in `backend/migration.sql` (if available) or manually create the `assignments` and `submissions` tables to enable the new features.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies (including `multer` for file uploads):
   ```bash
   npm install express mysql2 cors dotenv nodemon multer
   ```

3. Create a `.env` file with the following content (update with your MySQL credentials):
   ```env
   PORT = 8081
   DB_HOST = localhost
   DB_USER = root
   DB_PASSWORD = your_password
   DB_DATABASE = attendance_db
   ```
   *(Note: The server runs on port 8081 by default to prevent conflicts)*

4. Create an `uploads` directory in the backend root for storing assignment files:
   ```bash
   mkdir uploads
   ```

5. Start the backend server:
   ```bash
   node app.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local server URL (typically `http://localhost:5173`)

## Demo Accounts

### Teacher Accounts
- **Username:** `teacher1` | **Password:** `password123`
- **Username:** `teacher2` | **Password:** `password123`

### Student Accounts
- **Username:** `student1` | **Password:** `password123`
- **Username:** `student2` | **Password:** `password123`

## Project Structure

- `backend/`: Node.js/Express.js Server
  - `models/`: Database query models (`attendanceModel`, `assignmentModel`, etc.)
  - `controllers/`: Business logic (`assignmentController`, etc.)
  - `routes/`: Express API endpoints
  - `uploads/`: Static directory for student assignment files
  - `app.js`: Server entry point

- `frontend/`: React + Vite Application
  - `src/components/`: Modular React components (`LandingPage`, `TeacherHub`, `StudentAssignments`, etc.)
  - `src/App.jsx`: Main routing architecture
  - `src/App.css`: Comprehensive global theme and component styling
  - `src/index.css`: Typography and base resets