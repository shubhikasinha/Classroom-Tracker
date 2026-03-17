const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const mysql = require("mysql2");

// Load environment variables
dotenv.config();

// Configure CORS - make sure this is before any routes
app.use(cors({
  origin: true, // Allow requests from any origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
// app.use(cors());

// Import routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

dotenv.config();

const PORT = process.env.PORT || 8081;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 30,
    maxIdle: 20,
    idleTimeout: 30000, 
    queueLimit: 100,
  });

const db = pool.promise(); 

async function checkDatabaseConnection() 
{
    try {
        const [rows] = await db.query('SELECT 1');
        console.log('Connected to the database!');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

checkDatabaseConnection();

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);

// Add a simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running correctly' });
});

// Root route
app.get("/", (req, res) => {
    res.send("Attendance Management System API");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try using a different port.`);
  } else {
    console.error('Error starting server:', err);
  }
});