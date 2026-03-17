const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Get attendance summary for a student
router.get('/attendance/summary/:id', studentController.getAttendanceSummary);

// Get detailed attendance for a student by subject
router.get('/attendance/:studentId/subject/:subjectId', studentController.getSubjectAttendance);

// Get all subjects for dropdown
router.get('/subjects', studentController.getAllSubjects);

module.exports = router; 