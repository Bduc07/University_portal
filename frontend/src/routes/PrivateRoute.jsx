import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, roleRequired }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const checkAuth = async () => {
      // Convert roleRequired to array if it's a string
      const allowedRoles = Array.isArray(roleRequired)
        ? roleRequired
        : [roleRequired].filter(Boolean);

      // Redirect to login if token is missing
      if (!token) {
        console.log('No token found - redirecting to login');
        navigate('/login', { 
          replace: true,
          state: { from: location.pathname }
        });
        return;
      }

      const path = location.pathname;

      // Only restrict student feedback routes (not admin ones)
      const isStudentFeedbackRoute = path.includes('/student/feedback') || (path.includes('/feedback') && role !== 'admin');

      if (isStudentFeedbackRoute && role !== 'student') {
        console.log('Only students can access this feedback route');
        navigate('/unauthorized', { replace: true });
        return;
      }

      // For non-feedback routes, check if the user's role is allowed
      if (!isStudentFeedbackRoute && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        console.log(`Role "${role}" not authorized for this route`);
        navigate('/unauthorized', { replace: true });
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [token, role, roleRequired, navigate, location.pathname]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  return typeof children === 'function' ? children(role) : children;
};

export default PrivateRoute;
