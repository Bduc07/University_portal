const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const pool = require('./config/db');

function initSocket(httpServer, corsOptions) {
  const io = new Server(httpServer, { cors: corsOptions });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('No token provided'));
    try {
      socket.user = jwt.verify(token, process.env.JWT_SECRET); // { id, name, role }
      next();
    } catch (err) {
      next(new Error('Invalid or expired token'));
    }
  });

  io.on('connection', (socket) => {
    const { id, role } = socket.user;

    if (role === 'student') {
      socket.join(`student-${id}`);
    } else if (role === 'admin') {
      socket.join('admins');
    }

    // Admin opens a specific student's thread — join that room to receive
    // live messages while it's open (students are already in their own room).
    socket.on('join_conversation', (studentId) => {
      if (role === 'admin' || String(id) === String(studentId)) {
        socket.join(`student-${studentId}`);
      }
    });

    socket.on('send_message', async ({ studentId, text }) => {
      if (!text || !text.trim()) return;
      if (role !== 'admin' && role !== 'student') return;

      const targetStudentId = role === 'student' ? id : studentId;
      if (!targetStudentId) return;
      // A student can only send into their own thread.
      if (role === 'student' && String(id) !== String(targetStudentId)) return;

      try {
        const [result] = await pool.query(
          'INSERT INTO messages (student_id, sender_id, sender_role, message_text) VALUES (?, ?, ?, ?)',
          [targetStudentId, id, role, text.trim()]
        );

        const message = {
          id: result.insertId,
          student_id: Number(targetStudentId),
          sender_id: id,
          sender_role: role,
          sender_name: socket.user.name,
          message_text: text.trim(),
          created_at: new Date().toISOString(),
        };

        io.to(`student-${targetStudentId}`).emit('new_message', message);
        // So an admin's conversation list updates even if that thread isn't open.
        io.to('admins').emit('new_message', message);
      } catch (err) {
        console.error('Error saving chat message:', err);
        socket.emit('message_error', { error: 'Failed to send message' });
      }
    });
  });

  return io;
}

module.exports = { initSocket };
