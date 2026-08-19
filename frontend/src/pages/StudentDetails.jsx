import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedStudent, setEditedStudent] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState([]); // Track expanded rows
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/api/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error:', err.response?.status, err.response?.data);
        setError('Failed to load student details. Check the console for more details.');
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [navigate]);

  const toggleRow = (index) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedStudent({ ...students[index] });
    setExpandedRows((prev) => [...prev, index]); // Expand row when editing
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedStudent({});
    setExpandedRows([]); // Collapse all rows on cancel
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/api/students/${id}`, editedStudent, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedStudents = [...students];
      updatedStudents[editIndex] = editedStudent;
      setStudents(updatedStudents);
      setEditIndex(null);
      setExpandedRows([]); // Collapse all rows after save
    } catch (err) {
      console.error(err);
      setError('Failed to update student.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(students.filter((student) => student.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete student.');
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <p className="text-base sm:text-lg text-[#1F386B]">Loading student details...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-full">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F386B] mb-4 sm:mb-6">
        Student Details
      </h1>
      <div className="border-b border-[#1F386B] mb-6 sm:mb-8" />
      {error && <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>}

      <div className="bg-[#E6F0FA] rounded-xl p-4 sm:p-6 shadow-md overflow-x-auto">
        {/* Header Row */}
        <div className="grid grid-cols-3 sm:grid-cols-12 gap-2 sm:gap-3 font-bold text-[#1F386B] px-2 sm:px-4 py-2 bg-[#d9e9fc] rounded text-xs sm:text-base">
          <div className="col-span-1">#</div>
          <div className="col-span-2 sm:col-span-3">Name</div>
          <div className="hidden sm:block sm:col-span-4">Email</div>
          <div className="hidden sm:block sm:col-span-3">Phone</div>
          <div className="col-span-1 sm:col-span-1">Action</div>
        </div>

        {/* Student Rows */}
        <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4">
          {students.length > 0 ? (
            students.map((student, index) => (
              <div key={student.id}>
                <div className="grid grid-cols-3 sm:grid-cols-12 gap-2 sm:gap-3 items-center px-2 sm:px-4 py-2 bg-white rounded hover:bg-gray-100 text-xs sm:text-base">
                  <div className="col-span-1">{index + 1}</div>
                  <div className="col-span-1 sm:col-span-3 flex items-center">
                    <button
                      onClick={() => toggleRow(index)}
                      className="sm:hidden mr-2 text-[#1F386B] font-bold"
                    >
                      {expandedRows.includes(index) ? '−' : '+'}
                    </button>
                    {editIndex === index ? (
                      <input
                        className="p-1 border border-gray-300 rounded text-xs sm:text-base w-full"
                        name="name"
                        value={editedStudent.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      student.name
                    )}
                  </div>
                  <div className="hidden sm:block sm:col-span-4">
                    {editIndex === index ? (
                      <input
                        className="p-1 border border-gray-300 rounded text-xs sm:text-base w-full"
                        name="email"
                        value={editedStudent.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      student.email
                    )}
                  </div>
                  <div className="hidden sm:block sm:col-span-3">
                    {editIndex === index ? (
                      <input
                        className="p-1 border border-gray-300 rounded text-xs sm:text-base w-full"
                        name="phone_number"
                        value={editedStudent.phone_number || ''}
                        onChange={handleInputChange}
                      />
                    ) : (
                      student.phone_number || 'N/A'
                    )}
                  </div>
                  <div className="col-span-1 sm:col-span-1 flex flex-row sm:flex-col gap-1 sm:gap-2 items-center">
                    {editIndex === index ? (
                      <>
                        <button
                          onClick={() => handleSave(student.id)}
                          className="text-green-600 font-bold text-xs sm:text-base"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-red-600 font-bold text-xs sm:text-base"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(index)}
                          className="text-blue-600 font-bold text-xs sm:text-base"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="text-red-600 font-bold text-xs sm:text-base"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Expanded Row for Mobile */}
                {expandedRows.includes(index) && (
                  <div className="sm:hidden bg-gray-50 p-3 rounded-b text-xs border-t border-gray-200">
                    {editIndex === index ? (
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[#1F386B] font-medium">Email</label>
                          <input
                            className="p-1 border border-gray-300 rounded text-xs w-full"
                            name="email"
                            value={editedStudent.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-[#1F386B] font-medium">Phone</label>
                          <input
                            className="p-1 border border-gray-300 rounded text-xs w-full"
                            name="phone_number"
                            value={editedStudent.phone_number || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p>
                          <span className="font-medium text-[#1F386B]">Email: </span>
                          {student.email}
                        </p>
                        <p>
                          <span className="font-medium text-[#1F386B]">Phone: </span>
                          {student.phone_number || 'N/A'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-[#1F386B] text-center text-sm sm:text-base">
              No students found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;