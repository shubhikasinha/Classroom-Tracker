import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', {
        username,
        password
      }, {
        withCredentials: true, // Optional, but can help with CORS
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Login Response:', response.data); // Added logging

      if (response.data && response.data.user) {
        console.log('Calling onLogin with:', response.data.user); // Added logging
        onLogin(response.data.user);
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);

      if (err.response) {
        // Server responded with an error
        console.log('Server Error Response:', err.response.data);
      }

      if (err.message.includes('Network Error')) {
        setError('Cannot connect to server. Please make sure the server is running.');
      }
      else {
        setError('Invalid username or password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-split-container">

        {/* Left Side - Visual/Creative */}
        <div className="login-visual-side">
          <button className="back-home-btn" onClick={() => navigate('/')}>
            <FiArrowLeft /> Back to Home
          </button>

          <div className="visual-content">
            <h2>Welcome Back to <br />Classroom Tracker</h2>
            <p>Access your dashboard to manage attendance, assignments, and grades with unparalleled ease and precision.</p>

            <div className="visual-features">
              <div className="v-feature">✓ Secure Role-Based Access</div>
              <div className="v-feature">✓ Real-time Analytics</div>
              <div className="v-feature">✓ Seamless Collaboration</div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-form-side">
          <div className="login-form-container">
            <h3 className="login-title">Sign In</h3>
            <p className="login-subtitle">Please enter your credentials to continue</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                className="btn btn-block login-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login; 