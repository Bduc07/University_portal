const pool = require('../config/db');

// Admin only: one row per student who has an active conversation, with the
// last message preview and how many are unread (from the student's side).
exports.getConversations = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.id AS student_id, u.name AS student_name,
             m.message_text AS last_message, m.created_at AS last_message_at, m.sender_role AS last_sender_role,
             (SELECT COUNT(*) FROM messages WHERE student_id = u.id AND sender_role = 'student' AND is_read = 0) AS unread_count
      FROM messages m
      JOIN users u ON u.id = m.student_id
      INNER JOIN (
        SELECT student_id, MAX(created_at) AS max_created_at
        FROM messages
        GROUP BY student_id
      ) latest ON latest.student_id = m.student_id AND latest.max_created_at = m.created_at
      ORDER BY m.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching conversations:', err);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
};

// Self (student) or admin: full message history for one student's thread.
exports.getMessages = async (req, res) => {
  const { studentId } = req.params;

  if (req.user.role !== 'admin' && String(req.user.id) !== studentId) {
    return res.status(403).json({ error: 'Not authorized to view this conversation' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT m.id, m.student_id, m.sender_id, m.sender_role, m.message_text, m.created_at, u.name AS sender_name
       FROM messages m
       JOIN users u ON u.id = m.sender_id
       WHERE m.student_id = ?
       ORDER BY m.created_at ASC`,
      [studentId]
    );

    // Mark the student's messages read now that an admin has opened the thread.
    if (req.user.role === 'admin') {
      await pool.query(
        'UPDATE messages SET is_read = 1 WHERE student_id = ? AND sender_role = "student" AND is_read = 0',
        [studentId]
      );
    }

    res.json(rows);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
