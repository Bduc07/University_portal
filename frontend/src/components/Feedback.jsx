import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-[#1F386B] text-xl">Loading...</p>
      </div>
    );
  }

  if (role !== 'admin') {
    navigate('/student/feedback');
    return null;
  }

  const feedbackActions = [
    { label: 'View Questions', path: '/feedback/teachers/view' },
    { label: 'Edit Questions', path: '/feedback/teachers/edit' },
    { label: 'Add Question', path: '/feedback/teachers/add' },
    { label: 'Delete Question', path: '/feedback/teachers/delete' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#1F386B] mb-6">Feedback Questions</h1>
      <div className="border-b border-[#1F386B] mb-8" />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-[#1F386B] mb-4 uppercase">Questions for Teachers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {feedbackActions.map((action, index) => (
              <div
                key={index}
                className="border p-6 rounded-lg bg-[#E6EFFF] text-center text-[#1F386B] font-medium cursor-pointer hover:bg-[#D6E0FF] transition"
                onClick={() => navigate(action.path)}
              >
                {action.label}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-[#1F386B] mb-4 uppercase">Questions for Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {feedbackActions.map((action, index) => (
              <div
                key={index}
                className="border p-6 rounded-lg bg-[#E6EFFF] text-center text-[#1F386B] font-medium cursor-pointer hover:bg-[#D6E0FF] transition"
                onClick={() => navigate(action.path.replace('teachers', 'courses'))}
              >
                {action.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
