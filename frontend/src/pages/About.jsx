import React from 'react';
import aboutImage from '../assets/about.png'; // Import the image from the assets folder

const About = ({ activePage }) => {
  return (
    <div
      className={`flex gap-12 p-10 ${activePage === 'about' ? 'block' : 'hidden'}`}
    >
      <div className="bg-[#1F386B] text-white p-8 mt-[-20px] mb-5 max-w-2xl w-full">
        <h1 className="text-2xl mb-4">About</h1>
        <h2 className="text-4xl mb-5 tracking-wide">MONUMENTAL</h2>
        <h2 className="text-4xl mb-5 tracking-wide">UNIVERSITY</h2>
        <p className="text-base leading-relaxed max-w-xl">
          Monumental University offers world-class education, providing a
          diverse range of undergraduate and postgraduate programs across various
          disciplines. With a focus on academic excellence and professional
          development, the university is dedicated to empowering students to achieve
          their career goals. Through strong global partnerships and a forward-thinking
          curriculum, Monumental University ensures that students receive the knowledge,
          skills, and practical experience needed to thrive in today’s competitive world.
        </p>
      </div>

      <div className="flex-1">
        <img
          src={aboutImage}
          alt="Monumental University Building"
          className="w-full h-[450px] object-cover shadow-lg rounded-lg"
        />
      </div>
    </div>
  );
};

export default About;
