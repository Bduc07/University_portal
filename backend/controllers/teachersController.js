const bcrypt = require('bcrypt');
const pool = require('../config/db');

exports.getTeachers = async (req, res) => {
  try {
    const [teachers] = await pool.query('SELECT id, name, email, course FROM users WHERE role = "teacher"');
    res.json(teachers);
  } catch (err) {
    console.error('Error fetching teachers:', err);
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
};

exports.getTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const [teacher] = await pool.query('SELECT id, name, email, course FROM users WHERE id = ? AND role = "teacher"', [id]);
    if (teacher.length === 0) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(teacher[0]);
  } catch (err) {
    console.error('Error fetching teacher:', err);
    res.status(500).json({ error: 'Failed to fetch teacher' });
  }
};

exports.createTeacher = async (req, res) => {
  const { name, email, password, course } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are required' });
  }
  if (!email.endsWith('@university.com')) {
    return res.status(400).json({ error: 'Teacher emails must end with @university.com' });
  }

  try {
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'A user with this email already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role, course) VALUES (?, ?, ?, "teacher", ?)',
      [name, email, hashed, course || null]
    );

    res.status(201).json({ id: result.insertId, name, email, course: course || null });
  } catch (err) {
    console.error('Error creating teacher:', err);
    res.status(500).json({ error: 'Failed to create teacher' });
  }
};

exports.updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, email, course } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  if (!email.endsWith('@university.com')) {
    return res.status(400).json({ error: 'Teacher emails must end with @university.com' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE users SET name = ?, email = ?, course = ? WHERE id = ? AND role = "teacher"',
      [name, email, course || null, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json({ message: 'Teacher updated successfully' });
  } catch (err) {
    console.error('Error updating teacher:', err);
    res.status(500).json({ error: 'Failed to update teacher' });
  }
};

exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ? AND role = "teacher"', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    console.error('Error deleting teacher:', err);
    res.status(500).json({ error: 'Failed to delete teacher' });
  }
};
