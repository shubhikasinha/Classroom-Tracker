// const mysql = require('mysql2/promise');
// const fs = require('fs');
// const path = require('path');
// const dotenv = require('dotenv');

// dotenv.config();

// async function setupDatabase() {
//   let connection;
//   try {
//     console.log('Starting database setup...');
    
//     // Create connection without database specified first
//     connection = await mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD
//     });
    
//     console.log('Connected to MySQL server');
    
//     // Create database if it doesn't exist
//     await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`);
//     console.log(`Database ${process.env.DB_DATABASE} created or already exists`);
    
//     // Use the database
//     await connection.query(`USE ${process.env.DB_DATABASE}`);
//     console.log(`Using database ${process.env.DB_DATABASE}`);
    
//     // Create users table
//     console.log('Creating users table...');
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         username VARCHAR(50) NOT NULL UNIQUE,
//         password VARCHAR(255) NOT NULL,
//         name VARCHAR(100) NOT NULL,
//         role ENUM('student', 'teacher') NOT NULL
//       )
//     `);
    
//     // Create classes table
//     console.log('Creating classes table...');
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS classes (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(50) NOT NULL
//       )
//     `);
    
//     // Create subjects table
//     console.log('Creating subjects table...');
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS subjects (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(100) NOT NULL
//       )
//     `);
    
//     // Create student_class table
//     console.log('Creating student_class table...');
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS student_class (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         student_id INT NOT NULL,
//         class_id INT NOT NULL,
//         FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
//         FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
//       )
//     `);
    
//     // Create attendance table
//     console.log('Creating attendance table...');
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS attendance (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         student_id INT NOT NULL,
//         subject_id INT NOT NULL,
//         class_id INT NOT NULL,
//         date DATE NOT NULL,
//         hours INT NOT NULL,
//         status ENUM('present', 'absent') NOT NULL,
//         marked_by INT NOT NULL,
//         FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
//         FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
//         FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
//         FOREIGN KEY (marked_by) REFERENCES users(id) ON DELETE CASCADE
//       )
//     `);
    
//     // Insert sample data
//     console.log('Inserting sample data...');
    
//     // Insert classes
//     await connection.query(`
//       INSERT INTO classes (name) VALUES 
//       ('CSE A'),
//       ('CSE B')
//     `);
    
//     // Insert subjects
//     await connection.query(`
//       INSERT INTO subjects (name) VALUES 
//       ('DBMS'),
//       ('OS'),
//       ('Data Structures'),
//       ('Computer Networks')
//     `);
    
//     // Insert sample users (teachers and students)
//     await connection.query(`
//       INSERT INTO users (username, password, name, role) VALUES
//       ('teacher1', 'password123', 'John Smith', 'teacher'),
//       ('teacher2', 'password123', 'Jane Doe', 'teacher'),
//       ('student1', 'password123', 'Alice Johnson', 'student'),
//       ('student2', 'password123', 'Bob Williams', 'student'),
//       ('student3', 'password123', 'Charlie Brown', 'student'),
//       ('student4', 'password123', 'Diana Miller', 'student'),
//       ('student5', 'password123', 'Edward Davis', 'student'),
//       ('student6', 'password123', 'Fiona Wilson', 'student'),
//       ('student7', 'password123', 'George Moore', 'student'),
//       ('student8', 'password123', 'Hannah Taylor', 'student'),
//       ('student9', 'password123', 'Ian Anderson', 'student'),
//       ('student10', 'password123', 'Julia Thomas', 'student')
//     `);
    
//     // Assign students to classes
//     await connection.query(`
//       INSERT INTO student_class (student_id, class_id) VALUES
//       (3, 1), (4, 1), (5, 1), (6, 1), (7, 1),
//       (8, 2), (9, 2), (10, 2), (11, 2), (12, 2)
//     `);
    
//     // // Insert sample attendance records
//     // await connection.query(`
//     //   INSERT INTO attendance (student_id, subject_id, class_id, date, hours, status, marked_by) VALUES
//     //   (3, 1, 1, '2024-03-01', 4, 'present', 1),
//     //   (4, 1, 1, '2024-03-01', 4, 'present', 1),
//     //   (5, 1, 1, '2024-03-01', 4, 'present', 1),
//     //   (6, 1, 1, '2024-03-01', 4, 'present', 1),
//     //   (7, 1, 1, '2024-03-01', 4, 'absent', 1),
      
//     //   (3, 2, 1, '2024-03-02', 4, 'present', 2),
//     //   (4, 2, 1, '2024-03-02', 4, 'present', 2),
//     //   (5, 2, 1, '2024-03-02', 4, 'absent', 2),
//     //   (6, 2, 1, '2024-03-02', 4, 'absent', 2),
//     //   (7, 2, 1, '2024-03-02', 4, 'absent', 2),
      
//     //   (8, 3, 2, '2024-03-03', 1, 'present', 1),
//     //   (9, 3, 2, '2024-03-03', 1, 'absent', 1),
//     //   (10, 3, 2, '2024-03-03', 1, 'absent', 1),
//     //   (11, 3, 2, '2024-03-03', 1, 'absent', 1),
//     //   (12, 3, 2, '2024-03-03', 1, 'absent', 1),
      
//     //   (8, 4, 2, '2024-03-04', 1, 'present', 2),
//     //   (9, 4, 2, '2024-03-04', 1, 'absent', 2),
//     //   (10, 4, 2, '2024-03-04', 1, 'absent', 2),
//     //   (11, 4, 2, '2024-03-04', 1, 'absent', 2),
//     //   (12, 4, 2, '2024-03-04', 1, 'absent', 2)
//     // `);
    
//     console.log('Database setup completed successfully');
    
//   } catch (err) {
//     console.error('Error setting up database:', err);
//   } finally {
//     if (connection) {
//       await connection.end();
//       console.log('Database connection closed');
//     }
//   }
// }

// setupDatabase(); 