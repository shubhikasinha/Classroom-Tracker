# Attendance Management System

A simple attendance management system built with SQL, Express.js, React, and Node.js (SERN stack).

## Features

1. **Login System**
   - Student and Teacher authentication
   - Role-based redirection to respective dashboards

2. **Student Dashboard**
   - View attendance by subject
   - See detailed attendance records with dates and hours
   - View attendance percentage for each subject

3. **Teacher Dashboard**
   - Mark attendance for a class
   - Select subject, date, and number of hours
   - Mark students as present or absent
   - View confirmation of submitted attendance

## Setup Instructions

### Database Setup

1. Create a MySQL database named `attendance_db`
2. Run the SQL script in `backend/db.sql` to create tables and sample data

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following content (update with your MySQL credentials):
   ```
   PORT = 8080
   DB_HOST = localhost
   DB_USER = root
   DB_PASSWORD = your_password
   DB_DATABASE = attendance_db
   ```

4. Start the backend server:
   ```
   node app.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

4. Open your browser and go to the URL shown in the terminal (typically http://localhost:5173)

## Demo Accounts

### Teacher Accounts
- Username: teacher1, Password: password123
- Username: teacher2, Password: password123

### Student Accounts
- Username: student1, Password: password123
- Username: student2, Password: password123
- (and more in the database)

## Project Structure

- `backend/`: Express.js server and API
  - `models/`: Database models
  - `controllers/`: API controllers
  - `routes/`: API routes
  - `app.js`: Main server file

- `frontend/`: React application
  - `src/components/`: React components
  - `src/App.jsx`: Main application component
  - `src/App.css`: Application styles 