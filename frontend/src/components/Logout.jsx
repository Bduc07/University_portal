import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ className }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user object from localStorage
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className={`w-full bg-white text-[#1F386B] py-2 px-4 rounded-lg text-base font-medium transition-all duration-300 ease-in-out hover:bg-gray-200 ${className}`}
    >
      Logout
    </button>
  );
};

export default Logout;