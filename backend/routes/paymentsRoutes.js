const express = require('express');
const router = express.Router();
const {
  initiatePayment,
  handleSuccess,
  handleFailure,
  checkAccess,
  getSalesAnalytics,
} = require('../controllers/paymentsController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

router.post('/initiate', protect, authorizeRoles('student'), initiatePayment);
router.get('/access/:courseId', protect, authorizeRoles('student'), checkAccess);
router.get('/analytics', protect, authorizeRoles('admin'), getSalesAnalytics);

// eSewa redirects the student's browser here directly (no JWT header on a
// plain navigation) — these two must stay public. Trust comes from the
// signed callback + the server-to-server status check, not from auth.
router.get('/success', handleSuccess);
router.get('/failure', handleFailure);

module.exports = router;
