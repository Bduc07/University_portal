// src/courses/Courses2.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseGate from '../components/CourseGate.jsx';

const Courses2 = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Use absolute path here for Courses2details
    navigate('/courses/Courses2details');
  };

  return (
    <CourseGate courseId={7} courseName="Computational Mathematics">
    <div className="courses-container flex flex-col px-4 sm:px-6 lg:px-8 pb-8 max-w-6xl mx-auto font-sans">
      {/* Course Header */}
      <div className="mb-6 text-left sm:text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F386B] leading-tight">
          4MM013/HJ1
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F386B] leading-tight">
          Computational Mathematics
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-medium text-gray-600 mt-6 sm:mt-10">
          4MM013-OSEAI-HJ1, Assessment Submission Term: 2023/4 OSEAI
        </p>
      </div>

      {/* Course Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Description */}
        <div className="w-full lg:w-1/2 text-gray-800 text-base md:text-lg leading-7">
          <p>
            Master the mathematical tools essential for solving complex computing problems with
            this in-depth module on Computational Mathematics. This course equips you with a solid
            understanding of key mathematical concepts used in computer science, including linear
            algebra, discrete mathematics, probability, and calculus. You will learn how to apply
            these principles to algorithm design, data analysis, graphics, machine learning, and
            cryptography. Emphasis is placed on logical reasoning, mathematical modeling, and
            precision in computation, enabling you to tackle real-world problems with confidence.
            Through both theoretical learning and hands-on problem solving, you'll build a strong
            mathematical foundation tailored for modern computing applications.
          </p>
        </div>

        {/* Video */}
        <div className="w-full lg:w-1/2">
          <div className="bg-[#1F386B] p-4 rounded-xl shadow-lg">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/Kltfa7B7Qqk"
                title="Computational Mathematics Intro"
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
    </CourseGate>
  );
};

export default Courses2;
