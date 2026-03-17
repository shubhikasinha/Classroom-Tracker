// const mysql = require('mysql2');
// const dotenv = require('dotenv');

// dotenv.config();

// // Create connection
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// });

// // Connect to database
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
  
//   console.log('Connected to database');
  
//   // First, check current subjects
//   connection.query('SELECT * FROM subjects', (err, rows) => {
//     if (err) {
//       console.error('Error querying subjects:', err);
//       connection.end();
//       return;
//     }
    
//     console.log('Current subjects:');
//     console.table(rows);
    
//     // Update subject name
//     const query = 'UPDATE subjects SET name = ? WHERE name = ?';
//     connection.query(query, ['OS', 'Web Development'], (err, result) => {
//       if (err) {
//         console.error('Error updating subject name:', err);
//       } else {
//         console.log(`Updated ${result.affectedRows} row(s)`);
        
//         // Verify the update
//         connection.query('SELECT * FROM subjects', (err, rows) => {
//           if (err) {
//             console.error('Error querying subjects:', err);
//           } else {
//             console.log('Subjects after update:');
//             console.table(rows);
//           }
          
//           // Close connection
//           connection.end();
//         });
//       }
//     });
//   });
// }); 