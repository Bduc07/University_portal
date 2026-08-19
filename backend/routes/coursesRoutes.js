const express = require('express');
const router = express.Router();
const { getCourses, addCourse, editCourse, deleteCourse } = require('../controllers/coursesController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

router.get('/courses', protect, authorizeRoles('admin'), getCourses);
router.post('/courses', protect, authorizeRoles('admin'), addCourse);
router.put('/courses/:id', protect, authorizeRoles('admin'), editCourse);
router.delete('/courses/:id', protect, authorizeRoles('admin'), deleteCourse);

module.exports = router;