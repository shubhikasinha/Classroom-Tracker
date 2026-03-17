const db = require('./db');

const Attendance = {
  // Get student's attendance for a specific subject
  async getStudentAttendance(studentId, subjectId) {
    try {
      const [rows] = await db.query(
        `SELECT 
          a.date, 
          a.hours, 
          a.status,
          s.name as subject_name
        FROM attendance a
        JOIN subjects s ON a.subject_id = s.id
        WHERE a.student_id = ? AND a.subject_id = ?
        ORDER BY a.date DESC`,
        [studentId, subjectId]
      );
      return rows;
    } catch (error) {
      console.error('Error getting student attendance:', error);
      throw error;
    }
  },

  // Get attendance summary for a student by subject
  async getAttendanceSummary(studentId) {
    try {
      const [rows] = await db.query(
        `SELECT 
          s.id as subject_id,
          s.name as subject_name,
          SUM(CASE WHEN a.status = 'present' THEN a.hours ELSE 0 END) as hours_present,
          SUM(a.hours) as total_hours
        FROM subjects s
        LEFT JOIN attendance a ON s.id = a.subject_id AND a.student_id = ?
        GROUP BY s.id, s.name`,
        [studentId]
      );
      return rows;
    } catch (error) {
      console.error('Error getting attendance summary:', error);
      throw error;
    }
  },

  // Mark attendance for multiple students
  async markAttendance(attendanceData) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      
      for (const record of attendanceData) {
        await connection.query(
          `INSERT INTO attendance 
            (student_id, subject_id, class_id, date, hours, status, marked_by)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            record.student_id,
            record.subject_id,
            record.class_id,
            record.date,
            record.hours,
            record.status,
            record.marked_by
          ]
        );
      }
      
      await connection.commit();
      return { success: true };
    } catch (error) {
      await connection.rollback();
      console.error('Error marking attendance:', error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Get attendance records by class, subject, and date
  async getAttendanceByClassSubjectDate(classId, subjectId, date) {
    try {
      const [rows] = await db.query(
        `SELECT 
          a.id,
          a.student_id,
          u.name as student_name,
          a.status,
          a.hours,
          a.date
        FROM attendance a
        JOIN users u ON a.student_id = u.id
        WHERE a.class_id = ? AND a.subject_id = ? AND a.date = ?
        ORDER BY u.name`,
        [classId, subjectId, date]
      );
      return rows;
    } catch (error) {
      console.error('Error getting attendance by class, subject, and date:', error);
      throw error;
    }
  }
};

module.exports = Attendance; 