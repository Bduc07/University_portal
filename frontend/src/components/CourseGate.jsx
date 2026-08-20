import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';

const CourseGate = ({ courseId, courseName, children }) => {
  const [hasAccess, setHasAccess] = useState(null); // null = still checking
  const [price, setPrice] = useState(null);
  const [error, setError] = useState('');
  const [paying, setPaying] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/payments/access/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasAccess(res.data.hasAccess);
        setPrice(res.data.price);
      } catch (err) {
        console.error('Error checking course access:', err);
        setError('Failed to check course access.');
        setHasAccess(false);
      }
    };
    checkAccess();
  }, [courseId, token]);

  const handlePay = async () => {
    setPaying(true);
    setError('');
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/payments/initiate`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { formUrl, fields } = res.data;

      // eSewa requires a real browser form submission (full-page redirect),
      // not an AJAX/fetch call.
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = formUrl;
      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error('Error initiating payment:', err);
      setError('Failed to start payment. Please try again.');
      setPaying(false);
    }
  };

  if (hasAccess === null) {
    return <p className="text-center text-[#1F386B] p-8">Checking access...</p>;
  }

  if (hasAccess) {
    return children;
  }

  return (
    <div className="max-w-md mx-auto text-center bg-[#E6F0FA] rounded-2xl shadow-md p-8 my-12">
      <h2 className="text-xl font-bold text-[#1F386B] mb-2">{courseName}</h2>
      <p className="text-[#52514e] mb-6">This course requires payment before you can access its content.</p>
      {price !== null && <p className="text-3xl font-bold text-[#1F386B] mb-6">Rs. {price}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handlePay}
        disabled={paying}
        className="bg-[#1F386B] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2A4A8C] transition-colors disabled:opacity-60"
      >
        {paying ? 'Redirecting to eSewa...' : 'Pay with eSewa'}
      </button>
    </div>
  );
};

export default CourseGate;
