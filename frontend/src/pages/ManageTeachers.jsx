import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const emptyForm = { name: '', email: '', password: '', course: '' };

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', course: '' });

  const token = localStorage.getItem('token');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/teachers`, authHeaders);
      setTeachers(response.data);
    } catch (err) {
      console.error('Error fetching teachers:', err);
      setError('Failed to load teachers.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(`${API_BASE_URL}/api/teachers`, addForm, authHeaders);
      setAddForm(emptyForm);
      setShowAddForm(false);
      fetchTeachers();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add teacher.');
    }
  };

  const startEdit = (teacher) => {
    setEditId(teacher.id);
    setEditForm({ name: teacher.name, email: teacher.email, course: teacher.course || '' });
  };

  const handleEditSave = async (id) => {
    setError('');
    try {
      await axios.put(`${API_BASE_URL}/api/teachers/${id}`, editForm, authHeaders);
      setEditId(null);
      fetchTeachers();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update teacher.');
    }
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      await axios.delete(`${API_BASE_URL}/api/teachers/${id}`, authHeaders);
      setTeachers((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete teacher.');
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 text-center">
        <p className="text-base sm:text-lg text-[#1F386B]">Loading teachers...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1F386B]">Manage Teachers</h1>
        <button
          onClick={() => setShowAddForm((prev) => !prev)}
          className="bg-[#1F386B] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#2A4A8C] transition-colors"
        >
          {showAddForm ? 'Cancel' : 'Add Teacher'}
        </button>
      </div>
      <div className="border-b border-[#1F386B] mb-6" />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="bg-[#E6F0FA] rounded-xl p-4 sm:p-6 shadow-md mb-6 space-y-3">
          <div>
            <label className="block text-sm font-medium text-[#1F386B] mb-1">Name</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              value={addForm.name}
              onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1F386B] mb-1">Email (must end in @university.com)</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={addForm.email}
              onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1F386B] mb-1">Temporary Password</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={addForm.password}
              onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1F386B] mb-1">Course</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              value={addForm.course}
              onChange={(e) => setAddForm({ ...addForm, course: e.target.value })}
              placeholder="e.g. 4CS015/HJ1: Fundamentals of Computing"
            />
          </div>
          <button
            type="submit"
            className="bg-[#1F386B] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#2A4A8C] transition-colors"
          >
            Create Teacher
          </button>
        </form>
      )}

      <div className="bg-[#E6F0FA] rounded-xl p-4 sm:p-6 shadow-md overflow-x-auto">
        <div className="grid grid-cols-12 gap-3 font-bold text-[#1F386B] px-2 sm:px-4 py-2 bg-[#d9e9fc] rounded text-xs sm:text-base">
          <div className="col-span-3">Name</div>
          <div className="col-span-4">Email</div>
          <div className="col-span-3">Course</div>
          <div className="col-span-2">Action</div>
        </div>

        <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4">
          {teachers.length === 0 ? (
            <p className="text-[#1F386B] text-center py-4">No teachers found.</p>
          ) : (
            teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="grid grid-cols-12 gap-3 items-center px-2 sm:px-4 py-2 bg-white rounded text-xs sm:text-sm"
              >
                {editId === teacher.id ? (
                  <>
                    <input
                      className="col-span-3 p-1 border border-gray-300 rounded"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                    <input
                      className="col-span-4 p-1 border border-gray-300 rounded"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                    <input
                      className="col-span-3 p-1 border border-gray-300 rounded"
                      value={editForm.course}
                      onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                    />
                    <div className="col-span-2 flex gap-2">
                      <button
                        onClick={() => handleEditSave(teacher.id)}
                        className="text-green-600 font-bold"
                      >
                        Save
                      </button>
                      <button onClick={() => setEditId(null)} className="text-red-600 font-bold">
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-span-3">{teacher.name}</div>
                    <div className="col-span-4 truncate">{teacher.email}</div>
                    <div className="col-span-3 truncate">{teacher.course || 'N/A'}</div>
                    <div className="col-span-2 flex gap-2">
                      <button onClick={() => startEdit(teacher)} className="text-blue-600 font-bold">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(teacher.id)} className="text-red-600 font-bold">
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTeachers;
