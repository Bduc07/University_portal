const express = require('express');
const router = express.Router();
const { getHistory } = require('../controllers/aiChatController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

router.get('/', protect, authorizeRoles('student'), getHistory);

module.exports = router;
