const express = require('express');
const router = express.Router();
const { getConversations, getMessages } = require('../controllers/messagesController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

router.get('/conversations', protect, authorizeRoles('admin'), getConversations);
router.get('/:studentId', protect, getMessages);

module.exports = router;
