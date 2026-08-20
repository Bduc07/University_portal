import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config.js';

const AddTeacherQuestion = () => {
  const [question, setQuestion] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/api/feedback-questions`,
        {
          target_type: 'teacher',  // Always send 'teacher' as target_type
          question_text: question,  // Send the question text
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Question added successfully');
      setQuestion('');
      setError(null);
      console.log('Add response:', response.data);
      setTimeout(() => navigate('/feedback/teachers/view'), 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to add question';
      setError(errorMessage);
      setSuccess(null);
      console.error('Add error:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#1F386B] mb-6">Add Teacher Question</h1>
      <div className="border-b border-[#1F386B] mb-8" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="teacher-question" className="block text-[#1F386B] mb-2">
            Question:
          </label>
          <input
            type="text"
            id="teacher-question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter new question"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#1F386B] text-white px-4 py-2 rounded hover:bg-[#162a52]"
        >
          Add Question
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </form>
    </div>
  );
};

export default AddTeacherQuestion;
