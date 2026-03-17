const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Get all classes for dropdown
router.get('/classes', teacherController.getAllClasses);

// Get all subjects for dropdown
router.get('/subjects', teacherController.getAllSubjects);

// Get students by class
router.get('/class/:classId/students', teacherController.getStudentsByClass);

// Mark attendance
router.post('/attendance/mark', teacherController.markAttendance);

// View attendance
router.get('/attendance/view', teacherController.viewAttendance);

module.exports = router; 