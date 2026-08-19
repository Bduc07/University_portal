import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import StudentHeader from './StudentHeader';
import StudentSidebar from './StudentSidebar';

const StudentLayout = () => {
  const [userName, setUserName] = useState('Student');
  const [isHomePageVisible, setIsHomePageVisible] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('StudentLayout mounted');
    const fetchUserName = () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUserName(user.name || localStorage.getItem('userName') || 'Student');
        } else {
          setUserName(localStorage.getItem('userName') || 'Student');
        }
      } catch (err) {
        console.error('Error parsing user data:', err);
        setError('Failed to load user data. Using default name.');
        setUserName('Student');
      }
    };

    fetchUserName();

    window.addEventListener('storage', fetchUserName);

    return () => {
      window.removeEventListener('storage', fetchUserName);
    };
  }, []);

  const handleLogout = () => {
    console.log('handleLogout called - Logging out');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  const toggleHomePage = () => {
    setIsHomePageVisible(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  console.log('Rendering StudentLayout, isSidebarOpen:', isSidebarOpen);

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-40">
        <StudentHeader
          userName={userName}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <StudentSidebar
          userName={userName}
          onLogout={handleLogout}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          toggleHomePage={toggleHomePage}
        />

        <div
          className={`flex-1 pt-[129px] ml-0 lg:ml-[272px] h-screen overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? 'opacity-50 lg:opacity-100' : ''
          }`}
        >
          <div className="px-6 pt-2 pb-6">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Outlet context={{ isHomePageVisible }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;