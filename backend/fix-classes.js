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
  
//   // Drop and recreate the classes table
//   const dropTable = `
//     DROP TABLE IF EXISTS attendance;
//     DROP TABLE IF EXISTS student_class;
//     DROP TABLE IF EXISTS classes;
//   `;
  
//   connection.query(dropTable, (err) => {
//     if (err) {
//       console.error('Error dropping tables:', err);
//       connection.end();
//       return;
//     }
    
//     console.log('Tables dropped successfully');
    
//     // Create classes table
//     const createTable = `
//       CREATE TABLE IF NOT EXISTS classes (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(50) NOT NULL
//       )
//     `;
    
//     connection.query(createTable, (err) => {
//       if (err) {
//         console.error('Error creating classes table:', err);
//         connection.end();
//         return;
//       }
      
//       console.log('Classes table created successfully');
      
//       // Insert classes with the correct names
//       const insertClasses = `
//         INSERT INTO classes (name) VALUES 
//         ('CSE A'),
//         ('CSE B')
//       `;
      
//       connection.query(insertClasses, (err) => {
//         if (err) {
//           console.error('Error inserting classes:', err);
//         } else {
//           console.log('Classes inserted successfully');
          
//           // Verify the classes
//           connection.query('SELECT * FROM classes', (err, rows) => {
//             if (err) {
//               console.error('Error querying classes:', err);
//             } else {
//               console.log('Current classes:');
//               console.table(rows);
//             }
            
//             // Recreate student_class table
//             const createStudentClass = `
//               CREATE TABLE IF NOT EXISTS student_class (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 student_id INT NOT NULL,
//                 class_id INT NOT NULL,
//                 FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
//                 FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
//               )
//             `;
            
//             connection.query(createStudentClass, (err) => {
//               if (err) {
//                 console.error('Error creating student_class table:', err);
//               } else {
//                 console.log('Student_class table created successfully');
                
//                 // Recreate attendance table
//                 const createAttendance = `
//                   CREATE TABLE IF NOT EXISTS attendance (
//                     id INT AUTO_INCREMENT PRIMARY KEY,
//                     student_id INT NOT NULL,
//                     subject_id INT NOT NULL,
//                     class_id INT NOT NULL,
//                     date DATE NOT NULL,
//                     hours INT NOT NULL,
//                     status ENUM('present', 'absent') NOT NULL,
//                     marked_by INT NOT NULL,
//                     FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
//                     FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
//                     FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
//                     FOREIGN KEY (marked_by) REFERENCES users(id) ON DELETE CASCADE
//                   )
//                 `;
                
//                 connection.query(createAttendance, (err) => {
//                   if (err) {
//                     console.error('Error creating attendance table:', err);
//                   } else {
//                     console.log('Attendance table created successfully');
                    
//                     // Reassign students to classes
//                     const assignStudents = `
//                       INSERT INTO student_class (student_id, class_id) VALUES
//                       (3, 1), (4, 1), (5, 1), (6, 1), (7, 1),
//                       (8, 2), (9, 2), (10, 2), (11, 2), (12, 2)
//                     `;
                    
//                     connection.query(assignStudents, (err) => {
//                       if (err) {
//                         console.error('Error assigning students to classes:', err);
//                       } else {
//                         console.log('Students assigned to classes successfully');
//                       }
                      
//                       // Close connection
//                       connection.end();
//                     });
//                   }
//                 });
//               }
//             });
//           });
//         }
//       });
//     });
//   });
// }); 