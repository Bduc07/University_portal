// src/courses/Courses3.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Courses3 = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/courses/Courses3details');
  };
  

  return (
    <div className="courses-container flex flex-col px-4 sm:px-6 lg:px-8 pb-8 max-w-6xl mx-auto font-sans">
      {/* Course Header */}
      <div className="mb-6 text-left sm:text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F386B] leading-tight">
          5CS021/HJ1
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F386B] leading-tight">
          Numerical Methods and Concurrency
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-medium text-gray-600 mt-6 sm:mt-10">
          5CS021-OSEAI-HJ1, Assessment Submission Term: 2024/5 OSEAI
        </p>
      </div>

      {/* Course Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Description */}
        <div className="w-full lg:w-1/2 text-gray-800 text-base md:text-lg leading-7">
          <p>
            Gain practical and theoretical expertise in high-performance computing with this
            hands-on module on Numerical Methods and Concurrency. Begin by exploring essential
            numerical techniques such as root-finding, interpolation, and numerical integration,
            while implementing these methods using the C programming language. Dive into the core
            concepts of concurrency and parallelism, learning how to write efficient multithreaded
            programs and manage shared resources effectively. Understand synchronization, race
            conditions, and thread communication as you develop the skills to build scalable and
            responsive applications. This module combines mathematical problem-solving with
            low-level system programming, giving you the tools to optimize performance in modern,
            multi-core computing environments.
          </p>
        </div>

        {/* Video */}
        <div className="w-full lg:w-1/2">
          <div className="bg-[#1F386B] p-4 rounded-xl shadow-lg">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/IOR31yN43Kg"
                title="Numerical Methods and Concurrency Intro"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Get Started Button */}
      <button
        onClick={handleGetStarted}
        className="mt-8 px-6 py-3 bg-[#1a237e] hover:bg-[#0d1333] text-white font-semibold text-sm sm:text-base rounded-full transition duration-300 self-start"
      >
        Get Started
      </button>
    </div>
  );
};

export default Courses3;
