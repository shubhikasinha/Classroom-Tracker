import { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) 
    {
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
      
      if (err.message.includes('Network Error')) 
      {
        setError('Cannot connect to server. Please make sure the server is running.');
      } 
      else 
      {
        setError('Invalid username or password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Presence Tracker</h2>
      
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
          className="btn btn-block" 
          disabled={isLoading}
        >
          Login
        </button>
        
        {error && <p className="error-message">{error}</p>}
      </form>
      
      {/* <div style={{ marginTop: '20px', fontSize: '14px', textAlign: 'center' }}>
        <p>Demo Accounts:</p>
        <p>Teacher: username: teacher1, password: password123</p>
        <p>Student: username: student1, password: password123</p>
      </div> */}
    </div>
  );
};

export default Login; 