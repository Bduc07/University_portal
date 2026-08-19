import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import StudentHome from './StudentHome';

const StudentDashboard = () => {
  const { isHomePageVisible } = useOutletContext();  // Make sure this context is provided by the parent
  const location = useLocation();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateUser = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          setError('No user data found. Redirecting to login...');
          navigate('/login');  // Redirect immediately
          return;
        }

        const user = JSON.parse(userData);

        if (!user || !user.role || user.role !== 'student') {
          setError('You are not authorized to access this page. Redirecting to login...');
          navigate('/login');  // Redirect immediately
          return;
        }
      } catch (err) {
        console.error('Validation error:', err);
        setError('Session validation failed. Redirecting to login...');
        navigate('/login');  // Redirect immediately
      } finally {
        setIsLoading(false);
      }
    };

    validateUser();
  }, [navigate]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Show StudentHome if on /dashboard route, otherwise use isHomePageVisible
  const shouldShowHome = location.pathname === '/dashboard' || isHomePageVisible;

  return (
    <div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="mt-4">
          {shouldShowHome ? (
            <StudentHome />
          ) : (
            <p>Click "Home" to view the home page content.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
