const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection pool with explicit configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345678',
  database: process.env.DB_DATABASE || 'attendance_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    // Don't exit the process, just log the error
    // process.exit(1);
  }
}

testConnection();

module.exports = pool; 