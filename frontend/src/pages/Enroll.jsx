import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import illustration from '../assets/illustration.png';
import { API_BASE_URL } from '../config';

const Enroll = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [role] = useState('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid phone number (10-15 digits).');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    if (!gender) {
      setError('Please select your gender.');
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    const payload = {
      name,
      email,
      phone_number: phoneNumber,
      password,
      gender,
      role,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/enroll`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201 || response.status === 200) {
        setSuccess('Enrollment successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Enrollment failed. Please try again.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to enroll. Please try again.';
      setError(`Enrollment failed: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-[#1F386B] text-white flex flex-col justify-center p-10">
        <div className="flex items-center mb-8">
          <img src={logo} alt="Monumental University Logo" className="h-[60px] w-[60px]" />
          <h1 className="flex flex-col m-0 ml-2">
            <span className="text-[20px] font-bold uppercase leading-none">MONUMENTAL</span>
            <span className="text-[12px] font-normal uppercase leading-none">UNIVERSITY</span>
          </h1>
        </div>
        <img src={illustration} alt="Illustration" className="w-3/4 mx-auto mb-8" />
        <p className="text-lg leading-relaxed">
          Monumental University is dedicated to enhancing your academic journey with accessible, free online tutors. Our platform offers students the opportunity to learn at their own pace with a variety of engaging, interactive videos, quizzes, and diagnostic tools. You can track your progress, gain insights into your strengths and areas for improvement, and explore a wide range of eBooks and resources. Whether you’re on campus or learning from home, our tutors ensure that you have everything you need to succeed, right at your fingertips.
        </p>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#1F386B] mb-6">Enroll Now</h2>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
          <form onSubmit={handleRegister} className="bg-[#E6F0FA] p-6 rounded-lg">
            <div className="mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#1F386B]"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#1F386B]"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your number"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#1F386B]"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#1F386B]"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#1F386B]"
                required
              />
            </div>
            <div className="mb-6 flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === 'Male'}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === 'Female'}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                />
                Female
              </label>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#1F386B] text-white px-6 py-2 rounded-full hover:bg-[#1a2f57] transition-colors duration-300"
              >
                Enroll
              </button>
            </div>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-[#1F386B] hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Enroll;
