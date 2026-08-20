import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const COURSE_ROUTES = {
  6: '/courses/Courses1',
  7: '/courses/Courses2',
  8: '/courses/Courses3',
  9: '/courses/Courses4',
  10: '/courses/Courses5',
};

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get('status');
  const courseId = searchParams.get('courseId');
  const courseRoute = courseId ? COURSE_ROUTES[courseId] : null;
  const isSuccess = status === 'success';

  return (
    <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-md p-8 my-16">
      {isSuccess ? (
        <>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful</h2>
          <p className="text-[#52514e] mb-6">You now have access to this course.</p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h2>
          <p className="text-[#52514e] mb-6">Something went wrong with your payment. Please try again.</p>
        </>
      )}
      <button
        onClick={() => navigate(courseRoute || '/courses')}
        className="bg-[#1F386B] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2A4A8C] transition-colors"
      >
        {isSuccess ? 'Go to Course' : 'Back to Courses'}
      </button>
    </div>
  );
};

export default PaymentResult;
