const pool = require('../config/db');

exports.getHistory = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, student_id, role, content, created_at FROM ai_chat_messages WHERE student_id = ? ORDER BY created_at ASC',
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching AI chat history:', err);
    res.status(500).json({ error: 'Failed to fetch AI chat history' });
  }
};
