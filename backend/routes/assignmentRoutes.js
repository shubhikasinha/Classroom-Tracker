const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

// Create a new assignment (teacher)
router.post('/create', assignmentController.createAssignment);

// Get assignments by class
router.get('/class/:classId', assignmentController.getAssignmentsByClass);

// Get assignments for a student
router.get('/student/:studentId', assignmentController.getAssignmentsByStudent);

// Submit an assignment (student) - with file upload
router.post('/submit', assignmentController.upload.single('file'), assignmentController.submitAssignment);

// Get all submissions for an assignment (teacher)
router.get('/:id/submissions', assignmentController.getSubmissions);

// Get a student's submission for an assignment
router.get('/:assignmentId/submission/:studentId', assignmentController.getStudentSubmission);

// Grade a submission (teacher)
router.post('/grade', assignmentController.gradeSubmission);

module.exports = router;
