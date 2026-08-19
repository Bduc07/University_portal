import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const DeleteTeacherQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/feedback-teacher/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(questions.filter((q) => q.id !== id));
      setSuccess('Question deleted successfully');
      setError(null);
    } catch (err) {
      setError('Failed to delete question');
      setSuccess(null);
      console.error(err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#1F386B] mb-6">Delete Teacher Question</h1>
      <div className="border-b border-[#1F386B] mb-8" />
      {questions.length === 0 ? (
        <p className="text-[#1F386B]">No questions found.</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((question) => (
            <li key={question.id} className="border p-4 rounded shadow flex justify-between items-center">
              <p className="text-[#1F386B]">{question.question}</p>
              <button
                onClick={() => handleDelete(question.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {success && <p className="mt-4 text-green-500">{success}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default DeleteTeacherQuestion;