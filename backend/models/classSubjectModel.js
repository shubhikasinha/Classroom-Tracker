const db = require('./db');

const ClassSubject = {
  // Get all classes
  async getAllClasses() {
    try {
      const [rows] = await db.query('SELECT * FROM classes ORDER BY name');
      return rows;
    } catch (error) {
      console.error('Error getting all classes:', error);
      throw error;
    }
  },

  // Get all subjects
  async getAllSubjects() {
    try {
      const [rows] = await db.query('SELECT * FROM subjects ORDER BY name');
      return rows;
    } catch (error) {
      console.error('Error getting all subjects:', error);
      throw error;
    }
  },

  // Get class by ID
  async getClassById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM classes WHERE id = ?', [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error getting class by ID:', error);
      throw error;
    }
  },

  // Get subject by ID
  async getSubjectById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM subjects WHERE id = ?', [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error getting subject by ID:', error);
      throw error;
    }
  }
};

module.exports = ClassSubject; 