import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StudentIcon from '../assets/Student.png';
import TeacherIcon from '../assets/Teacher.png';
import AdminIcon from '../assets/Admin.png';
import { API_BASE_URL } from '../config.js';
// Uncomment if you have @heroicons/react installed
// import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    admins: 0,
    teacherList: [],
  });
  const [error, setError] = useState('');
  const [expandedRows, setExpandedRows] = useState([]); // Track expanded rows
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats({
          ...response.data,
          teacherList: response.data.teacherList || [],
        });
      } catch (err) {
        console.error('Error:', err.response?.status, err.response?.data);
        setError('Failed to load stats. Check the console for more details.');
      }
    };

    fetchStats();
  }, [navigate]);

  const toggleRow = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleCheckReviews = (teacherId) => {
    navigate(`/TeacherData/${teacherId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F386B] mb-4 sm:mb-6">
        Dashboard
      </h1>
      <div className="border-b border-[#1F386B] mb-6 sm:mb-8" />
      {error && <p className="text-red-500 text-center my-4 sm:my-5 text-sm sm:text-base">{error}</p>}

      {/* Stats Cards */}
      <div className="flex justify-evenly gap-4 sm:gap-6 mb-6 sm:mb-8 flex-wrap">
        {/* Students */}
        <div
          className="bg-[#E6F0FA] rounded-xl p-6 sm:p-8 text-center shadow-md flex flex-col items-center justify-between h-48 w-full sm:w-64 cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate('/admin/student-details')}
        >
          <span className="text-[#1F386B] text-xl sm:text-2xl font-bold">Students</span>
          <div className="flex items-center mt-4 w-full px-4">
            <img
              src={StudentIcon}
              alt="Students"
              className="h-16 sm:h-20 w-16 sm:w-20 object-contain mr-2"
            />
            <p className="text-4xl sm:text-5xl font-bold text-[#1F386B]">{stats.students}</p>
          </div>
        </div>

        {/* Teachers */}
        <div
          className="bg-[#1F386B] rounded-xl p-6 sm:p-8 text-center shadow-md flex flex-col items-center justify-between h-48 w-full sm:w-64 cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate('/admin/teachers')}
        >
          <span className="text-white text-xl sm:text-2xl font-bold">Teachers</span>
          <div className="flex items-center mt-4 w-full px-4">
            <img
              src={TeacherIcon}
              alt="Teachers"
              className="h-16 sm:h-20 w-16 sm:w-20 object-contain mr-2"
            />
            <p className="text-4xl sm:text-5xl font-bold text-white">{stats.teachers}</p>
          </div>
        </div>

        {/* Admins */}
        <div className="bg-[#E6F0FA] rounded-xl p-6 sm:p-8 text-center shadow-md flex flex-col items-center justify-between h-48 w-full sm:w-64">
          <span className="text-[#1F386B] text-xl sm:text-2xl font-bold">Admins</span>
          <div className="flex items-center mt-4 w-full px-4">
            <img
              src={AdminIcon}
              alt="Admins"
              className="h-16 sm:h-20 w-16 sm:w-20 object-contain mr-2"
            />
            <p className="text-4xl sm:text-5xl font-bold text-[#1F386B]">{stats.admins}</p>
          </div>
        </div>
      </div>

      {/* Teacher List */}
      <div className="bg-[#E6F0FA] rounded-xl p-4 sm:p-6 shadow-md mb-6 sm:mb-8 overflow-x-auto">
        <h2 className="text-lg sm:text-xl font-bold text-[#1F386B] mb-4">Teacher's List</h2>
        <div className="space-y-2 sm:space-y-3">
          {/* Header Row */}
          <div className="grid grid-cols-3 sm:grid-cols-12 gap-2 sm:gap-3 font-bold text-[#1F386B] px-2 sm:px-4 py-2 bg-[#d9e9fc] rounded text-xs sm:text-base">
            <div className="col-span-1">#</div>
            <div className="col-span-2 sm:col-span-4">Teacher</div>
            <div className="hidden sm:block sm:col-span-6">Course</div>
            <div className="col-span-1 sm:col-span-1">Action</div>
          </div>

          {/* Teacher Rows */}
          {stats.teacherList.map((teacher, index) => (
            <div key={teacher.id}>
              <div className="grid grid-cols-3 sm:grid-cols-12 gap-2 sm:gap-3 items-center px-2 sm:px-4 py-2 bg-white rounded hover:bg-gray-100 text-xs sm:text-base">
                <div className="col-span-1">{index + 1}</div>
                <div className="col-span-1 sm:col-span-4 flex items-center">
                  <button
                    onClick={() => toggleRow(index)}
                    className="sm:hidden mr-2 text-[#1F386B]"
                    aria-expanded={expandedRows.includes(index)}
                    aria-controls={`expand-${teacher.id}`}
                  >
                    {/* Uncomment if using @heroicons/react */}
                    {/* {expandedRows.includes(index) ? (
                      <ChevronUpIcon className="w-5 h-5" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5" />
                    )} */}
                    {/* Fallback text if no icons */}
                    {expandedRows.includes(index) ? '−' : '+'}
                  </button>
                  {teacher.name}
                </div>
                <div className="hidden sm:block sm:col-span-6">{teacher.course}</div>
                <div className="col-span-1 sm:col-span-1 flex justify-end">
                  <button
                    onClick={() => handleCheckReviews(teacher.id)}
                    className="bg-[#1F386B] text-white py-1 px-3 rounded-md hover:bg-[#1a2f57] text-xs sm:text-sm"
                  >
                    Check
                  </button>
                </div>
              </div>

              {/* Expanded Row for Mobile */}
              {expandedRows.includes(index) && (
                <div
                  id={`expand-${teacher.id}`}
                  className="sm:hidden bg-gray-50 p-3 rounded-b text-xs border-t border-gray-200"
                >
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium text-[#1F386B]">Course: </span>
                      {teacher.course}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;