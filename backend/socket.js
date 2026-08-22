const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const Anthropic = require('@anthropic-ai/sdk');
const pool = require('./config/db');
const { notify } = require('./utils/notify');
const anthropic = require('./utils/anthropicClient');

const AI_SYSTEM_PROMPT = (course) =>
  `You are a friendly, encouraging study assistant for a university's online course platform. ` +
  `This student is enrolled in '${course || 'their course'}'. Explain concepts clearly with examples, ` +
  `and keep answers focused. Guide the student toward understanding rather than doing graded work for ` +
  `them — if asked to complete an assignment or quiz outright, help them reason through it instead of ` +
  `giving the final answer.`;

let ioInstance = null;

// Lets REST controllers (e.g. payments) emit socket events too, not just
// the socket handlers in this file.
function getIO() {
  return ioInstance;
}

function initSocket(httpServer, corsOptions) {
  const io = new Server(httpServer, { cors: corsOptions });
  ioInstance = io;

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

        if (role === 'student') {
          await notify(pool, io, {
            audienceRole: 'admin',
            type: 'message',
            title: `New message from ${socket.user.name}`,
            body: text.trim(),
            link: '/admin/messages',
          });
        } else {
          await notify(pool, io, {
            userId: targetStudentId,
            type: 'message',
            title: 'New message from Admin',
            body: text.trim(),
            link: '/messages',
          });
        }
      } catch (err) {
        console.error('Error saving chat message:', err);
        socket.emit('message_error', { error: 'Failed to send message' });
      }
    });

    socket.on('ask_ai', async ({ text }) => {
      if (role !== 'student' || !text || !text.trim()) return;
      const question = text.trim();

      try {
        const [userInsert] = await pool.query(
          'INSERT INTO ai_chat_messages (student_id, role, content) VALUES (?, "user", ?)',
          [id, question]
        );
        io.to(`student-${id}`).emit('ai_chat_message', {
          id: userInsert.insertId,
          student_id: id,
          role: 'user',
          content: question,
          created_at: new Date().toISOString(),
        });

        const [history] = await pool.query(
          `SELECT role, content FROM ai_chat_messages WHERE student_id = ?
           ORDER BY created_at DESC LIMIT 20`,
          [id]
        );
        const messages = history.reverse().map((row) => ({ role: row.role, content: row.content }));

        const [[student]] = await pool.query('SELECT course FROM users WHERE id = ?', [id]);

        const stream = anthropic.messages.stream({
          model: 'claude-opus-5',
          max_tokens: 4096,
          output_config: { effort: 'medium' },
          system: AI_SYSTEM_PROMPT(student?.course),
          messages,
        });

        stream.on('text', (delta) => {
          io.to(`student-${id}`).emit('ai_chat_chunk', { delta });
        });

        const finalMessage = await stream.finalMessage();
        const replyText = finalMessage.content
          .filter((block) => block.type === 'text')
          .map((block) => block.text)
          .join('');

        const [assistantInsert] = await pool.query(
          'INSERT INTO ai_chat_messages (student_id, role, content) VALUES (?, "assistant", ?)',
          [id, replyText]
        );
        io.to(`student-${id}`).emit('ai_chat_done', {
          id: assistantInsert.insertId,
          student_id: id,
          role: 'assistant',
          content: replyText,
          created_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error('Error handling AI chat message:', err);
        const message =
          err instanceof Anthropic.RateLimitError
            ? 'The AI assistant is busy right now — try again in a moment.'
            : err instanceof Anthropic.APIError
            ? 'The AI assistant is temporarily unavailable.'
            : 'Failed to get a response from the AI assistant.';
        socket.emit('ai_chat_error', { error: message });
      }
    });
  });

  return io;
}

module.exports = { initSocket, getIO };
