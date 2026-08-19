import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLightbulb } from 'react-icons/fa';
import { API_BASE_URL } from '../config';
import { PieChart, TrendLine, QuestionBarChart } from '../components/FeedbackCharts';

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6">
    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-[#1F386B]">{course.courseName}</h3>
        <p className="text-xs text-[#898781]">
          {course.totalReviews} review{course.totalReviews === 1 ? '' : 's'} total
        </p>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-[#1F386B]">{course.averageRating.toFixed(2)}</p>
        <p className="text-xs text-[#898781]">avg rating / 5</p>
      </div>
    </div>

    <PieChart good={course.good} neutral={course.neutral} bad={course.bad} />

    <div className="mt-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#898781] mb-1">Rating Trend</p>
      <TrendLine monthly={course.monthly} />
    </div>

    {course.questionBreakdown && course.questionBreakdown.length > 0 && (
      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#898781] mb-3">Average Rating by Question</p>
        <QuestionBarChart questions={course.questionBreakdown} />
      </div>
    )}

    {course.improvementArea && (
      <div className="mt-4 flex items-start gap-2 bg-[#fff8ec] border border-[#fab219]/40 rounded-lg p-3">
        <FaLightbulb className="text-[#fab219] mt-0.5 shrink-0" />
        <p className="text-sm text-[#52514e]">
          <span className="font-semibold text-[#1F386B]">Area to improve: </span>
          {course.improvementArea.questionText} (avg {course.improvementArea.averageRating.toFixed(1)}/5)
        </p>
      </div>
    )}
  </div>
);

const CourseAnalytics = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/api/course-feedback-analytics`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data.courses || []);
      } catch (err) {
        console.error('Error fetching course analytics:', err);
        setError('Failed to load analytics. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const totalReviews = courses.reduce((sum, c) => sum + c.totalReviews, 0);
  const overallAverage =
    totalReviews === 0
      ? null
      : courses.reduce((sum, c) => sum + c.averageRating * c.totalReviews, 0) / totalReviews;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F386B] mb-1">Course Feedback Analytics</h1>
      <p className="text-sm text-[#898781] mb-6">Good vs. bad reviews and rating trends per course</p>

      {isLoading && <p className="text-[#1F386B]">Loading analytics...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && (
        <>
          <div className="flex flex-wrap gap-4 sm:gap-6 mb-8">
            <div className="bg-[#1F386B] rounded-xl p-5 sm:p-6 shadow-md text-center w-full sm:w-56">
              <p className="text-white/80 text-sm font-semibold">Total Reviews</p>
              <p className="text-3xl sm:text-4xl font-bold text-white mt-1">{totalReviews}</p>
            </div>
            <div className="bg-[#E6F0FA] rounded-xl p-5 sm:p-6 shadow-md text-center w-full sm:w-56">
              <p className="text-[#1F386B] text-sm font-semibold">Overall Average</p>
              <p className="text-3xl sm:text-4xl font-bold text-[#1F386B] mt-1">
                {overallAverage === null ? 'N/A' : overallAverage.toFixed(2)}
              </p>
            </div>
          </div>

          {courses.length === 0 ? (
            <p className="text-[#898781]">No feedback has been submitted for any course yet.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.courseId} course={course} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CourseAnalytics;
