// src/courses/Courses1.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Courses1 = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Use absolute path here for Courses1details
    navigate('/courses/Courses1details');
  };

  return (
    <div className="courses-container flex flex-col px-4 sm:px-6 lg:px-8 pb-8 max-w-6xl mx-auto font-sans">
      {/* Course Header */}
      <div className="mb-6 text-left sm:text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F386B] leading-tight">
          4CS015/HJ1
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F386B] leading-tight">
          Fundamentals of Computing
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-medium text-gray-600 mt-6 sm:mt-10">
          4CS015-OSEAI-HJ1, Assessment Submission Term: 2023/4 OSEAI
        </p>
      </div>

      {/* Main Content Split */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Description */}
        <div className="w-full lg:w-1/2 text-gray-800 text-base md:text-lg leading-7">
          <p>
            Gain a strong foundation in the world of computing with this comprehensive module,
            covering the essential principles and concepts that form the backbone of modern
            technology. You will explore core programming fundamentals, data structures, and
            algorithms, while developing a deep understanding of how computer systems operate.
            Delve into the architecture of hardware, the role of operating systems, and the basics
            of networking, alongside an introduction to cybersecurity practices. Learn how to
            approach problems efficiently, optimize solutions, and build a solid base in both
            theoretical and practical aspects of computing.
          </p>
        </div>

        {/* Video */}
        <div className="w-full lg:w-1/2">
          <div className="bg-[#1F386B] p-4 rounded-xl shadow-lg">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/l4plCAriwSs"
                title="Fundamentals of Computing Chapter 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={handleGetStarted}
        className="mt-8 px-6 py-3 bg-[#1a237e] hover:bg-[#0d1333] text-white font-semibold text-sm sm:text-base rounded-full transition duration-300 self-start"
      >
        Get Started
      </button>
    </div>
  );
};

export default Courses1;
