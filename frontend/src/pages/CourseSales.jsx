import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';

const PopularityBar = ({ courses }) => {
  const max = Math.max(...courses.map((c) => c.purchaseCount), 1);
  return (
    <div className="space-y-4">
      {courses.map((c) => (
        <div key={c.courseId}>
          <div className="flex justify-between items-baseline gap-2 mb-1">
            <p className="text-sm text-[#52514e]">{c.courseName}</p>
            <span className="text-sm font-semibold text-[#1F386B] shrink-0">
              {c.purchaseCount} sold &middot; Rs. {c.revenue}
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-[#e1e0d9] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#1F386B]"
              style={{ width: `${(c.purchaseCount / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const CourseSales = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/api/payments/analytics`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (err) {
        console.error('Error fetching sales analytics:', err);
        setError('Failed to load sales analytics.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F386B] mb-1">Course Sales</h1>
      <p className="text-sm text-[#898781] mb-6">Which courses are popular, and who bought what</p>

      {isLoading && <p className="text-[#1F386B]">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && data && (
        <>
          <div className="flex flex-wrap gap-4 sm:gap-6 mb-8">
            <div className="bg-[#1F386B] rounded-xl p-5 sm:p-6 shadow-md text-center w-full sm:w-56">
              <p className="text-white/80 text-sm font-semibold">Total Revenue</p>
              <p className="text-3xl sm:text-4xl font-bold text-white mt-1">Rs. {data.totalRevenue}</p>
            </div>
            <div className="bg-[#E6F0FA] rounded-xl p-5 sm:p-6 shadow-md text-center w-full sm:w-56">
              <p className="text-[#1F386B] text-sm font-semibold">Total Purchases</p>
              <p className="text-3xl sm:text-4xl font-bold text-[#1F386B] mt-1">{data.totalPurchases}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 mb-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#898781] mb-4">
              Most Popular Courses
            </p>
            {data.courses.length === 0 ? (
              <p className="text-[#898781]">No purchases yet.</p>
            ) : (
              <PopularityBar courses={data.courses} />
            )}
          </div>

          <div className="bg-[#E6F0FA] rounded-xl p-4 sm:p-6 shadow-md overflow-x-auto">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#898781] mb-4">
              Purchase Log
            </p>
            <div className="grid grid-cols-12 gap-3 font-bold text-[#1F386B] px-2 sm:px-4 py-2 bg-[#d9e9fc] rounded text-xs sm:text-sm">
              <div className="col-span-4">Student</div>
              <div className="col-span-4">Course</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-2">Date</div>
            </div>
            <div className="space-y-2 mt-3">
              {data.purchases.length === 0 ? (
                <p className="text-[#1F386B] text-center py-4">No purchases yet.</p>
              ) : (
                data.purchases.map((p, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 gap-3 items-center px-2 sm:px-4 py-2 bg-white rounded text-xs sm:text-sm"
                  >
                    <div className="col-span-4 truncate">{p.studentName}</div>
                    <div className="col-span-4 truncate">{p.courseName}</div>
                    <div className="col-span-2">Rs. {p.amount}</div>
                    <div className="col-span-2 text-[#898781]">
                      {new Date(p.purchasedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseSales;
