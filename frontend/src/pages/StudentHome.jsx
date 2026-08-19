import React from 'react';
import bristiImg from '../assets/bristi.png';
import samarthaImg from '../assets/samartha.png';
import sarthakImg from '../assets/sarthak.png';

const StudentHome = () => {
  return (
    <div className="px-4 lg:px-12 pb-8 font-sans">
      <h1 className="text-4xl font-bold text-[#1F386B] mb-8">Home</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-[#1F386B] mb-6">Top Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#E6F0FA] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#1F386B] mb-4">5CS021/HJ1<br />Numerical Methods and Concurrency</h3>
            <p className="text-sm text-gray-600">Master C programming, numerical methods, and the fundamentals of multithreading, parallelism, and concurrency.</p>
          </div>
          <div className="bg-[#E6F0FA] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#1F386B] mb-4">5CS024/HJ1<br />Collaborative Development</h3>
            <p className="text-sm text-gray-600">Learn collaborative software development practices, version control, and teamwork skills for building high-quality, maintainable code.</p>
          </div>
          <div className="bg-[#E6F0FA] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#1F386B] mb-4">4MM013/HJ1<br />Computational Mathematics</h3>
            <p className="text-sm text-gray-600">Explore mathematical techniques and algorithms for solving complex computational problems in science and engineering.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-[#1F386B] mb-6">Hear from Our Students</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#E6F0FA] p-6 rounded-lg shadow-md">
            <p className="italic text-gray-600 mb-4">"The courses offered here gave me the hands-on experience I needed to succeed in the tech industry. Learning concepts like multithreading and numerical methods helped me land an internship at a top tech company."</p>
            <div className="flex items-center gap-4">
              <img src={bristiImg} alt="Bristi Upadhyay" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <strong className="text-lg text-[#333]">Bristi Upadhyay</strong>
                <p className="text-sm text-gray-500">Bachelors in Information Technology</p>
              </div>
            </div>
          </div>

          <div className="bg-[#E6F0FA] p-6 rounded-lg shadow-md">
            <p className="italic text-gray-600 mb-4">"The professors and resources provided by the college allowed me to strengthen my programming skills and gain a deeper understanding of mathematics. It's been instrumental in my academic and professional growth."</p>
            <div className="flex items-center gap-4">
              <img src={samarthaImg} alt="Samartha Shakya" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <strong className="text-lg text-[#333]">Samartha Shakya</strong>
                <p className="text-sm text-gray-500">Bachelors in Information Technology</p>
              </div>
            </div>
          </div>

          <div className="bg-[#E6F0FA] p-6 rounded-lg shadow-md">
            <p className="italic text-gray-600 mb-4">"The professors and resources provided by the college allowed me to strengthen my programming skills and gain a deeper understanding of mathematics. It's been instrumental in my academic and professional growth."</p>
            <div className="flex items-center gap-4">
              <img src={sarthakImg} alt="Sarthak KC" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <strong className="text-lg text-[#333]">Sarthak KC</strong>
                <p className="text-sm text-gray-500">Bachelors in Information Technology</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentHome;
