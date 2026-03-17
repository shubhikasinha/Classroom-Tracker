const User = require('../models/userModel');
const ClassSubject = require('../models/classSubjectModel');
const Attendance = require('../models/attendanceModel');

// Get all classes for dropdown
const getAllClasses = async (req, res) => {
  try {
    // Add cache control headers
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    const classes = await ClassSubject.getAllClasses();
    // console.log('Sending classes to frontend:', classes);
    res.status(200).json(classes);
  } catch (error) {
    console.error('Error getting classes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all subjects for dropdown
const getAllSubjects = async (req, res) => {
  try {
    // Add cache control headers
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    const subjects = await ClassSubject.getAllSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    console.error('Error getting subjects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get students by class
const getStudentsByClass = async (req, res) => {
  try {
    const classId = req.params.classId;
    
    // Get class details
    const classDetails = await ClassSubject.getClassById(classId);
    if (!classDetails) {
      return res.status(404).json({ message: 'Class not found' });
    }
    
    // Get students in the class
    const students = await User.getStudentsByClass(classId);
    
    res.status(200).json({
      class: classDetails,
      students
    });
  } catch (error) {
    console.error('Error getting students by class:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark attendance for students
const markAttendance = async (req, res) => {
  try {
    const { classId, subjectId, date, hours, students, teacherId } = req.body;
    
    // Validate input
    if (!classId || !subjectId || !date || !hours || !students || !teacherId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Prepare attendance records
    const attendanceRecords = students.map(student => ({
      student_id: student.id,
      subject_id: subjectId,
      class_id: classId,
      date,
      hours,
      status: student.present ? 'present' : 'absent',
      marked_by: teacherId
    }));
    
    // Save attendance records
    await Attendance.markAttendance(attendanceRecords);
    
    res.status(200).json({ 
      message: 'Attendance marked successfully',
      presentCount: students.filter(s => s.present).length,
      totalCount: students.length
    });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// View attendance records
const viewAttendance = async (req, res) => {
  try {
    const { classId, subjectId, date } = req.query;
    
    // Validate input
    if (!classId || !subjectId || !date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Get attendance records
    const records = await Attendance.getAttendanceByClassSubjectDate(classId, subjectId, date);
    
    res.status(200).json(records);
  } catch (error) {
    console.error('Error viewing attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllClasses,
  getAllSubjects,
  getStudentsByClass,
  markAttendance,
  viewAttendance
}; 