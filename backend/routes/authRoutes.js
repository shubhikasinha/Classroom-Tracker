const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.post('/login', authController.login);

// Add error handling middleware
router.use((err, req, res, next) => {
  console.error('Auth route error:', err);
  res.status(500).json({ message: 'Internal server error in auth route' });
});

module.exports = router; 