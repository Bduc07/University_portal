import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config.js';

const ViewTeacherQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/api/feedback-teacher`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(response.data);
      } catch (err) {
        setError('Failed to fetch questions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleQuestionClick = (questionId) => {
    // Navigate to the edit page with the question ID (you can pass the ID in state or URL)
    navigate('/feedback/teachers/edit', { state: { questionId } });
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#1F386B] mb-6">View Teacher Questions</h1>
      <div className="border-b border-[#1F386B] mb-8" />
      {questions.length === 0 ? (
        <p className="text-[#1F386B]">No questions found.</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((question) => (
            <li
              key={question.id}
              className="border p-4 rounded shadow cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleQuestionClick(question.id)}
            >
              <p className="text-[#1F386B]">{question.question}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewTeacherQuestions;