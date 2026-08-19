import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const EditTeacherQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/api/feedback-teacher`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(response.data);
        if (location.state?.questionId) {
          const question = response.data.find((q) => q.id === location.state.questionId);
          if (question) {
            setEditingId(location.state.questionId);
            setNewQuestion(question.question);
          }
        }
      } catch (err) {
        setError('Failed to fetch questions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [location.state]);

  const handleEdit = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_BASE_URL}/api/feedback-teacher/${id}`,
        { question: newQuestion },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuestions(questions.map((q) => (q.id === id ? { ...q, question: newQuestion } : q)));
      setEditingId(null);
      setNewQuestion('');
    } catch (err) {
      setError('Failed to update question');
      console.error(err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#1F386B] mb-6">Edit Teacher Questions</h1>
      <div className="border-b border-[#1F386B] mb-8" />
      {questions.length === 0 ? (
        <p className="text-[#1F386B]">No questions found.</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((question) => (
            <li key={question.id} className="border p-4 rounded shadow flex justify-between items-center">
              {editingId === question.id ? (
                <>
                  <div className="flex-1 mr-2">
                    <label htmlFor={`teacher-question-${question.id}`} className="block text-[#1F386B] mb-2">
                      Edit Question:
                    </label>
                    <input
                      type="text"
                      id={`teacher-question-${question.id}`}
                      name="question"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="border p-2 rounded w-full"
                      placeholder="Edit question"
                    />
                  </div>
                  <button
                    onClick={() => handleEdit(question.id)}
                    className="bg-[#1F386B] text-white px-4 py-2 rounded hover:bg-[#162a52]"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p className="text-[#1F386B]">{question.question}</p>
                  <button
                    onClick={() => {
                      setEditingId(question.id);
                      setNewQuestion(question.question);
                    }}
                    className="bg-[#1F386B] text-white px-4 py-2 rounded hover:bg-[#162a52]"
                  >
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EditTeacherQuestions;