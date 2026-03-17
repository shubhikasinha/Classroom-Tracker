// const mysql = require('mysql2');
// const dotenv = require('dotenv');

// dotenv.config();

// console.log('Attempting to connect to database with these settings:');
// console.log('Host:', process.env.DB_HOST);
// console.log('User:', process.env.DB_USER);
// console.log('Password:', process.env.DB_PASSWORD ? '******' : 'not set');
// console.log('Database:', process.env.DB_DATABASE);

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     process.exit(1);
//   }
  
//   console.log('Successfully connected to database!');
  
//   // Try to create the database if it doesn't exist
//   connection.query('CREATE DATABASE IF NOT EXISTS attendance_db', (err) => {
//     if (err) {
//       console.error('Error creating database:', err);
//     } else {
//       console.log('Database created or already exists');
//     }
    
//     // Close the connection
//     connection.end();
//   });
// }); 