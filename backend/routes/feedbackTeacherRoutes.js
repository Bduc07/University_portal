// In routes/feedbackTeacherRoutes.js
const express = require('express');
const router = express.Router();
const { getQuestions, addQuestion, editQuestion, deleteQuestion, getFeedbackForTeacher } = require('../controllers/feedbackTeacherController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

router.get('/feedback-teacher', protect, authorizeRoles('admin'), getQuestions);
router.post('/feedback-teacher', protect, authorizeRoles('admin'), addQuestion);
router.put('/feedback-teacher/:id', protect, authorizeRoles('admin'), editQuestion);
router.delete('/feedback-teacher/:id', protect, authorizeRoles('admin'), deleteQuestion);
router.get('/feedback/teacher/:teacherId', protect, authorizeRoles('admin'), getFeedbackForTeacher);

module.exports = router;