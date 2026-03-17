// const mysql = require('mysql2');
// const dotenv = require('dotenv');

// dotenv.config();

// // Create connection
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '12345678',
//   database: process.env.DB_DATABASE || 'attendance_db'
// });

// // Connect to database
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
  
//   console.log('Connected to database');
  
//   // First, delete existing users to avoid conflicts
//   connection.query('DELETE FROM users', (err) => {
//     if (err) {
//       console.error('Error deleting users:', err);
//       connection.end();
//       return;
//     }
    
//     console.log('Existing users deleted');
    
//     // Reset auto-increment
//     connection.query('ALTER TABLE users AUTO_INCREMENT = 1', (err) => {
//       if (err) {
//         console.error('Error resetting auto-increment:', err);
//         connection.end();
//         return;
//       }
      
//       console.log('Auto-increment reset');
      
//       // Insert new users
//       const users = [
//         { username: 'teacher1', password: 'password123', name: 'John Smith', role: 'teacher' },
//         { username: 'teacher2', password: 'password123', name: 'Jane Doe', role: 'teacher' },
//         { username: 'student1', password: 'password123', name: 'Alice Johnson', role: 'student' },
//         { username: 'student2', password: 'password123', name: 'Bob Williams', role: 'student' },
//         { username: 'student3', password: 'password123', name: 'Charlie Brown', role: 'student' },
//         { username: 'student4', password: 'password123', name: 'Diana Miller', role: 'student' },
//         { username: 'student5', password: 'password123', name: 'Edward Davis', role: 'student' },
//         { username: 'student6', password: 'password123', name: 'Fiona Wilson', role: 'student' },
//         { username: 'student7', password: 'password123', name: 'George Moore', role: 'student' },
//         { username: 'student8', password: 'password123', name: 'Hannah Taylor', role: 'student' },
//         { username: 'student9', password: 'password123', name: 'Ian Anderson', role: 'student' },
//         { username: 'student10', password: 'password123', name: 'Julia Thomas', role: 'student' }
//       ];
      
//       // Insert users one by one
//       let insertedCount = 0;
      
//       users.forEach((user, index) => {
//         connection.query(
//           'INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)',
//           [user.username, user.password, user.name, user.role],
//           (err) => {
//             if (err) {
//               console.error(`Error inserting user ${user.username}:`, err);
//             } else {
//               console.log(`User ${user.username} inserted successfully`);
//               insertedCount++;
              
//               // If all users are inserted, verify and close connection
//               if (insertedCount === users.length) {
//                 connection.query('SELECT * FROM users', (err, rows) => {
//                   if (err) {
//                     console.error('Error querying users:', err);
//                   } else {
//                     console.log('Users in database:');
//                     console.table(rows);
//                   }
                  
//                   // Close connection
//                   connection.end();
//                 });
//               }
//             }
//           }
//         );
//       });
//     });
//   });
// }); 