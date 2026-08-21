import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaComments, FaMoneyBillWave } from 'react-icons/fa';
import homeIcon from '../assets/home.png';
import feedbackIcon from '../assets/feedback.png';
import BrandMark from './BrandMark.jsx';
import NotificationBell from './NotificationBell.jsx';

const AdminSidebar = ({ onLogout, isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) toggleSidebar();
    console.log('Navigating to:', path);
  };

  console.log('Rendering AdminSidebar, isSidebarOpen:', isSidebarOpen);

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-[#1F386B] text-white flex flex-col p-6 z-50 transition-transform duration-300 w-64
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="mb-6 flex items-center justify-between">
          <BrandMark size="sidebar" />
          <NotificationBell />
        </div>

        {/* Nav Links - Centered Vertically */}
        <div className="flex-1 flex flex-col justify-center space-y-4">
          <button
            onClick={() => handleNavigate('/admin')}
            className="flex items-center gap-3 text-white text-base hover:text-gray-300"
          >
            <img src={homeIcon} alt="Dashboard" className="h-6 w-6" />
            <span>DASHBOARD</span>
          </button>
          <button
            onClick={() => handleNavigate('/admin/feedback')}
            className="flex items-center gap-3 text-white text-base hover:text-gray-300"
          >
            <img src={feedbackIcon} alt="Feedback" className="h-6 w-6" />
            <span>FEEDBACK</span>
          </button>
          <button
            onClick={() => handleNavigate('/admin/course-analytics')}
            className="flex items-center gap-3 text-white text-base hover:text-gray-300"
          >
            <FaChartLine className="h-6 w-6" />
            <span>COURSE ANALYTICS</span>
          </button>
          <button
            onClick={() => handleNavigate('/admin/messages')}
            className="flex items-center gap-3 text-white text-base hover:text-gray-300"
          >
            <FaComments className="h-6 w-6" />
            <span>MESSAGES</span>
          </button>
          <button
            onClick={() => handleNavigate('/admin/course-sales')}
            className="flex items-center gap-3 text-white text-base hover:text-gray-300"
          >
            <FaMoneyBillWave className="h-6 w-6" />
            <span>COURSE SALES</span>
          </button>
        </div>

        {/* Logout */}
        <div className="space-y-2">
          <button
            onClick={() => {
              onLogout();
              toggleSidebar();
              navigate('/login');
            }}
            className="bg-white text-[#1F386B] py-2 px-4 w-full rounded-lg text-sm font-semibold hover:bg-gray-100"
          >
            LOG OUT
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
