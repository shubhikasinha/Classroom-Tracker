// const mysql = require('mysql2/promise');
// const dotenv = require('dotenv');

// dotenv.config();

// async function dropDatabase() {
//   let connection;
//   try {
//     console.log('Connecting to MySQL server...');
    
//     // Create connection without database specified
//     connection = await mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD
//     });
    
//     console.log('Connected to MySQL server');
    
//     // Drop the database if it exists
//     await connection.query(`DROP DATABASE IF EXISTS ${process.env.DB_DATABASE}`);
//     console.log(`Database ${process.env.DB_DATABASE} dropped successfully`);
    
//   } catch (err) {
//     console.error('Error dropping database:', err);
//   } finally {
//     if (connection) {
//       await connection.end();
//       console.log('Database connection closed');
//     }
//   }
// }

// dropDatabase(); 