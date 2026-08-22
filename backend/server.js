// In server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const pool = require('./config/db');

dotenv.config();

const http = require('http');
const feedbackTeacherRoutes = require('./routes/feedbackTeacherRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const authRoutes = require('./routes/authRoutes');
const statsRoutes = require('./routes/statsRoutes');
const studentRoutes = require('./routes/studentRoutes');
const feedbackTargetsRoutes = require('./routes/feedbackTargetsRoutes');
const teachersRoutes = require('./routes/teachersRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');
const notificationsRoutes = require('./routes/notificationsRoutes');
const aiChatRoutes = require('./routes/aiChatRoutes');
const { protect, authorizeRoles } = require('./middlewares/authMiddleware');
const { initSocket } = require('./socket');

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', statsRoutes);
app.use('/api', feedbackTeacherRoutes);
app.use('/api', coursesRoutes);
app.use('/api', feedbackTargetsRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/ai-chat', aiChatRoutes);

// Remove or comment out /api/teachers endpoints since teachers table doesn't exist
/*
app.get('/api/teachers', async (req, res) => {
  try {
    const [teachers] = await pool.query('SELECT id, name, subject FROM teachers');
    res.json(teachers);
  } catch (err) {
    console.error('Error fetching teachers:', err);
    res.status(500).json({ message: 'Error fetching teachers' });
  }
});

app.get('/api/teachers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [teachers] = await pool.query('SELECT id, name, subject FROM teachers WHERE id = ?', [id]);
    if (teachers.length === 0) return res.status(404).json({ message: 'Teacher not found' });
    res.json(teachers[0]);
  } catch (err) {
    console.error('Error fetching teacher:', err);
    res.status(500).json({ message: 'Error fetching teacher' });
  }
});
*/

// Remove or comment out /api/courses endpoints since courses table doesn't exist
/*
app.get('/api/courses', async (req, res) => {
  try {
    const [courses] = await pool.query('SELECT id, name, description FROM courses');
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

app.get('/api/courses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [courses] = await pool.query('SELECT id, name, description FROM courses WHERE id = ?', [id]);
    if (courses.length === 0) return res.status(404).json({ message: 'Course not found' });
    res.json(courses[0]);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ message: 'Error fetching course' });
  }
});
*/

app.get('/api/feedback-questions', protect, async (req, res) => {
  const { target_type, target_id } = req.query;
  let query = 'SELECT * FROM feedback_questions';
  const params = [];

  if (target_type) {
    query += ' WHERE target_type = ?';
    params.push(target_type);
    if (target_id) {
      query += ' AND (target_id = ? OR target_id IS NULL)';
      params.push(target_id);
    }
  }

  try {
    console.log('Executing query:', query, 'with params:', params);
    const [questions] = await pool.query(query, params);
    console.log('Questions fetched:', questions);
    res.json(questions);
  } catch (err) {
    console.error('Error fetching feedback questions:', err);
    res.status(500).json({ message: 'Error fetching feedback questions' });
  }
});
app.post('/api/feedback-questions', protect, authorizeRoles('admin'), async (req, res) => {
  const { target_type, target_id, question_text } = req.body;

  if (!target_type || !question_text) {
    return res.status(400).json({ error: 'target_type and question_text are required' });
  }

  const finalTargetId = target_id || null;

  try {
    const result = await pool.query(
      'INSERT INTO feedback_questions (target_type, target_id, question_text, created_at, updated_at) VALUES (?, NULL, ?, NOW(), NOW())',
      [target_type, question_text]
    );

    res.status(201).json({
      message: 'Question added successfully',
      question_id: result.insertId,
    });
  } catch (err) {
    console.error('Error adding feedback question:', err);
    res.status(500).json({ error: 'Failed to add question', details: err.message });
  }
});

// Shared by the pre-check and the server-side enforcement below, so both
// agree on what "can submit" means.
async function getCooldownStatus(submitterIdentifier, targetType, targetId) {
  const targetColumn = targetType === 'teacher' ? 'teacher_id' : 'course_id';
  const [rows] = await pool.query(
    `SELECT created_at FROM feedback_responses
     WHERE submitter_identifier = ? AND ${targetColumn} = ?
     ORDER BY created_at DESC
     LIMIT 1`,
    [submitterIdentifier, String(targetId)]
  );

  if (rows.length === 0) {
    return { canSubmit: true, daysRemaining: 0 };
  }

  const lastSubmission = new Date(rows[0].created_at);
  const nextEligible = new Date(lastSubmission.getTime() + 7 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const canSubmit = now >= nextEligible;
  const daysRemaining = canSubmit ? 0 : Math.ceil((nextEligible - now) / (24 * 60 * 60 * 1000));

  return { canSubmit, daysRemaining };
}

app.post('/api/submit-feedback', protect, authorizeRoles('student'), async (req, res) => {
  const { submitter_identifier, target_type, target_id, responses, is_anonymous = 0 } = req.body;

  if (!submitter_identifier || !target_type || !target_id || !responses || !Array.isArray(responses)) {
    return res.status(400).json({ error: 'Invalid request data' });
  }
  if (!['teacher', 'course'].includes(target_type)) {
    return res.status(400).json({ error: 'target_type must be "teacher" or "course"' });
  }

  try {
    const { canSubmit, daysRemaining } = await getCooldownStatus(submitter_identifier, target_type, target_id);
    if (!canSubmit) {
      return res.status(429).json({
        error: `You can submit feedback for this ${target_type} again in ${daysRemaining} day(s).`,
      });
    }

    for (const response of responses) {
      const { question_id, response_value } = response;
      if (!question_id || !response_value) {
        continue;
      }
      
      const teacher_id = target_type === 'teacher' ? String(target_id) : null;
      const course_id = target_type === 'course' ? String(target_id) : null;
      
      await pool.query(
        `INSERT INTO feedback_responses 
        (submitter_identifier, question_id, response_value, teacher_id, course_id, is_anonymous) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [submitter_identifier, question_id, response_value, teacher_id, course_id, is_anonymous]
      );
    }
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('Error submitting feedback:', err);
    res.status(500).json({ error: 'Failed to submit feedback', details: err.message });
  }
});

app.get('/api/feedback/check-last-submission', protect, authorizeRoles('student'), async (req, res) => {
  const { submitter_identifier, target_type, target_id } = req.query;

  if (!submitter_identifier || !target_type || !target_id) {
    return res.status(400).json({ error: 'submitter_identifier, target_type and target_id are required' });
  }

  try {
    const status = await getCooldownStatus(submitter_identifier, target_type, target_id);
    res.json(status);
  } catch (err) {
    console.error('Error checking last submission:', err);
    res.status(500).json({ error: 'Failed to check last submission' });
  }
});

(async () => {
  try {
    const [rows] = await pool.query('SELECT 1');
    console.log('✅ Database connection successful');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
})();

const httpServer = http.createServer(app);
initSocket(httpServer, corsOptions);

const PORT = process.env.PORT || 3037;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});