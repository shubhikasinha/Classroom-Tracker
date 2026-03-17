import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import StudentHub from './components/StudentHub';
import TeacherHub from './components/TeacherHub';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    navigate('/');
  };

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Login */}
      <Route
        path="/login"
        element={
          user ? (
            user.role === 'student' ? (
              <Navigate to="/student" />
            ) : (
              <Navigate to="/teacher" />
            )
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      {/* Student Hub */}
      <Route
        path="/student"
        element={
          user && user.role === 'student' ? (
            <StudentHub user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Teacher Hub */}
      <Route
        path="/teacher"
        element={
          user && user.role === 'teacher' ? (
            <TeacherHub user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
