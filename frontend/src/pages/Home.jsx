import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (token) {
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'student') {
        navigate('/dashboard');
      }
    }
  }, [navigate]);

  return null; // No content rendered
};

export default Home;
