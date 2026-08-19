import React from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const courses = [
    {
      code: '4CS015/HJ1',
      title: 'Fundamentals of Computing',
      details: '4CS015-OSEAI-HJ1, Assessment Submission Term: 2023/4 OSEAI',
      link: '/courses/Courses1',
    },
    {
      code: '4MM013/HJ1',
      title: 'Computational Mathematics',
      details: '4MM013-OSEAI-HJ1, Assessment Submission Term: 2023/4 OSEAI',
      link: '/courses/Courses2',
    },
    {
      code: '5CS021/HJ1',
      title: 'Numerical Methods and Concurrency',
      details: '5CS021-OSEAI-HJ1, Assessment Submission Term: 2024/5 OSEAI',
      link: '/courses/Courses3',
    },
    {
      code: '5CS024/HJ1',
      title: 'Collaborative Development',
      details: '5CS024-OSEAI-HJ1, Assessment Submission Term: 2024/5 OSEAI',
      link: '/courses/Courses4',
    },
    {
      code: '5CS020/HJ1',
      title: 'Human - Computer Interaction',
      details: '5CS020-OSEAI-HJ1, Term: 2024/5 OSEAI',
      link: '/courses/Courses5',
    },
  ];

  return (
    <div className="px-4">
      <h1 className="text-[2.8rem] font-bold mb-6 text-[#1F386B] text-left ml-[90px] max-md:ml-4 max-md:text-2xl max-md:text-center">
        Courses
      </h1>
      <div className="grid grid-cols-2 gap-6 justify-center items-start ml-[90px] max-w-[920px] max-md:grid-cols-1 max-md:ml-4 max-md:mr-4">
        {courses.map((course, index) => (
          <Link
            to={course.link}
            key={index}
            className={`bg-[#E6F0FA] p-6 rounded-md shadow-md w-[400px] h-[190px] flex flex-col justify-center text-center ${
              index === 4 ? 'col-span-2 justify-center max-md:col-span-1' : ''
            }`}
          >
            <h2 className="text-xl font-bold text-[#1F386B] mb-2">{course.code}</h2>
            <h3 className="text-lg font-bold text-[#1F386B] mb-2">{course.title}</h3>
            <p className="text-base text-gray-600">{course.details}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;