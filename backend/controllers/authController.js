const User = require('../models/userModel');

// Simple login controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Login Attempt:', username);
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user by username
    const user = await User.findByUsername(username);
    
    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create user object to return (without password)
    const userResponse = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role
    };

    console.log(`Successful login for user: ${username}`);
    // Return user data
    res.status(200).json({
      message: 'Login successful',
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  login
}; 