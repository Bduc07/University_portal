const express = require('express');
const router = express.Router();
const {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require('../controllers/teachersController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// Any logged-in user (student or admin) can read the teacher roster.
router.get('/', protect, getTeachers);
router.get('/:id', protect, getTeacherById);

// Only admins can manage teacher records.
router.post('/', protect, authorizeRoles('admin'), createTeacher);
router.put('/:id', protect, authorizeRoles('admin'), updateTeacher);
router.delete('/:id', protect, authorizeRoles('admin'), deleteTeacher);

module.exports = router;
