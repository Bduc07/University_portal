import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaComments, FaRobot } from 'react-icons/fa';
import homeLogo from '../assets/home.png';
import coursesLogo from '../assets/courses.png';
import feedbackLogo from '../assets/feedback.png';
import studentLogo from '../assets/Student.png';

const StudentSidebar = ({ userName, onLogout, isSidebarOpen, toggleSidebar, toggleHomePage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { img: homeLogo, text: 'Home', path: '/dashboard', action: toggleHomePage },
    { img: coursesLogo, text: 'Courses', path: '/courses' },
    { img: feedbackLogo, text: 'Feedback', path: '/student/feedback' },
    { icon: FaComments, text: 'Messages', path: '/messages' },
    { icon: FaRobot, text: 'AI Tutor', path: '/ai-tutor' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
        className={`fixed top-[129px] left-0 ml-4 h-[calc(100vh-129px-16px)] bg-[#1F386B] text-white flex flex-col justify-between p-6 z-30 shadow-lg transition-all duration-300 rounded-r-lg ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64`}
      >
        <nav className="mt-6">
          <ul className="flex flex-col gap-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold cursor-pointer text-lg transition-all duration-200 ${
                    item.path && isActive(item.path) ? 'bg-[#0c4e8f]' : 'hover:bg-[#2A4A8C]'
                  }`}
                  onClick={() => {
                    navigate(item.path);
                    if (item.action) item.action();
                    if (window.innerWidth < 1024) toggleSidebar();
                  }}
                >
                  {item.icon ? (
                    <item.icon className="w-6 h-6" />
                  ) : (
                    <img
                      src={item.img}
                      alt={item.text}
                      className="w-6 h-6"
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/24?text=Icon')}
                    />
                  )}
                  <span>{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-[#2a5c8e] pt-4">
          <div className="flex items-center mb-4">
            <img
              src={studentLogo}
              alt="User"
              className="w-10 h-10 rounded-full mr-3 object-cover"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/40?text=User')}
            />
            <span className="text-lg font-bold">Hi {userName || 'User'}</span>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="py-2 px-4 rounded-full bg-[#ded8d8] text-[#1F386B] font-bold hover:bg-[#2a5c8e] hover:text-white transition text-sm"
              onClick={() => {
                navigate('/profile');
                if (window.innerWidth < 1024) toggleSidebar();
              }}
            >
              Profile
            </button>
            <button
              className="py-2 px-4 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition text-sm"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default StudentSidebar;