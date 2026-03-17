-- Migration: Add assignments and submissions tables
-- Run this against your attendance_db database

USE attendance_db;

-- Assignments created by teachers
CREATE TABLE IF NOT EXISTS assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    subject_id INT NOT NULL,
    class_id INT NOT NULL,
    due_date DATE NOT NULL,
    max_marks INT DEFAULT 100,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(id),
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Student submissions for assignments
CREATE TABLE IF NOT EXISTS submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    assignment_id INT NOT NULL,
    student_id INT NOT NULL,
    file_name VARCHAR(255),
    file_path VARCHAR(500),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    grade INT DEFAULT NULL,
    feedback TEXT DEFAULT NULL,
    FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);
