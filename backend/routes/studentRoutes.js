const express = require('express');
const pool = require('../config/db');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
const router = express.Router();

const SAFE_COLUMNS = 'id, name, email, phone_number, gender, role, course, created_at';

// Fetch all students (admin only)
router.get('/', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const [students] = await pool.query(`SELECT ${SAFE_COLUMNS} FROM users WHERE role = "student"`);

    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    }

    res.json(students);
  } catch (err) {
    console.error('🔥 Error fetching students:', err);
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Fetch a single student by ID — the student themselves, or an admin
router.get('/:id', protect, async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'admin' && String(req.user.id) !== id) {
    return res.status(403).json({ message: 'Not authorized to view this student' });
  }

  try {
    const [student] = await pool.query(`SELECT ${SAFE_COLUMNS} FROM users WHERE id = ? AND role = "student"`, [id]);

    if (student.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student[0]);
  } catch (err) {
    console.error('🔥 Error fetching student by ID:', err);
    res.status(500).json({ message: 'Error fetching student' });
  }
});

// Update student details — the student themselves, or an admin
router.put('/:id', protect, async (req, res) => {
  const { id } = req.params;
  const { name, email, phone_number } = req.body;

  if (req.user.role !== 'admin' && String(req.user.id) !== id) {
    return res.status(403).json({ message: 'Not authorized to update this student' });
  }

  if (!name || !email || !phone_number) {
    return res.status(400).json({ error: 'All fields must be filled' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE users SET name = ?, email = ?, phone_number = ? WHERE id = ? AND role = "student"',
      [name, email, phone_number, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student details updated successfully' });
  } catch (err) {
    console.error('Error updating student details:', err);
    res.status(500).json({ message: 'Error updating student details' });
  }
});

// Delete a student (admin only)
router.delete('/:id', protect, authorizeRoles('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = ? AND role = "student"', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ message: 'Error deleting student' });
  }
});

module.exports = router;
