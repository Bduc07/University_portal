// src/courses/Courses5.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseGate from '../components/CourseGate.jsx';

const Courses5 = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/courses/Courses5details');
  };

  return (
    <CourseGate courseId={10} courseName="Human-Computer Interaction">
    <div className="courses-container flex flex-col px-4 sm:px-6 lg:px-8 pb-8 max-w-6xl mx-auto font-sans">
      {/* Course Header */}
      <div className="mb-6 text-left sm:text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F386B] leading-tight">
          5CS020/HJ1
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F386B] leading-tight">
          Human-Computer Interaction
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-medium text-gray-600 mt-6 sm:mt-10">
          5CS020-OSEAI-HJ1, Assessment Submission Term: 2024/5 OSEAI
        </p>
      </div>

      {/* Course Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Description */}
        <div className="w-full lg:w-1/2 text-gray-800 text-base md:text-lg leading-7">
          <p>
            Discover the art and science of designing user-friendly technology in this
            comprehensive module on Human-Computer Interaction (HCI), focused on creating intuitive
            and engaging digital experiences. Learn the fundamentals of user interface (UI) and
            user experience (UX) design, exploring how layout, interaction patterns, and visual
            elements influence usability. Dive into design thinking, wireframing, prototyping, and
            user testing to understand how real users interact with systems. By combining design
            theory with hands-on practice, this module equips you with the tools to craft digital
            products that are not only functional but also enjoyable and accessible for a wide range
            of users.
          </p>
        </div>

        {/* Video */}
        <div className="w-full lg:w-1/2">
          <div className="bg-[#1F386B] p-4 rounded-xl shadow-lg">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/m3EzxNfpsr0?si=q8P3AG5dmWwNCd_6"
                title="Human-Computer Interaction Overview"
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

export default Courses5;
