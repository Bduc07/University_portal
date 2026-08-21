// Inserts a notification row and pushes it live over the same Socket.io
// rooms socket.js already joins sockets to (student-<id> / admins).
async function notify(pool, io, { userId, audienceRole, type, title, body, link }) {
  const [result] = await pool.query(
    'INSERT INTO notifications (user_id, audience_role, type, title, body, link) VALUES (?, ?, ?, ?, ?, ?)',
    [userId ?? null, audienceRole ?? null, type, title, body ?? null, link ?? null]
  );

  const notification = {
    id: result.insertId,
    user_id: userId ?? null,
    audience_role: audienceRole ?? null,
    type,
    title,
    body: body ?? null,
    link: link ?? null,
    is_read: 0,
    created_at: new Date().toISOString(),
  };

  const room = userId ? `student-${userId}` : 'admins';
  io.to(room).emit('new_notification', notification);
}

module.exports = { notify };
