import React from 'react';
import courseImage from '../assets/preCourse.png';

const AllCourses = () => {
  return (
    <div className="flex flex-1 p-[40px] gap-[50px] md:flex-row flex-col">
      <div className="bg-[#1F386B] text-white p-[30px] -mt-5 mb-5 max-w-[50%] max-h-[90%] md:w-full w-full">
        <h1 className="text-2xl mb-2.5">All</h1>
        <h2 className="text-5xl mb-5 text-white m-0 tracking-[5px] leading-none">
          Courses
        </h2>
        <p className="text-base leading-relaxed max-w-[60%] md:max-w-[60%] max-w-full">
          Monumental University offers a specialized Bachelor's degree in
          Information Technology, designed to equip students with the technical
          expertise and practical skills needed to excel in the fast-evolving
          tech industry. This comprehensive program covers key areas such as
          software development, network management, cybersecurity, and data
          analysis, preparing graduates for a wide range of careers in IT. With
          a focus on hands-on learning and industry-relevant knowledge, the
          Bachelor's in Information Technology provides students with the tools
          to succeed in a dynamic and globalized digital landscape.
        </p>
      </div>
      <div className="flex-1 w-full h-[200px] md:h-auto">
        <img
          src={courseImage}
          alt="University Building"
          className="w-[110%] h-[65%] -ml-[120px] mt-[170px] object-cover shadow-lg md:w-[110%] md:h-[65%] md:-ml-[120px] md:mt-[170px] w-full h-full"
        />
      </div>
    </div>
  );
};

export default AllCourses;