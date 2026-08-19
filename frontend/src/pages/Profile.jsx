// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaBook,
  FaCalendarAlt,
  FaPen,
} from 'react-icons/fa';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      if (role !== 'student' || !userId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/students/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [role, userId, token]);

  const handleEditClick = () => {
    setEditedProfile({
      name: profile.name,
      email: profile.email,
      phone_number: profile.phone_number || '',
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/students/${userId}`, editedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile((prev) => ({ ...prev, ...editedProfile }));
      localStorage.setItem('name', editedProfile.name);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile.');
    }
  };

  const initials = (profile?.name || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
      })
    : null;

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 text-center">
        <p className="text-base sm:text-lg text-[#1F386B]">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 max-w-3xl mx-auto">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!profile ? (
        <p className="text-[#1F386B]">No profile data available.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Banner + avatar */}
          <div className="relative h-32 sm:h-40 bg-gradient-to-r from-[#1F386B] to-[#3A5EA0]">
            {!isEditing && (
              <button
                onClick={handleEditClick}
                className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 hover:bg-white text-[#1F386B] text-sm font-semibold px-3 py-1.5 rounded-full shadow transition-colors"
              >
                <FaPen size={12} /> Edit
              </button>
            )}
            <div className="absolute -bottom-12 left-6 sm:left-10 w-24 h-24 rounded-full bg-[#E6F0FA] border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-[#1F386B]">
              {initials}
            </div>
          </div>

          {/* Name + role */}
          <div className="pt-16 pb-6 px-6 sm:px-10">
            {isEditing ? (
              <input
                className="text-2xl sm:text-3xl font-bold text-[#1F386B] border-b-2 border-[#1F386B]/30 focus:border-[#1F386B] outline-none bg-transparent w-full"
                name="name"
                value={editedProfile.name}
                onChange={handleInputChange}
              />
            ) : (
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F386B]">{profile.name}</h2>
            )}
            <span className="inline-block mt-2 text-xs font-semibold uppercase tracking-wide text-[#1F386B] bg-[#E6F0FA] px-3 py-1 rounded-full">
              {profile.role}
            </span>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              <InfoField
                icon={<FaEnvelope />}
                label="Email"
                isEditing={isEditing}
                name="email"
                value={isEditing ? editedProfile.email : profile.email}
                onChange={handleInputChange}
              />
              <InfoField
                icon={<FaPhone />}
                label="Phone Number"
                isEditing={isEditing}
                name="phone_number"
                value={isEditing ? editedProfile.phone_number : profile.phone_number || 'N/A'}
                onChange={handleInputChange}
              />
              <InfoField icon={<FaVenusMars />} label="Gender" value={profile.gender || 'N/A'} />
              <InfoField icon={<FaBook />} label="Course" value={profile.course || 'N/A'} />
              {memberSince && (
                <InfoField icon={<FaCalendarAlt />} label="Member Since" value={memberSince} />
              )}
              <InfoField icon={<FaUser />} label="Student ID" value={profile.id} />
            </div>

            {isEditing && (
              <div className="mt-8 flex gap-3">
                <button
                  onClick={handleSave}
                  className="bg-[#1F386B] text-white px-5 py-2 rounded-full font-bold hover:bg-[#2A4A8C] transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="border border-[#1F386B] text-[#1F386B] px-5 py-2 rounded-full font-bold hover:bg-[#E6F0FA] transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const InfoField = ({ icon, label, value, isEditing, name, onChange }) => (
  <div className="flex items-start gap-3 bg-[#E6F0FA] rounded-xl p-4">
    <div className="text-[#1F386B] mt-1">{icon}</div>
    <div className="flex-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#1F386B]/70">{label}</p>
      {isEditing && name ? (
        <input
          className="mt-1 w-full bg-white border border-[#1F386B]/30 rounded px-2 py-1 text-[#1F386B] font-medium outline-none focus:border-[#1F386B]"
          name={name}
          value={value}
          onChange={onChange}
        />
      ) : (
        <p className="text-base font-medium text-[#1F386B] mt-0.5">{value}</p>
      )}
    </div>
  </div>
);

export default Profile;
