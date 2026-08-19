// src/courses/Courses4.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Courses4 = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/courses/Courses4details');
  };

  return (
    <div className="courses-container flex flex-col px-4 sm:px-6 lg:px-8 pb-8 max-w-6xl mx-auto font-sans">
      {/* Course Header */}
      <div className="mb-6 text-left sm:text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F386B] leading-tight">
          5CS024/HJ1
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F386B] leading-tight">
          Collaborative Development
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-medium text-gray-600 mt-6 sm:mt-10">
          5CS024-OSEAI-HJ1, Assessment Submission Term: 2024/5 OSEAI
        </p>
      </div>

      {/* Course Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Description */}
        <div className="w-full lg:w-1/2 text-gray-800 text-base md:text-lg leading-7">
          <p>
            Develop essential teamwork and software engineering skills with this immersive module
            on Collaborative Development, designed to mirror real-world project environments. Learn
            how to work effectively within a team to plan, design, and build a software project
            from the ground up, applying industry-standard development practices throughout the
            process. Gain experience with version control systems, agile methodologies, and
            collaborative tools that support efficient communication and coordination. From initial
            planning to deployment, this module emphasizes the importance of clear roles, shared
            responsibilities, and continuous integration. Strengthen both your technical and
            interpersonal skills as you learn to deliver high-quality software through effective
            collaboration and project management.
          </p>
        </div>

        {/* Video */}
        <div className="w-full lg:w-1/2">
          <div className="bg-[#1F386B] p-4 rounded-xl shadow-lg">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/_CH5IQewkzw"
                title="Collaborative Development Intro"
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

export default Courses4;
