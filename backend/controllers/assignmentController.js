const Assignment = require('../models/assignmentModel');
const ClassSubject = require('../models/classSubjectModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.pdf', '.doc', '.docx', '.txt', '.zip', '.rar', '.jpg', '.jpeg', '.png', '.pptx', '.xlsx'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('File type not allowed'), false);
        }
    }
});

// Create a new assignment
const createAssignment = async (req, res) => {
    try {
        const { title, description, subject_id, class_id, due_date, max_marks, created_by } = req.body;

        if (!title || !subject_id || !class_id || !due_date || !created_by) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const assignment = await Assignment.createAssignment({
            title,
            description: description || '',
            subject_id,
            class_id,
            due_date,
            max_marks: max_marks || 100,
            created_by
        });

        res.status(201).json({ message: 'Assignment created successfully', assignment });
    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get assignments by class
const getAssignmentsByClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const assignments = await Assignment.getAssignmentsByClass(classId);
        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error getting assignments:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get assignments for a student
const getAssignmentsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const assignments = await Assignment.getAssignmentsByStudent(studentId);
        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error getting student assignments:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Submit an assignment (with file upload)
const submitAssignment = async (req, res) => {
    try {
        const { assignment_id, student_id } = req.body;

        if (!assignment_id || !student_id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const submissionData = {
            assignment_id,
            student_id,
            file_name: req.file ? req.file.originalname : null,
            file_path: req.file ? req.file.filename : null
        };

        const result = await Assignment.submitAssignment(submissionData);
        res.status(200).json({
            message: result.updated ? 'Submission updated successfully' : 'Assignment submitted successfully',
            submission: result
        });
    } catch (error) {
        console.error('Error submitting assignment:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all submissions for an assignment
const getSubmissions = async (req, res) => {
    try {
        const { id } = req.params;
        const submissions = await Assignment.getSubmissions(id);
        const assignment = await Assignment.getById(id);
        res.status(200).json({ assignment, submissions });
    } catch (error) {
        console.error('Error getting submissions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a student's submission
const getStudentSubmission = async (req, res) => {
    try {
        const { assignmentId, studentId } = req.params;
        const submission = await Assignment.getStudentSubmission(assignmentId, studentId);
        res.status(200).json(submission);
    } catch (error) {
        console.error('Error getting student submission:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Grade a submission
const gradeSubmission = async (req, res) => {
    try {
        const { submissionId, grade, feedback } = req.body;

        if (!submissionId || grade === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        await Assignment.gradeSubmission(submissionId, grade, feedback || '');
        res.status(200).json({ message: 'Submission graded successfully' });
    } catch (error) {
        console.error('Error grading submission:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createAssignment,
    getAssignmentsByClass,
    getAssignmentsByStudent,
    submitAssignment,
    getSubmissions,
    getStudentSubmission,
    gradeSubmission,
    upload
};
