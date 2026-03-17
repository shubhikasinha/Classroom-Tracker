import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle login
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route 
            path="/" 
            element={
              user ? (
                user.role === 'student' ? (
                  <Navigate to="/student-dashboard" />
                ) : (
                  <Navigate to="/teacher-dashboard" />
                )
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/student-dashboard" 
            element={
              user && user.role === 'student' ? (
                <StudentDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route 
            path="/teacher-dashboard" 
            element={
              user && user.role === 'teacher' ? (
                <TeacherDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
