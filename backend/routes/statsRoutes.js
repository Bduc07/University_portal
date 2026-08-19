// In routes/statsRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// Courses aren't real database records yet (unlike teachers) — this mirrors
// the static list in Courses.jsx / feedbackPage.jsx so names resolve correctly.
const COURSE_NAMES = {
  6: 'Fundamentals of Computing',
  7: 'Computational Mathematics',
  8: 'Numeric Methods and Concurrency',
  9: 'Collaborative Development',
  10: 'Human - Computer Interaction',
};

// Shared by both the teacher and course analytics endpoints: groups raw
// question-level answers into one score per review (same submitter + same
// target + same submission timestamp), then rolls that up per target.
async function computeFeedbackAnalytics(targetType, resolveName) {
  const targetColumn = targetType === 'teacher' ? 'teacher_id' : 'course_id';

  const [rows] = await pool.query(
    `SELECT fr.submitter_identifier, fr.${targetColumn} AS target_id, fr.response_value, fr.created_at,
            fq.question_id, fq.question_text
     FROM feedback_responses fr
     JOIN feedback_questions fq ON fr.question_id = fq.question_id
     WHERE fr.${targetColumn} IS NOT NULL AND fq.target_type = ?
     ORDER BY fr.${targetColumn}, fr.created_at`,
    [targetType]
  );

  const submissions = new Map();
  const questionStats = new Map(); // targetId -> questionId -> { text, total, count }

  for (const row of rows) {
    const targetId = row.target_id;
    const value = Number(row.response_value);
    if (Number.isNaN(value)) continue;

    const submissionKey = `${targetId}|${row.submitter_identifier}|${row.created_at.toISOString()}`;
    if (!submissions.has(submissionKey)) {
      submissions.set(submissionKey, { targetId, createdAt: row.created_at, total: 0, count: 0 });
    }
    const submission = submissions.get(submissionKey);
    submission.total += value;
    submission.count += 1;

    if (!questionStats.has(targetId)) questionStats.set(targetId, new Map());
    const targetQuestions = questionStats.get(targetId);
    if (!targetQuestions.has(row.question_id)) {
      targetQuestions.set(row.question_id, { text: row.question_text, total: 0, count: 0 });
    }
    const q = targetQuestions.get(row.question_id);
    q.total += value;
    q.count += 1;
  }

  const perTarget = new Map(); // targetId -> [{score, createdAt}]
  for (const submission of submissions.values()) {
    const score = submission.total / submission.count;
    if (!perTarget.has(submission.targetId)) perTarget.set(submission.targetId, []);
    perTarget.get(submission.targetId).push({ score, createdAt: submission.createdAt });
  }

  const results = [];
  for (const [targetId, scores] of perTarget.entries()) {
    const totalReviews = scores.length;
    const averageRating = scores.reduce((sum, s) => sum + s.score, 0) / totalReviews;
    const good = scores.filter((s) => s.score >= 4).length;
    const bad = scores.filter((s) => s.score < 3).length;
    const neutral = totalReviews - good - bad;

    const monthlyMap = new Map();
    for (const { score, createdAt } of scores) {
      const month = createdAt.toISOString().slice(0, 7); // YYYY-MM
      if (!monthlyMap.has(month)) monthlyMap.set(month, { total: 0, count: 0 });
      const m = monthlyMap.get(month);
      m.total += score;
      m.count += 1;
    }
    const monthly = Array.from(monthlyMap.entries())
      .map(([month, m]) => ({ month, averageRating: m.total / m.count, count: m.count }))
      .sort((a, b) => a.month.localeCompare(b.month));

    let improvementArea = null;
    const questionBreakdown = [];
    const targetQuestions = questionStats.get(targetId);
    if (targetQuestions) {
      for (const q of targetQuestions.values()) {
        const avg = q.total / q.count;
        questionBreakdown.push({ questionText: q.text, averageRating: avg, count: q.count });
        if (!improvementArea || avg < improvementArea.averageRating) {
          improvementArea = { questionText: q.text, averageRating: avg };
        }
      }
    }
    questionBreakdown.sort((a, b) => a.averageRating - b.averageRating);

    results.push({
      id: targetId,
      name: resolveName(targetId),
      totalReviews,
      averageRating,
      good,
      bad,
      neutral,
      monthly,
      improvementArea,
      questionBreakdown,
    });
  }

  results.sort((a, b) => b.totalReviews - a.totalReviews);
  return results;
}

router.get('/teacher-feedback-analytics', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const [teacherRows] = await pool.query('SELECT id, name FROM users WHERE role = "teacher"');
    const teacherNames = new Map(teacherRows.map((t) => [String(t.id), t.name]));

    const results = await computeFeedbackAnalytics(
      'teacher',
      (id) => teacherNames.get(String(id)) || `Teacher #${id}`
    );

    res.json({
      teachers: results.map((r) => ({
        teacherId: r.id,
        teacherName: r.name,
        totalReviews: r.totalReviews,
        averageRating: r.averageRating,
        good: r.good,
        bad: r.bad,
        neutral: r.neutral,
        monthly: r.monthly,
        improvementArea: r.improvementArea,
        questionBreakdown: r.questionBreakdown,
      })),
    });
  } catch (err) {
    console.error('Error computing teacher feedback analytics:', err);
    res.status(500).json({ error: 'Failed to compute teacher feedback analytics', details: err.message });
  }
});

router.get('/course-feedback-analytics', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const results = await computeFeedbackAnalytics(
      'course',
      (id) => COURSE_NAMES[id] || `Course #${id}`
    );

    res.json({
      courses: results.map((r) => ({
        courseId: r.id,
        courseName: r.name,
        totalReviews: r.totalReviews,
        averageRating: r.averageRating,
        good: r.good,
        bad: r.bad,
        neutral: r.neutral,
        monthly: r.monthly,
        improvementArea: r.improvementArea,
        questionBreakdown: r.questionBreakdown,
      })),
    });
  } catch (err) {
    console.error('Error computing course feedback analytics:', err);
    res.status(500).json({ error: 'Failed to compute course feedback analytics', details: err.message });
  }
});

router.get('/stats', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const [students] = await pool.query('SELECT COUNT(*) as count FROM users WHERE role = "student"');
    const [teachers] = await pool.query('SELECT id, name, course FROM users WHERE role = "teacher"');
    const [admins] = await pool.query('SELECT COUNT(*) as count FROM users WHERE role = "admin"');
    res.json({
      students: students[0].count,
      teachers: teachers.length,
      admins: admins[0].count,
      teacherList: teachers.map(teacher => ({
        id: teacher.id,
        name: teacher.name,
        course: teacher.course || 'No course assigned', // Handle null courses
      })),
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Failed to fetch stats', details: err.message });
  }
});

module.exports = router;
