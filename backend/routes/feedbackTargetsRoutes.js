const express = require('express');
const router = express.Router();
const { getFeedbackTargets } = require('../controllers/feedbackTargetsController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

router.get('/feedback-targets', protect, authorizeRoles('admin'), getFeedbackTargets);

module.exports = router;