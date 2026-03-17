const Attendance = require('../models/attendanceModel');
const ClassSubject = require('../models/classSubjectModel');

// Get attendance summary for a student
const getAttendanceSummary = async (req, res) => {
  try {
    const studentId = req.params.id;
    
    // Get attendance summary
    const summary = await Attendance.getAttendanceSummary(studentId);
    
    res.status(200).json(summary);
  } catch (error) {
    console.error('Error getting attendance summary:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get detailed attendance for a student by subject
const getSubjectAttendance = async (req, res) => {
  try {
    const { studentId, subjectId } = req.params;
    
    // Get subject details
    const subject = await ClassSubject.getSubjectById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    
    // Get attendance records
    const attendance = await Attendance.getStudentAttendance(studentId, subjectId);
    
    // Format the response
    const formattedAttendance = attendance.map(record => ({
      date: record.date,
      hours: record.hours,
      status: record.status,
      subject_name: record.subject_name
    }));
    
    // Calculate total hours and attended hours
    const totalHours = attendance.reduce((sum, record) => sum + record.hours, 0);
    const attendedHours = attendance.reduce((sum, record) => 
      record.status === 'present' ? sum + record.hours : sum, 0);
    
    res.status(200).json({
      subject: subject.name,
      attendance: formattedAttendance,
      summary: {
        totalHours,
        attendedHours,
        percentage: totalHours > 0 ? Math.round((attendedHours / totalHours) * 100) : 0
      }
    });
  } catch (error) {
    console.error('Error getting subject attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all subjects for dropdown
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await ClassSubject.getAllSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    console.error('Error getting subjects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAttendanceSummary,
  getSubjectAttendance,
  getAllSubjects
}; 