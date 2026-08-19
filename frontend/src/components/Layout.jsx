import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { API_BASE_URL } from '../config';

const Layout = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Current location:', location.pathname);
    console.log('Token:', token);

    const publicRoutes = ['/', '/about', '/whyus', '/contact', '/allcourses', '/login', '/enroll'];

    const fetchUserData = async () => {
      if (!token) {
        setIsAuthenticated(false);
        if (!publicRoutes.includes(location.pathname)) {
          navigate('/login');
        }
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(response.data.name);
        setUserRole(response.data.role);
        setIsAuthenticated(true);
        localStorage.setItem('userName', response.data.name);
        localStorage.setItem('role', response.data.role);

        if (['/login', '/'].includes(location.pathname)) {
          if (response.data.role === 'admin') {
            navigate('/admin');
          } else if (response.data.role === 'student') {
            navigate('/dashboard');
          }
        }
      } catch (err) {
        console.error('Error fetching user:', err.response?.data || err.message);
        localStorage.clear();
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, location.pathname]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/login');
  };

  const showHeaderRoutes = ['/', '/about', '/whyus', '/contact', '/allcourses'];

  return (
    <div className="flex flex-col min-h-screen">
      {showHeaderRoutes.includes(location.pathname) && (
        <Header
          userName={userName}
          userRole={userRole}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
      )}
      <div className="flex flex-1">
        {/* Sidebar from App.jsx */}
        {children}

        <main
          className={`flex-1 p-8 bg-gray-100 overflow-y-auto ${
            showHeaderRoutes.includes(location.pathname) ? 'mt-[110px]' : ''
          }`}
          style={{
            height: showHeaderRoutes.includes(location.pathname)
              ? 'calc(100vh - 110px)'
              : '100vh',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
