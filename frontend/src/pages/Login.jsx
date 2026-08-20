import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';
import BrandMark from '../components/BrandMark.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    console.log('Attempting to log in with', { email, password });

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Login response:', response);
      console.log('Response data:', response.data);

      const { token, userId, name, role } = response.data;

      // Store user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId); // Store userId for GiveFeedback
      localStorage.setItem('name', name);
      localStorage.setItem('role', role);
      // Optionally store user object for consistency
      localStorage.setItem('user', JSON.stringify({ token, userId, name, role }));

      console.log('Stored user:', { token, userId, name, role });

      if (role === 'admin') {
        console.log('Navigating to /admin');
        navigate('/admin');
      } else if (role === 'student') {
        console.log('Navigating to /dashboard');
        navigate('/dashboard');
      } else {
        setError(`Invalid role: ${role}`);
        console.log('Invalid role:', role);
      }
    } catch (err) {
      console.error('Login error:', {
        message: err.message,
        response: err.response ? {
          status: err.response.status,
          data: err.response.data,
          headers: err.response.headers,
        } : null,
      });
      setError(err.response?.data?.message || 'Login failed. Please check the console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-[#1F386B] flex flex-col items-center justify-center p-4">
      <header className="flex items-center pl-4 mb-8 w-full">
        <BrandMark size="compact" />
      </header>

      <div className="bg-white p-8 rounded-3xl shadow-sm w-full max-w-md">
        <h2 className="text-xl font-bold text-[#1F386B] mb-6 text-center">
          Log in to your university account
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="px-5 w-full text-lg font-semibold text-[#1F386B] rounded-3xl border border-[#1F386B] bg-white h-[41px]"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="px-5 w-full text-lg font-semibold text-[#1F386B] rounded-3xl border border-[#1F386B] bg-white h-[41px]"
            required
          />

          <button
            type="button"
            className="text-sm font-medium text-blue-500 text-opacity-50 mt-2 text-left"
            onClick={() => alert('Forgot your password functionality is not implemented yet.')}
          >
            Forgot your password?
          </button>

          <button
            type="submit"
            className="w-full bg-[#1F386B] text-white py-3 rounded-3xl font-bold mt-6 hover:bg-[#2A4A8C] transition-colors"
          >
            Log In
          </button>

          <hr className="my-6 border-t border-[#1F386B] border-opacity-50" />

          <div className="mt-6 text-center">
            <span className="text-base text-black">Don't have an account? </span>
            <button
              type="button"
              className="text-base font-bold text-[#1F386B]"
              onClick={() => navigate('/enroll')}
            >
              Enroll Here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;