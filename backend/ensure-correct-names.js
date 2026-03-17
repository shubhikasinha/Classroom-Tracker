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
  
//   // Update class names
//   connection.query('UPDATE classes SET name = "CSE A" WHERE id = 1', (err, result) => {
//     if (err) {
//       console.error('Error updating class name:', err);
//     } else {
//       console.log(`Updated ${result.affectedRows} class(es) to CSE A`);
//     }
    
//     connection.query('UPDATE classes SET name = "CSE B" WHERE id = 2', (err, result) => {
//       if (err) {
//         console.error('Error updating class name:', err);
//       } else {
//         console.log(`Updated ${result.affectedRows} class(es) to CSE B`);
//       }
      
//       // Update subject names
//       connection.query('UPDATE subjects SET name = "OS" WHERE id = 2', (err, result) => {
//         if (err) {
//           console.error('Error updating subject name:', err);
//         } else {
//           console.log(`Updated ${result.affectedRows} subject(s) to OS`);
//         }
        
//         connection.query('UPDATE subjects SET name = "Computer Networks" WHERE id = 4', (err, result) => {
//           if (err) {
//             console.error('Error updating subject name:', err);
//           } else {
//             console.log(`Updated ${result.affectedRows} subject(s) to Computer Networks`);
//           }
          
//           // Verify the updates
//           connection.query('SELECT * FROM classes', (err, rows) => {
//             if (err) {
//               console.error('Error querying classes:', err);
//             } else {
//               console.log('Current classes:');
//               console.table(rows);
//             }
            
//             connection.query('SELECT * FROM subjects', (err, rows) => {
//               if (err) {
//                 console.error('Error querying subjects:', err);
//               } else {
//                 console.log('Current subjects:');
//                 console.table(rows);
//               }
              
//               // Close connection
//               connection.end();
//             });
//           });
//         });
//       });
//     });
//   });
// }); 