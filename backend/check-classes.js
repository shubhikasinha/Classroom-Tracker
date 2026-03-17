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
  
//   // Check current classes
//   connection.query('SELECT * FROM classes', (err, rows) => {
//     if (err) {
//       console.error('Error querying classes:', err);
//     } else {
//       console.log('Current classes in database:');
//       console.table(rows);
      
//       // Force update to ensure it's CSE A
//       connection.query('UPDATE classes SET name = "CSE A" WHERE id = 1', (err, result) => {
//         if (err) {
//           console.error('Error updating class:', err);
//         } else {
//           console.log(`Updated ${result.affectedRows} row(s)`);
          
//           // Verify the update
//           connection.query('SELECT * FROM classes', (err, rows) => {
//             if (err) {
//               console.error('Error querying classes:', err);
//             } else {
//               console.log('Classes after update:');
//               console.table(rows);
//             }
            
//             // Close connection
//             connection.end();
//           });
//         }
//       });
//     }
//   });
// }); 