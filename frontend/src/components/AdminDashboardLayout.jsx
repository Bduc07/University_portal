import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import AdminSidebar from './AdminSidebar';

const AdminDashboardLayout = ({ userName, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    console.log('Sidebar toggled:', !isSidebarOpen);
  };

  console.log('Rendering AdminDashboardLayout, isSidebarOpen:', isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1F386B] text-white rounded-md"
      >
        ☰
      </button>

      {/* Sidebar */}
      <AdminSidebar
        userName={userName}
        onLogout={onLogout}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        role="admin"
      />

      {/* Main Content */}
      <main
        className={`flex-1 p-6 pt-12 lg:pt-6 transition-all duration-300 ${
          isSidebarOpen ? 'ml-0 lg:ml-64' : 'ml-0'
        } lg:ml-64`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;