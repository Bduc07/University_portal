import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaLightbulb } from 'react-icons/fa';
import { API_BASE_URL } from '../config';
import { PieChart, TrendLine, QuestionBarChart } from '../components/FeedbackCharts';

const TeacherFeedback = () => {
  const { teacherId } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [teacherName, setTeacherName] = useState('Loading...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const [teacherRes, analyticsRes, submissionsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/teachers/${teacherId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/api/teacher-feedback-analytics`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/api/feedback/teacher/${teacherId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setTeacherName(teacherRes.data.name);
        const teacherAnalytics = analyticsRes.data.teachers.find((t) => t.teacherId === teacherId);
        setAnalytics(teacherAnalytics || null);
        setSubmissions(submissionsRes.data);
      } catch (err) {
        console.error('Error fetching teacher feedback:', err);
        setError('Failed to load feedback. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherId]);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F386B] mb-1">{teacherName}</h1>
      <p className="text-sm text-[#898781] mb-6">Feedback Data Analysis</p>

      {loading && <p className="text-gray-500">Loading feedback...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (!analytics || analytics.totalReviews === 0) && (
        <p className="text-gray-500">No feedback has been submitted for this teacher yet.</p>
      )}

      {!loading && !error && analytics && analytics.totalReviews > 0 && (
        <>
          <div className="flex flex-wrap gap-4 sm:gap-6 mb-6">
            <div className="bg-[#1F386B] rounded-xl p-5 sm:p-6 shadow-md text-center w-full sm:w-56">
              <p className="text-white/80 text-sm font-semibold">Average Rating</p>
              <p className="text-3xl sm:text-4xl font-bold text-white mt-1">{analytics.averageRating.toFixed(2)}</p>
            </div>
            <div className="bg-[#E6F0FA] rounded-xl p-5 sm:p-6 shadow-md text-center w-full sm:w-56">
              <p className="text-[#1F386B] text-sm font-semibold">Total Reviews</p>
              <p className="text-3xl sm:text-4xl font-bold text-[#1F386B] mt-1">{analytics.totalReviews}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#898781] mb-3">Review Breakdown</p>
              <PieChart good={analytics.good} neutral={analytics.neutral} bad={analytics.bad} />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#898781] mb-3">Rating Trend</p>
              <TrendLine monthly={analytics.monthly} />
            </div>
          </div>

          {analytics.questionBreakdown && analytics.questionBreakdown.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 mb-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#898781] mb-4">Average Rating by Question</p>
              <QuestionBarChart questions={analytics.questionBreakdown} />
            </div>
          )}

          {analytics.improvementArea && (
            <div className="flex items-start gap-2 bg-[#fff8ec] border border-[#fab219]/40 rounded-lg p-4 mb-8">
              <FaLightbulb className="text-[#fab219] mt-0.5 shrink-0" />
              <p className="text-sm text-[#52514e]">
                <span className="font-semibold text-[#1F386B]">Area to improve: </span>
                {analytics.improvementArea.questionText} (avg {analytics.improvementArea.averageRating.toFixed(1)}/5)
              </p>
            </div>
          )}
        </>
      )}

      {!loading && !error && submissions.length > 0 && (
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#1F386B] mb-4">All Submissions</h2>
          <div className="space-y-4">
            {submissions.map((submission, index) => (
              <div key={index} className="bg-[#E6F0FA] rounded-xl p-4 sm:p-6 shadow-md">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-[#1F386B]">
                    {submission.isAnonymous ? 'Anonymous' : submission.studentId}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(submission.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="space-y-2">
                  {submission.responses.map((r, i) => (
                    <div key={i} className="bg-white rounded p-3">
                      <p className="text-sm font-medium text-gray-700">{r.question}</p>
                      <p className="text-[#1F386B] font-semibold">{r.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherFeedback;
