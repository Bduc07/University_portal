const pool = require('../config/db');

// A user sees notifications addressed to them directly (user_id) or
// broadcast to their role (audience_role) — same scoping used everywhere
// else a request needs "what's relevant to req.user".
exports.getNotifications = async (req, res) => {
  const { id, role } = req.user;

  try {
    const [notifications] = await pool.query(
      `SELECT * FROM notifications WHERE user_id = ? OR audience_role = ?
       ORDER BY created_at DESC LIMIT 30`,
      [id, role]
    );
    const [[{ unreadCount }]] = await pool.query(
      `SELECT COUNT(*) AS unreadCount FROM notifications
       WHERE (user_id = ? OR audience_role = ?) AND is_read = 0`,
      [id, role]
    );

    res.json({ notifications, unreadCount });
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

exports.markRead = async (req, res) => {
  const { id, role } = req.user;
  const { id: notificationId } = req.params;

  try {
    await pool.query(
      'UPDATE notifications SET is_read = 1 WHERE id = ? AND (user_id = ? OR audience_role = ?)',
      [notificationId, id, role]
    );
    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    console.error('Error marking notification read:', err);
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
};

exports.markAllRead = async (req, res) => {
  const { id, role } = req.user;

  try {
    await pool.query(
      'UPDATE notifications SET is_read = 1 WHERE (user_id = ? OR audience_role = ?) AND is_read = 0',
      [id, role]
    );
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    console.error('Error marking all notifications read:', err);
    res.status(500).json({ error: 'Failed to mark all notifications as read' });
  }
};
