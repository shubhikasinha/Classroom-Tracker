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
  
//   // Define the correct names
//   const correctNames = {
//     classes: {
//       1: 'CSE A',
//       2: 'CSE B'
//     },
//     subjects: {
//       1: 'DBMS',
//       2: 'OS',
//       3: 'Data Structures',
//       4: 'Computer Networks'
//     }
//   };
  
//   // Update class names
//   Object.entries(correctNames.classes).forEach(([id, name]) => {
//     connection.query('UPDATE classes SET name = ? WHERE id = ?', [name, id], (err, result) => {
//       if (err) {
//         console.error(`Error updating class ${id}:`, err);
//       } else {
//         console.log(`Updated class ${id} to "${name}" (${result.affectedRows} row(s))`);
//       }
//     });
//   });
  
//   // Update subject names
//   Object.entries(correctNames.subjects).forEach(([id, name]) => {
//     connection.query('UPDATE subjects SET name = ? WHERE id = ?', [name, id], (err, result) => {
//       if (err) {
//         console.error(`Error updating subject ${id}:`, err);
//       } else {
//         console.log(`Updated subject ${id} to "${name}" (${result.affectedRows} row(s))`);
//       }
//     });
//   });
  
//   // Verify the updates after a short delay to ensure all updates have completed
//   setTimeout(() => {
//     connection.query('SELECT * FROM classes', (err, rows) => {
//       if (err) {
//         console.error('Error querying classes:', err);
//       } else {
//         console.log('Current classes:');
//         console.table(rows);
//       }
      
//       connection.query('SELECT * FROM subjects', (err, rows) => {
//         if (err) {
//           console.error('Error querying subjects:', err);
//         } else {
//           console.log('Current subjects:');
//           console.table(rows);
//         }
        
//         // Close connection
//         connection.end();
//       });
//     });
//   }, 1000);
// }); 