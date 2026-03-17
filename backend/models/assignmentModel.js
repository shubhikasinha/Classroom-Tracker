const db = require('./db');

const Assignment = {
  // Create a new assignment
  async createAssignment(data) {
    try {
      const [result] = await db.query(
        `INSERT INTO assignments (title, description, subject_id, class_id, due_date, max_marks, created_by)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [data.title, data.description, data.subject_id, data.class_id, data.due_date, data.max_marks, data.created_by]
      );
      return { id: result.insertId, ...data };
    } catch (error) {
      console.error('Error creating assignment:', error);
      throw error;
    }
  },

  // Get assignments by class
  async getAssignmentsByClass(classId) {
    try {
      const [rows] = await db.query(
        `SELECT a.*, s.name as subject_name, c.name as class_name, u.name as teacher_name,
                (SELECT COUNT(*) FROM submissions sub WHERE sub.assignment_id = a.id) as submission_count,
                (SELECT COUNT(*) FROM student_class sc WHERE sc.class_id = a.class_id) as total_students
         FROM assignments a
         JOIN subjects s ON a.subject_id = s.id
         JOIN classes c ON a.class_id = c.id
         JOIN users u ON a.created_by = u.id
         WHERE a.class_id = ?
         ORDER BY a.created_at DESC`,
        [classId]
      );
      return rows;
    } catch (error) {
      console.error('Error getting assignments by class:', error);
      throw error;
    }
  },

  // Get assignments for a student (based on their class)
  async getAssignmentsByStudent(studentId) {
    try {
      const [rows] = await db.query(
        `SELECT a.*, s.name as subject_name, c.name as class_name, u.name as teacher_name,
                sub.id as submission_id, sub.file_name, sub.submitted_at, sub.grade, sub.feedback
         FROM assignments a
         JOIN subjects s ON a.subject_id = s.id
         JOIN classes c ON a.class_id = c.id
         JOIN users u ON a.created_by = u.id
         JOIN student_class sc ON sc.class_id = a.class_id AND sc.student_id = ?
         LEFT JOIN submissions sub ON sub.assignment_id = a.id AND sub.student_id = ?
         ORDER BY a.due_date ASC`,
        [studentId, studentId]
      );
      return rows;
    } catch (error) {
      console.error('Error getting assignments for student:', error);
      throw error;
    }
  },

  // Submit an assignment
  async submitAssignment(data) {
    try {
      // Check if already submitted
      const [existing] = await db.query(
        'SELECT id FROM submissions WHERE assignment_id = ? AND student_id = ?',
        [data.assignment_id, data.student_id]
      );

      if (existing.length > 0) {
        // Update existing submission
        await db.query(
          `UPDATE submissions SET file_name = ?, file_path = ?, submitted_at = CURRENT_TIMESTAMP
           WHERE assignment_id = ? AND student_id = ?`,
          [data.file_name, data.file_path, data.assignment_id, data.student_id]
        );
        return { id: existing[0].id, updated: true };
      }

      const [result] = await db.query(
        `INSERT INTO submissions (assignment_id, student_id, file_name, file_path)
         VALUES (?, ?, ?, ?)`,
        [data.assignment_id, data.student_id, data.file_name, data.file_path]
      );
      return { id: result.insertId, updated: false };
    } catch (error) {
      console.error('Error submitting assignment:', error);
      throw error;
    }
  },

  // Get all submissions for an assignment
  async getSubmissions(assignmentId) {
    try {
      const [rows] = await db.query(
        `SELECT sub.*, u.name as student_name
         FROM submissions sub
         JOIN users u ON sub.student_id = u.id
         WHERE sub.assignment_id = ?
         ORDER BY u.name`,
        [assignmentId]
      );
      return rows;
    } catch (error) {
      console.error('Error getting submissions:', error);
      throw error;
    }
  },

  // Get a student's submission for an assignment
  async getStudentSubmission(assignmentId, studentId) {
    try {
      const [rows] = await db.query(
        `SELECT sub.*, u.name as student_name
         FROM submissions sub
         JOIN users u ON sub.student_id = u.id
         WHERE sub.assignment_id = ? AND sub.student_id = ?`,
        [assignmentId, studentId]
      );
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error getting student submission:', error);
      throw error;
    }
  },

  // Grade a submission
  async gradeSubmission(submissionId, grade, feedback) {
    try {
      await db.query(
        'UPDATE submissions SET grade = ?, feedback = ? WHERE id = ?',
        [grade, feedback, submissionId]
      );
      return { success: true };
    } catch (error) {
      console.error('Error grading submission:', error);
      throw error;
    }
  },

  // Get assignment by ID
  async getById(id) {
    try {
      const [rows] = await db.query(
        `SELECT a.*, s.name as subject_name, c.name as class_name, u.name as teacher_name
         FROM assignments a
         JOIN subjects s ON a.subject_id = s.id
         JOIN classes c ON a.class_id = c.id
         JOIN users u ON a.created_by = u.id
         WHERE a.id = ?`,
        [id]
      );
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error getting assignment by ID:', error);
      throw error;
    }
  }
};

module.exports = Assignment;
