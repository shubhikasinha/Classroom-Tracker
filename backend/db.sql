-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS attendance_db;
USE attendance_db;

-- Users table (for both students and teachers)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('student', 'teacher') NOT NULL
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Student-Class mapping
CREATE TABLE IF NOT EXISTS student_class (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);

-- Attendance records
CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    class_id INT NOT NULL,
    date DATE NOT NULL,
    hours INT NOT NULL,
    status ENUM('present', 'absent') NOT NULL,
    marked_by INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (marked_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample data for testing

-- Insert classes
INSERT INTO classes (name) VALUES 
('CSE A'),
('CSE B');

-- Insert subjects
INSERT INTO subjects (name) VALUES 
('DBMS'),
('OS'),
('Data Structures'),
('Computer Networks');

-- Insert sample users (teachers and students)
-- Note: In a real application, passwords should be hashed
INSERT INTO users (username, password, name, role) VALUES
-- Teachers
('teacher1', 'password123', 'John Smith', 'teacher'),
('teacher2', 'password123', 'Jane Doe', 'teacher'),
-- Students
('student1', 'password123', 'Alice Johnson', 'student'),
('student2', 'password123', 'Bob Williams', 'student'),
('student3', 'password123', 'Charlie Brown', 'student'),
('student4', 'password123', 'Diana Miller', 'student'),
('student5', 'password123', 'Edward Davis', 'student'),
('student6', 'password123', 'Fiona Wilson', 'student'),
('student7', 'password123', 'George Moore', 'student'),
('student8', 'password123', 'Hannah Taylor', 'student'),
('student9', 'password123', 'Ian Anderson', 'student'),
('student10', 'password123', 'Julia Thomas', 'student');

-- Assign students to classes
INSERT INTO student_class (student_id, class_id) VALUES
(3, 1), -- Alice in Class A
(4, 1), -- Bob in Class A
(5, 1), -- Charlie in Class A
(6, 1), -- Diana in Class A
(7, 1), -- Edward in Class A
(8, 2), -- Fiona in Class B
(9, 2), -- George in Class B
(10, 2), -- Hannah in Class B
(11, 2), -- Ian in Class B
(12, 2); -- Julia in Class B

-- -- Insert some sample attendance records
-- INSERT INTO attendance (student_id, subject_id, class_id, date, hours, status, marked_by) VALUES
-- -- DBMS class on March 1, 2024 for Class A
-- (3, 1, 1, '2024-03-01', 4, 'present', 1),
-- (4, 1, 1, '2024-03-01', 4, 'present', 1),
-- (5, 1, 1, '2024-03-01', 4, 'present', 1),
-- (6, 1, 1, '2024-03-01', 4, 'present', 1),
-- (7, 1, 1, '2024-03-01', 4, 'absent', 1),

-- -- Web Development class on March 2, 2024 for Class A
-- (3, 2, 1, '2024-03-02', 4, 'present', 2),
-- (4, 2, 1, '2024-03-02', 4, 'present', 2),
-- (5, 2, 1, '2024-03-02', 4, 'absent', 2),
-- (6, 2, 1, '2024-03-02', 4, 'absent', 2),
-- (7, 2, 1, '2024-03-02', 4, 'absent', 2),

-- -- Data Structures class on March 3, 2024 for Class B
-- (8, 3, 2, '2024-03-03', 1, 'present', 1),
-- (9, 3, 2, '2024-03-03', 1, 'absent', 1),
-- (10, 3, 2, '2024-03-03', 1, 'absent', 1),
-- (11, 3, 2, '2024-03-03', 1, 'absent', 1),
-- (12, 3, 2, '2024-03-03', 1, 'absent', 1),

-- -- Computer Networks class on March 4, 2024 for Class B
-- (8, 4, 2, '2024-03-04', 1, 'present', 2),
-- (9, 4, 2, '2024-03-04', 1, 'absent', 2),
-- (10, 4, 2, '2024-03-04', 1, 'absent', 2),
-- (11, 4, 2, '2024-03-04', 1, 'absent', 2),
-- (12, 4, 2, '2024-03-04', 1, 'absent', 2);


create database attendance_db;

-- Create database if it doesn't exist

USE attendance_db;

-- Users table (for both students and teachers)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('student', 'teacher') NOT NULL
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Student-Class mapping
CREATE TABLE IF NOT EXISTS student_class (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);

-- Attendance records
CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    class_id INT NOT NULL,
    date DATE NOT NULL,
    hours INT NOT NULL,
    status ENUM('present', 'absent') NOT NULL,
    marked_by INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (marked_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert classes
INSERT INTO classes (name) VALUES 
('CSE A'),
('CSE B');

-- Insert subjects
INSERT INTO subjects (name) VALUES 
('Software Engineering'),
('Operating System'),
('Computer System Architecture'),
('Fundamentals of Data Analytics');

INSERT INTO users (username, password, name, role) VALUES
('ujjal_sur', 'fot@fot', 'Ujjal Sur', 'teacher'),
('juhi_jain', 'fot@fot', 'Juhi Jain', 'teacher'),
('unmesh_shukla', 'fot@fot', 'Unmesh Shukla', 'teacher'),
('sangeeta_yadav', 'fot@fot', 'Sangeeta Yadav', 'teacher');

INSERT INTO users (username, password, name, role) VALUES
('anubhav_pathania', 'fot@fot', 'Anubhav Pathania', 'student'),
('zeeya', 'fot@fot', 'Zeeya', 'student'),
('aditya_chauhan', 'fot@fot', 'Aditya Chauhan', 'student'),
('yanshu', 'fot@fot', 'Yanshu', 'student'),
('taufiq_ansari', 'fot@fot', 'Taufiq Ansari', 'student'),
('harsh_narayan', 'fot@fot', 'Harsh Narayan', 'student'),
('arham_khan', 'fot@fot', 'Arham Khan', 'student'),
('piyush_takrani', 'fot@fot', 'Piyush Takrani', 'student'),
('minaz_hussain', 'fot@fot', 'Minaz Hussain', 'student'),
('dhyey_bhanderi', 'fot@fot', 'Dhyey Bhanderi', 'student'),
('mohit', 'fot@fot', 'Mohit', 'student'),
('ashish_pal', 'fot@fot', 'Ashish Pal', 'student'),
('aryan_sachan', 'fot@fot', 'Aryan Sachan', 'student'),
('satya_prakash', 'fot@fot', 'Satya Prakash', 'student'),
('bhupathi_sai_charan', 'fot@fot', 'Bhupathi Sai Charan', 'student'),
('abhinav_meena', 'fot@fot', 'Abhinav Meena', 'student'),
('garvit_gupta', 'fot@fot', 'Garvit Gupta', 'student'),
('amritanshu_tiwari', 'fot@fot', 'Amritanshu Tiwari', 'student'),
('jhanvi_nagori', 'fot@fot', 'Jhanvi Nagori', 'student'),
('divyanshu_jha', 'fot@fot', 'Divyanshu Jha', 'student'),
('harsh_vardhan_singh', 'fot@fot', 'Harsh Vardhan Singh', 'student'),
('nikhil_chaudhary', 'fot@fot', 'Nikhil Chaudhary', 'student'),
('prayas', 'fot@fot', 'Prayas', 'student'),
('saksham_singhania', 'fot@fot', 'Saksham Singhania', 'student'),
('lakshay_chaudhary', 'fot@fot', 'Lakshay Chaudhary', 'student'),
('abhishek_tiwari', 'fot@fot', 'Abhishek Tiwari', 'student'),
('shivam_kumar', 'fot@fot', 'Shivam Kumar', 'student'),
('lakshya', 'fot@fot', 'Lakshya', 'student'),
('ashutosh_ranjan', 'fot@fot', 'Ashutosh Ranjan', 'student'),
('meghansh_kashyap', 'fot@fot', 'Meghansh Kashyap', 'student'),
('nikhil_kumar', 'fot@fot', 'Nikhil Kumar', 'student'),
('jenny_prasad', 'fot@fot', 'Jenny Prasad', 'student'),
('ibrahim_ibn_tanweer_almadani', 'fot@fot', 'Ibrahim Ibn Tanweer Almadani', 'student'),
('krishna_yadav', 'fot@fot', 'Krishna Yadav', 'student'),
('kamal_saloi', 'fot@fot', 'Kamal Saloi', 'student'),
('tejasvi', 'fot@fot', 'Tejasvi', 'student'),
('vikash_kumar', 'fot@fot', 'Vikash Kumar', 'student'),
('yugant_raj', 'fot@fot', 'Yugant Raj', 'student'),
('ruhaan_mohan', 'fot@fot', 'Ruhaan Mohan', 'student'),
('pankaj_kumar', 'fot@fot', 'Pankaj Kumar', 'student'),
('pankaj', 'fot@fot', 'Pankaj', 'student'),
('jatin_kumar', 'fot@fot', 'Jatin Kumar', 'student'),
('astha_chauhan', 'fot@fot', 'Astha Chauhan', 'student'),
('sapavath_hanumanth', 'fot@fot', 'Sapavath Hanumanth', 'student'),
('khush_deep_singh', 'fot@fot', 'Khush Deep Singh', 'student'),
('tamanna_sharma', 'fot@fot', 'Tamanna Sharma', 'student'),
('abeer_bartaria', 'fot@fot', 'Abeer Bartaria', 'student'),
('raghav_mudgal', 'fot@fot', 'Raghav Mudgal', 'student'),
('yashika', 'fot@fot', 'Yashika', 'student'),
('rishabh_dev_prasad', 'fot@fot', 'Rishabh Dev Prasad', 'student'),
('bryan_debbarma', 'fot@fot', 'Bryan Debbarma', 'student'),
('arnav_gupta', 'fot@fot', 'Arnav Gupta', 'student'),
('shubhika_sinha', 'fot@fot', 'Shubhika Sinha', 'student'),
('gurhans_grover', 'fot@fot', 'Gurhans Grover', 'student'),
('aashrut_sharma', 'fot@fot', 'Aashrut Sharma', 'student');

INSERT INTO student_class (student_id, class_id) VALUES
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1),
(25, 1),
(26, 1),
(27, 1),
(28, 1),
(29, 1),
(30, 1),
(31, 1),
(32, 1),
(33, 1),
(34, 1),
(35, 1),
(36, 1),
(37, 1),
(38, 1),
(39, 1),
(40, 1),
(41, 1),
(42, 1),
(43, 1),
(44, 1),
(45, 1),
(46, 1),
(47, 1),
(48, 1),
(49, 1),
(50, 1),
(51, 1),
(52, 1),
(53, 1),
(54, 1),
(55, 1),
(56, 1),
(57, 1),
(58, 1),
(59, 1),
(60, 1),
(61, 1),
(62, 1),
(63, 1),
(64, 1),
(65, 1),
(66, 1),
(67, 1),
(68, 1);

INSERT INTO users (username, password, name, role) VALUES
('jai_kansal', 'fot@fot', 'Jai Kansal', 'student'),
('shaurya_kumar', 'fot@fot', 'Shaurya Kumar', 'student'),
('animesh_kumar', 'fot@fot', 'Animesh Kumar', 'student'),
('akshat', 'fot@fot', 'Akshat', 'student'),
('shaurya_aggarwal', 'fot@fot', 'Shaurya Aggarwal', 'student'),
('debojyoti_roy', 'fot@fot', 'Debojyoti Roy', 'student'),
('deepali_talreja', 'fot@fot', 'Deepali Talreja', 'student'),
('shriyam_baloni', 'fot@fot', 'Shriyam Baloni', 'student'),
('ayush_kumar_singh', 'fot@fot', 'Ayush Kumar Singh', 'student'),
('abhinav_yadav', 'fot@fot', 'Abhinav Yadav', 'student'),
('hemant', 'fot@fot', 'Hemant', 'student'),
('nishchay_kumar_arya', 'fot@fot', 'Nishchay Kumar Arya', 'student'),
('harsh_verma', 'fot@fot', 'Harsh Verma', 'student'),
('harsh', 'fot@fot', 'Harsh', 'student'),
('venkatesh_rathod', 'fot@fot', 'Venkatesh Rathod', 'student'),
('jitesh_chakma', 'fot@fot', 'Jitesh Chakma', 'student'),
('yash_raj_singh', 'fot@fot', 'Yash Raj Singh', 'student'),
('boloram_roy', 'fot@fot', 'Boloram Roy', 'student'),
('pratyush_negi', 'fot@fot', 'Pratyush Negi', 'student'),
('humendra_narayan', 'fot@fot', 'Humendra Narayan', 'student'),
('mradul_kumar_saini', 'fot@fot', 'Mradul Kumar Saini', 'student'),
('ronit_jaiswal', 'fot@fot', 'Ronit Jaiswal', 'student'),
('anish_kumar', 'fot@fot', 'Anish Kumar', 'student'),
('suzain', 'fot@fot', 'Suzain', 'student'),
('vishank_saini', 'fot@fot', 'Vishank Saini', 'student'),
('mohit_jayant', 'fot@fot', 'Mohit Jayant', 'student'),
('akash_seju', 'fot@fot', 'Akash Seju', 'student'),
('sumit_kumar', 'fot@fot', 'Sumit Kumar', 'student'),
('kanishq_gautam', 'fot@fot', 'Kanishq Gautam', 'student'),
('vishal_kumar', 'fot@fot', 'Vishal Kumar', 'student'),
('priyanshu', 'fot@fot', 'Priyanshu', 'student'),
('priyanshi_meena', 'fot@fot', 'Priyanshi Meena', 'student'),
('killo_ajay_kiran', 'fot@fot', 'Killo Ajay Kiran', 'student'),
('guguloth_vinay_kumar', 'fot@fot', 'Guguloth Vinay Kumar', 'student'),
('radhika_sharma', 'fot@fot', 'Radhika Sharma', 'student'),
('deepak_kumar', 'fot@fot', 'Deepak Kumar', 'student'),
('jatin_chahar', 'fot@fot', 'Jatin Chahar', 'student'),
('avi_pandey', 'fot@fot', 'Avi Pandey', 'student'),
('nishant_gupta', 'fot@fot', 'Nishant Gupta', 'student'),
('ayush_mahlawat', 'fot@fot', 'Ayush Mahlawat', 'student'),
('sahil_kumar', 'fot@fot', 'Sahil Kumar', 'student'),
('harshit_yadav', 'fot@fot', 'Harshit Yadav', 'student'),
('sani_yadav', 'fot@fot', 'Sani Yadav', 'student'),
('brijesh_kumar_morya', 'fot@fot', 'Brijesh Kumar Morya', 'student'),
('ashish_patel', 'fot@fot', 'Ashish Patel', 'student'),
('aman_kumar', 'fot@fot', 'Aman Kumar', 'student'),
('mohd_zuhaib', 'fot@fot', 'Mohd. Zuhaib', 'student'),
('aishwarya_dhanda', 'fot@fot', 'Aishwarya Dhanda', 'student'),
('shreya_jaisal', 'fot@fot', 'Shreya Jaisal', 'student'),
('rohit_sunil_jambhulkar', 'fot@fot', 'Rohit Sunil Jambhulkar', 'student'),
('alakshendra_vasisht', 'fot@fot', 'Alakshendra Vasisht', 'student'),
('abhay_netam', 'fot@fot', 'Abhay Netam', 'student'),
('nizamuddin', 'fot@fot', 'Nizamuddin', 'student'),
('priyanshu_2', 'fot@fot', 'Priyanshu', 'student'),
('sneha_gupta', 'fot@fot', 'Sneha Gupta', 'student'),
('shubham_sharma', 'fot@fot', 'Shubham Sharma', 'student'),
('jas_simarjeet_singh', 'fot@fot', 'Jas Simarjeet Singh', 'student'),
('ishchit_singh', 'fot@fot', 'Ishchit Singh', 'student'),
('vartika_garg', 'fot@fot', 'Vartika Garg', 'student'),
('arshdeep_singh', 'fot@fot', 'Arshdeep Singh', 'student'),
('tushar_chopra', 'fot@fot', 'Tushar Chopra', 'student'),
('akaksha_singh', 'fot@fot', 'Akaksha Singh', 'student'),
('aditya_aggarwal', 'fot@fot', 'Aditya Aggarwal', 'student'),
('dhairya_jain', 'fot@fot', 'Dhairya Jain', 'student'),
('pranjal_gupta', 'fot@fot', 'Pranjal Gupta', 'student'),
('jaydeep_gupta', 'fot@fot', 'Jaydeep Gupta', 'student'),
('siddhi_srivastava', 'fot@fot', 'Siddhi Srivastava', 'student');

INSERT INTO student_class (student_id, class_id) VALUES
(68, 2),
(69, 2),
(70, 2),
(71, 2),
(72, 2),
(73, 2),
(74, 2),
(75, 2),
(76, 2),
(77, 2),
(78, 2),
(79, 2),
(80, 2),
(81, 2),
(82, 2),
(83, 2),
(84, 2),
(85, 2),
(86, 2),
(87, 2),
(88, 2),
(89, 2),
(90, 2),
(91, 2),
(92, 2),
(93, 2),
(94, 2),
(95, 2),
(96, 2),
(97, 2),
(98, 2),
(99, 2),
(100, 2),
(101, 2),
(102, 2),
(103, 2),
(104, 2),
(105, 2),
(106, 2),
(107, 2),
(108, 2),
(109, 2),
(110, 2),
(111, 2),
(112, 2),
(113, 2),
(114, 2),
(115, 2),
(116, 2),
(117, 2),
(118, 2),
(119, 2),
(120, 2),
(121, 2),
(122, 2),
(123, 2),
(124, 2),
(125, 2),
(126, 2),
(127, 2),
(128, 2),
(129, 2);

INSERT INTO student_class (student_id, class_id)
SELECT id, 1 FROM users
WHERE id BETWEEN 5 AND 68 AND role = 'student';

INSERT INTO student_class (student_id, class_id)
SELECT id, 1 FROM users
WHERE id BETWEEN 68 AND 129 AND role = 'student';

