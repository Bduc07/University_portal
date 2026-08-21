const pool = require('../config/db');
const { buildPaymentForm, decodeAndVerifyCallback, checkTransactionStatus } = require('../utils/esewa');
const { notify } = require('../utils/notify');
const { getIO } = require('../socket');

// Same hardcoded course roster used by Courses.jsx / feedbackPage.jsx —
// courses aren't real database records yet.
const COURSE_PRICES = {
  6: { name: 'Fundamentals of Computing', amount: 500 },
  7: { name: 'Computational Mathematics', amount: 500 },
  8: { name: 'Numerical Methods and Concurrency', amount: 600 },
  9: { name: 'Collaborative Development', amount: 600 },
  10: { name: 'Human - Computer Interaction', amount: 500 },
};

exports.initiatePayment = async (req, res) => {
  const { courseId } = req.body;
  const course = COURSE_PRICES[courseId];
  if (!course) {
    return res.status(400).json({ error: 'Unknown course' });
  }

  const studentId = req.user.id;
  const transactionUuid = `${courseId}-${studentId}-${Date.now()}`;

  try {
    await pool.query(
      'INSERT INTO payments (student_id, course_id, transaction_uuid, amount, status) VALUES (?, ?, ?, ?, "PENDING")',
      [studentId, courseId, transactionUuid, course.amount]
    );

    const backendUrl = `${req.protocol}://${req.get('host')}`;
    const { formUrl, fields } = buildPaymentForm({
      amount: course.amount,
      transactionUuid,
      successUrl: `${backendUrl}/api/payments/success`,
      failureUrl: `${backendUrl}/api/payments/failure`,
    });

    res.json({ formUrl, fields });
  } catch (err) {
    console.error('Error initiating payment:', err);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
};

exports.handleSuccess = async (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const { data } = req.query;

  try {
    if (!data) throw new Error('Missing callback data');
    const payload = decodeAndVerifyCallback(data);

    // Don't trust the redirect alone — confirm against eSewa's own status API.
    const statusCheck = await checkTransactionStatus(payload.total_amount, payload.transaction_uuid);

    const [rows] = await pool.query('SELECT * FROM payments WHERE transaction_uuid = ?', [
      payload.transaction_uuid,
    ]);
    if (rows.length === 0) throw new Error('Unknown transaction');
    const payment = rows[0];

    const courseName = COURSE_PRICES[payment.course_id]?.name || `Course #${payment.course_id}`;

    if (statusCheck.status === 'COMPLETE') {
      await pool.query(
        'UPDATE payments SET status = "COMPLETE", esewa_transaction_code = ? WHERE id = ?',
        [payload.transaction_code || null, payment.id]
      );
      await notify(pool, getIO(), {
        userId: payment.student_id,
        type: 'payment',
        title: `Payment successful — ${courseName}`,
        link: '/payment-result',
      });
      return res.redirect(`${frontendUrl}/payment-result?status=success&courseId=${payment.course_id}`);
    }

    await pool.query('UPDATE payments SET status = "FAILED" WHERE id = ?', [payment.id]);
    await notify(pool, getIO(), {
      userId: payment.student_id,
      type: 'payment',
      title: `Payment failed — ${courseName}`,
      link: '/payment-result',
    });
    return res.redirect(`${frontendUrl}/payment-result?status=failed&courseId=${payment.course_id}`);
  } catch (err) {
    console.error('Error handling eSewa success callback:', err);
    return res.redirect(`${frontendUrl}/payment-result?status=error`);
  }
};

exports.handleFailure = async (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const { transaction_uuid: transactionUuid } = req.query;

  try {
    if (transactionUuid) {
      const [rows] = await pool.query('SELECT * FROM payments WHERE transaction_uuid = ?', [transactionUuid]);
      if (rows.length > 0) {
        await pool.query('UPDATE payments SET status = "FAILED" WHERE id = ?', [rows[0].id]);
        const courseName = COURSE_PRICES[rows[0].course_id]?.name || `Course #${rows[0].course_id}`;
        await notify(pool, getIO(), {
          userId: rows[0].student_id,
          type: 'payment',
          title: `Payment failed — ${courseName}`,
          link: '/payment-result',
        });
        return res.redirect(`${frontendUrl}/payment-result?status=failed&courseId=${rows[0].course_id}`);
      }
    }
  } catch (err) {
    console.error('Error handling eSewa failure callback:', err);
  }

  res.redirect(`${frontendUrl}/payment-result?status=failed`);
};

exports.checkAccess = async (req, res) => {
  const { courseId } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT id FROM payments WHERE student_id = ? AND course_id = ? AND status = "COMPLETE" LIMIT 1',
      [req.user.id, courseId]
    );
    const course = COURSE_PRICES[courseId];
    res.json({ hasAccess: rows.length > 0, price: course ? course.amount : null });
  } catch (err) {
    console.error('Error checking course access:', err);
    res.status(500).json({ error: 'Failed to check access' });
  }
};

// Admin only: course popularity (purchase count + revenue) and the full
// purchase log (which student bought which course).
exports.getSalesAnalytics = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.course_id, p.amount, p.created_at, u.name AS student_name
       FROM payments p
       JOIN users u ON u.id = p.student_id
       WHERE p.status = 'COMPLETE'
       ORDER BY p.created_at DESC`
    );

    const perCourse = new Map(); // courseId -> { count, revenue }
    for (const row of rows) {
      if (!perCourse.has(row.course_id)) perCourse.set(row.course_id, { count: 0, revenue: 0 });
      const c = perCourse.get(row.course_id);
      c.count += 1;
      c.revenue += Number(row.amount);
    }

    const courses = Array.from(perCourse.entries())
      .map(([courseId, stats]) => ({
        courseId,
        courseName: COURSE_PRICES[courseId]?.name || `Course #${courseId}`,
        purchaseCount: stats.count,
        revenue: stats.revenue,
      }))
      .sort((a, b) => b.purchaseCount - a.purchaseCount);

    const purchases = rows.map((row) => ({
      studentName: row.student_name,
      courseId: row.course_id,
      courseName: COURSE_PRICES[row.course_id]?.name || `Course #${row.course_id}`,
      amount: Number(row.amount),
      purchasedAt: row.created_at,
    }));

    res.json({
      courses,
      purchases,
      totalRevenue: rows.reduce((sum, r) => sum + Number(r.amount), 0),
      totalPurchases: rows.length,
    });
  } catch (err) {
    console.error('Error computing sales analytics:', err);
    res.status(500).json({ error: 'Failed to compute sales analytics' });
  }
};
