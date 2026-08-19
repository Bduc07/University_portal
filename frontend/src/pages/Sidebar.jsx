import React from 'react';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.png';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';
import logo3 from '../assets/logo3.png';
import logo4 from '../assets/logo4.png';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { img: home, text: 'Home', path: '/' },
    { img: logo1, text: 'About', path: '/about' },
    { img: logo2, text: 'All Courses', path: '/allcourses' }, // Updated
    { img: logo3, text: 'WhyUs', path: '/whyus' },
    { img: logo4, text: 'Contact', path: '/contact' },
  ];

  const handleNavigate = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <aside className="fixed left-12 top-[calc(50%+55px)] transform -translate-y-1/2 flex flex-col items-center gap-6 p-2 bg-[#1F386B] w-16 h-[400px]">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => handleNavigate(item.path)}
        >
          <img
            src={item.img}
            alt={item.text}
            className="w-8 h-8 object-contain"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/32?text=Icon')}
          />
          <span className="text-white text-xs mt-1">{item.text}</span>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;