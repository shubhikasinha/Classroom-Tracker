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
  
//   // Update class name
//   const query = 'UPDATE classes SET name = ? WHERE name = ?';
//   connection.query(query, ['CSE A', 'Class A'], (err, result) => {
//     if (err) {
//       console.error('Error updating class name:', err);
//     } else {
//       console.log(`Updated ${result.affectedRows} row(s)`);
      
//       // Verify the update
//       connection.query('SELECT * FROM classes', (err, rows) => {
//         if (err) {
//           console.error('Error querying classes:', err);
//         } else {
//           console.log('Current classes:');
//           console.table(rows);
//         }
        
//         // Close connection
//         connection.end();
//       });
//     }
//   });
// }); 