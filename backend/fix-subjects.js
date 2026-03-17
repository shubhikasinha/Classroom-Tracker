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
  
//   // Drop and recreate the subjects table
//   const dropTable = `
//     DROP TABLE IF EXISTS attendance;
//     DROP TABLE IF EXISTS subjects;
//   `;
  
//   connection.query(dropTable, (err) => {
//     if (err) {
//       console.error('Error dropping tables:', err);
//       connection.end();
//       return;
//     }
    
//     console.log('Tables dropped successfully');
    
//     // Create subjects table
//     const createTable = `
//       CREATE TABLE IF NOT EXISTS subjects (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(100) NOT NULL
//       )
//     `;
    
//     connection.query(createTable, (err) => {
//       if (err) {
//         console.error('Error creating subjects table:', err);
//         connection.end();
//         return;
//       }
      
//       console.log('Subjects table created successfully');
      
//       // Insert subjects with the correct names
//       const insertSubjects = `
//         INSERT INTO subjects (name) VALUES 
//         ('DBMS'),
//         ('OS'),
//         ('Data Structures'),
//         ('Computer Networks')
//       `;
      
//       connection.query(insertSubjects, (err) => {
//         if (err) {
//           console.error('Error inserting subjects:', err);
//         } else {
//           console.log('Subjects inserted successfully');
          
//           // Verify the subjects
//           connection.query('SELECT * FROM subjects', (err, rows) => {
//             if (err) {
//               console.error('Error querying subjects:', err);
//             } else {
//               console.log('Current subjects:');
//               console.table(rows);
//             }
            
//             // Recreate attendance table
//             const createAttendance = `
//               CREATE TABLE IF NOT EXISTS attendance (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 student_id INT NOT NULL,
//                 subject_id INT NOT NULL,
//                 class_id INT NOT NULL,
//                 date DATE NOT NULL,
//                 hours INT NOT NULL,
//                 status ENUM('present', 'absent') NOT NULL,
//                 marked_by INT NOT NULL,
//                 FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
//                 FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
//                 FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
//                 FOREIGN KEY (marked_by) REFERENCES users(id) ON DELETE CASCADE
//               )
//             `;
            
//             connection.query(createAttendance, (err) => {
//               if (err) {
//                 console.error('Error creating attendance table:', err);
//               } else {
//                 console.log('Attendance table created successfully');
//               }
              
//               // Close connection
//               connection.end();
//             });
//           });
//         }
//       });
//     });
//   });
// }); 