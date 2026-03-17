const db = require('./db');

const User = {
  // Find user by username
  async findByUsername(username) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw error;
    }
  },

  // Get user by ID
  async findById(id) {
    try {
      const [rows] = await db.query(
        'SELECT id, username, name, role FROM users WHERE id = ?',
        [id]
      );
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  },

  // Get all students in a class
  async getStudentsByClass(classId) {
    try {
      const [rows] = await db.query(
        `SELECT u.id, u.name 
         FROM users u
         JOIN student_class sc ON u.id = sc.student_id
         WHERE sc.class_id = ? AND u.role = 'student'
         ORDER BY u.name`,
        [classId]
      );
      return rows;
    } catch (error) {
      console.error('Error getting students by class:', error);
      throw error;
    }
  }
};

module.exports = User; 